/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { strict as assert } from "assert";

import { describeCompat } from "@fluid-private/test-version-utils";
import { IHostLoader } from "@fluidframework/container-definitions/internal";
import { IContainerExperimental } from "@fluidframework/container-loader/internal";
import { DefaultSummaryConfiguration } from "@fluidframework/container-runtime/internal";
import { ConfigTypes, IConfigProviderBase } from "@fluidframework/core-interfaces";
import { Side } from "@fluidframework/merge-tree/internal";
import { toDeltaManagerInternal } from "@fluidframework/runtime-utils/internal";
import type {
	ISequenceIntervalCollection,
	SharedString,
} from "@fluidframework/sequence/internal";
import {
	ChannelFactoryRegistry,
	DataObjectFactoryType,
	ITestContainerConfig,
	ITestFluidObject,
	ITestObjectProvider,
	toIDeltaManagerFull,
	getContainerEntryPointBackCompat,
	waitForContainerConnection,
	TestFluidObjectFactory,
} from "@fluidframework/test-utils/internal";

const stringId = "sharedStringKey";
const collectionId = "collectionKey";

const assertIntervals = (
	sharedString: SharedString,
	intervalCollection: ISequenceIntervalCollection,
	expected: readonly { start: number; end: number }[],
	validateOverlapping: boolean = true,
) => {
	const actual = Array.from(intervalCollection);
	if (validateOverlapping && sharedString.getLength() > 0) {
		const overlapping = intervalCollection.findOverlappingIntervals(
			0,
			sharedString.getLength() - 1,
		);
		assert.deepEqual(actual, overlapping, "Interval search returned inconsistent results");
	}
	assert.strictEqual(
		actual.length,
		expected.length,
		`findOverlappingIntervals() must return the expected number of intervals`,
	);

	const actualPos = actual.map((interval) => {
		assert(interval);
		const start = sharedString.localReferencePositionToPosition(interval.start);
		const end = sharedString.localReferencePositionToPosition(interval.end);
		return { start, end };
	});
	assert.deepEqual(actualPos, expected, "intervals are not as expected");
};

describeCompat.only(
	"IntervalCollection with stashed ops",
	"NoCompat",
	(getTestObjectProvider, apis) => {
		const { SharedString } = apis.dds;

		const registry: ChannelFactoryRegistry = [[stringId, SharedString.getFactory()]];
		const configProvider = (settings: Record<string, ConfigTypes>): IConfigProviderBase => ({
			getRawConfig: (name: string): ConfigTypes => settings[name],
		});

		const testContainerConfig: ITestContainerConfig = {
			fluidDataObjectType: DataObjectFactoryType.Test,
			registry,
			runtimeOptions: {
				summaryOptions: {
					summaryConfigOverrides: {
						...DefaultSummaryConfiguration,
						...{
							maxTime: 5000 * 12,
							maxAckWaitTime: 120000,
							maxOps: 1,
							initialSummarizerDelayMs: 20,
						},
					},
				},
				enableRuntimeIdCompressor: "on",
			},
			loaderProps: {
				configProvider: configProvider({
					"Fluid.Container.enableOfflineLoad": true,
					"Fluid.Sequence.intervalStickinessEnabled": true,
				}),
			},
		};

		let provider: ITestObjectProvider;
		let container1: IContainerExperimental;
		let sharedString1: SharedString;
		let sharedString2: SharedString;
		let dataObject1: ITestFluidObject;
		let dataObject2: ITestFluidObject;
		let collection1: ISequenceIntervalCollection;
		let collection2: ISequenceIntervalCollection;
		let loader: IHostLoader;
		let url;

		it("doesn't resend successful op", async () => {
			provider = getTestObjectProvider();
			container1 = await provider.makeTestContainer(testContainerConfig);
			dataObject1 = await getContainerEntryPointBackCompat<ITestFluidObject>(container1);
			sharedString1 = await dataObject1.getSharedObject<SharedString>(stringId);
			sharedString1.insertText(0, "hello world");
			collection1 = sharedString1.getIntervalCollection(collectionId);
			loader = provider.makeTestLoader(testContainerConfig);
			url = await container1.getAbsoluteUrl("");

			// add an interval
			const id = collection1.add({ start: 4, end: 7 }).getIntervalId();

			// pending ops stuff from e2e tests - make a new container, pause op processing,
			// make a change, close the container, then resume op processing and reload container
			const container: IContainerExperimental =
				await provider.loadTestContainer(testContainerConfig);
			await waitForContainerConnection(container);
			const dataStore = (await container.getEntryPoint()) as ITestFluidObject;

			[...Array(30).keys()].map((i) =>
				dataStore.root.set(`make sure csn is > 1 so it doesn't hide bugs ${i}`, i),
			);

			await provider.ensureSynchronized();
			await provider.opProcessingController.pauseProcessing(container);
			const deltaManagerFull = toIDeltaManagerFull(
				toDeltaManagerInternal(dataStore.runtime.deltaManager),
			);
			assert(deltaManagerFull.outbound.paused);

			// the "callback" portion of the original e2e test
			const sharedString = await dataStore.getSharedObject<SharedString>(stringId);
			const collection = sharedString.getIntervalCollection(collectionId);
			collection.change(id, { start: 3, end: 8 });

			const pendingState: string | undefined =
				await container.closeAndGetPendingLocalState?.();
			provider.opProcessingController.resumeProcessing();
			assert.ok(pendingState);

			container1 = await provider.loadTestContainer(testContainerConfig);
			await waitForContainerConnection(container1);
			dataObject1 = await getContainerEntryPointBackCompat<ITestFluidObject>(container1);
			sharedString1 = await dataObject1.getSharedObject<SharedString>(stringId);
			collection1 = sharedString1.getIntervalCollection(collectionId);
			await provider.ensureSynchronized();
			assertIntervals(sharedString1, collection1, [{ start: 4, end: 7 }]);

			let container2 = await loader.resolve({ url }, pendingState);
			await waitForContainerConnection(container1);
			dataObject2 = await getContainerEntryPointBackCompat<ITestFluidObject>(container2);
			sharedString2 = await dataObject2.getSharedObject<SharedString>(stringId);
			collection2 = sharedString2.getIntervalCollection(collectionId);
			await provider.ensureSynchronized();
			assertIntervals(sharedString2, collection2, [{ start: 3, end: 8 }]);

			collection1.change(id, { start: 2, end: 9 });
			await provider.ensureSynchronized();

			// reload the container and verify that the above change takes effect
			container2 = await provider.loadTestContainer(testContainerConfig);
			dataObject2 = await getContainerEntryPointBackCompat<ITestFluidObject>(container2);
			sharedString2 = await dataObject2.getSharedObject<SharedString>(stringId);
			collection2 = sharedString2.getIntervalCollection(collectionId);

			await waitForContainerConnection(container2);
			await provider.ensureSynchronized();

			assertIntervals(sharedString1, collection1, [{ start: 2, end: 9 }]);
			assertIntervals(sharedString2, collection2, [{ start: 2, end: 9 }]);
		});

		it("verify interval positions when loaded from snapshot", async () => {
			const { ContainerRuntimeFactoryWithDefaultDataStore } = apis.containerRuntime;
			const defaultFactory = new TestFluidObjectFactory([
				[stringId, SharedString.getFactory()],
			]);

			const runtimeFactory = new ContainerRuntimeFactoryWithDefaultDataStore({
				defaultFactory,
				registryEntries: [[defaultFactory.type, Promise.resolve(defaultFactory)]],
			});

			const testContainer = await provider.createDetachedContainer(runtimeFactory, {
				...testContainerConfig.loaderProps,
				urlResolver: provider.urlResolver,
			});
			const dataObject =
				await getContainerEntryPointBackCompat<ITestFluidObject>(testContainer);
			const sharedString = await dataObject.getSharedObject<SharedString>(stringId);
			sharedString.insertText(0, "Interval test!");
			const collection = sharedString.getIntervalCollection(collectionId);
			// both start and end are at 0, side.before
			const testInterval = collection.add({ start: "start", end: "start" });
			const id = testInterval.getIntervalId();

			// verify positions in detached state
			assertIntervals(sharedString, collection, [{ start: 0, end: 0 }], false);
			assert.strictEqual(testInterval.startSide, Side.Before);
			assert.strictEqual(testInterval.endSide, Side.Before);
			assert.strictEqual(testInterval.start.getSegment()?.type, "StartOfTreeSegment");
			assert.strictEqual(testInterval.end.getSegment()?.type, "StartOfTreeSegment");

			// serialize the initial container and attach
			const snapshot = testContainer.serialize();
			const request = provider.driver.createCreateNewRequest("testDoc");
			await testContainer.attach(request);

			// verify positions in detached state
			assertIntervals(sharedString, collection, [{ start: 0, end: 0 }], false);
			assert.strictEqual(testInterval.startSide, Side.Before);
			assert.strictEqual(testInterval.endSide, Side.Before);
			assert.strictEqual(testInterval.start.getSegment()?.type, "StartOfTreeSegment");
			assert.strictEqual(testInterval.end.getSegment()?.type, "StartOfTreeSegment");

			// create a loader with the same runtime factory as the first container
			const loader2 = provider.createLoader([[provider.defaultCodeDetails, runtimeFactory]], {
				...testContainerConfig.loaderProps,
				urlResolver: provider.urlResolver,
			});

			// load second container from first's snapshot
			const testContainer2 = await loader2.rehydrateDetachedContainerFromSnapshot(snapshot);
			await testContainer2.attach(request);

			await provider.ensureSynchronized();

			const testDataObject2 =
				await getContainerEntryPointBackCompat<ITestFluidObject>(testContainer2);
			const testSharedString2 = await testDataObject2.getSharedObject<SharedString>(stringId);
			const testCollection2 = testSharedString2.getIntervalCollection(collectionId);
			const testInterval2 = testCollection2.getIntervalById(id);

			// verify positions in second container
			assert(testInterval2 !== undefined);
			assertIntervals(testSharedString2, testCollection2, [{ start: 0, end: 0 }], false);
			assert.strictEqual(testInterval2.startSide, Side.Before);
			assert.strictEqual(testInterval2.endSide, Side.Before);
			assert.strictEqual(testInterval2.start.getSegment()?.type, "StartOfTreeSegment");
			assert.strictEqual(testInterval2.end.getSegment()?.type, "StartOfTreeSegment");
		});
	},
);

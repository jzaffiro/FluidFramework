/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from "path";
import { existsSync, mkdirSync, readFileSync } from "fs";
import {
    generatorFromArray,
    take,
} from "@fluid-internal/stochastic-test-utils";
import {
    LoggingInfo,
    Operation,
    runTests,
    makeOperationGenerator,
// eslint-disable-next-line import/no-internal-modules
} from "@fluidframework/sequence/dist/test/intervalCollectionFuzz";

const testCount = process.env.TEST_COUNT ?? 10;

console.log(JSON.stringify(process.env));
const directory = path.join(__dirname, "../../src/test/results");

function getPath(seed: number): string {
    return path.join(directory, `${seed}.json`);
}

describe("IntervalCollection fuzz testing", () => {
    before(() => {
        if (!existsSync(directory)) {
            mkdirSync(directory);
        }
    });

    function replayTestFromFailureFile(seed: number, loggingInfo?: LoggingInfo) {
        const filepath = getPath(seed);
        let operations: Operation[];
        try {
            operations = JSON.parse(readFileSync(filepath).toString());
        } catch (err: any) {
            // Mocha executes skipped suite creation blocks, but whoever's running this suite only cares if
            // the containing block isn't skipped. Report the original error to them from inside a test.
            if (err.message.includes("ENOENT")) {
                it(`with default config, seed ${seed}`, () => {
                    throw err;
                });
                return;
            }
            throw err;
        }

        const generator = generatorFromArray(operations);
        runTests(seed, generator, undefined, loggingInfo);
    }

    for (let i = 0; i < testCount; i++) {
        const generator = take(100, makeOperationGenerator({ validateInterval: 10 }));
        runTests(i, generator, { saveOnFailure: true, filepath: getPath(i) });
    }

    // Change this seed and unskip the block to replay the actions from JSON on disk.
    // This can be useful for quickly minimizing failure json while attempting to root-cause a failure.
    describe.skip("replay specific seed", () => {
        const seedToReplay = 0;
        replayTestFromFailureFile(
            seedToReplay,
            // The following line can be uncommented for useful logging output which tracks the provided
            // intervalId over time.
            // { intervalId: "", clientIds: ["A", "B", "C"] },
        );
    });
});

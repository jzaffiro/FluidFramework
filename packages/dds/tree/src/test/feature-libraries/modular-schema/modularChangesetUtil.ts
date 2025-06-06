/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import type {
	FieldKey,
	FieldKindIdentifier,
	RevisionInfo,
	RevisionMetadataSource,
} from "../../../core/index.js";
import type {
	CrossFieldManager,
	FieldChangeHandler,
	FieldChangeMap,
	ModularChangeFamily,
	ModularChangeset,
	NodeId,
} from "../../../feature-libraries/index.js";
import {
	newCrossFieldKeyTable,
	type ChangeAtomIdBTree,
	type CrossFieldKeyTable,
	type FieldChange,
	type FieldId,
	type NodeChangeset,
	// eslint-disable-next-line import/no-internal-modules
} from "../../../feature-libraries/modular-schema/modularChangeTypes.js";
import {
	type IdAllocator,
	type Mutable,
	brand,
	idAllocatorFromMaxId,
	newTupleBTree,
} from "../../../util/index.js";
import {
	getChangeHandler,
	getParentFieldId,
	normalizeFieldId,
	// eslint-disable-next-line import/no-internal-modules
} from "../../../feature-libraries/modular-schema/modularChangeFamily.js";
import { strict as assert } from "node:assert";
import { assertStructuralEquality } from "../../objMerge.js";
import { BTree } from "@tylerbu/sorted-btree-es6";

export const Change = {
	build,
	node,
	nodeWithId,
	field: newField,
	empty,
};

export interface FieldChangesetDescription {
	readonly fieldKey: FieldKey;
	readonly kind: FieldKindIdentifier;
	readonly changeset: unknown;
	readonly children: NodeChangesetDescription[];
}

export interface NodeChangesetDescription {
	readonly id?: NodeId;
	readonly index: number;
	readonly fields: FieldChangesetDescription[];
}

export function assertEqual<T>(actual: T, expected: T): void {
	assertStructuralEquality(actual, expected, (item) =>
		item instanceof BTree ? item.toArray() : item,
	);
}

function empty(): ModularChangeset {
	return {
		fieldChanges: new Map(),
		nodeChanges: newTupleBTree(),
		nodeToParent: newTupleBTree(),
		nodeAliases: newTupleBTree(),
		crossFieldKeys: newCrossFieldKeyTable(),
	};
}

function node(
	index: number,
	...fields: FieldChangesetDescription[]
): NodeChangesetDescription {
	return { index, fields };
}

function nodeWithId(
	index: number,
	id: NodeId,
	...fields: FieldChangesetDescription[]
): NodeChangesetDescription {
	return { id, index, fields };
}

function newField(
	fieldKey: FieldKey,
	kind: FieldKindIdentifier,
	changeset: unknown,
	...children: NodeChangesetDescription[]
): FieldChangesetDescription {
	return { fieldKey, kind, changeset, children };
}

interface BuildArgs {
	family: ModularChangeFamily;
	maxId?: number;
	revisions?: RevisionInfo[];
}

function build(args: BuildArgs, ...fields: FieldChangesetDescription[]): ModularChangeset {
	const nodeChanges: ChangeAtomIdBTree<NodeChangeset> = newTupleBTree();
	const nodeToParent: ChangeAtomIdBTree<FieldId> = newTupleBTree();
	const crossFieldKeys: CrossFieldKeyTable = newCrossFieldKeyTable();

	const idAllocator = idAllocatorFromMaxId();
	const fieldChanges = fieldChangeMapFromDescription(
		args.family,
		fields,
		undefined,
		nodeChanges,
		nodeToParent,
		crossFieldKeys,
		idAllocator,
	);

	assert(args.maxId === undefined || args.maxId >= idAllocator.getMaxId());
	const result: Mutable<ModularChangeset> = {
		nodeChanges,
		fieldChanges,
		nodeToParent,
		crossFieldKeys,
		nodeAliases: newTupleBTree(),
		maxId: brand(args.maxId ?? idAllocator.getMaxId()),
	};

	if (args.revisions !== undefined) {
		result.revisions = args.revisions;
	}

	return result;
}

function fieldChangeMapFromDescription(
	family: ModularChangeFamily,
	fields: FieldChangesetDescription[],
	parent: NodeId | undefined,
	nodes: ChangeAtomIdBTree<NodeChangeset>,
	nodeToParent: ChangeAtomIdBTree<FieldId>,
	crossFieldKeys: CrossFieldKeyTable,
	idAllocator: IdAllocator,
): FieldChangeMap {
	const map: FieldChangeMap = new Map();
	for (const field of fields) {
		const changeHandler = getChangeHandler(family.fieldKinds, field.kind);
		const fieldId: FieldId = {
			nodeId: parent,
			field: field.fieldKey,
		};

		const fieldChangeset = field.children.reduce(
			(change: unknown, nodeDescription: NodeChangesetDescription) =>
				addNodeToField(
					family,
					change,
					nodeDescription,
					fieldId,
					changeHandler,
					nodes,
					nodeToParent,
					crossFieldKeys,
					idAllocator,
				),

			field.changeset,
		);

		for (const { key, count } of changeHandler.getCrossFieldKeys(fieldChangeset)) {
			crossFieldKeys.set(key, count, fieldId);
		}

		const fieldChange: FieldChange = {
			fieldKind: field.kind,
			change: brand(fieldChangeset),
		};
		map.set(field.fieldKey, fieldChange);
	}

	return map;
}

function addNodeToField(
	family: ModularChangeFamily,
	fieldChangeset: unknown,
	nodeDescription: NodeChangesetDescription,
	parentId: FieldId,
	changeHandler: FieldChangeHandler<unknown>,
	nodes: ChangeAtomIdBTree<NodeChangeset>,
	nodeToParent: ChangeAtomIdBTree<FieldId>,
	crossFieldKeys: CrossFieldKeyTable,
	idAllocator: IdAllocator,
): unknown {
	const nodeId: NodeId = nodeDescription.id ?? {
		localId: brand(idAllocator.allocate()),
	};

	const nodeChangeset: NodeChangeset = {
		fieldChanges: fieldChangeMapFromDescription(
			family,
			nodeDescription.fields,
			nodeId,
			nodes,
			nodeToParent,
			crossFieldKeys,
			idAllocator,
		),
	};

	nodes.set([nodeId.revision, nodeId.localId], nodeChangeset);
	nodeToParent.set([nodeId.revision, nodeId.localId], parentId);

	const fieldWithChange = changeHandler.editor.buildChildChanges([
		[nodeDescription.index, nodeId],
	]);

	return changeHandler.rebaser.compose(
		fieldWithChange,
		fieldChangeset,
		(node1, node2) => node1 ?? node2 ?? assert.fail("Should not compose two undefined nodes"),
		idAllocator,
		dummyCrossFieldManager,
		dummyRevisionMetadata,
	);
}

const dummyCrossFieldManager: CrossFieldManager = {
	get: (_target, revision, id, count, _addDependency) => ({
		value: undefined,
		start: { revision, localId: id },
		length: count,
	}),
	set: () => assert.fail("Not supported"),
	onMoveIn: () => assert.fail("Not supported"),
	moveKey: () => assert.fail("Not supported"),
};

const dummyRevisionMetadata: RevisionMetadataSource = {
	getIndex: () => assert.fail("Not supported"),
	tryGetInfo: () => assert.fail("Not supported"),
	hasRollback: () => assert.fail("Not supported"),
};

export function removeAliases(changeset: ModularChangeset): ModularChangeset {
	const updatedNodeToParent = changeset.nodeToParent.mapValues((_field, [revision, localId]) =>
		getParentFieldId(changeset, { revision, localId }),
	);

	const updatedCrossFieldKeys: CrossFieldKeyTable = newCrossFieldKeyTable();
	for (const entry of changeset.crossFieldKeys.entries()) {
		updatedCrossFieldKeys.set(
			entry.start,
			entry.length,
			normalizeFieldId(entry.value, changeset.nodeAliases),
		);
	}

	return {
		...changeset,
		nodeToParent: brand(updatedNodeToParent),
		crossFieldKeys: updatedCrossFieldKeys,
		nodeAliases: newTupleBTree(),
	};
}

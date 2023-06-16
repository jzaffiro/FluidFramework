/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { FieldKey, FieldKindIdentifier, RevisionTag, Value } from "../../core";
import { Brand } from "../../util";

/**
 * An ID which is unique within a revision of a `ModularChangeset`.
 * A `ModularChangeset` which is a composition of multiple revisions may contain duplicate `ChangesetLocalId`s,
 * but they are unique when qualified by the revision of the change they are used in.
 * @alpha
 */
export type ChangesetLocalId = Brand<number, "ChangesetLocalId">;

/**
 * @alpha
 */
export interface RevisionInfo {
	readonly revision: RevisionTag;
	/**
	 * When populated, indicates that the changeset is a rollback for the purpose of a rebase sandwich.
	 * The value corresponds to the `revision` of the original changeset being rolled back.
	 */
	readonly rollbackOf?: RevisionTag;
}

/**
 * @alpha
 */
export interface ModularChangeset extends HasFieldChanges {
	/**
	 * The numerically highest `ChangesetLocalId` used in this changeset.
	 * If undefined then this changeset contains no IDs.
	 */
	maxId?: ChangesetLocalId;
	/**
	 * The revisions included in this changeset, ordered temporally (oldest to newest).
	 * Undefined for anonymous changesets.
	 * Should never be empty.
	 */
	readonly revisions?: readonly RevisionInfo[];
	fieldChanges: FieldChangeMap;
	constraintViolationCount?: number;
}

/**
 * @alpha
 */
export interface NodeExistsConstraint {
	violated: boolean;
}

/**
 * Changeset for a subtree rooted at a specific node.
 * @alpha
 */
export interface NodeChangeset extends HasFieldChanges {
	valueChange?: ValueChange;
	valueConstraint?: ValueConstraint;
	nodeExistsConstraint?: NodeExistsConstraint;
}

/**
 * @alpha
 */
export interface ValueConstraint {
	value: Value;
	violated: boolean;
}

/**
 * @alpha
 */
export interface ValueChange {
	/**
	 * The revision in which this change occurred.
	 * Undefined when it can be inferred from context.
	 */
	revision?: RevisionTag;

	/**
	 * Can be left unset to represent the value being cleared.
	 */
	value?: Value;
}

/**
 * @alpha
 */
export interface HasFieldChanges {
	fieldChanges?: FieldChangeMap;
}

/**
 * @alpha
 */
export type FieldChangeMap = Map<FieldKey, FieldChange>;

/**
 * @alpha
 */
export interface FieldChange {
	fieldKind: FieldKindIdentifier;

	/**
	 * If defined, `change` is part of the specified revision.
	 * Undefined in the following cases:
	 * A) A revision is specified on an ancestor of this `FieldChange`, in which case `change` is part of that revision.
	 * B) `change` is composed of multiple revisions.
	 * C) `change` is part of an anonymous revision.
	 */
	revision?: RevisionTag;
	change: FieldChangeset;
}

/**
 * @alpha
 */
export type FieldChangeset = Brand<unknown, "FieldChangeset">;
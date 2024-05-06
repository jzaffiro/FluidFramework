/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

import { AzureMember, IAzureAudience } from "@fluidframework/azure-client";
import type { ConfigTypes, IConfigProviderBase } from "@fluidframework/core-interfaces";
import { IMember } from "@fluidframework/fluid-static";
import { ISharedMap, IValueChanged } from "@fluidframework/map/internal";

export const waitForMember = async (audience: IAzureAudience, id: string): Promise<AzureMember> => {
	const allMembers = audience.getMembers();
	const member = allMembers.get(id);
	if (member !== undefined) {
		return member;
	}
	return new Promise((resolve) => {
		const handler = (clientId: string, newMember: IMember): void => {
			if (newMember.id === id) {
				resolve(newMember as AzureMember);
			}
		};
		audience.on("memberAdded", handler);
	});
};

export const mapWait = async <T>(map: ISharedMap, key: string): Promise<T> => {
	const maybeValue = map.get<T>(key);
	if (maybeValue !== undefined) {
		return maybeValue;
	}

	return new Promise((resolve) => {
		const handler = (changed: IValueChanged): void => {
			if (changed.key === key) {
				map.off("valueChanged", handler);
				const value = map.get<T>(changed.key);
				if (value === undefined) {
					throw new Error("Unexpected valueChanged result");
				}
				resolve(value);
			}
		};
		map.on("valueChanged", handler);
	});
};

export const configProvider = (settings: Record<string, ConfigTypes>): IConfigProviderBase => ({
	getRawConfig: (name: string): ConfigTypes => settings[name],
});
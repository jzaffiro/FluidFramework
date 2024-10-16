/*!
 * Copyright (c) Microsoft Corporation and contributors. All rights reserved.
 * Licensed under the MIT License.
 */

/*
 * THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.
 * Generated by flub generate:typetests in @fluid-tools/build-cli.
 */

import type { TypeOnly, MinimalType, FullType, requireAssignableTo } from "@fluidframework/build-tools";
import type * as old from "@fluidframework/map-previous/internal";

import type * as current from "../../index.js";

declare type MakeUnusedImportErrorsGoAway<T> = TypeOnly<T> | MinimalType<T> | FullType<T> | typeof old | typeof current | requireAssignableTo<true, true>;

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_DirectoryFactory": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_DirectoryFactory = requireAssignableTo<TypeOnly<current.DirectoryFactory>, TypeOnly<old.DirectoryFactory>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ICreateInfo": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_ICreateInfo = requireAssignableTo<TypeOnly<old.ICreateInfo>, TypeOnly<current.ICreateInfo>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ICreateInfo": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ICreateInfo = requireAssignableTo<TypeOnly<current.ICreateInfo>, TypeOnly<old.ICreateInfo>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectory": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IDirectory = requireAssignableTo<TypeOnly<old.IDirectory>, TypeOnly<current.IDirectory>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectory": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IDirectory = requireAssignableTo<TypeOnly<current.IDirectory>, TypeOnly<old.IDirectory>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryDataObject": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IDirectoryDataObject = requireAssignableTo<TypeOnly<old.IDirectoryDataObject>, TypeOnly<current.IDirectoryDataObject>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryDataObject": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IDirectoryDataObject = requireAssignableTo<TypeOnly<current.IDirectoryDataObject>, TypeOnly<old.IDirectoryDataObject>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryEvents": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IDirectoryEvents = requireAssignableTo<TypeOnly<old.IDirectoryEvents>, TypeOnly<current.IDirectoryEvents>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryEvents": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IDirectoryEvents = requireAssignableTo<TypeOnly<current.IDirectoryEvents>, TypeOnly<old.IDirectoryEvents>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryNewStorageFormat": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IDirectoryNewStorageFormat = requireAssignableTo<TypeOnly<old.IDirectoryNewStorageFormat>, TypeOnly<current.IDirectoryNewStorageFormat>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryNewStorageFormat": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IDirectoryNewStorageFormat = requireAssignableTo<TypeOnly<current.IDirectoryNewStorageFormat>, TypeOnly<old.IDirectoryNewStorageFormat>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryValueChanged": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_IDirectoryValueChanged = requireAssignableTo<TypeOnly<old.IDirectoryValueChanged>, TypeOnly<current.IDirectoryValueChanged>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IDirectoryValueChanged": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IDirectoryValueChanged = requireAssignableTo<TypeOnly<current.IDirectoryValueChanged>, TypeOnly<old.IDirectoryValueChanged>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISerializableValue": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_ISerializableValue = requireAssignableTo<TypeOnly<old.ISerializableValue>, TypeOnly<current.ISerializableValue>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISerializableValue": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ISerializableValue = requireAssignableTo<TypeOnly<current.ISerializableValue>, TypeOnly<old.ISerializableValue>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedDirectory": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_ISharedDirectory = requireAssignableTo<TypeOnly<old.ISharedDirectory>, TypeOnly<current.ISharedDirectory>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedDirectory": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ISharedDirectory = requireAssignableTo<TypeOnly<current.ISharedDirectory>, TypeOnly<old.ISharedDirectory>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedDirectoryEvents": {"forwardCompat": false}
 */
declare type old_as_current_for_InterfaceDeclaration_ISharedDirectoryEvents = requireAssignableTo<TypeOnly<old.ISharedDirectoryEvents>, TypeOnly<current.ISharedDirectoryEvents>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedDirectoryEvents": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ISharedDirectoryEvents = requireAssignableTo<TypeOnly<current.ISharedDirectoryEvents>, TypeOnly<old.ISharedDirectoryEvents>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedMap": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ISharedMap = requireAssignableTo<TypeOnly<current.ISharedMap>, TypeOnly<old.ISharedMap>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_ISharedMapEvents": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_ISharedMapEvents = requireAssignableTo<TypeOnly<current.ISharedMapEvents>, TypeOnly<old.ISharedMapEvents>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "InterfaceDeclaration_IValueChanged": {"backCompat": false}
 */
declare type current_as_old_for_InterfaceDeclaration_IValueChanged = requireAssignableTo<TypeOnly<current.IValueChanged>, TypeOnly<old.IValueChanged>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "ClassDeclaration_MapFactory": {"backCompat": false}
 */
declare type current_as_old_for_ClassDeclaration_MapFactory = requireAssignableTo<TypeOnly<current.MapFactory>, TypeOnly<old.MapFactory>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_SharedDirectory": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_SharedDirectory = requireAssignableTo<TypeOnly<typeof old.SharedDirectory>, TypeOnly<typeof current.SharedDirectory>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_SharedDirectory": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_SharedDirectory = requireAssignableTo<TypeOnly<typeof current.SharedDirectory>, TypeOnly<typeof old.SharedDirectory>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_SharedDirectory": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAliasDeclaration_SharedDirectory = requireAssignableTo<TypeOnly<old.SharedDirectory>, TypeOnly<current.SharedDirectory>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_SharedDirectory": {"backCompat": false}
 */
declare type current_as_old_for_TypeAliasDeclaration_SharedDirectory = requireAssignableTo<TypeOnly<current.SharedDirectory>, TypeOnly<old.SharedDirectory>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_SharedMap": {"forwardCompat": false}
 */
declare type old_as_current_for_VariableDeclaration_SharedMap = requireAssignableTo<TypeOnly<typeof old.SharedMap>, TypeOnly<typeof current.SharedMap>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "VariableDeclaration_SharedMap": {"backCompat": false}
 */
declare type current_as_old_for_VariableDeclaration_SharedMap = requireAssignableTo<TypeOnly<typeof current.SharedMap>, TypeOnly<typeof old.SharedMap>>

/*
 * Validate forward compatibility by using the old type in place of the current type.
 * If this test starts failing, it indicates a change that is not forward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_SharedMap": {"forwardCompat": false}
 */
declare type old_as_current_for_TypeAliasDeclaration_SharedMap = requireAssignableTo<TypeOnly<old.SharedMap>, TypeOnly<current.SharedMap>>

/*
 * Validate backward compatibility by using the current type in place of the old type.
 * If this test starts failing, it indicates a change that is not backward compatible.
 * To acknowledge the breaking change, add the following to package.json under
 * typeValidation.broken:
 * "TypeAliasDeclaration_SharedMap": {"backCompat": false}
 */
declare type current_as_old_for_TypeAliasDeclaration_SharedMap = requireAssignableTo<TypeOnly<current.SharedMap>, TypeOnly<old.SharedMap>>

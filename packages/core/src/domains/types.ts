/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Client, ClientEventContext } from './client';
import type { ClientScope, ClientScopeEventContext } from './client-scope';
import type { DomainEventName, DomainType } from './contstants';
import type { IdentityProvider, IdentityProviderEventContext } from './identity-provider';
import type { IdentityProviderAccount, IdentityProviderAccountEventContext } from './identity-provider-account';
import type { IdentityProviderAttribute, IdentityProviderAttributeEventContext } from './identity-provider-attribute';
import type { IdentityProviderRole, IdentityProviderRoleEventContext } from './identity-provider-role';
import type { Permission, PermissionEventContext } from './permission';
import type { Realm, RealmEventContext } from './realm';
import type { Robot, RobotEventContext } from './robot';
import type { RobotPermission, RobotPermissionEventContext } from './robot-permission';
import type { RobotRole, RobotRoleEventContext } from './robot-role';
import type { Role, RoleEventContext } from './role';
import type { RoleAttribute, RoleAttributeEventContext } from './role-attribute';
import type { RolePermission, RolePermissionEventContext } from './role-permission';
import type { Scope, ScopeEventContext } from './scope';
import type { User, UserEventContext } from './user';
import type { UserAttribute, UserAttributeEventContext } from './user-attribute';
import type { UserPermission, UserPermissionEventContext } from './user-permission';
import type { UserRole, UserRoleEventContext } from './user-role';

export type DomainEventContext = ClientEventContext |
ClientScopeEventContext |
IdentityProviderEventContext |
IdentityProviderAccountEventContext |
IdentityProviderAttributeEventContext |
IdentityProviderRoleEventContext |
PermissionEventContext |
RealmEventContext |
RobotEventContext |
RobotPermissionEventContext |
RobotRoleEventContext |
RoleEventContext |
RoleAttributeEventContext |
RolePermissionEventContext |
ScopeEventContext |
UserEventContext |
UserAttributeEventContext |
UserPermissionEventContext |
UserRoleEventContext;

export type DomainEntity<T extends `${DomainType}`> = T extends `${DomainType.CLIENT}` ?
    Client :
    T extends `${DomainType.CLIENT_SCOPE}` ?
        ClientScope :
        T extends `${DomainType.IDENTITY_PROVIDER}` ?
            IdentityProvider :
            T extends `${DomainType.IDENTITY_PROVIDER_ACCOUNT}` ?
                IdentityProviderAccount :
                T extends `${DomainType.IDENTITY_PROVIDER_ATTRIBUTE}` ?
                    IdentityProviderAttribute :
                    T extends `${DomainType.IDENTITY_PROVIDER_ROLE}` ?
                        IdentityProviderRole :
                        T extends `${DomainType.PERMISSION}` ?
                            Permission :
                            T extends `${DomainType.REALM}` ?
                                Realm :
                                T extends `${DomainType.ROBOT}` ?
                                    Robot :
                                    T extends `${DomainType.ROBOT_PERMISSION}` ?
                                        RobotPermission :
                                        T extends `${DomainType.ROBOT_ROLE}` ?
                                            RobotRole :
                                            T extends `${DomainType.ROLE}` ?
                                                Role :
                                                T extends `${DomainType.ROLE_ATTRIBUTE}` ?
                                                    RoleAttribute :
                                                    T extends `${DomainType.ROLE_PERMISSION}` ?
                                                        RolePermission :
                                                        T extends `${DomainType.SCOPE}` ?
                                                            Scope :
                                                            T extends `${DomainType.USER}` ?
                                                                User :
                                                                T extends `${DomainType.USER_ATTRIBUTE}` ?
                                                                    UserAttribute :
                                                                    T extends `${DomainType.USER_PERMISSION}` ?
                                                                        UserPermission :
                                                                        T extends `${DomainType.USER_ROLE}` ?
                                                                            UserRole :
                                                                            never;

export type DomainEventFullName<T extends `${DomainType}` = `${DomainType}`> = `${T}${Capitalize<`${DomainEventName}`>}`;

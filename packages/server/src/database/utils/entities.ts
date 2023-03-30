/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { DataSourceOptions } from 'typeorm';
import {
    ClientEntity, ClientScopeEntity,
    IdentityProviderAccountEntity,
    IdentityProviderAttributeEntity,
    IdentityProviderEntity,
    IdentityProviderRoleEntity,
    KeyEntity,
    OAuth2AuthorizationCodeEntity,
    OAuth2RefreshTokenEntity,
    PermissionEntity,
    RealmEntity,
    RobotEntity,
    RobotPermissionEntity,
    RobotRoleEntity,
    RoleAttributeEntity,
    RoleEntity,
    RolePermissionEntity, ScopeEntity,
    UserAttributeEntity,
    UserEntity,
    UserPermissionEntity,
    UserRoleEntity,
} from '../../domains';

export function setEntitiesForDataSourceOptions<T extends DataSourceOptions>(options: T) : T {
    return {
        ...options,
        entities: [
            KeyEntity,

            OAuth2AuthorizationCodeEntity,
            OAuth2RefreshTokenEntity,

            ClientEntity,
            ClientScopeEntity,

            IdentityProviderEntity,
            IdentityProviderAttributeEntity,
            IdentityProviderAccountEntity,
            IdentityProviderRoleEntity,
            PermissionEntity,
            RealmEntity,
            RobotEntity,
            RobotPermissionEntity,
            RobotRoleEntity,
            RoleEntity,
            RoleAttributeEntity,
            RolePermissionEntity,
            ScopeEntity,
            UserEntity,
            UserAttributeEntity,
            UserPermissionEntity,
            UserRoleEntity,
            ...(options.entities ? options.entities : []) as string[],
        ],
    };
}

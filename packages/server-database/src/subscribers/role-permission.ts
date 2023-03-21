/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { RolePermission, SocketEventOperations } from '@authup/common';
import type { SocketEmitterEventDestination } from '@authup/server-common';
import { emitSocketEvent } from '@authup/server-common';
import { buildSocketEntityRoomName, buildSocketRealmNamespaceName } from '@authup/common';
import type {
    EntitySubscriberInterface, InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import {
    EventSubscriber,
} from 'typeorm';
import { buildKeyPath } from 'redis-extension';
import { RolePermissionEntity } from '../domains';
import { CachePrefix } from '../constants';

function publishEvent(
    operation: SocketEventOperations<'rolePermission'>,
    data: RolePermission,
) {
    const destinations : SocketEmitterEventDestination[] = [
        { roomNameFn: (id) => buildSocketEntityRoomName('rolePermission', id) },
    ];
    if (data.role_realm_id) {
        destinations.push({
            roomNameFn: (id) => buildSocketEntityRoomName('rolePermission', id),
            namespace: buildSocketRealmNamespaceName(data.role_realm_id),
        });
    }
    if (data.permission_realm_id) {
        destinations.push({
            roomNameFn: (id) => buildSocketEntityRoomName('rolePermission', id),
            namespace: buildSocketRealmNamespaceName(data.permission_realm_id),
        });
    }
    emitSocketEvent({
        destinations,
        operation,
        data,
    });
}

@EventSubscriber()
export class RolePermissionSubscriber implements EntitySubscriberInterface<RolePermissionEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listenTo(): Function | string {
        return RolePermissionEntity;
    }

    async afterInsert(event: InsertEvent<RolePermissionEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROLE_OWNED_PERMISSIONS,
                    id: event.entity.role_id,
                }),
            ]);
        }

        publishEvent('rolePermissionCreated', event.entity);
    }

    async afterUpdate(event: UpdateEvent<RolePermissionEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROLE_OWNED_PERMISSIONS,
                    id: event.entity.role_id,
                }),
            ]);
        }

        publishEvent('rolePermissionUpdated', event.entity as RolePermission);
    }

    async afterRemove(event: RemoveEvent<RolePermissionEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROLE_OWNED_PERMISSIONS,
                    id: event.entity.role_id,
                }),
            ]);
        }

        publishEvent('rolePermissionDeleted', event.entity);
    }
}

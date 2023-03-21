/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { RobotRole, SocketEventOperations } from '@authup/common';
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
import { RobotRoleEntity } from '../domains';
import { CachePrefix } from '../constants';

function publishEvent(
    operation: SocketEventOperations<'robotRole'>,
    data: RobotRole,
) {
    const destinations : SocketEmitterEventDestination[] = [
        { roomNameFn: (id) => buildSocketEntityRoomName('robotRole', id) },
    ];
    if (data.robot_realm_id) {
        destinations.push({
            roomNameFn: (id) => buildSocketEntityRoomName('robotRole', id),
            namespace: buildSocketRealmNamespaceName(data.robot_realm_id),
        });
    }
    if (data.role_realm_id) {
        destinations.push({
            roomNameFn: (id) => buildSocketEntityRoomName('robotRole', id),
            namespace: buildSocketRealmNamespaceName(data.role_realm_id),
        });
    }

    emitSocketEvent({
        destinations,
        operation,
        data,
    });
}

@EventSubscriber()
export class RobotRoleSubscriber implements EntitySubscriberInterface<RobotRoleEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listenTo(): Function | string {
        return RobotRoleEntity;
    }

    async afterInsert(event: InsertEvent<RobotRoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROBOT_OWNED_ROLES,
                    id: event.entity.robot_id,
                }),
            ]);
        }

        publishEvent('robotRoleCreated', event.entity);
    }

    async afterUpdate(event: UpdateEvent<RobotRoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROBOT_OWNED_ROLES,
                    id: event.entity.robot_id,
                }),
            ]);
        }

        publishEvent('robotRoleUpdated', event.entity as RobotRoleEntity);
    }

    async afterRemove(event: RemoveEvent<RobotRoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROBOT_OWNED_ROLES,
                    id: event.entity.robot_id,
                }),
            ]);
        }

        publishEvent('robotRoleDeleted', event.entity);
    }
}

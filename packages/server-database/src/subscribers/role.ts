/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Role, SocketEventOperations } from '@authup/common';
import { emitSocketEvent } from '@authup/server-common';
import { buildSocketEntityRoomName, buildSocketRealmNamespaceName } from '@authup/common';
import type {
    EntitySubscriberInterface,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import {
    EventSubscriber,
} from 'typeorm';
import { buildKeyPath } from 'redis-extension';
import { RobotEntity, RoleEntity } from '../domains';
import { CachePrefix } from '../constants';

function publishEvent(
    operation: SocketEventOperations<'role'>,
    data: Role,
) {
    emitSocketEvent({
        destinations: [
            {
                roomNameFn: (id) => buildSocketEntityRoomName('role', id),
                namespace: buildSocketRealmNamespaceName(data.realm_id),
            },
            {
                roomNameFn: (id) => buildSocketEntityRoomName('role', id),
            },
        ],
        operation,
        data,
    });
}

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface<RoleEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listenTo(): Function | string {
        return RoleEntity;
    }

    afterInsert(event: InsertEvent<RoleEntity>): Promise<any> | void {
        if (!event.entity) {
            return;
        }

        publishEvent('roleCreated', event.entity);
    }

    async afterUpdate(event: UpdateEvent<RoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROLE,
                    id: event.entity.id,
                }),
            ]);
        }

        publishEvent('roleUpdated', event.entity as RoleEntity);
    }

    async afterRemove(event: RemoveEvent<RoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildKeyPath({
                    prefix: CachePrefix.ROLE,
                    id: event.entity.id,
                }),
            ]);
        }

        publishEvent('roleDeleted', event.entity as RoleEntity);
    }
}

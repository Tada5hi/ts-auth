/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type {
    UserRole,
} from '@authup/core-kit';
import {
    DomainEventName, DomainType,
    buildDomainChannelName,
    buildDomainNamespaceName,
} from '@authup/core-kit';
import { DomainEventDestination, buildRedisKeyPath } from '@authup/server-kit';
import type {
    EntitySubscriberInterface, InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm';
import {
    EventSubscriber,
} from 'typeorm';
import { publishDomainEvent } from '../../core';
import { CachePrefix, UserRoleEntity } from '../../domains';

async function publishEvent(
    event: `${DomainEventName}`,
    data: UserRole,
) {
    const destinations : DomainEventDestination[] = [
        { channel: (id) => buildDomainChannelName(DomainType.USER_ROLE, id) },
    ];
    if (data.user_realm_id) {
        destinations.push({
            channel: (id) => buildDomainChannelName(DomainType.USER_ROLE, id),
            namespace: buildDomainNamespaceName(data.user_realm_id),
        });
    }
    if (data.role_realm_id) {
        destinations.push({
            channel: (id) => buildDomainChannelName(DomainType.USER_ROLE, id),
            namespace: buildDomainNamespaceName(data.role_realm_id),
        });
    }

    await publishDomainEvent({
        content: {
            type: DomainType.USER_ROLE,
            event,
            data,
        },
        destinations,
    });
}

@EventSubscriber()
export class UserRoleSubscriber implements EntitySubscriberInterface<UserRoleEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    listenTo(): Function | string {
        return UserRoleEntity;
    }

    async afterInsert(event: InsertEvent<UserRoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildRedisKeyPath({
                    prefix: CachePrefix.USER_OWNED_ROLES,
                    id: event.entity.user_id,
                }),
            ]);
        }

        await publishEvent(DomainEventName.CREATED, event.entity);
    }

    async afterUpdate(event: UpdateEvent<UserRoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildRedisKeyPath({
                    prefix: CachePrefix.USER_OWNED_ROLES,
                    id: event.entity.user_id,
                }),
            ]);
        }

        await publishEvent(DomainEventName.UPDATED, event.entity as UserRoleEntity);
    }

    async afterRemove(event: RemoveEvent<UserRoleEntity>): Promise<any> {
        if (!event.entity) {
            return;
        }

        if (event.connection.queryResultCache) {
            await event.connection.queryResultCache.remove([
                buildRedisKeyPath({
                    prefix: CachePrefix.USER_OWNED_ROLES,
                    id: event.entity.user_id,
                }),
            ]);
        }

        await publishEvent(DomainEventName.DELETED, event.entity);
    }
}

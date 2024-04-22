/*
 * Copyright (c) 2023-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    DomainEventName,
    DomainEventSubscriptionName,
    REALM_MASTER_NAME,
    buildDomainChannelName,
    buildDomainEventFullName,
    buildDomainEventSubscriptionFullName,
} from '@authup/core-kit';
import type {
    DomainEntity,
    DomainEventContext,
    DomainEventSubscriptionFullName,
    DomainType,
} from '@authup/core-kit';
import type { STCEventContext } from '@authup/core-socket-kit';
import {
    computed, isRef, onMounted, onUnmounted, watch,
} from 'vue';
import { injectStore, storeToRefs } from '../store';
import type { EntitySocket, EntitySocketContext } from './type';
import { injectSocketClientManager, isSocketClientManagerInjected } from '../socket-client-manager';

type DT<T> = T extends DomainEntity<infer U> ? U extends `${DomainType}` ? U : never : never;

export function createEntitySocket<
    A extends DT<DomainEntity<any>>,
    T = DomainEntity<A>,
>(
    ctx: EntitySocketContext<A, T>,
) : EntitySocket {
    if (!isSocketClientManagerInjected()) {
        return {
            mount() {

            },
            unmount() {

            },
        };
    }

    const store = injectStore();
    const storeRefs = storeToRefs(store);

    const realmId = computed(() => {
        if (storeRefs.realmName.value === REALM_MASTER_NAME) {
            return undefined;
        }

        if (isRef(ctx.realmId)) {
            return ctx.realmId.value;
        }

        if (ctx.realmId) {
            return ctx.realmId;
        }

        return storeRefs.realmId.value;
    });

    const targetId = computed(() => (isRef(ctx.targetId) ? ctx.targetId.value : ctx.targetId));

    const lockId = computed(() => (isRef(ctx.lockId) ? ctx.lockId.value : ctx.lockId));

    const processEvent = (event: STCEventContext<DomainEventContext<A>>) : boolean => {
        if (
            ctx.processEvent &&
            !ctx.processEvent(event, realmId.value)
        ) {
            return false;
        }

        const channelName = ctx.buildChannelName ?
            ctx.buildChannelName(targetId.value) :
            buildDomainChannelName(ctx.type, targetId.value);

        if (event.meta.roomName !== channelName) {
            return false;
        }

        if (ctx.target && (!targetId.value || targetId.value !== event.data.id)) {
            return false;
        }

        return event.data.id !== lockId.value;
    };

    const handleCreated = (event: STCEventContext<DomainEventContext<A>>) => {
        if (!processEvent(event)) {
            return;
        }

        if (ctx.onCreated) {
            ctx.onCreated(event.data as T);
        }
    };

    const handleUpdated = (event: STCEventContext<DomainEventContext<A>>) => {
        if (!processEvent(event)) {
            return;
        }

        if (ctx.onUpdated) {
            ctx.onUpdated(event.data as T);
        }
    };
    const handleDeleted = (event: STCEventContext<DomainEventContext<A>>) => {
        if (!processEvent(event)) {
            return;
        }

        if (ctx.onDeleted) {
            ctx.onDeleted(event.data as T);
        }
    };

    let mounted = false;
    const mount = async () => {
        if ((ctx.target && !targetId.value) || mounted) {
            return;
        }

        mounted = true;

        const socketManager = injectSocketClientManager();
        const socket = await socketManager.connect(`/resources#${realmId.value}`);

        let event : DomainEventSubscriptionFullName | undefined;
        if (ctx.buildSubscribeEventName) {
            event = ctx.buildSubscribeEventName();
        } else {
            event = buildDomainEventSubscriptionFullName(
                ctx.type as `${DomainType}`,
                DomainEventSubscriptionName.SUBSCRIBE,
            );
        }

        socket.emit(
            event,
            targetId.value,
        );

        if (ctx.onCreated) {
            socket.on(buildDomainEventFullName(
                ctx.type as `${DomainType}`,
                DomainEventName.CREATED,
            ), handleCreated);
        }

        if (ctx.onUpdated) {
            socket.on(buildDomainEventFullName(
                ctx.type as `${DomainType}`,
                DomainEventName.UPDATED,
            ), handleUpdated);
        }

        if (ctx.onDeleted) {
            socket.on(buildDomainEventFullName(
                ctx.type as `${DomainType}`,
                DomainEventName.DELETED,
            ), handleDeleted);
        }
    };

    const unmount = async () => {
        if ((ctx.target && !targetId.value) || !mounted) {
            return;
        }

        mounted = false;

        const socketManager = injectSocketClientManager();
        const socket = await socketManager.connect(`/resources#${realmId.value}`);

        let event : DomainEventSubscriptionFullName | undefined;
        if (ctx.buildUnsubscribeEventName) {
            event = ctx.buildUnsubscribeEventName();
        } else {
            event = buildDomainEventSubscriptionFullName(
                ctx.type as `${DomainType}`,
                DomainEventSubscriptionName.SUBSCRIBE,
            );
        }

        socket.emit(
            event,
            targetId.value,
        );

        if (ctx.onCreated) {
            socket.off(buildDomainEventFullName(
                ctx.type as `${DomainType}`,
                DomainEventName.UPDATED,
            ), handleCreated);
        }

        if (ctx.onUpdated) {
            socket.off(buildDomainEventFullName(
                ctx.type as `${DomainType}`,
                DomainEventName.UPDATED,
            ), handleUpdated);
        }

        if (ctx.onDeleted) {
            socket.off(buildDomainEventFullName(
                ctx.type as `${DomainType}`,
                DomainEventName.DELETED,
            ), handleDeleted);
        }
    };

    onMounted(() => mount());
    onUnmounted(() => unmount());

    watch(targetId, (val, oldValue) => {
        if (val !== oldValue) {
            unmount();
            mount();
        }
    });

    return {
        mount,
        unmount,
    };
}

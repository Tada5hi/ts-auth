/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DomainType } from '@authup/core-kit';
import type { PropType } from 'vue';
import { defineComponent } from 'vue';
import type { Policy } from '@authup/core-kit';
import type { ResourceManager } from '../../core';
import {
    createResourceManager,
    defineResourceVEmitOptions,
} from '../../core';

import {
    renderToggleButton,
} from '../utility';

export const APolicyParentAssignment = defineComponent({
    props: {
        entityId: {
            type: String,
            required: true,
        },
        entity: {
            type: Object as PropType<Policy>,
        },
        parentId: {
            type: String,
            required: true,
        },
    },
    emits: defineResourceVEmitOptions<Policy>(),
    async setup(props, setup) {
        const manager : ResourceManager<Policy> = createResourceManager({
            type: `${DomainType.POLICY}`,
            setup,
            socket: {
                processEvent(event) {
                    return event.data.id === props.id;
                },
            },
            props: {
                entity: props.entity,
                entityId: props.entityId,
            },
        });

        await manager.resolve({
            query: {
                filters: {
                    id: props.id,
                },
            },
        });

        return () => renderToggleButton({
            changed: (value) => {
                if (!manager.data.value) {
                    return;
                }

                if (value) {
                    manager.data.value.parent_id = props.parentId;
                } else {
                    manager.data.value.parent_id = null;
                    delete manager.data.value.parent;
                }

                manager.update(manager.data.value);
            },
            value: !!manager.data.value &&
                manager.data.value.parent_id === props.parentId,
            isBusy: manager.busy.value,
        });
    },
});

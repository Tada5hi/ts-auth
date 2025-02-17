/*
 * Copyright (c) 2025.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Policy } from '@authup/core-kit';
import { SlotName } from '@vuecs/list-controls';
import type { PropType } from 'vue';
import { defineComponent, h } from 'vue';
import type { ResourceCollectionVSlots } from '../../core';
import { defineResourceCollectionVProps } from '../../core';
import { APagination, ASearch, renderToggleButton } from '../utility';
import { APolicies } from './APolicies';
import { APolicyParentAssignment } from './APolicyParentAssignment';

export const APolicyChildrenPicker = defineComponent({
    props: {
        value: {
            type: Array as PropType<string[]>,
            default: () => [],
        },
        parentId: {
            type: String,
        },
        multiple: {
            type: Boolean,
            default: true,
        },
        ...defineResourceCollectionVProps<Policy>(),
    },
    emits: ['changed'],
    setup(props, { emit }) {
        return () => h(APolicies, props, {
            [SlotName.HEADER]: (slotProps: ResourceCollectionVSlots<Policy>['header']) => [
                h(ASearch, {
                    load: (payload: any) => {
                        if (slotProps.load) {
                            return slotProps.load(payload);
                        }

                        return undefined;
                    },
                    busy: slotProps.busy,
                }),
            ],
            [SlotName.FOOTER]: (slotProps: ResourceCollectionVSlots<Policy>['footer']) => [
                h(APagination, {
                    load: (payload: any) => {
                        if (slotProps.load) {
                            return slotProps.load(payload);
                        }

                        return undefined;
                    },
                    busy: slotProps.busy,
                    meta: slotProps.meta,
                }),
            ],
            [SlotName.ITEM_ACTIONS]: (
                slotProps: ResourceCollectionVSlots<Policy>['itemActions'],
            ) => {
                if (props.parentId) {
                    return h(APolicyParentAssignment, {
                        entity: slotProps.data,
                        entityId: slotProps.data.id,
                        parentId: props.parentId,
                    });
                } if (props.value) {
                    return renderToggleButton({
                        value: props.value.indexOf(slotProps.data.id) !== -1,
                        isBusy: slotProps.busy,
                        changed(value) {
                            const index = props.value!.indexOf(slotProps.data.id);

                            if (value) {
                                if (index === -1) {
                                    props.value!.push(slotProps.data.id);
                                }
                            } else if (index !== -1) {
                                props.value!.splice(index, 1);
                            }

                            emit('changed', props.value);
                        },
                    });
                }

                return [];
            },
        });
    },
});

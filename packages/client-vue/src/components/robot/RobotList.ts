/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DomainType } from '@authup/core';
import type { SlotsType } from 'vue';
import { defineComponent } from 'vue';
import type { Robot } from '@authup/core';
import type { EntityListSlotsType } from '../../core/entity-list';
import { createEntityList, defineDomainListEvents, defineDomainListProps } from '../../core/entity-list';

export const RobotList = defineComponent({
    name: 'RobotList',
    props: defineDomainListProps<Robot>(),
    slots: Object as SlotsType<EntityListSlotsType<Robot>>,
    emits: defineDomainListEvents<Robot>(),
    setup(props, ctx) {
        const { render, setDefaults } = createEntityList(`${DomainType.ROBOT}`, {
            props,
            setup: ctx,
        });

        setDefaults({
            footerPagination: true,

            headerSearch: true,
            headerTitle: {
                content: 'Robots',
                icon: 'fa fa-solid fa-robot',
            },

            noMore: {
                content: 'No more robots available...',
            },
        });

        return () => render();
    },
});

/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DomainType } from '@authup/core';
import type { SlotsType } from 'vue';
import { defineComponent, h } from 'vue';
import type { ClientScope } from '@authup/core';
import type { ListSlotsType } from '../../core';
import {
    createEntityList, defineListEvents, defineListProps,
} from '../../core';

export const ClientScopeList = defineComponent({
    props: defineListProps<ClientScope>(),
    slots: Object as SlotsType<ListSlotsType<ClientScope>>,
    emits: defineListEvents<ClientScope>(),
    setup(props, ctx) {
        const {
            render,
            setDefaults,
        } = createEntityList({
            type: `${DomainType.CLIENT_SCOPE}`,
            props,
            setup: ctx,
        });

        setDefaults({
            noMore: {
                content: 'No more client-scopes available...',
            },
        });

        return () => render();
    },
});

export default ClientScopeList;

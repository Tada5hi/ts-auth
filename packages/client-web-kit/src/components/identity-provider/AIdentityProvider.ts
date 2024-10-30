/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { DomainType } from '@authup/core-kit';
import type { IdentityProvider } from '@authup/core-kit';
import type { SlotsType } from 'vue';
import { defineComponent } from 'vue';
import type { ResourceManagerSlots } from '../../core';
import {
    createResourceManager,
    defineEntityManagerEvents,
    defineEntityManagerProps,
} from '../../core';

export const AIdentityProvider = defineComponent({
    props: defineEntityManagerProps<IdentityProvider>(),
    emits: defineEntityManagerEvents<IdentityProvider>(),
    slots: Object as SlotsType<ResourceManagerSlots<IdentityProvider>>,
    async setup(props, setup) {
        const manager = createResourceManager({
            type: `${DomainType.IDENTITY_PROVIDER}`,
            props,
            setup,
        });

        try {
            await manager.resolveOrFail();

            return () => manager.render();
        } catch (e) {
            return () => manager.renderError(e);
        }
    },
});

/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ResourceType } from '@authup/core-kit';
import type { SlotsType } from 'vue';
import { defineComponent } from 'vue';
import type { Robot } from '@authup/core-kit';
import type { ResourceCollectionVSlots } from '../../core';
import {
    TranslatorTranslationDefaultKey,
    TranslatorTranslationGroup, TranslatorTranslationVuecsKey, createResourceCollectionManager,
    defineResourceCollectionVEmitOptions, defineResourceCollectionVProps, useTranslation,
} from '../../core';

export const ARobots = defineComponent({
    props: defineResourceCollectionVProps<Robot>(),
    slots: Object as SlotsType<ResourceCollectionVSlots<Robot>>,
    emits: defineResourceCollectionVEmitOptions<Robot>(),
    setup(props, ctx) {
        const { render } = createResourceCollectionManager({
            type: `${ResourceType.ROBOT}`,
            props,
            setup: ctx,
        });

        const translationName = useTranslation({
            group: TranslatorTranslationGroup.VUECS,
            key: TranslatorTranslationDefaultKey.ROBOTS,
        });

        const translation = useTranslation({
            group: TranslatorTranslationGroup.VUECS,
            key: TranslatorTranslationVuecsKey.NO_MORE,
            data: {
                name: translationName,
            },
        });

        return () => render({
            noMore: {
                content: translation.value,
            },
        });
    },
});

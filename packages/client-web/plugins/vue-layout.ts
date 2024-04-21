/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import de from 'date-fns/locale/de';
import { watch } from 'vue';
import installAuthup, { injectTranslatorLocale } from '@authup/client-web-kit';
import type { APIClient } from '@authup/core-kit';
import type { StoreManagerOptions } from '@vuecs/core';
import bootstrap from '@vuecs/preset-bootstrap-v5';
import fontAwesome from '@vuecs/preset-font-awesome';

import installCountdown from '@vuecs/countdown';
import installFormControl from '@vuecs/form-controls';
import installNavigation from '@vuecs/navigation';
import installPagination from '@vuecs/pagination';
import installTimeago, { injectLocale as injectTimeagoLocale } from '@vuecs/timeago';
import { applyStoreManagerOptions, installStoreManager } from '@vuecs/form-controls/core';

import type { Pinia } from 'pinia';
import { storeToRefs } from 'pinia';
import { defineNuxtPlugin } from '#imports';
import { Navigation } from '../config/layout';
import { useAuthStore } from '../store/auth';

export default defineNuxtPlugin((ctx) => {
    const storeManagerOptions : StoreManagerOptions = {
        presets: {
            bootstrap,
            fontAwesome,
        },
        defaults: {
            list: {
                class: 'list',
            },
            listBody: {
                class: 'list-body',
            },
            listItem: {
                class: 'list-item',
            },
            pagination: {
                class: 'pagination',
                itemClass: 'page-item',
            },
        },
    };

    const storeManager = installStoreManager(ctx.vueApp);
    applyStoreManagerOptions(storeManager, storeManagerOptions);

    ctx.vueApp.use(installCountdown);
    ctx.vueApp.use(installFormControl);
    ctx.vueApp.use(installTimeago, {
        locales: {
            de,
        },
    });

    const store = useAuthStore(ctx.$pinia as Pinia);
    const { loggedIn } = storeToRefs(store);

    ctx.vueApp.use(installNavigation, {
        provider: new Navigation({
            isLoggedIn: () => loggedIn.value,
            hasPermission: (name) => store.has(name),
        }),
    });

    ctx.vueApp.use(installPagination);

    // preset missing ...
    ctx.vueApp.use(installAuthup, {
        apiClient: ctx.$api as APIClient,
        store,
        components: false,
    });

    const locale = injectTranslatorLocale();
    const timeagoLocale = injectTimeagoLocale();
    timeagoLocale.value = locale.value;
    watch(locale, (val) => {
        timeagoLocale.value = val;
    });
});

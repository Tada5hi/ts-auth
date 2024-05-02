/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { APIClient } from '@authup/core-http-kit';
import type { App } from 'vue';
import { inject } from './inject';
import { provide } from './provide';

export const APIClientSymbol = Symbol.for('AuthupAPIClient');

export function provideAPIClient(client: APIClient, app?: App) {
    provide(APIClientSymbol, client, app);
}

export function injectAPIClient() {
    const instance = inject<APIClient>(APIClientSymbol);
    if (!instance) {
        throw new Error('The api client has not been injected.');
    }

    return instance;
}

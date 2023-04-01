/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ComponentsOptions } from '@vue-layout/hyperscript';
import type { HTTPClient } from '@authup/common';

export type InstallOptions = {
    httpClient?: HTTPClient,
    presets?: Record<string, ComponentsOptions>
};

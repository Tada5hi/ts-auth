/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Realm } from '../realm';

export interface Role {
    id: string;

    name: string;

    target: string | null;

    description: string | null;

    // ------------------------------------------------------------------

    realm_id: Realm['id'] | null;

    realm: Realm | null;

    // ------------------------------------------------------------------

    created_at: string;

    updated_at: string;
}

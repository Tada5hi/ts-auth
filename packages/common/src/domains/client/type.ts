/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { User } from '../user';
import { Realm } from '../realm';

// todo: add avatar/icon ?

export interface Client {
    id: string,

    name: string,

    description: string | null,

    secret: string,

    redirect_uri: string | null,

    grant_types: string | null,

    scope: string | null,

    /**
     * Default redirect URL.
     */
    base_url: string | null,
    /**
     * URL prepended to relative URLs.
     */
    root_url: string | null,

    is_confidential: boolean,

    // ------------------------------------------------------------------

    created_at: Date | string,

    updated_at: Date | string,

    // ------------------------------------------------------------------

    realm_id: Realm['id'],

    realm: Realm,

    user_id: User['id'] | null,

    user: User | null
}

/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { JwtPayload } from 'jsonwebtoken';

export type KeycloakJWTPayload = JwtPayload & {
    realm_access?: {
        roles?: string[]
    }
};

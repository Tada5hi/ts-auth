/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { OAuth2TokenGrantResponse, User } from '@authup/core';
import {
    OAuth2SubKind, ScopeName,
} from '@authup/core';
import type { Request } from 'routup';
import { getRequestIP } from 'routup';
import { useRequestEnv } from '../../utils';
import { AbstractGrant } from './abstract';
import type {
    Grant,
} from './type';
import { buildOAuth2BearerTokenResponse } from '../response';

export class InternalGrantType extends AbstractGrant implements Grant {
    async run(request: Request): Promise<OAuth2TokenGrantResponse> {
        const realm = useRequestEnv(request, 'realm');
        const accessToken = await this.issueAccessToken({
            remoteAddress: getRequestIP(request, { trustProxy: true }),
            scope: ScopeName.GLOBAL,
            realmId: realm.id,
            realmName: realm.name,
            sub: useRequestEnv(request, 'userId') as User['id'],
            subKind: OAuth2SubKind.USER,
        });

        const refreshToken = await this.issueRefreshToken(accessToken);

        return buildOAuth2BearerTokenResponse({
            accessToken,
            accessTokenMaxAge: this.config.tokenRefreshMaxAge,
            refreshToken,
            refreshTokenMaxAge: this.config.tokenAccessMaxAge,
        });
    }
}

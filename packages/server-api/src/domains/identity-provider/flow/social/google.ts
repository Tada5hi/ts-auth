/*
 * Copyright (c) 2023-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { ConfigInput } from '@hapic/oauth2';
import { useRequestQuery } from '@routup/query';
import type { Request } from 'routup';
import { OAuth2IdentityProviderFlow } from '../core';
import type { IOAuth2IdentityProviderFlow, IdentityProviderFlowIdentity, OAuth2IdentityProviderFlowOptions } from '../types';

export class GoogleIdentityProviderFlow extends OAuth2IdentityProviderFlow implements IOAuth2IdentityProviderFlow {
    constructor(options: OAuth2IdentityProviderFlowOptions, config?: ConfigInput) {
        options.scope = 'openid profile email';
        options.authorize_url = 'https://accounts.google.com/o/oauth2/v2/auth';
        options.token_url = 'https://oauth2.googleapis.com/token';
        options.user_info_url = 'https://openidconnect.googleapis.com/v1/userinfo';

        super(options);
    }

    async getIdentityForRequest(request: Request): Promise<IdentityProviderFlowIdentity> {
        const { code, state } = useRequestQuery(request);

        // todo additional parameter like hd required
        // read: https://developers.google.com/identity/openid-connect/openid-connect?hl=de#createxsrftoken
        const token = await this.client.token.createWithAuthorizeGrant({
            code: code as string,
            state: state as string,
        });

        const userInfo = await this.client.userInfo.get({
            type: 'Bearer',
            token: token.access_token,
        });

        // todo: extract open id credentials
        throw new Error('Not implemented yet.');
    }
}

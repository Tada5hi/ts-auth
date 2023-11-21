/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

/* istanbul ignore next */
import type { OAuth2TokenGrantResponse } from '@authup/core';
import {
    CookieName,
    OAuth2TokenGrant, TokenError,
} from '@authup/core';
import type { SerializeOptions } from '@routup/basic/cookie';
import { setResponseCookie } from '@routup/basic/cookie';
import { URL } from 'node:url';
import type { Request, Response } from 'routup';
import { send } from 'routup';
import { EnvironmentName } from 'typeorm-extension';
import { useConfig } from '../../../../../config';
import type { Grant } from '../../../../oauth2';
import {
    AuthorizeGrantType,
    ClientCredentialsGrant,
    PasswordGrantType,
    RefreshTokenGrantType,
    RobotCredentialsGrantType,
    guessOauth2GrantTypeByRequest,
} from '../../../../oauth2';

/**
 *
 * @param req
 * @param res
 *
 * @throws TokenError
 */
export async function createTokenRouteHandler(
    req: Request,
    res: Response,
) : Promise<any> {
    const grantType = guessOauth2GrantTypeByRequest(req);
    if (!grantType) {
        throw TokenError.grantInvalid();
    }

    let grant : Grant | undefined;

    switch (grantType) {
        case OAuth2TokenGrant.AUTHORIZATION_CODE: {
            grant = new AuthorizeGrantType();
            break;
        }
        case OAuth2TokenGrant.CLIENT_CREDENTIALS: {
            grant = new ClientCredentialsGrant();
            break;
        }
        case OAuth2TokenGrant.ROBOT_CREDENTIALS: {
            grant = new RobotCredentialsGrantType();
            break;
        }
        case OAuth2TokenGrant.PASSWORD: {
            grant = new PasswordGrantType();
            break;
        }
        case OAuth2TokenGrant.REFRESH_TOKEN: {
            grant = new RefreshTokenGrantType();
            break;
        }
    }

    const config = useConfig();

    const tokenResponse : OAuth2TokenGrantResponse = await grant.run(req);

    const cookieOptions : SerializeOptions = {};
    if (config.get('env') === EnvironmentName.PRODUCTION) {
        cookieOptions.domain = new URL(config.get('publicUrl')).hostname;
    }

    setResponseCookie(res, CookieName.ACCESS_TOKEN, tokenResponse.access_token, {
        ...cookieOptions,
        maxAge: config.get('tokenMaxAgeAccessToken') * 1000,
    });

    setResponseCookie(res, CookieName.REFRESH_TOKEN, tokenResponse.refresh_token, {
        ...cookieOptions,
        maxAge: config.get('tokenMaxAgeRefreshToken') * 1000,
    });

    return send(res, tokenResponse);
}

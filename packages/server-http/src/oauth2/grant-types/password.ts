/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    OAuth2SubKind, OAuth2TokenGrantResponse,
    ScopeName,
    UserError,
} from '@authup/common';
import { useRequestBody } from '@routup/body';
import { Request, getRequestIp, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { UserEntity, UserRepository } from '@authup/server-database';
import { findRealm } from '../../helpers';
import { AbstractGrant } from './abstract';
import { OAuth2BearerTokenResponse } from '../response';
import { Grant } from './type';

export class PasswordGrantType extends AbstractGrant implements Grant {
    async run(request: Request) : Promise<OAuth2TokenGrantResponse> {
        const user = await this.validate(request);

        const accessToken = await this.issueAccessToken({
            remoteAddress: getRequestIp(request, { trustProxy: true }),
            scope: ScopeName.GLOBAL,
            sub: user.id,
            subKind: OAuth2SubKind.USER,
            realmId: user.realm.id,
            realmName: user.realm.name,
        });

        const refreshToken = await this.issueRefreshToken(accessToken);

        const response = new OAuth2BearerTokenResponse({
            accessToken,
            accessTokenMaxAge: this.config.get('tokenMaxAgeAccessToken'),
            refreshToken,
        });

        return response.build();
    }

    async validate(request: Request) : Promise<UserEntity> {
        const { username, password } = useRequestBody(request);

        const realm = await findRealm(useRequestParam(request, 'realmId'), true);

        const dataSource = await useDataSource();
        const repository = new UserRepository(dataSource);

        const entity = await repository.verifyCredentials(
            username,
            password,
            realm.id,
        );

        if (!entity) {
            throw UserError.credentialsInvalid();
        }

        if (!entity.active) {
            throw UserError.inactive();
        }

        return entity;
    }
}

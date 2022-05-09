/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    OAuth2TokenResponse,
    OAuth2TokenSubKind, UserError,
} from '@authelion/common';
import path from 'path';
import { AbstractGrant } from './abstract';
import { UserEntity, UserRepository } from '../../../domains';
import { OAuth2BearerTokenResponse } from '../response';
import { Grant } from './type';
import { useDataSource } from '../../../database';
import { ExpressRequest } from '../../type';

export class PasswordGrantType extends AbstractGrant implements Grant {
    async run(request: ExpressRequest) : Promise<OAuth2TokenResponse> {
        const user = await this.validate(request);

        const accessToken = await this.issueAccessToken({
            request,
            entity: {
                kind: OAuth2TokenSubKind.USER,
                data: user,
            },
            realm: user.realm_id,
        });

        const refreshToken = await this.issueRefreshToken(accessToken);

        const response = new OAuth2BearerTokenResponse({
            accessToken,
            refreshToken,
            keyPairOptions: {
                directory: path.join(this.config.rootPath, this.config.writableDirectory),
            },
        });

        return response.build();
    }

    async validate(request: ExpressRequest) : Promise<UserEntity> {
        const { username, password } = request.body;

        const dataSource = await useDataSource();
        const repository = new UserRepository(dataSource);

        const entity = await repository.verifyCredentials(username, password);

        if (!entity) {
            throw UserError.credentialsInvalid();
        }

        if (!entity.active) {
            throw UserError.inactive();
        }

        return entity;
    }
}

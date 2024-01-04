/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { OAuth2TokenGrantResponse } from '@authup/core';
import {
    OAuth2SubKind,
    RobotError,
    ScopeName,
} from '@authup/core';
import { useRequestBody } from '@routup/basic/body';
import type { Request } from 'routup';
import { getRequestIP } from 'routup';
import { useDataSource } from 'typeorm-extension';
import type { RobotEntity } from '../../../domains';
import { RobotRepository } from '../../../domains';
import { AbstractGrant } from './abstract';
import { buildOAuth2BearerTokenResponse } from '../response';
import type { Grant } from './type';

export class RobotCredentialsGrantType extends AbstractGrant implements Grant {
    async run(request: Request) : Promise<OAuth2TokenGrantResponse> {
        const entity = await this.validate(request);

        const accessToken = await this.issueAccessToken({
            remoteAddress: getRequestIP(request, { trustProxy: true }),
            scope: ScopeName.GLOBAL,
            subKind: OAuth2SubKind.ROBOT,
            sub: entity.id,
            realmId: entity.realm.id,
            realmName: entity.realm.name,
        });

        return buildOAuth2BearerTokenResponse({
            accessToken,
            accessTokenMaxAge: this.config.tokenMaxAgeAccessToken,
            refreshTokenMaxAge: this.config.tokenMaxAgeRefreshToken,
        });
    }

    async validate(request: Request) : Promise<RobotEntity> {
        const { id, secret } = useRequestBody(request);

        const dataSource = await useDataSource();
        const repository = new RobotRepository(dataSource);
        const entity = await repository.verifyCredentials(id, secret);

        if (!entity) {
            throw RobotError.credentialsInvalid();
        }

        if (!entity.active) {
            throw RobotError.inactive();
        }

        return entity;
    }
}

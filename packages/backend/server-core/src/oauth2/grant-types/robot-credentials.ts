/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    OAuth2Scope, OAuth2SubKind,
    OAuth2TokenGrantResponse,
    RobotError,
} from '@authelion/common';
import { useRequestBody } from '@routup/body';
import { Request } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { AbstractGrant } from './abstract';
import { OAuth2BearerTokenResponse } from '../response';
import { RobotEntity, RobotRepository } from '../../domains';
import { Grant } from './type';

export class RobotCredentialsGrantType extends AbstractGrant implements Grant {
    async run(request: Request) : Promise<OAuth2TokenGrantResponse> {
        const entity = await this.validate(request);

        const accessToken = await this.issueAccessToken({
            remoteAddress: request.socket.remoteAddress, // todo: check if present
            scope: OAuth2Scope.GLOBAL,
            subKind: OAuth2SubKind.ROBOT,
            sub: entity.id,
            realmId: entity.realm_id,
        });

        const response = new OAuth2BearerTokenResponse({
            accessToken,
            accessTokenMaxAge: this.config.tokenMaxAgeAccessToken,
        });

        return response.build();
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

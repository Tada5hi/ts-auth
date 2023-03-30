/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { OAuth2OpenIDProviderMetadata } from '@authup/common';
import { OAuth2AuthorizationResponseType } from '@authup/common';
import { NotFoundError } from '@ebec/http';
import type { Request, Response } from 'routup';
import { send, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { RealmEntity } from '../../../../domains';
import { useConfig } from '../../../../config';

export async function getRealmOpenIdConfigurationRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(RealmEntity);

    const entity = await repository.findOneBy({ id });

    if (!entity) {
        throw new NotFoundError();
    }

    const config = await useConfig();

    const configuration : OAuth2OpenIDProviderMetadata = {
        issuer: config.get('publicUrl'),

        authorization_endpoint: new URL('authorize', config.get('publicUrl')).href,

        jwks_uri: new URL(`realms/${entity.id}/jwks`, config.get('publicUrl')).href,

        response_type_supported: [
            OAuth2AuthorizationResponseType.CODE,
            OAuth2AuthorizationResponseType.TOKEN,
            OAuth2AuthorizationResponseType.NONE,
        ],

        subject_types_supported: [
            'public',
        ],

        id_token_signing_alg_values_supported: [
            'HS256', 'HS384', 'HS512', 'RS256', 'RS384', 'RS512', 'none',
        ],

        token_endpoint: new URL('token', config.get('publicUrl')).href,

        introspection_endpoint: new URL('token/introspect', config.get('publicUrl')).href,

        revocation_endpoint: new URL('token', config.get('publicUrl')).href,

        // -----------------------------------------------------------

        service_documentation: 'https://authup.org/',

        userinfo_endpoint: new URL('users/@me', config.get('publicUrl')).href,
    };

    return send(res, configuration);
}

/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    OAuth2TokenIntrospectionResponse,
} from '@authelion/common';
import {
    ValidationChain, body, oneOf, param, query, validationResult,
} from 'express-validator';
import { ExpressRequest, ExpressResponse } from '../../../../type';
import {
    extractOAuth2TokenPayload, loadOAuth2SubEntity,
    loadOAuth2SubPermissions, resolveOpenIdClaimsFromSubEntity,
} from '../../../../../oauth2';
import { ExpressValidationError, matchedValidationData } from '../../../../express-validation';

export async function introspectTokenRouteHandler(
    req: ExpressRequest,
    res: ExpressResponse,
) : Promise<any> {
    const chains : ValidationChain[] = [
        body('token'),
        query('token'),
        param('token'),
    ].map((chain) => chain
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 16, max: 2048 }));

    await oneOf(chains)
        .run(req);

    const validation = validationResult(req);
    if (!validation.isEmpty() && !req.token) {
        throw new ExpressValidationError(validation);
    }

    const validationData = matchedValidationData(req, { includeOptionals: true }) as { token: string };
    if (!validationData.token) {
        validationData.token = req.token;
    }

    const payload = await extractOAuth2TokenPayload(validationData.token);
    const permissions = await loadOAuth2SubPermissions(payload.sub_kind, payload.sub, payload.scope);

    return res.respond({
        data: {
            active: true,
            permissions,
            ...payload,
            ...resolveOpenIdClaimsFromSubEntity(
                payload.sub_kind,
                await loadOAuth2SubEntity(payload.sub_kind, payload.sub, payload.scope),
            ),
        } as OAuth2TokenIntrospectionResponse,
    });
}

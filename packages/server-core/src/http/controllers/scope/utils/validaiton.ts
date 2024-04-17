/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    isPropertySet, isRealmResourceWritable,
} from '@authup/core-kit';
import { check, validationResult } from 'express-validator';
import { BadRequestError } from '@ebec/http';
import type { Request } from 'routup';
import { enforceUniquenessForDatabaseEntity } from '../../../../database';
import { RealmEntity, ScopeEntity } from '../../../../domains';
import { useRequestEnv } from '../../../utils';
import type { ExpressValidationResult } from '../../../validation';
import {
    RequestValidationError,
    buildRequestValidationErrorMessage,
    extendExpressValidationResultWithRelation,
    initExpressValidationResult,
    matchedValidationData,
} from '../../../validation';
import { RequestHandlerOperation } from '../../../request/constants';

export async function runScopeValidation(
    req: Request,
    operation: `${RequestHandlerOperation.CREATE}` | `${RequestHandlerOperation.UPDATE}`,
) : Promise<ExpressValidationResult<ScopeEntity>> {
    const result : ExpressValidationResult<ScopeEntity> = initExpressValidationResult();

    const nameChain = await check('name')
        .exists()
        .isString()
        .notEmpty();

    if (operation === RequestHandlerOperation.UPDATE) nameChain.optional();

    await nameChain.run(req);

    await check('description')
        .exists()
        .notEmpty()
        .isString()
        .isLength({ min: 5, max: 4096 })
        .optional({ nullable: true })
        .run(req);

    if (operation === 'create') {
        await check('realm_id')
            .exists()
            .isUUID()
            .optional({ nullable: true })
            .default(null)
            .run(req);
    }

    // ----------------------------------------------

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new RequestValidationError(validation);
    }

    result.data = matchedValidationData(req, { includeOptionals: true });

    // ----------------------------------------------

    await extendExpressValidationResultWithRelation(result, RealmEntity, {
        id: 'realm_id',
        entity: 'realm',
    });

    if (isPropertySet(result.data, 'realm_id')) {
        if (!isRealmResourceWritable(useRequestEnv(req, 'realm'), result.data.realm_id)) {
            throw new BadRequestError(buildRequestValidationErrorMessage('realm_id'));
        }
    } else if (
        operation === RequestHandlerOperation.CREATE &&
        !isRealmResourceWritable(useRequestEnv(req, 'realm'))
    ) {
        throw new BadRequestError(buildRequestValidationErrorMessage('realm_id'));
    }

    // ----------------------------------------------

    if (operation === RequestHandlerOperation.CREATE) {
        await enforceUniquenessForDatabaseEntity(ScopeEntity, result.data);
    }

    // ----------------------------------------------

    return result;
}

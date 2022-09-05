/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { check, validationResult } from 'express-validator';
import { BadRequestError } from '@typescript-error/http';
import { PermissionID, isPermittedForResourceRealm } from '@authelion/common';
import { ExpressRequest } from '../../../type';
import {
    ExpressValidationError,
    ExpressValidationResult,
    buildExpressValidationErrorMessage,
    extendExpressValidationResultWithRelation,
    initExpressValidationResult,
    matchedValidationData,
} from '../../../express-validation';
import { CRUDOperation } from '../../../constants';
import { PermissionEntity, RoleEntity, RolePermissionEntity } from '../../../../domains';

export async function runRolePermissionValidation(
    req: ExpressRequest,
    operation: `${CRUDOperation.CREATE}` | `${CRUDOperation.UPDATE}`,
) : Promise<ExpressValidationResult<RolePermissionEntity>> {
    const result : ExpressValidationResult<RolePermissionEntity> = initExpressValidationResult();

    if (operation === CRUDOperation.CREATE) {
        await check('role_id')
            .exists()
            .isUUID()
            .run(req);

        await check('permission_id')
            .exists()
            .isString()
            .run(req);

        await check('target')
            .exists()
            .isString()
            .isLength({ min: 3, max: 16 })
            .optional({ nullable: true })
            .run(req);
    }

    // ----------------------------------------------

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new ExpressValidationError(validation);
    }

    result.data = matchedValidationData(req, { includeOptionals: true });

    // ----------------------------------------------

    await extendExpressValidationResultWithRelation(result, PermissionEntity, {
        id: 'permission_id',
        entity: 'permission',
    });

    if (result.relation.permission) {
        result.data.target = result.relation.permission.target;
    }

    const permissionTarget = req.ability.getTarget(PermissionID.ROLE_PERMISSION_ADD);
    if (permissionTarget) {
        result.data.target = permissionTarget;
    }

    await extendExpressValidationResultWithRelation(result, RoleEntity, {
        id: 'role_id',
        entity: 'role',
    });

    if (result.relation.role) {
        if (!isPermittedForResourceRealm(req.realmId, result.relation.role.realm_id)) {
            throw new BadRequestError(buildExpressValidationErrorMessage('role_id'));
        }

        result.data.role_realm_id = result.relation.role.realm_id;
    }

    // ----------------------------------------------

    return result;
}

/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ForbiddenError, NotFoundError } from '@ebec/http';
import { PermissionName, isRealmResourceWritable } from '@authup/core';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { RobotPermissionEntity } from '../../../../domains';
import { useRequestEnv } from '../../../utils';

/**
 * Drop a permission by id of a specific user.
 *
 * @param req
 * @param res
 */
export async function deleteRobotPermissionRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const ability = useRequestEnv(req, 'ability');
    if (!ability.has(PermissionName.ROBOT_PERMISSION_DROP)) {
        throw new ForbiddenError();
    }

    const dataSource = await useDataSource();
    const repository = dataSource.getRepository(RobotPermissionEntity);
    const entity = await repository.findOneBy({ id });

    if (!entity) {
        throw new NotFoundError();
    }

    // ----------------------------------------------

    if (!isRealmResourceWritable(useRequestEnv(req, 'realm'), entity.robot_realm_id)) {
        throw new ForbiddenError();
    }

    // ----------------------------------------------

    if (!ability.matchTarget(PermissionName.ROBOT_PERMISSION_DROP, entity.target)) {
        throw new ForbiddenError('You are not permitted for the robot-permission target.');
    }

    // ----------------------------------------------

    const { id: entityId } = entity;

    await repository.remove(entity);

    entity.id = entityId;

    // ----------------------------------------------

    return sendAccepted(res, entity);
}

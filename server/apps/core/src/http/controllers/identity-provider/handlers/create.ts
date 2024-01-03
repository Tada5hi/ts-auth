/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { ForbiddenError } from '@ebec/http';
import {
    PermissionName,
} from '@authup/core';
import type { Request, Response } from 'routup';
import { sendCreated } from 'routup';
import { useDataSource } from 'typeorm-extension';
import { IdentityProviderRepository } from '../../../../domains';
import { useRequestEnv } from '../../../utils';
import { runOauth2ProviderValidation } from '../utils';
import { RequestHandlerOperation } from '../../../request';

export async function createIdentityProviderRouteHandler(req: Request, res: Response) : Promise<any> {
    const ability = useRequestEnv(req, 'ability');
    if (!ability.has(PermissionName.PROVIDER_ADD)) {
        throw new ForbiddenError();
    }

    const result = await runOauth2ProviderValidation(req, RequestHandlerOperation.CREATE);

    const dataSource = await useDataSource();
    const repository = new IdentityProviderRepository(dataSource);

    const entity = repository.create(result.data);

    await repository.save(entity);

    await repository.saveAttributes(entity.id, result.meta.attributes);
    repository.appendAttributes(entity, result.meta.attributes);

    return sendCreated(res, entity);
}

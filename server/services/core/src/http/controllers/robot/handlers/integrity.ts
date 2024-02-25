/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Realm } from '@authup/core';
import {
    REALM_MASTER_NAME,
    createNanoID,
    isUUID,
} from '@authup/core';
import { NotFoundError } from '@ebec/http';
import { hasClient } from '@hapic/vault';
import type { Request, Response } from 'routup';
import { sendAccepted, useRequestParam } from 'routup';
import { useDataSource } from 'typeorm-extension';
import {
    RobotRepository,
    findRobotCredentialsInVault,
    resolveRealm,
    saveRobotCredentialsToVault,
} from '../../../../domains';

export async function handleRobotIntegrityRouteHandler(req: Request, res: Response) : Promise<any> {
    const id = useRequestParam(req, 'id');

    const dataSource = await useDataSource();
    const repository = new RobotRepository(dataSource);
    const query = repository.createQueryBuilder('robot');

    let realm : Realm | undefined;

    if (isUUID(id)) {
        query.where('robot.id = :id', { id });
    } else {
        query.where('robot.name LIKE :name', { name: id });

        realm = await resolveRealm(useRequestParam(req, 'realmId'), true);
        query.andWhere('robot.realm_id = :realmId', { realmId: realm.id });
    }

    if (!realm) {
        query.leftJoinAndSelect('robot.realm', 'realm');
    }

    const entity = await query.getOne();

    if (!entity) {
        throw new NotFoundError();
    }

    if (entity.realm) {
        realm = entity.realm;
    }

    if (!hasClient() || !realm || realm.name !== REALM_MASTER_NAME) {
        return sendAccepted(res);
    }

    let refreshCredentials : boolean = false;
    const credentials = await findRobotCredentialsInVault({
        name: entity.name,
    });

    if (credentials) {
        const secretHashedEqual = await repository.verifySecret(credentials.secret, entity.secret);
        if (!secretHashedEqual) {
            refreshCredentials = true;
        }
    } else {
        refreshCredentials = true;
    }

    if (refreshCredentials) {
        const secret = createNanoID(64);

        entity.secret = await repository.hashSecret(secret);
        await repository.save(entity);

        await saveRobotCredentialsToVault({
            ...entity,
            secret,
        });
    }

    return sendAccepted(res);
}

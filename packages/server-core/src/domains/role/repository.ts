/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { buildRedisKeyPath } from '@authup/server-kit';
import type { DataSource, EntityManager } from 'typeorm';
import { InstanceChecker, Repository } from 'typeorm';
import type {
    Ability,
    Role,
} from '@authup/core-kit';
import {
    buildAbility,

} from '@authup/core-kit';
import { CachePrefix } from '../constants';
import { RoleEntity } from './entity';
import { RolePermissionEntity } from '../role-permission';

export class RoleRepository extends Repository<RoleEntity> {
    constructor(instance: DataSource | EntityManager) {
        super(RoleEntity, InstanceChecker.isDataSource(instance) ? instance.manager : instance);
    }

    async getOwnedPermissionsByMany(
        ids: Role['id'][],
    ) : Promise<Ability[]> {
        const permissions = [];

        for (let i = 0; i < ids.length; i++) {
            permissions.push(...await this.getOwnedPermissions(ids[i]));
        }

        return permissions;
    }

    async getOwnedPermissions(
        id: Role['id'],
    ) : Promise<Ability[]> {
        const repository = this.manager.getRepository(RolePermissionEntity);

        const entities = await repository.find({
            where: {
                role_id: id,
            },
            relations: {
                permission: true,
            },
            cache: {
                id: buildRedisKeyPath({
                    prefix: CachePrefix.ROLE_OWNED_PERMISSIONS,
                    id,
                }),
                milliseconds: 60.000,
            },
        });

        const result : Ability[] = [];
        for (let i = 0; i < entities.length; i++) {
            result.push(buildAbility(entities[i]));
        }

        return result;
    }
}

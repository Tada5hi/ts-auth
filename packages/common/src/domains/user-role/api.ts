/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { BuildInput } from 'rapiq';
import { buildQuery } from 'rapiq';
import type { ClientDriverInstance } from 'hapic';
import type { UserRole } from './entity';
import type { CollectionResourceResponse, DomainAPISlim, SingleResourceResponse } from '../type';

export class UserRoleAPI implements DomainAPISlim<UserRole> {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async getMany(data: BuildInput<UserRole>): Promise<CollectionResourceResponse<UserRole>> {
        const response = await this.client.get(`user-roles${buildQuery(data)}`);

        return response.data;
    }

    async getOne(id: UserRole['id']): Promise<SingleResourceResponse<UserRole>> {
        const response = await this.client.get(`user-roles/${id}`);

        return response.data;
    }

    async delete(id: UserRole['id']): Promise<SingleResourceResponse<UserRole>> {
        const response = await this.client.delete(`user-roles/${id}`);

        return response.data;
    }

    async create(data: Partial<UserRole>): Promise<SingleResourceResponse<UserRole>> {
        const response = await this.client.post('user-roles', data);

        return response.data;
    }
}

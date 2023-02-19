/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { BuildInput } from 'rapiq';
import { buildQuery } from 'rapiq';
import type { ClientDriverInstance } from 'hapic';
import { nullifyEmptyObjectProperties } from '../../utils';
import type { Scope } from './module';
import type {
    CollectionResourceResponse, DomainAPI, SingleResourceResponse,
} from '../type';

export class ScopeAPI implements DomainAPI<Scope> {
    protected client: ClientDriverInstance;

    constructor(client: ClientDriverInstance) {
        this.client = client;
    }

    async getMany(data?: BuildInput<Scope>): Promise<CollectionResourceResponse<Scope>> {
        const response = await this.client.get(`scopes${buildQuery(data)}`);

        return response.data;
    }

    async getOne(id: Scope['id']): Promise<SingleResourceResponse<Scope>> {
        const response = await this.client.get(`scopes/${id}`);

        return response.data;
    }

    async delete(id: Scope['id']): Promise<SingleResourceResponse<Scope>> {
        const response = await this.client.delete(`scopes/${id}`);

        return response.data;
    }

    async create(data: Partial<Scope>): Promise<SingleResourceResponse<Scope>> {
        const response = await this.client.post('scopes', nullifyEmptyObjectProperties(data));

        return response.data;
    }

    async update(id: Scope['id'], data: Partial<Scope>): Promise<SingleResourceResponse<Scope>> {
        const response = await this.client.post(`scopes/${id}`, nullifyEmptyObjectProperties(data));

        return response.data;
    }
}

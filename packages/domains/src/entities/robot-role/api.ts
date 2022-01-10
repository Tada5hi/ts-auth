/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { BuildInput, buildQuery } from '@trapi/query';
import { AxiosInstance } from 'axios';
import { RobotRole } from './entity';
import { CollectionResourceResponse, SingleResourceResponse } from '../type';

export class RobotRoleAPI {
    protected client: AxiosInstance;

    constructor(client: AxiosInstance) {
        this.client = client;
    }

    async getMany(data: BuildInput<RobotRole>): Promise<CollectionResourceResponse<RobotRole>> {
        const response = await this.client.get(`robot-roles${buildQuery(data)}`);

        return response.data;
    }

    async getOne(id: typeof RobotRole.prototype.id): Promise<SingleResourceResponse<RobotRole>> {
        const response = await this.client.get(`robot-roles/${id}`);

        return response.data;
    }

    async delete(id: typeof RobotRole.prototype.id): Promise<SingleResourceResponse<RobotRole>> {
        const response = await this.client.delete(`robot-roles/${id}`);

        return response.data;
    }

    async create(data: Partial<RobotRole>): Promise<SingleResourceResponse<RobotRole>> {
        const response = await this.client.post('robot-roles', data);

        return response.data;
    }
}

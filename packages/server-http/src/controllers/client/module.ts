/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    DBody, DController, DDelete, DGet, DPath, DPost, DRequest, DResponse, DTags,
} from '@routup/decorators';
import type {
    Client,
} from '@authup/common';
import {
    createClientRouteHandler,
    deleteClientRouteHandler,
    getManyClientRouteHandler,
    getOneClientRouteHandler,
    updateClientRouteHandler,
} from './handlers';
import { ForceLoggedInMiddleware } from '../../middleware';

@DTags('oauth2')
@DController('/clients')
export class ClientController {
    @DGet('', [])
    async getClients(
        @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<Client[]> {
        return getManyClientRouteHandler(req, res);
    }

    @DGet('/:id', [])
    async getClient(
        @DPath('id') id: string,
            @DRequest() req: any,
            @DResponse() res: any,
    ): Promise<Client> {
        return getOneClientRouteHandler(req, res);
    }

    @DPost('/:id', [ForceLoggedInMiddleware])
    async editClient(
        @DPath('id') id: string,
            @DBody() user: NonNullable<Client>,
            @DRequest() req: any,
            @DResponse() res: any,
    ) : Promise<Client> {
        return updateClientRouteHandler(req, res);
    }

    @DDelete('/:id', [ForceLoggedInMiddleware])
    async dropClient(
        @DPath('id') id: string,
            @DRequest() req: any,
            @DResponse() res: any,
    ) : Promise<Client> {
        return deleteClientRouteHandler(req, res);
    }

    @DPost('', [ForceLoggedInMiddleware])
    async addClient(
        @DBody() user: NonNullable<Client>,
            @DRequest() req: any,
            @DResponse() res: any,
    ) : Promise<Client> {
        return createClientRouteHandler(req, res);
    }
}

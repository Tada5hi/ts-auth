/*
 * Copyright (c) 2021-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Next, Request, Response, Router, send,
} from 'routup';

import {
    extendsBaseError,
} from '@ebec/http';
import { useLogger } from '@authup/server-common';
import { buildResponseErrorPayloadFromError } from '../../response';

export function registerErrorMiddleware(router: Router) {
    router.use((
        error: Error,
        request: Request,
        response: Response,
        _next: Next,
    ) => {
        if (extendsBaseError(error)) {
            response.statusCode = error.getOption('statusCode') || 500;

            const logMessage = error.getOption('logMessage');
            if (logMessage) {
                useLogger().error(`${error.message}`);
            }
        }

        send(response, buildResponseErrorPayloadFromError(error));
    });
}

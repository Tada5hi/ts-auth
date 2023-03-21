/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { SocketEventContext, SocketEventName, SocketServerToClientData } from '@authup/common';

export type SocketServerToClientEvents = {
    [K in SocketEventName]: (data: SocketEventContext<SocketServerToClientData<K>>) => void
};

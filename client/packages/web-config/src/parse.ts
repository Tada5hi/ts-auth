/*
 * Copyright (c) 2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import zod from 'zod';
import type { ConfigInput } from './type';

export function parseConfig(input: unknown = {}) : ConfigInput {
    const schema = zod.object({
        port: zod.number().nonnegative().optional(),
        host: zod.string().optional(),
        apiUrl: zod.string().url().optional(),
        publicUrl: zod.string().url().optional(),
    });

    return schema.parse(input);
}

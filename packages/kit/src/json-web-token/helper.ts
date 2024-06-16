/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { clone, isEqual, isObject } from 'smob';
import type { JWTClaims } from './types';

export function getJWTClaimValueBy(
    claims: JWTClaims,
    key: string,
    value?: unknown,
    valueIsRegex?: boolean,
) : unknown | unknown[] | undefined {
    const path = key.split('\\.');
    let raw = clone(claims);
    for (let i = 0; i < path.length; i++) {
        if (!isObject(raw)) {
            continue;
        }

        raw = raw[path[i]];
    }

    if (!raw) {
        return undefined;
    }

    if (!value) {
        return raw;
    }

    let regex : RegExp | undefined;
    if (valueIsRegex && typeof value === 'string') {
        regex = new RegExp(value, 'gi');
    } else if (value instanceof RegExp) {
        regex = value;
    }

    if (regex) {
        if (Array.isArray(raw)) {
            const output = raw
                .filter((el) => typeof el === 'string' && regex.test(el));

            if (output.length > 0) {
                return output;
            }

            return undefined;
        }

        if (
            typeof raw === 'string' &&
            regex.test(raw)
        ) {
            return raw;
        }

        return undefined;
    }

    if (Array.isArray(raw)) {
        if (Array.isArray(value)) {
            return isEqual(raw, value) ?
                raw :
                undefined;
        }

        const output = raw.filter((r) => isEqual(r, value));
        if (output.length > 0) {
            return output;
        }

        return undefined;
    }

    if (isEqual(raw, value)) {
        return raw;
    }

    return undefined;
}

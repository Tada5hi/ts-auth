/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export type AuthupRuntimeOptions = {
    apiURL?: string,
    apiURLRuntimeKey?: string,

    cookieDomain?: string,
    cookieDomainRuntimeKey?: string,

    homeRoute?: string,
    loginRoute?: string,
    logoutRoute?: string
};

/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

export enum JWTAlgorithm {
    'HS256' = 'HS256',
    'HS384' = 'HS384',
    'HS512' = 'HS512',
    'RS256' = 'RS256',
    'RS384' = 'RS384',
    'RS512' = 'RS512',
    'ES256' = 'ES256',
    'ES384' = 'ES384',
    // 'ES512' = 'ES512',
    'PS256' = 'PS256',
    'PS384' = 'PS384',
    'PS512' = 'PS512',
}

export enum OAuth2TokenKind {
    ACCESS = 'access_token',
    ID_TOKEN = 'id_token',
    REFRESH = 'refresh_token',
}

export enum OAuth2SubKind {
    CLIENT = 'client',
    USER = 'user',
    ROBOT = 'robot',
}

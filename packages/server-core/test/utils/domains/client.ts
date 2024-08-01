/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { faker } from '@faker-js/faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import type { SuperTest, Test } from 'supertest';
import type { Client } from '@authup/core-kit';
import { ScopeName } from '@authup/core-kit';

export function createFakeClient(data: Partial<Client> = {}) {
    return {
        name: faker.internet.userName(),
        secret: faker.string.alpha({ length: 10 }),
        redirect_uri: faker.internet.url(),
        is_confidential: true,
        ...data,
    } satisfies Partial<Client>;
}

export async function createSuperTestClient(superTest: SuperTest<Test>, entity?: Partial<Client>) {
    return superTest
        .post('/clients')
        .send(createFakeClient(entity))
        .auth('admin', 'start123');
}

export async function createSuperTestClientWithScope(
    superTest: SuperTest<Test>,
    entity?: Partial<Client>,
) {
    const client = await createSuperTestClient(superTest, entity);

    const { body: scope } = await superTest
        .get(`/scopes/${ScopeName.GLOBAL}`)
        .auth('admin', 'start123');

    await superTest
        .post('/client-scopes')
        .send({
            client_id: client.body.id,
            scope_id: scope.id,
        })
        .auth('admin', 'start123');

    return client;
}

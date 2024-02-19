/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { StartedTestContainer } from 'testcontainers';
import { LdapClient } from '../../src/core';

export async function createLdapTestUserAccount(client: LdapClient) {
    try {
        await client.add('cn=foo,dc=example,dc=com', {
            cn: 'foo',
            sn: 'bar',
            mail: 'foo.bar@example.com',
            objectClass: 'inetOrgPerson',
            userPassword: 'foo',
        });
    } catch (e) {
        // do nothing ;)
    }
}

export async function dropLdapTestUserAccount(client: LdapClient) {
    try {
        await client.del('cn=foo,dc=example,dc=com');
    } catch (e) {
        // do nothing :)
    }
}

export function createLdapTestClientURL() {
    const container : StartedTestContainer = globalThis.OPENLDAP_CONTAINER;
    return `ldap://${container.getHost()}:${container.getFirstMappedPort()}`;
}

export function createLdapTestClient() {
    return new LdapClient({
        url: createLdapTestClientURL(),
        user: 'cn=admin,dc=example,dc=com',
        password: 'password',
        baseDn: 'dc=example,dc=com',
    });
}

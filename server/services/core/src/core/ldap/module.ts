/*
 * Copyright (c) 2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Change, Client, SearchOptions } from 'ldapjs';
import {
    DN,
    createClient, parseDN,
} from 'ldapjs';
import type { LdapClientOptions } from './types';

export class LdapClient {
    protected options : LdapClientOptions;

    protected driver : Client;

    constructor(options: LdapClientOptions) {
        this.options = options;
        this.driver = createClient({
            url: options.url,
            tlsOptions: options.tls,
            connectTimeout: 3000,
        });
    }

    async connect() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const listener = () => {
                if (this.options.startTLS) {
                    this.driver.starttls(this.options.tls, null, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve();
                    });
                } else {
                    resolve();
                }
            };

            if (this.driver.connected) {
                listener();
                return;
            }

            const errorListener = (error?: Error | null) => {
                if (error) {
                    reject(error);
                }

                resolve();
            };

            this.driver.connect();
            this.driver.once('connect', listener);
            this.driver.once('timeout', errorListener);
            this.driver.once('connectTimeout', errorListener);
            this.driver.once('error', errorListener);
            this.driver.once('connectError', errorListener);
        });
    }

    connected() : boolean {
        return this.driver.connected;
    }

    public async bind(user?: string, password?: string) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connect()
                .then(() => {
                    if (!user) {
                        user = this.options.user;
                        password = this.options.password;
                    }

                    this.driver.bind(user, password, (err) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        resolve();
                    });
                })
                .catch((e) => reject(e));
        });
    }

    async unbind() : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.driver.unbind((err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    async add(name: string, data: Record<string, any>) {
        return new Promise<void>((resolve, reject) => {
            this.driver.add(name, data, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    async del(name: string) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.driver.del(name, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    async modify(name: string, change: Change | Change[]) : Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.driver.modify(name, change, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        });
    }

    async search(options: SearchOptions, dn?: string) : Promise<Record<string, any>[]> {
        return new Promise((resolve, reject) => {
            this.driver.search(
                dn || this.options.baseDn,
                {
                    scope: 'sub',
                    ...options,
                },
                (err, res) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    const entries : Record<string, any>[] = [];

                    res.on('searchEntry', (searchEntry) => {
                        const entry : Record<string, any> = {
                            dn: searchEntry.pojo.objectName,
                        };

                        for (let i = 0; i < searchEntry.attributes.length; i++) {
                            const attribute = searchEntry.attributes[i];

                            entry[attribute.type] = Array.isArray(attribute.values) ?
                                attribute.values.map((el) => el.trim()).filter(Boolean) :
                                attribute.values;
                        }

                        entries.push(entry);
                    });

                    res.on('error', (err) => {
                        reject(err);
                    });

                    res.on('end', (searchResult) => {
                        if (searchResult.status !== 0) {
                            reject(new Error('The ldap search was not successfully'));
                        } else {
                            resolve(entries);
                        }
                    });
                },
            );
        });
    }

    resolveDn(...input: (string | undefined)[]) : string | undefined {
        let output : string | undefined;

        for (let i = 0; i <= input.length; i++) {
            if (typeof input[i] === 'undefined') {
                continue;
            }

            if (!output) {
                output = input[i];
                continue;
            }

            const dn = parseDN(output);
            if (dn.childOf(input[i])) {
                continue;
            }

            output += `,${input[i]}`;
        }

        return output;
    }

    isDn(input: string | DN) : boolean {
        try {
            if (typeof input !== 'string') {
                return DN.isDN(input);
            }

            if (typeof (DN as Record<string, any>).fromString === 'function') {
                const dn = (DN as Record<string, any>).fromString(input);
                return typeof dn !== 'undefined';
            }

            return /^(?:(?:(?:[a-zA-Z0-9]+(?:[-._][a-zA-Z0-9]+)*)=(?:[\s]*[^,+\n=]+[\s]*)*)(?:[,][\s]*)?)+$/.test(input);
        } catch (e) {
            return false;
        }
    }
}

/*
 * Copyright (c) 2021-2024.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Client, RequestBaseOptions } from 'hapic';
import type { BuildInput } from 'rapiq';

export type SingleResourceResponse<R> = R;
export type CollectionResourceResponse<R> = {
    data: R[],
    meta: {
        limit: number,
        offset: number,
        total: number
    }
};

export type DomainEntityWithID = {
    [key: string]: any,
    id: any
};
export type DomainEntityID<T> = T extends DomainEntityWithID ?
    T['id'] :
    never;

export interface DomainAPISlim<T> {
    getMany(record?: BuildInput<T>) : Promise<CollectionResourceResponse<T>>;
    getOne(id: DomainEntityID<T>, record?: BuildInput<T>) : Promise<SingleResourceResponse<T>>;
    delete(id: DomainEntityID<T>) : Promise<SingleResourceResponse<T>>;
    create(data: Partial<T>) : Promise<SingleResourceResponse<T>>;
}

export interface DomainAPI<T> extends DomainAPISlim<T> {
    update(id: DomainEntityID<T>, data: Partial<T>) : Promise<SingleResourceResponse<T>>;
}

export type BaseAPIContext = {
    client?: Client | RequestBaseOptions
};

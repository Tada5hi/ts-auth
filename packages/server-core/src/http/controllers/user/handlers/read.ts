/*
 * Copyright (c) 2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { PermissionName, ScopeName } from '@authup/core-kit';
import { OAuth2SubKind, isUUID } from '@authup/kit';
import { ForbiddenError, NotFoundError } from '@ebec/http';
import { useRequestQuery } from '@routup/basic/query';
import type { Request, Response } from 'routup';
import { send, useRequestParam } from 'routup';
import type { QueryFieldsApplyOptions } from 'typeorm-extension';
import { applyQuery, useDataSource } from 'typeorm-extension';
import type { UserEntity } from '../../../../domains';
import { UserRepository, resolveRealm } from '../../../../domains';
import { isSelfId } from '../../../../utils';
import { hasOAuth2Scope, resolveOAuth2SubAttributesForScope } from '../../../oauth2';
import { buildPolicyDataByRequest, useRequestEnv, useRequestParamID } from '../../../request';

function buildFieldsOption() : QueryFieldsApplyOptions<UserEntity> {
    return {
        defaultAlias: 'user',
        default: [
            'id',
            'name',
            'name_locked',
            'first_name',
            'last_name',
            'display_name',
            'avatar',
            'cover',
            'active',
            'created_at',
            'updated_at',
            'realm_id',
        ],
        allowed: ['email'],
    };
}

export async function getManyUserRouteHandler(req: Request, res: Response) : Promise<any> {
    const dataSource = await useDataSource();
    const repository = new UserRepository(dataSource);
    const query = repository.createQueryBuilder('user');

    const { pagination } = applyQuery(query, useRequestQuery(req), {
        defaultAlias: 'user',
        fields: buildFieldsOption(),
        filters: {
            allowed: ['id', 'name', 'realm_id'],
        },
        pagination: {
            maxLimit: 50,
        },
        relations: {
            allowed: ['realm'],
        },
        sort: {
            allowed: ['id', 'name', 'display_name', 'created_at', 'updated_at'],
        },
    });

    const queryOutput = await query.getManyAndCount();
    const [entities] = queryOutput;
    let [, total] = queryOutput;

    const permissionChecker = useRequestEnv(req, 'permissionChecker');

    const userId = useRequestEnv(req, 'userId');

    const data : UserEntity[] = [];
    const policyEvaluationData = buildPolicyDataByRequest(req);
    for (let i = 0; i < entities.length; i++) {
        if (userId === entities[i].id) {
            data.push(entities[i]);
            continue;
        }

        const canAbility = await permissionChecker.safeCheckOneOf(
            [
                PermissionName.USER_READ,
                PermissionName.USER_UPDATE,
                PermissionName.USER_DELETE,
            ],
            { ...policyEvaluationData, attributes: entities[i] },
        );
        if (canAbility) {
            data.push(entities[i]);
        } else {
            total -= 1;
        }
    }

    await repository.findAndAppendExtraAttributesToMany(data);

    return send(res, {
        data,
        meta: {
            total,
            ...pagination,
        },
    });
}

export async function getOneUserRouteHandler(req: Request, res: Response) : Promise<any> {
    const permissionChecker = useRequestEnv(req, 'permissionChecker');
    const hasPermission = await permissionChecker.hasOneOf([
        PermissionName.USER_READ,
        PermissionName.USER_UPDATE,
        PermissionName.USER_DELETE,
    ]);
    if (!hasPermission) {
        throw new ForbiddenError();
    }

    const id = useRequestParamID(req, {
        isUUID: false,
    });

    const dataSource = await useDataSource();
    const repository = new UserRepository(dataSource);
    const query = repository.createQueryBuilder('user');

    const requestUser = useRequestEnv(req, 'user');
    const requestRealm = useRequestEnv(req, 'realm');

    let isMe = false;

    if (
        isSelfId(id) &&
        requestUser
    ) {
        isMe = true;
        query.where('user.id = :id', { id: requestUser.id });
    } else if (isUUID(id)) {
        if (requestUser && id === requestUser.id) {
            isMe = true;
        }
        query.where('user.id = :id', { id });
    } else {
        query.where('user.name = :name', { name: id });

        const realm = await resolveRealm(useRequestParam(req, 'realmId'), true);
        query.andWhere('user.realm_id = :realmId', { realmId: realm.id });

        if (
            requestUser &&
            requestRealm &&
            id === requestUser.name &&
            realm.id === requestRealm.id
        ) {
            isMe = true;
        }
    }

    const scopes = useRequestEnv(req, 'scopes');
    if (isMe) {
        const attributes: string[] = resolveOAuth2SubAttributesForScope(OAuth2SubKind.USER, scopes);

        const validAttributes = repository.metadata.columns.map(
            (column) => column.databaseName,
        );
        for (let i = 0; i < attributes.length; i++) {
            const isValid = validAttributes.includes(attributes[i]);
            if (isValid) {
                query.addSelect(`user.${attributes[i]}`);
            }
        }
    }

    applyQuery(query, useRequestQuery(req), {
        defaultAlias: 'user',
        fields: buildFieldsOption(),
        relations: {
            allowed: ['realm'],
        },
    });

    const entity = await query.getOne();
    if (!entity) {
        throw new NotFoundError();
    }

    if (isMe) {
        if (hasOAuth2Scope(scopes, ScopeName.GLOBAL)) {
            await repository.findAndAppendExtraAttributesTo(entity);
        }
    } else {
        const hasAbility = await permissionChecker.safeCheckOneOf(
            [
                PermissionName.USER_READ,
                PermissionName.USER_UPDATE,
                PermissionName.USER_DELETE,
            ],
            buildPolicyDataByRequest(req, { attributes: entity }),
        );

        if (!hasAbility) {
            throw new ForbiddenError();
        }

        await repository.findAndAppendExtraAttributesTo(entity);
    }

    return send(res, entity);
}

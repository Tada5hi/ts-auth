/*
 * Copyright (c) 2022-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { randomBytes } from 'node:crypto';
import { BadRequestError, NotFoundError } from '@ebec/http';
import { check, oneOf, validationResult } from 'express-validator';
import type { User } from '@authup/core-kit';
import type { Request, Response } from 'routup';
import { sendAccepted } from 'routup';
import type { FindOptionsWhere } from 'typeorm';
import { useDataSource } from 'typeorm-extension';
import { isSMTPClientUsable, useSMTPClient } from '../../../../../core';
import { UserRepository, resolveRealm } from '../../../../../domains';
import {
    EnvironmentName, useConfig,
} from '../../../../../config';
import { RequestValidationError, matchedValidationData } from '../../../../validation';

export async function createAuthPasswordForgotRouteHandler(req: Request, res: Response) : Promise<any> {
    const config = useConfig();

    if (!config.registration) {
        throw new BadRequestError('User registration is not enabled.');
    }

    if (!config.emailVerification) {
        throw new BadRequestError('Email verification is not enabled, but required to reset a password.');
    }

    if (
        !isSMTPClientUsable() &&
        config.env !== 'test'
    ) {
        throw new BadRequestError('SMTP modul is not configured.');
    }

    await oneOf([
        check('email')
            .exists()
            .notEmpty()
            .isEmail(),
        check('name')
            .exists()
            .notEmpty()
            .isString(),
    ])
        .run(req);

    await check('realm_id')
        .exists()
        .isUUID()
        .optional({ nullable: true })
        .run(req);

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
        throw new RequestValidationError(validation);
    }

    const data : Partial<User> = matchedValidationData(req, { includeOptionals: true });

    const where : FindOptionsWhere<User> = {
        ...(data.name ? { name: data.name } : {}),
        ...(data.email ? { email: data.email } : {}),
    };

    const realm = await resolveRealm(data.realm_id, true);
    where.realm_id = realm.id;

    const dataSource = await useDataSource();
    const repository = new UserRepository(dataSource);
    const query = repository.createQueryBuilder('user');
    const entity = await query
        .addSelect('user.email')
        .where(where)
        .getOne();

    if (!entity) {
        throw new NotFoundError();
    }

    entity.reset_expires = new Date(Date.now() + (1000 * 60 * 30)).toISOString();
    entity.reset_hash = randomBytes(32).toString('hex');

    if (config.env !== EnvironmentName.TEST) {
        const smtpClient = useSMTPClient();
        await smtpClient.sendMail({
            to: entity.email,
            subject: 'Forgot Password - Reset code',
            html: `
            <p>Please use the code below to reset your account password.</p>
            <p>${entity.reset_hash}</p>
            `,
        });
    }

    return sendAccepted(res);
}

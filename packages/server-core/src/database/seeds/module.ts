/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { createNanoID } from '@authup/kit';
import type { DataSource, FindOptionsWhere } from 'typeorm';
import type { Seeder } from 'typeorm-extension';
import type {
    Robot,
    RobotRole,
    UserRole,
} from '@authup/core-kit';
import {
    PermissionName,
    REALM_MASTER_NAME,
    ROLE_ADMIN_NAME,
    ScopeName,
} from '@authup/core-kit';
import { hasOwnProperty, hash } from '@authup/server-kit';
import {
    PermissionEntity,
    RealmEntity,
    RobotEntity,
    RobotRoleEntity,
    RoleEntity,
    RolePermissionEntity,
    ScopeEntity,
    UserRepository,
    UserRoleEntity,
} from '../../domains';
import type { Config } from '../../config';
import { useConfig } from '../../config';
import type { DatabaseRootSeederResult } from './type';

function getPermissions(permissions?: string[]) {
    return Array.from(new Set([
        ...Object.values(PermissionName),
        ...(permissions || []),
    ]));
}

export class DatabaseSeeder implements Seeder {
    protected config: Config;

    protected options: Partial<Config>;

    constructor(options?: Partial<Config>) {
        this.config = useConfig();
        this.options = options || {};
    }

    private getOption<K extends keyof Config>(key: K) : Config[K] {
        if (
            hasOwnProperty(this.options, key) &&
            typeof this.options[key] !== 'undefined'
        ) {
            return this.options[key] as Config[K];
        }

        return this.config[key];
    }

    public async run(dataSource: DataSource) : Promise<any> {
        const response : DatabaseRootSeederResult = {};

        /**
         * Create default realm
         */
        const realmRepository = dataSource.getRepository(RealmEntity);
        let realm = await realmRepository.findOneBy({
            name: REALM_MASTER_NAME,
        });

        if (!realm) {
            realm = realmRepository.create({
                name: REALM_MASTER_NAME,
                built_in: true,
            });
        } else {
            realm.built_in = true;
        }

        await realmRepository.save(realm);

        // -------------------------------------------------

        // todo: maybe update existing scope attributes

        const scopeNames : string[] = Object.values(ScopeName);
        const scopeIds = [];

        const scopeRepository = dataSource.getRepository(ScopeEntity);

        const existingScopes = await scopeRepository.findBy({
            built_in: true,
        });
        const removableScopes : ScopeEntity[] = [];

        for (let i = 0; i < existingScopes.length; i++) {
            const index = scopeNames.indexOf(existingScopes[i].name);
            if (index === -1) {
                removableScopes.push(existingScopes[i]);
            } else {
                scopeIds.push(existingScopes[i].id);
                scopeNames.splice(index, 1);
            }
        }

        if (removableScopes.length > 0) {
            await scopeRepository.remove(removableScopes);
        }

        const scopes = scopeNames.map(
            (name: string) => scopeRepository.create({ name, built_in: true }),
        );
        if (scopes.length > 0) {
            await scopeRepository.save(scopes);

            scopeIds.push(...scopes.map((permission) => permission.id));
        }
        // -------------------------------------------------

        /**
         * Create default role
         */
        const roleRepository = dataSource.getRepository(RoleEntity);
        let role = await roleRepository.findOneBy({
            name: ROLE_ADMIN_NAME,
            realm_id: null,
        });
        if (!role) {
            role = roleRepository.create({
                name: ROLE_ADMIN_NAME,
                built_in: true,
            });
        }

        await roleRepository.save(role);

        // -------------------------------------------------

        /**
         * Create default user
         */
        const userRepository = new UserRepository(dataSource);
        let user = await userRepository.findOneBy({
            name: this.getOption('userAdminName'),
            realm_id: realm.id,
        });

        const userPassword = this.getOption('userAdminPassword');
        if (!user) {
            user = userRepository.create({
                name: this.getOption('userAdminName'),
                password: await hash(userPassword),
                email: 'peter.placzek1996@gmail.com',
                realm_id: realm.id,
                active: this.getOption('userAdminEnabled'),
            });

            response.user = user;
        } else {
            if (this.getOption('userAdminPasswordReset')) {
                user.password = await hash(userPassword);
            }

            user.active = this.getOption('userAdminEnabled');
        }

        await userRepository.save(user);
        // -------------------------------------------------

        /**
         * Create default user - role association
         */
        const userRoleData : Partial<UserRole> = {
            role_id: role.id,
            user_id: user.id,
        };

        const userRoleRepository = dataSource.getRepository(UserRoleEntity);
        let userRole = await userRoleRepository.findOneBy(userRoleData as FindOptionsWhere<UserRole>);

        if (!userRole) {
            userRole = userRoleRepository.create(userRoleData);
        }

        await userRoleRepository.save(userRole);

        // -------------------------------------------------

        /**
         * Create default robot account
         */
        const robotRepository = dataSource.getRepository<Robot>(RobotEntity);
        let robot = await robotRepository.findOneBy({
            name: this.getOption('robotAdminName'),
            realm_id: realm.id,
        });

        const secret = this.getOption('robotAdminSecret') || createNanoID(64);
        if (!robot) {
            robot = robotRepository.create({
                name: this.getOption('robotAdminName'),
                realm_id: realm.id,
                secret: await hash(secret),
                active: this.getOption('robotAdminEnabled'),
            });

            await robotRepository.save(robot);

            robot.secret = secret;
            response.robot = robot;
        } else {
            if (this.getOption('robotAdminSecretReset')) {
                robot.secret = await hash(secret);
            }

            robot.active = this.getOption('robotAdminEnabled');

            await robotRepository.save(robot);

            if (this.getOption('robotAdminSecretReset')) {
                robot.secret = secret;
                response.robot = robot;
            }
        }

        // -------------------------------------------------

        /**
         * Create default robot - role association
         */
        const robotRoleData : Partial<RobotRole> = {
            role_id: role.id,
            robot_id: robot.id,
        };

        const robotRoleRepository = dataSource.getRepository(RobotRoleEntity);
        let robotRole = await robotRoleRepository.findOneBy(robotRoleData as FindOptionsWhere<RobotRole>);

        if (!robotRole) {
            robotRole = robotRoleRepository.create(robotRoleData);
        }

        await robotRoleRepository.save(robotRole);

        // -------------------------------------------------

        /**
         * Create all permissions
         */
        let permissionNames : string[];
        const permissionNamesRaw = this.getOption('permissions');
        if (Array.isArray(permissionNamesRaw)) {
            permissionNames = getPermissions(permissionNamesRaw);
        } else if (typeof permissionNamesRaw === 'string') {
            permissionNames = getPermissions([permissionNamesRaw]);
        }

        const permissions : PermissionEntity[] = [];

        const permissionRepository = dataSource.getRepository(PermissionEntity);
        const existingPermissions = await permissionRepository.find();

        const permissionsToDrop : PermissionEntity[] = [];

        for (let i = 0; i < existingPermissions.length; i++) {
            if (existingPermissions[i].built_in) {
                const index = permissionNames.indexOf(existingPermissions[i].name);
                if (index === -1) {
                    permissionsToDrop.push(existingPermissions[i]);
                } else {
                    permissions.push(existingPermissions[i]);
                    permissionNames.splice(index, 1);
                }
            } else {
                permissions.push(existingPermissions[i]);
            }
        }

        if (permissionsToDrop.length > 0) {
            await permissionRepository.remove(permissionsToDrop);
        }

        const permissionsToAdd = permissionNames.map(
            (name) => permissionRepository.create({ name, built_in: true }),
        );
        if (permissionsToAdd.length > 0) {
            await permissionRepository.save(permissionsToAdd);

            permissions.push(...permissionsToAdd.map((permission) => permission));
        }

        // -------------------------------------------------

        /**
         * Assign all permissions to default role.
         */
        const rolePermissionRepository = dataSource.getRepository(RolePermissionEntity);

        const existingRolePermissions = await rolePermissionRepository.findBy({
            role_id: role.id,
        });

        const rolePermissionsToAdd : RolePermissionEntity[] = [];
        let index : number;
        for (let i = 0; i < permissions.length; i++) {
            index = existingRolePermissions.findIndex(
                (e) => e.permission_id === permissions[i].id,
            );
            if (index === -1) {
                rolePermissionsToAdd.push(rolePermissionRepository.create({
                    role_id: role.id,
                    role_realm_id: role.realm_id,
                    permission_id: permissions[i].id,
                    permission_realm_id: permissions[i].realm_id,
                }));
            }
        }

        if (rolePermissionsToAdd.length > 0) {
            await rolePermissionRepository.save(rolePermissionsToAdd);
        }

        return response;
    }
}

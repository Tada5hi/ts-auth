/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import type { IdentityProviderRole, Realm } from '@authup/core-kit';
import { Role } from '@authup/core-kit';
import { IdentityProviderEntity } from '../identity-provider';
import { RoleEntity } from '../role';
import { RealmEntity } from '../realm';

@Entity({ name: 'auth_identity_provider_roles' })
@Index(['provider_id', 'role_id'], { unique: true })
@Index(['provider_id', 'external_id'], { unique: true })
export class IdentityProviderRoleEntity implements IdentityProviderRole {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ type: 'varchar', length: 36 })
        external_id: string;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    // -----------------------------------------------

    @Column()
        role_id: string;

    @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'role_id' })
        role: Role;

    @Column({ nullable: true })
        role_realm_id: Realm['id'] | null;

    @ManyToOne(() => RealmEntity, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'role_realm_id' })
        role_realm: RealmEntity | null;

    @Column()
        provider_id: string;

    @ManyToOne(() => IdentityProviderEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'provider_id' })
        provider: IdentityProviderEntity;

    @Column({ nullable: true })
        provider_realm_id: Realm['id'] | null;

    @ManyToOne(() => RealmEntity, { onDelete: 'CASCADE', nullable: true })
    @JoinColumn({ name: 'provider_realm_id' })
        provider_realm: RealmEntity | null;
}

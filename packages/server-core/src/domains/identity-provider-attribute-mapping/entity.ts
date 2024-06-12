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
import type { IdentityProviderAttributeMapping, Realm } from '@authup/core-kit';
import { IdentityProviderEntity } from '../identity-provider';
import { RealmEntity } from '../realm';

@Entity({ name: 'auth_identity_provider_attribute_mappings' })
@Index(['provider_id', 'target_name'], { unique: true })
export class IdentityProviderAttributeMappingEntity implements IdentityProviderAttributeMapping {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
        synchronization_mode: string | null;

    @Column({ type: 'varchar', length: 64, nullable: true })
        source_name: string | null;

    @Column({ type: 'varchar', length: 128, nullable: true })
        source_value: string | null;

    @Column({ type: 'boolean', default: false })
        source_value_is_regex: boolean;

    @Column({ type: 'varchar', length: 64 })
        target_name: string;

    @Column({ type: 'varchar', length: 128, nullable: true })
        target_value: string | null;

    @CreateDateColumn()
        created_at: Date;

    @UpdateDateColumn()
        updated_at: Date;

    // -----------------------------------------------

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

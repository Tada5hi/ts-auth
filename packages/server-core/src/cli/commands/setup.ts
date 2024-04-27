/*
 * Copyright (c) 2021-2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import process from 'node:process';
import type { Arguments, Argv, CommandModule } from 'yargs';
import { useLogger } from '@authup/server-kit';
import { setupCommand } from '../../commands';
import {
    setupConfig, setupLogger,
} from '../../config';
import { buildDataSourceOptions } from '../../database';

interface SetupArguments extends Arguments {
    config: string | undefined;
    database: boolean;
    databaseSchema: boolean;
    databaseSeed: boolean;
    documentation: boolean;
}

export class SetupCommand implements CommandModule {
    command = 'setup';

    describe = 'Setup the server.';

    // eslint-disable-next-line class-methods-use-this
    builder(args: Argv) {
        return args
            .option('config', {
                alias: 'c',
                describe: 'Path to one ore more configuration files.',
            })

            .option('database', {
                alias: 'db',
                describe: 'Create database.',
                type: 'boolean',
            })

            .option('databaseSchema', {
                alias: 'db:schema',
                describe: 'Setup the schema of database.',
                type: 'boolean',
            })

            .option('databaseSeed', {
                alias: 'db:seed',
                describe: 'Seed database.',
                type: 'boolean',
            })

            .option('documentation', {
                alias: 'docs',
                describe: 'Create swagger documentation.',
                type: 'boolean',
            });
    }

    // eslint-disable-next-line class-methods-use-this
    async handler(args: SetupArguments) {
        const config = await setupConfig({
            filePath: args.config,
        });

        const dataSourceOptions = await buildDataSourceOptions();

        setupLogger({
            directory: config.writableDirectoryPath,
            env: config.env,
        });

        try {
            await setupCommand({
                dataSourceOptions,
                ...args,
            });
        } catch (e) {
            useLogger().error(e);

            process.exit(1);
        }

        process.exit(0);
    }
}

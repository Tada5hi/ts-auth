/*
 * Copyright (c) 2021-2023.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import http from 'node:http';
import process from 'node:process';
import type { Arguments, Argv, CommandModule } from 'yargs';
import { setupConfig } from '../../config';

interface HealthCheckArguments extends Arguments {
    config: string | undefined;
}

export class HealthCheckCommand implements CommandModule {
    command = 'healthcheck';

    describe = 'Check if the server is up and running.';

    builder(args: Argv) {
        return args
            .option('config', {
                alias: 'c',
                describe: 'Path to one ore more configuration files.',
            });
    }

    async handler(args: HealthCheckArguments) {
        const config = await setupConfig({
            filePath: args.config,
        });

        const healthCheck = http.request(
            {
                path: '/metrics',
                host: '0.0.0.0',
                port: config.port,
                timeout: 2000,
            },
            (res) => {
                if (res.statusCode === 200) {
                    process.exit(0);
                } else {
                    process.exit(1);
                }
            },
        );

        healthCheck.on('error', () => {
            process.exit(1);
        });

        healthCheck.end();
    }
}

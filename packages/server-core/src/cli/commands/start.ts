/*
 * Copyright (c) 2021-2022.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import type { Arguments, Argv, CommandModule } from 'yargs';
import { useLogger } from '@authup/server-kit';
import { executeStartCommand } from '../../commands';
import {
    applyConfig, buildConfig, readConfigRaw, setConfig,
} from '../../config';

interface StartArguments extends Arguments {
    configDirectory: string | undefined;
    configFile: string | undefined;
}

export class StartCommand implements CommandModule {
    command = 'start';

    describe = 'Start the server.';

    builder(args: Argv) {
        return args
            .option('configDirectory', {
                alias: 'cD',
                describe: 'Config directory path.',
            })
            .option('configFile', {
                alias: 'cF',
                describe: 'Name of one or more configuration files.',
            });
    }

    async handler(args: StartArguments) {
        const raw = await readConfigRaw({
            env: true,
            fs: {
                cwd: args.configDirectory,
                file: args.configFile,
            },
        });
        const config = buildConfig(raw);
        setConfig(config);
        applyConfig(config);

        try {
            await executeStartCommand();
        } catch (e) {
            useLogger().error(e);

            process.exit(1);
        }
    }
}

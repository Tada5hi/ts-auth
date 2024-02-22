/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

import { guard } from '@ucast/mongo2js';

import type {
    Ability, AbilityManagerFilterOptions,
} from './type';

export class AbilityManager {
    protected items: Ability[];

    // ----------------------------------------------

    constructor(input: Ability[] | Ability = []) {
        this.set(input);
    }

    // ----------------------------------------------

    /**
     * Check if permission is assigned with field and condition restriction.
     */
    satisfy(options: AbilityManagerFilterOptions) : boolean;

    satisfy(name: string, options?: AbilityManagerFilterOptions) : boolean;

    satisfy(name: AbilityManagerFilterOptions | string, options: AbilityManagerFilterOptions = {}) : boolean {
        let items : Ability[];
        if (typeof name === 'string') {
            options.name = name;
            items = this.find(options);
        } else {
            items = this.find({
                ...name,
                ...options,
            });
        }

        return items.length > 0;
    }

    /**
     * Check if permission is assigned without any restrictions.
     *
     * @param name
     */
    has(name: string | string[]) : boolean {
        if (Array.isArray(name)) {
            return name.some((item) => this.has(item));
        }

        const items = this.find({
            name,
        });

        return items.length > 0;
    }

    // ----------------------------------------------

    /**
     * Find the first matching ability.
     *
     * @param input
     */
    findOne(input?: string | AbilityManagerFilterOptions) : Ability | undefined {
        const items = this.find(input);
        if (items.length === 0) {
            return undefined;
        }

        return items[0];
    }

    /**
     * Find all matching abilities.
     *
     * @param input
     */
    find(input?: string | AbilityManagerFilterOptions) : Ability[] {
        if (typeof input === 'undefined') {
            return this.items;
        }

        let options : AbilityManagerFilterOptions;
        if (typeof input === 'string') {
            options = { name: input };
        } else {
            options = input;
        }

        const output : Ability[] = [];

        for (let i = 0; i < this.items.length; i++) {
            if (
                options.name &&
                this.items[i].name !== options.name
            ) {
                continue;
            }

            if (
                !options.inverse &&
                this.items[i].inverse
            ) {
                continue;
            }

            if (
                this.items[i].condition &&
                options.object
            ) {
                const test = guard(this.items[i].condition);
                if (!test(options.object)) {
                    continue;
                }
            }

            if (options.fn) {
                if (!options.fn(this.items[i])) {
                    continue;
                }
            }

            if (
                options.field &&
                this.items[i].fields
            ) {
                const fields = Array.isArray(options.field) ?
                    options.field :
                    [options.field];

                let index : number;
                let valid : boolean = true;
                for (let j = 0; j < fields.length; j++) {
                    index = this.items[i].fields.indexOf(fields[i]);
                    if (index === -1) {
                        valid = false;
                        break;
                    }
                }

                if (!valid) {
                    continue;
                }
            }

            if (
                options.target &&
                this.items[i].target &&
                this.items[i].target !== options.target
            ) {
                continue;
            }

            if (
                typeof options.power === 'number' &&
                typeof this.items[i].power === 'number' &&
                options.power > this.items[i].power
            ) {
                continue;
            }

            output.push(this.items[i]);
        }

        return output;
    }

    set(
        input: Ability[] | Ability,
        merge?: boolean,
    ) {
        const items = Array.isArray(input) ?
            input :
            [input];

        if (merge) {
            // todo: check if unique !
            this.items = [...this.items, ...items];
        } else {
            this.items = items;
        }

        this.items
            .sort((a, b) => {
                if (typeof a.target === 'undefined' || a.target === null) {
                    return -1;
                }

                if (typeof b.target === 'undefined' || b.target === null) {
                    return 1;
                }

                return 0;
            })
            .sort((a, b) => b.power - a.power);
    }
}

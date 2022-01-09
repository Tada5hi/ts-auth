/*
 * Copyright (c) 2021.
 * Author Peter Placzek (tada5hi)
 * For the full copyright and license information,
 * view the LICENSE file that was distributed with this source code.
 */

module.exports = {
    testSequencer: './test/utils/test-sequencer.js',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'jsx',
        'json',
        'node',
    ],
    testRegex: '(/unit/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
    testPathIgnorePatterns: [
        'writable',
        'dist',
        '/unit/mock-util.ts',
    ],
    coverageDirectory: 'writable/coverage',
    collectCoverageFrom: [
        'src/http/controllers/**/*.{ts,tsx,js,jsx}',
        '!src/**/*.d.ts',
    ],
    coverageThreshold: {
        global: {
            branches: 58,
            functions: 77,
            lines: 73,
            statements: 73,
        },
    },
    rootDir: '../',
    verbose: true,
};

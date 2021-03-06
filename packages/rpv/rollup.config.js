import less from 'rollup-plugin-less-modules';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const pkg = require('./package.json');

const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
];

const input = './src/index.ts';

const typescriptOptions = {
    removeComments: true,
    module: 'es6',
    target: 'es5',
    jsx: 'react',
    allowSyntheticDefaultImports: true,
    resolveJsonModule: true,
    moduleResolution: 'node',
};

export default [
    // CJS
    {
        input,
        output: {
            file: './npm/cjs/rpv.js',
            format: 'cjs',
        },
        external,
        plugins: [
            json(),
            less({
                output: './npm/cjs/rpv.css',
                sourcemap: false,
            }),
            typescript(typescriptOptions),
        ],
    },

    // Minified CJS
    {
        input,
        output: {
            file: './npm/cjs/rpv.min.js',
            format: 'cjs',
        },
        external,
        plugins: [
            json(),
            less({
                output: './npm/cjs/rpv.css',
                sourcemap: false,
            }),
            typescript(typescriptOptions),
            terser(),
        ],
    }
];

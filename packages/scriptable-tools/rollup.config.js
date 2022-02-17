/** @format */

import { terser } from 'rollup-plugin-terser';

export default [
	{
		input: './src/index.js',
		output: [
			{
				file: './dist/index.esm.js',
				format: 'esm',

				sourcemap: true,
			},
			{
				file: './dist/index.js',
				format: 'cjs',
				plugins: [terser({ module: false, toplevel: true })],
				sourcemap: true,
			},
		],
	},
];

/** @format */

import { terser } from 'rollup-plugin-terser';
import config from './scriptable.config.js';

export default [
	{
		input: config.input,
		output: [
			{
				file: config.output,
				format: 'esm',
				plugins: [
					terser({
						module: true,
						compress: config.minify,
						mangle: config.minify,
					}),
				],
			},
		],
	},
];

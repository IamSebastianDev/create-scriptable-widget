/** @format */

import { terser } from 'rollup-plugin-terser';
import config from './scriptable.config.js';
import { hostname } from 'node:os';

const port = process.env.PORT || config.server.port;
const intro = `const hostname = '${hostname()}:${port}';`;

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
				intro: !process.env.BUILD ? intro : '',
			},
		],
	},
];

/** @format */

import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import config from './scriptable.config.js';
import { hostname } from 'node:os';

// The hostname variable is added to the development bundle as intro property, to ensure that the remote
// method has access to it.

const port = process.env.PORT || config.server.port;
const intro = `const HOSTNAME = '${hostname()}:${port}';`;

export default [
	{
		input: config.input,
		output: [
			{
				file: config.output + config.widget.name + '.bundle.js',
				format: 'module',

				/**
				 * The bundle code will only be minified when the env.process.BUILD flag is set. This makes it easier
				 * to check if all desired files were correctly imported.
				 */

				plugins: [process.env.BUILD && terser()],

				/**
				 * The Intro statement is ommited during the build process, so that the remote method will not send
				 * requests to a undefined hostname/something that does not exist.
				 */

				intro: !process.env.BUILD ? intro : '',
			},
		],
		plugins: [nodeResolve()],
	},
];

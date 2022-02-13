/** @format */
/** @todo: improve documentation and do a code quality pass */

/**
 * This file is invoked by the npm run dev command.
 * The file is responsible for setting up the development workflow.
 *  - Creating the scriptable dev slug
 *  - Creating the development server
 *  - Invoking RollUp
 */

import { watch } from 'node:fs/promises';
import { spawnAsync } from '../internals/utilities/spawnAsync.mjs';
import { presentDetails, colours } from 'dev-server-details';
import config, { __root } from '../../config.mjs';
import { developmentMessage } from '../internals/utilities/cliOutputs.mjs';
import { colour } from '../internals/utilities/colour.mjs';
const logError = (string) => colour.namespace('red', `Error: ` + string);

// check if the widget has a name, and if not, exit.
/** @todo: These check might be better refractored to a config parser file. */
if (!config.widget.name || typeof config.widget.name !== 'string') {
	console.log(
		logError(
			'Your widget has no name. Please fix that. > scriptable.config.js > widget > name.'
		)
	);

	process.exit(1);
}

if (config.widget.name.includes(' ')) {
	console.log(
		logError(
			'The name of the widget cannot contain any spaces. Please fix that.'
		)
	);
	process.exit(1);
}

/**
 * Build the inital bundle for deployment, and create the fileWatcher that will incremently rebuild the bundle
 * when a change in the src folder is detected.
 */

const rootPath = config.input
	.split('/')
	.filter((elem, i, arr) => i !== arr.length)
	.join('/');

await spawnAsync('rollup --config rollup.config.js', { cwd: __root });
(async () => {
	const { signal } = new AbortController();
	const watcher = watch(__root + rootPath, { signal, recursive: true });
	for await (const event of watcher) {
		try {
			spawnAsync('rollup --config rollup.config.js', { cwd: __root });
		} catch (err) {
			if (err.name === 'AbortError') return;
			throw err;
		}
	}
})();

// Starts the server
spawnAsync('node ./bin/server/server.mjs');

// Build the dev slug
spawnAsync('node ./bin/internals/createSlug.mjs');

presentDetails({
	PORT: process.env.PORT || config.server.port,
	userText: developmentMessage,
	userTheme: {
		notice: colours.text.green,
	},
});

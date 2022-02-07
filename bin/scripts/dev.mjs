/** @format */

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
import config from '../../scriptable.config.js';
import { developmentMessage } from './cliOutputs.mjs';

/**
 * Build the inital bundle for deployment, and create the fileWatcher that will incremently rebuild the bundle
 * when a change in the src folder is detected.
 */

const rootPath = config.input
	.split('/')
	.filter((elem) => !elem.includes('.'))
	.join('/');

await spawnAsync('rollup --config rollup.config.js');
(async () => {
	const { signal } = new AbortController();
	const watcher = watch(rootPath, { signal, recursive: true });
	for await (const event of watcher) {
		try {
			spawnAsync('rollup --config rollup.config.js');
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

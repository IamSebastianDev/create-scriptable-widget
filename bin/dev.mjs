/** @format */

/**
 * This file is invoked by the npm run dev command.
 * The file is responsible for setting up the development workflow.
 *  - Creating the scriptable dev slug
 *  - Creating the development server
 *  - Invoking RollUp
 */

import { spawnAsync } from './utilities/spawnAsync.mjs';
import { presentDetails, colours } from 'dev-server-details';
import { sleep } from './utilities/sleep.mjs';
import config from '../scriptable.config.js';

// Starts the bundler in watch mode for incremental builds

const onRollup = ({ type, data }) => {};
spawnAsync('rollup --config rollup.config.js --watch', undefined, onRollup);

// Starts the server

const onServer = ({ type, data }) => {};
spawnAsync('node ./bin/internals/server.mjs', undefined, onServer);

// Build the dev slug

const onBuild = ({ type, data }) => {};
spawnAsync('node ./bin/internals/createSlug.mjs', undefined, onBuild);

await sleep(3000);
console.clear();
presentDetails({
	PORT: process.env.PORT || config.server.port,
	userText: {
		heading: '{{time}} create-scriptable-app: 🚀',
		main: !config.server.headless
			? 'Dashboard is now available at:'
			: 'App runs in headless mode. No dashboard is served.',
		text: config.server.headless
			? []
			: ['Local:             {{local}}', 'On your network:   {{ip}}'],
		notice: 'Copy the contents of ./scriptable/dev.slug.js into a fresh Scriptable widget to complete the setup process.',
	},
	userTheme: {
		notice: colours.text.green,
	},
});

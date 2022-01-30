#!/usr/bin/env node

/** @format */

import { namespaces } from './utilities/namespace.mjs';
import { getEnvArgs } from './utilities/getEnvArgs.mjs';
import { spawnAsync } from './utilities/spawnAsync.mjs';

// method to sanitze user input by escaping bad characters
const sanitize = (string) => string.replace(/(["\s'$`\\])/g, '\\$1');

/**
 * This is the main executable file enabling npx create-scriptable-app. The execute will clone this repo to the user
 * specified folder and execute a npm i to install all necessary scripts. It will then log a custom message to instruct
 * the user to open the directory and beginn the development process.
 */

(async () => {
	// get the envargs

	const args = getEnvArgs();

	/**
	 * Assert that a valid directory was specified by checking if:
	 * A --dir flag was passed with a valid path string.
	 * The args object has only a single value that is a valid path string.
	 *
	 * This will ensure the flexibilty to specifiy a dir + other options or simply pass a dir. A warning
	 * is logged if the above conditions are not met.
	 */

	if (
		Object.keys(args).length !== 1 &&
		(!args.dir || typeof args.dir != 'string')
	) {
		console.log(
			`${namespaces.cli} Error: No valid directory was passed as argument. Pass a single string as argument or use the --dir flag.`
		);
		process.exit(9);
	}

	const _DIR = sanitize(args.dir || Object.values(args)[0]);

	/**
	 * @private
	 * @type { string }
	 *
	 * The git repository to use as a template for the
	 */

	const _GITREPO = undefined;

	/**
	 * Use the spawnAsync wrapper to execute the shell commands and console.log their output.
	 */

	await spawnAsync(`git clone ${_GITREPO} ${_DIR}`);
	await spawnAsync(`rm -rf ${_DIR}/.git`);
	await spawnAsync(`npm install`, { cwd: _DIR });

	console.log(
		`${namespaces.cli} Success. You can now use cd ${_DIR} and npm run dev to start the development process.`
	);
})();

#!/usr/bin/env node

/** @format */
/** @todo: Improve documentation and do a code quality pass. Refractor colour method to utilities. */

import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { getEnvArgs } from '../internals/utilities/getEnvArgs.mjs';
import { spawnAsync } from '../internals/utilities/spawnAsync.mjs';
import { colour } from '../internals/utilities/colour.mjs';

const _TEMPLATE = `https://github.com/IamSebastianDev/Create-Scriptable-Template.git`;

/**
 * This is the main executable file enabling npx create-scriptable-app. The execute will clone this repo to the user
 * specified folder and execute a npm i to install all necessary scripts. It will then log a custom message to instruct
 * the user to open the directory and beginn the development process.
 */

// method to sanitze user input by escaping bad characters
const sanitize = (string) => string.replace(/(["\s'$`\\])/g, '\\$1');
const logError = (string) => colour.namespace('red', 'Error: ' + string);
const logSuccess = (string) => colour.namespace('green', string);

/**
 * Utility method to ensure that the target directory does not exsist and the provided string is actually usable.
 *
 * @param { {} } args - the arguments extracted by the getEnvArgs method
 * @return { Promise<string> } the sanitized string
 */

const ensureDirectory = async (args) => {
	const numberOfArguments = Object.keys(args).length;

	/**
	 * Assert that a valid directory was specified by checking if:
	 * A --dir flag was passed with a valid path string.
	 * The args object has only a single value that is a valid path string.
	 *
	 * This will ensure the flexibilty to specifiy a dir + other options or simply pass a dir. A warning
	 * is logged if the above conditions are not met.
	 */

	// check if a nothing was passed
	if (numberOfArguments === 0) {
		// exit with code 9 to indicate insufficent arguments
		console.log(
			logError(
				'No arguments were provided to the creator. Pass a single string to the command or use the --dir flag to provide a directory.'
			)
		);
		process.exit(9);
	}

	// check if more then one argument was passed, and if so, the args object contains a dir property.
	if (numberOfArguments !== 1 && (!args.dir || typeof args.dir != 'string')) {
		console.log(
			logError(
				'No valid directory argument was passed to the creator. Pass only a single string without spaces to the command or use the --dir flag to provide a directory.'
			)
		);
		process.exit(9);
	}

	// if a dir argument was found, sanitize the string to ensure no malicious code was passed. Then check if the directory already exits
	const dir = sanitize(args.dir || Object.values(args)[0]);

	if (existsSync(dir)) {
		console.log(
			logError(
				'Directory already exists. Please provide a non exsistent directory to the command.'
			)
		);
		process.exit(9);
	}

	return dir;
};

// Utility method to set the default name of the widget to the directory it was created in
// @todo: refractor this method into a utility method if it shows up more then once, maybe later
const setName = async (name) => {
	const path = `${name}/scriptable.config.js`;
	try {
		let content = await readFile(path, 'utf-8');
		content = content.replace('name: undefined', `name: '${name}'`);
		await writeFile(path, content, 'utf-8');
	} catch (e) {
		console.log(e);
	}
};

(async () => {
	const args = getEnvArgs();

	/**
	 * @type { string }
	 * The directory the new widget will be created into. The value is extract from the argument array gathered from
	 * the getEnvArgs method and then sanitized and checked for it's existence.
	 */

	const _DIR = await ensureDirectory(args);

	/**
	 * Use the _DIR variable to clone the repository to the target directory while supressing the output. Then remove
	 * the .git folder and install the dependencies. Set the name of the widget inside the config file to the created
	 * folder
	 */

	try {
		await spawnAsync(`git clone ${_TEMPLATE} ${_DIR}`);
		await spawnAsync(`rm -rf ${_DIR}/.git`);
		await spawnAsync(`npm install`, { cwd: _DIR });
		await setName(_DIR);
	} catch (e) {
		console.log(logError(e));
	}

	console.log(
		logSuccess(
			`Finished creating the widget. You can now use 'cd ${_DIR}' and 'npm run dev' to start the development process.`
		)
	);
})();

/** @format */

import { spawn } from 'node:child_process';

/**
 * Utility method that wraps child_process.spawn in a promise and makes the api a bit simpler.
 *
 * @param { string } commandString - the command string to execute. The string is split at " " into the command and
 * arguments.
 * @param { Object } config - the spawn config object
 * @param { function } listener - A function that will receive a event object as parameter. Can be used to check on
 * stdout and stderr events, while the promise is still resolving.
 *
 * @returns { Promise <void>}
 */

export const spawnAsync = (commandString, config, listener) =>
	new Promise((resolve, reject) => {
		const [command, ...args] = commandString.split(' ');
		const stream = spawn(command, [...args], config);

		stream.on('error', (error) => {
			reject(error);
			process.exit(1);
		});
		stream.stdout.on('data', (data) => {
			listener && listener({ type: 'stdout', data });
			console.log(data.toString());
		});
		stream.stderr.on('data', (data) => {
			listener && listener({ type: 'stderr', data });
			console.log(data.toString());
		});

		stream.on('close', (code) => resolve({ code }));
	});

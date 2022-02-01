/** @format */

import { fetch } from './fetch.mjs';

const dispatch = async (receive) => {
	// check if the global hostname constant is set and return if it does not exist.
	// in theory, setting a own constant can be used to communicate with a custom server
	// if desired by the consumer.
	if (!HOSTNAME || typeof HOSTNAME !== 'string') {
		return;
	}

	const { type, data } = receive;
	if (data.optionalParams.length === 0) {
		delete data.optionalParams;
	}

	const payload = { type, data: !data.optionalParams ? data.message : data };
	const address = 'http://' + HOSTNAME + '/socket';
	await fetch(address, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(payload),
	});
};

export const remote = {
	/**
	 * Method will log a message to the console, and dispatch the message to the development application. This method
	 * will only work in the development enviroment. All passed values are passed through to the console.log method to
	 * be logged by scriptable.
	 *
	 * @param {*} message primary message
	 * @param  {...any} optionalParams substitution values
	 */

	log: (message, ...optionalParams) => {
		console.log(message, ...optionalParams);
		dispatch({ type: 'log', data: { message, optionalParams } });
	},

	/**
	 * Method will log a warning to the console, and dispatch the warning to the development application. This method
	 * will only work in the development enviroment. All passed values are passed through to the console.log method to
	 * be logged by scriptable.
	 *
	 * @param {*} message primary message
	 * @param  {...any} optionalParams substitution values
	 */

	warn: (message, ...optionalParams) => {
		console.warn(message, ...optionalParams);
		dispatch({ type: 'warn', data: { message, optionalParams } });
	},

	/**
	 * Method will log a error to the console, and dispatch the error to the development application. This method
	 * will only work in the development enviroment. All passed values are passed through to the console.log method to
	 * be logged by scriptable.
	 *
	 * @param {*} message primary message
	 * @param  {...any} optionalParams substitution values
	 */

	error: (message, ...optionalParams) => {
		console.error(message, ...optionalParams);
		dispatch({ type: 'error', data: { message, optionalParams } });
	},
};

/** @format */

const handleOnRedirect = (method = 'follow', request) => {
	switch (method) {
		case 'follow':
			return request;
		case 'error':
			throw new Error(
				`CWS-Fetch: The request was redirected. Aborting with error.`
			);
		case 'manual':
			break;
		default:
			throw new Error(
				`CWS-Fetch: '${method} 'is not recognized as a valid redirect methid. Set method to 'follow', 'error' or 'manual'`
			);
	}
};

/**
 * A lightweight custom wrapper for the scriptable Request() method to more resemble the native fetch api.
 * Due to the limitations of the Request method, not all features are implemented.
 *
 * @param { string } resource the url the request should fetch from.
 * @param { {} } init - An object containing any custom settings that you want to apply to the request. The possible
 * options are:
 *  - method: The HTTP Method to use. Is 'GET' by default.
 *  - headers: Any headers to send with the request.
 *  - body: The request body.
 *  - redirect: What to do on redirect. Possible values are 'follow' to allow redirects, 'error' to abort with an error
 * and 'manual' to handle the redirect manually.
 *  - allowInsecureRequest: By default Scriptable will attempt to reject requests that are deemed insecure. Set to true
 * to overwrite.
 */

const fetch = async (resource, init) =>
	new Promise(async (resolve) => {
		const req = new Request(resource);
		req.method = init.method || 'GET';
		req.headers = init.headers;
		req.body = init.body;
		req.redirect = handleOnRedirect.bind(null, init.redirect);
		req.allowInsecureRequest = init.allowInsecureRequest || false;

		const response = await req.load();
		resolve(response);
	});

/** @format */

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

const remote = {
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

export { fetch, remote };
//# sourceMappingURL=index.esm.js.map

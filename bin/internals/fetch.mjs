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

export const fetch = async (resource, init) =>
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

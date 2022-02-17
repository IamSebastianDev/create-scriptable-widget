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
export function fetch(resource: string, init: {}): Promise<any>;
export namespace remote {
    function log(message: any, ...optionalParams: any[]): void;
    function warn(message: any, ...optionalParams: any[]): void;
    function error(message: any, ...optionalParams: any[]): void;
}
//# sourceMappingURL=index.esm.d.ts.map
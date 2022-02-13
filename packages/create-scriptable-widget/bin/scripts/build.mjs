/** @format */

/**
 * This file is invoked by the npm run build command.
 * The file is responsible for building all relevant files
 *  - The [widgetname].widget.js file, which is the bootstrap file which will download the bundle
 *  - The [widgetname].bundle.js file, which is the actual widget file
 *  - The [widgetname].meta.json file, which contains the version number. The bootstrap file will check the version
 *      file for the current version and only update when the version is elapsed
 *  - The [widgetname].scriptable file, which is an actual scriptable file that can be used to install the widget
 */

import { spawnAsync } from '../internals/utilities/spawnAsync.mjs';
import config, { __root } from '../../config.mjs';
import { colour } from '../internals/utilities/colour.mjs';
const logError = (string) => colour.namespace('red', `Error: ` + string);

// check if the widget has a name, and if not, exit.
/** @todo: These check might be better refractored to a config parser file. */
if (!config.publicURL || typeof config.publicURL !== 'string') {
	console.log(
		logError(
			'You have not defined a publicURL. Without a public url, your widget will not work. Consult the documentation on more information, then set a public url in the scriptable.config.js file.'
		)
	);

	process.exit(1);
}

// set the build flag

process.env.BUILD = 'TRUE';

// clear the build dir before creating the new files
await spawnAsync('rm -rf ./build', { cwd: __root });

// generate the main bundle file
await spawnAsync('rollup --config rollup.config.js', { cwd: __root });

// Build the requiered files
await spawnAsync('node ./bin/internals/createSlug.mjs');
await spawnAsync('node ./bin/internals/createMeta.mjs');
await spawnAsync('node ./bin/internals/createScriptable.mjs');

// reset the build flag

process.env.BUILD = 'FALSE';

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

// set the build flag

process.env.BUILD = 'TRUE';

// generate the main bundle file
await spawnAsync('rollup --config rollup.config.js');

// Build the requiered files
await spawnAsync('node ./bin/internals/createSlug.mjs');
await spawnAsync('node ./bin/internals/createMeta.mjs');
await spawnAsync('node ./bin/internals/createScriptable.mjs');

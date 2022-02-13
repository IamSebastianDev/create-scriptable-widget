/** @format */

/**
 * @todo - This file should be cleaned up considerably
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import config, { __root } from '../../config.mjs';

const { color, glyph, name } = config.widget;

const widgetPath = path.join(
	process.cwd(),
	config.output,
	config.widget.name + '.widget.js'
);

const scriptable = {
	always_run_in_app: false,
	icon: {
		color,
		glyph,
	},
	name,
	script: await readFile(widgetPath, 'utf-8'),
	share_sheet_inputs: [],
};

try {
	const outputPath = path.join(
		__root,
		config.output,
		config.widget.name + '.scriptable'
	);
	await writeFile(outputPath, JSON.stringify(scriptable), 'utf-8');
} catch (e) {
	console.log(e);
}

/** @format */

/**
 * @todo - This file should be cleaned up considerably
 */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import config from '../../scriptable.config.js';

const { color, glyph, name } = config.widget;

const widgetPath = path.join(
	process.cwd(),
	config.dev,
	config.widget.name + '.dev.widget.js'
);

const scriptable = {
	icon: {
		color,
		glyph,
	},
	name,
	script: await readFile(widgetPath, 'utf-8'),
};

try {
	const outputPath = path.join(
		process.cwd(),
		config.output,
		config.widget.name + '.scriptable'
	);
	await writeFile(outputPath, JSON.stringify(scriptable), 'utf-8');
} catch (e) {
	console.log(e);
}

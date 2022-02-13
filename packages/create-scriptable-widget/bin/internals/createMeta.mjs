/** @format */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import config, { __root } from '../../config.mjs';

try {
	const outputPath = path.join(
		__root,
		config.output,
		config.widget.name + '.meta.json'
	);
	await writeFile(outputPath, JSON.stringify(config.widget), 'utf-8');
} catch (e) {
	console.log(e);
}

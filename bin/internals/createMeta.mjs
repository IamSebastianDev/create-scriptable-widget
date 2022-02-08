/** @format */

import { writeFile } from 'node:fs/promises';
import path from 'node:path';
import config from '../../scriptable.config.js';

try {
	const outputPath = path.join(
		process.cwd(),
		config.output,
		config.widget.name + '.meta.json'
	);
	await writeFile(outputPath, JSON.stringify(config.widget), 'utf-8');
} catch (e) {
	console.log(e);
}

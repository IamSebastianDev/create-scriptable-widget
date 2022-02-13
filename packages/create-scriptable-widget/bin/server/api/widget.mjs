/** @format */

import path from 'node:path';
import fs from 'node:fs/promises';
import config, { __root } from '../../../config.mjs';

/**
 * Method to supply the widget code found in the configured build output to the consumer.
 * This API is consumed by the scriptable widget.
 */

export const widget = async (req, res) => {
	const filepath = path.join(
		process.cwd(),
		config.output,
		config.widget.name + '.bundle.js'
	);
	const file = await fs.readFile(filepath, 'utf-8');
	res.send(file);
};

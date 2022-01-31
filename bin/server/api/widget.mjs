/** @format */

import path from 'node:path';
import fs from 'node:fs/promises';
import config from '../../../scriptable.config.js';

/**
 * Method to supply the widget code found in the configured build output to the consumer.
 * This API is consumed by the scriptable widget.
 */

export const widget = async (req, res) => {
	const filepath = path.join(process.cwd(), config.output);
	const file = await fs.readFile(filepath, 'utf-8');
	res.send(file);
};
/** @format */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { hostname } from 'node:os';
import config from '../../scriptable.config.js';

const port = process.env.PORT || config.server.port;
const hostnameAddress = `http://${hostname()}:${port}`;

const userArgs =
	config.widget.arguments.length !== 0
		? `'${config.widget.arguments.join(' ')}'`
		: null;

const sourcePath = path.join(process.cwd(), 'bin/internals/slugs/dev.slug.txt');
const sourceText = await readFile(sourcePath, 'utf-8');

const slug = sourceText
	.replace('%widgetname%', config.widget.name)
	.replace('%hostname%', hostnameAddress)
	.replace('%arguments%', userArgs);

const outputPath = path.join(process.cwd(), 'scriptable/dev.slug.js');
await writeFile(outputPath, slug, 'utf-8');

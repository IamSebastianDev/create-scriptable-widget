/** @format */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { hostname } from 'node:os';
import config from '../../scriptable.config.js';

const port = process.env.PORT || config.server.port;
const hostnameAddress = `http://${hostname()}:${port}`;

const userArgs =
	config.widget.arguments.length !== 0 &&
	`'${config.widget.arguments.join(' ')}'`;

const sourcePath = path.join(
	process.cwd(),
	process.env.BUILD
		? 'bin/internals/slugs/build.slug.txt'
		: 'bin/internals/slugs/dev.slug.txt'
);
const sourceText = await readFile(sourcePath, 'utf-8');

const slug = sourceText
	.replace('%name%', config.widget.name)
	.replace('%hostname%', hostnameAddress)
	.replace('%arguments%', userArgs)
	.replace('%color%', config.widget.color)
	.replace('%glyph%', config.widget.glyph)
	.replace('%publicurl%', config.publicURL);

const outputPath = path.join(
	process.cwd(),
	process.env.BUILD ? config.output : config.dev,
	config.widget.name + `${process.env.BUILD ? '' : '.dev'}.widget.js`
);
await writeFile(outputPath, slug, 'utf-8');

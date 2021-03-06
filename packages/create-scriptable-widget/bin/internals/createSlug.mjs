/** @format */

import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { assertDir } from './utilities/assertDir.mjs';
import { hostname } from 'node:os';
import config, { __root } from '../../config.mjs';

const port = process.env.PORT || config.server.port;
const hostnameAddress = `http://${hostname()}:${port}`;

const userArgs =
	config.widget.arguments.length !== 0 &&
	`'${config.widget.arguments.join(' ')}'`;

const sourcePath = path.join(
	process.cwd(),
	process.env.BUILD
		? './bin/internals/slugs/build.slug.txt'
		: './bin/internals/slugs/dev.slug.txt'
);

const sourceText = await readFile(sourcePath, 'utf-8');

const slug = sourceText
	.replace('%name%', config.widget.name)
	.replace('%hostname%', hostnameAddress)
	.replace('%arguments%', userArgs)
	.replace('%publicurl%', config.publicURL);

const outputDir = path.join(
	__root,
	process.env.BUILD ? config.output : config.dev
);
const outputPath = path.join(
	outputDir,
	config.widget.name + `${process.env.BUILD ? '' : '.dev'}.widget.js`
);

await assertDir(outputDir);
await writeFile(outputPath, slug, 'utf-8');

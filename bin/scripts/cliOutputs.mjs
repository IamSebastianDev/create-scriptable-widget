/** @format */

import path from 'node:path';
import config from '../../scriptable.config.js';

const outputPath = path.join(config.output, config.widget.name + '.widget.js');

export const developmentMessage = {
	heading: '{{time}} create-scriptable-app: 🚀',
	main: !config.server.headless
		? 'Dashboard is now available at:'
		: 'App runs in headless mode. No dashboard is served.',
	text: config.server.headless
		? []
		: ['Local:             {{local}}', 'On your network:   {{ip}}'],
	notice: `Copy the contents of ./${outputPath} into a fresh Scriptable widget to complete the setup process.`,
};

import fs from 'fs';
import path from 'path';

const pluginConfig: Cypress.PluginConfig = (on, config) => {
	fs.readFileSync(path.join(__dirname, '../../../../.env'), 'utf-8')
		.split('\n')
		.forEach((line) => {
			const pair = line.split('=');

			if (pair[0]?.startsWith('VITE')) {
				// remove carriage returns just in case
				config.env[pair[0]] = pair[1].replaceAll('\r', '');
			}
		});

	return config;
};

export default pluginConfig;

import { join } from 'path';

import { startDevServer } from '@cypress/vite-dev-server';

export function configureDevServer(
	on: Cypress.PluginEvents,
	config: Cypress.PluginConfigOptions
) {
	on('dev-server:start', async (options) => startDevServer({
			options,
			viteConfig: {
				configFile: join(__dirname, '../../vite.config.ts')
			}
		}));

	return config;
}

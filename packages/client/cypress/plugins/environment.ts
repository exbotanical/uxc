import fs from 'fs';
import { join } from 'path';

/**
 * Load environment variables into Cypress runtime.
 */
export function loadEnvironment(config: Cypress.PluginConfigOptions) {
	fs.readFileSync(join(__dirname, '../../../../example.env'), 'utf-8')
		.split('\n')
		.forEach((line) => {
			const pair = line.split('=');

			if (pair[0]?.startsWith('VITE')) {
				// need to remove carriage returns because windows still refuses to be POSIX compliant
				config.env[pair[0]] = pair[1].replaceAll('\r', '');
			}
		});

	return config;
}

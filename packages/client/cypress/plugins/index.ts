import { loadEnvironment } from './environment';
import { configureDevServer } from './server';

const pluginConfig: Cypress.PluginConfig = (on, config) => {
	loadEnvironment(config);
	configureDevServer(on, config);

	return config;
};

export default pluginConfig;

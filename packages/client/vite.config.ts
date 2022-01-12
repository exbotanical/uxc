import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const r = (dir: string) => resolve(__dirname, dir);

export default defineConfig({
	base: '/',
	build: {
		// < limit to base64 string
		assetsInlineLimit: 10000
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: "@import '@uxc/client/styles/index';"
			}
		}
	},
	plugins: [react()],
	resolve: {
		alias: {
			'@': r('./src')
		}
	},
	server: {
		open: true
	}
});

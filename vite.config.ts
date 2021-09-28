import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const r = (dir) => resolve(__dirname, dir);

export default defineConfig({
	base: '/',

	server: {
		open: true
	},

	plugins: [react()],

	resolve: {
		alias: {
			'@': r('./src')
		}
	},

	css: {
		preprocessorOptions: {
			scss: {
				additionalData: "@import '@/styles/index';"
			}
		}
	},

	build: {
		// < limit to base64 string
		assetsInlineLimit: 10000
	}
});

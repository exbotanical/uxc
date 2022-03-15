import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { config } from 'dotenv'; // <- must be exactly here
import { defineConfig } from 'vite';
import SvgLoader from 'vite-plugin-svg-icons';

const r = (dir: string) => resolve(__dirname, dir);

config({
	path: '../../.env'
});

export default defineConfig({
	base: '/',
	build: {
		assetsInlineLimit: 10000,
		rollupOptions: {
			preserveEntrySignatures: 'strict'
		}
	},
	css: {
		preprocessorOptions: {
			scss: {
				// additionalData: "@import '@/styles/index';"
			}
		}
	},
	optimizeDeps: {
		include: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux']
	},
	plugins: [
		react(),
		SvgLoader({
			// https://github.com/svg/svgo
			iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
			symbolId: 'icon-[name]'
		})
	],
	resolve: {
		alias: {
			'@': r('./src')
		}
	}
	// server: {
	// 	// see https://github.com/vitejs/vite/issues/3002
	// 	hmr: {
	// 		host: 'localhost',
	// 		protocol: 'ws'
	// 	},
	// 	host: '0.0.0.0',
	// 	open: false
	// }
});

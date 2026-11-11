/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './src/test/setup.js',
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		rollupOptions: {
			input: {
				main: resolve(fileURLToPath(new URL('.', import.meta.url)), 'index.html'),
				info: resolve(fileURLToPath(new URL('.', import.meta.url)), 'info.html'),
			},
		},
	},
	server: {
		hmr: {
			overlay: false,
		},
	},
});

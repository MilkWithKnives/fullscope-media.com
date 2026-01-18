import devtoolsJson from 'vite-plugin-devtools-json';
import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit(), devtoolsJson()],
	build: {
		sourcemap: false,
		rollupOptions: {
			onwarn(warning, defaultHandler) {
				// Suppress Flowbite @__PURE__ sourcemap noise
				if (warning.code === 'SOURCEMAP_ERROR' && /flowbite-svelte/.test(warning.loc?.file || '')) {
					return;
				}
				defaultHandler(warning);
			}
		}
	}
});

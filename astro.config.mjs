import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://maulana.dev',
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (/node_modules[\\/]three[\\/]build[\\/]three\.core/.test(id)) {
              return 'three-core';
            }
            if (/node_modules[\\/]three[\\/]/.test(id)) {
              return 'three-webgl';
            }
          }
        }
      }
    }
  }
});


import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import ViteRsw from 'vite-plugin-rsw';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      reactRefresh(),
      ViteRsw({
        crates: ['data'],
      }),
    ],
    server: {
      port: 8082,
    },
    build: {
      outDir: 'build/web',
    },
    base: './',
  };
});

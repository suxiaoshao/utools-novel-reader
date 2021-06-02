import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import ViteRsw from 'vite-plugin-rsw';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [
      reactRefresh(),
      ViteRsw({
        mode: 'release',
        target: 'web',
        crates: ['data'],
      }),
    ],
    server: {
      port: 8082,
    },
    build: {
      outDir: 'build/react',
    },
    base: './',
  };
});

import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@api', replacement: '/src/api' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: path.resolve(__dirname, '/src/components') },
      { find: '@hooks', replacement: path.resolve(__dirname, '/src/hooks') },
      { find: '@pages', replacement: path.resolve(__dirname, '/src/pages') },
      { find: '@query', replacement: '/src/query' },
      { find: '@redux', replacement: path.resolve(__dirname, '/src/redux') },
      { find: '@routes', replacement: '/src/routes' },
      { find: '@utils', replacement: path.resolve(__dirname, '/src/utils') }
    ]
  }
});

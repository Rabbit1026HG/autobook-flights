import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), svgr(), tsConfigPaths()],
  resolve: {
    alias: [{ find: '@', replacement: '/src/' }],
  },
});

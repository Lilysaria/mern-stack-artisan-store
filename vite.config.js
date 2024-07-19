import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // Absolute base path
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    },
    cors: true
  },
  plugins: [react()],
  build: {
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      input: './index.html',
      output: {
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
    cssCodeSplit: true,
  },
});

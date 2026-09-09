import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Forwards frontend calls to /api/* to the Express backend
      // so we can call fetch('/api/health') without hardcoding a host.
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
});

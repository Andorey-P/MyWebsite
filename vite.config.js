// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/MyWebsite/', // Replace with your repo name
  server: {
    host: '0.0.0.0',
    port: 5173
  }
});
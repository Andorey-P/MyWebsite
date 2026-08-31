// vite.config.js
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

export default defineConfig(({ command }) => ({
  base: '/MyWebsite/', // Replace with your repo name
  // Self-signed HTTPS cert for `npm run dev` only - iOS Safari requires a
  // secure context (https or localhost) before it'll expose the motion
  // sensors (DeviceOrientationEvent.requestPermission, deviceorientation
  // events) used by the chapter 1/7 gyro camera controls, so testing over
  // plain http://<lan-ip> silently gets nothing no matter the phone's tilt.
  // The build target stays plain http-agnostic static output - this only
  // affects the dev server.
  plugins: command === 'serve' ? [basicSsl()] : [],
  server: {
    host: '0.0.0.0',
    port: 5173
  }
}));
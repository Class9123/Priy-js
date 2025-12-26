import {
  defineConfig
} from 'vite';
import path from 'path';
import Scan from "./Package/plugin";

export default defineConfig( {
  resolve: {
    alias: {
      "priy": path.resolve(__dirname, "Package"),
      "@": path.resolve(__dirname, "src"),
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  plugins: [Scan()],
  server: {
    allowedHosts: ['.ngrok-free.app']
  }
})
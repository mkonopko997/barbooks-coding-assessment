import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://api.dev.cloud.barbooksaustralia.com/code-challenge/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/g": {
        target: "https://api.dev.cloud.barbooksaustralia.com/code-challenge/g",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/g/, ""),
      },
      cors: false,
    },
  },
  resolve: {
    alias: {
      src: path.resolve('src/'),
    },
  }
});

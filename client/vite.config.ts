import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "../build/dist",
  },
  server: {
    proxy: {
      "/api": "http://0.0.0.0:5000/",
      "/docs": "http://0.0.0.0:5000"
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

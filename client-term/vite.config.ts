import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import ViteRestart from "vite-plugin-restart";
import VitePluginRestart from "vite-plugin-restart";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePluginRestart({
      restart: ["*.[jt]s", "*.css", "*.[jt]sx", "*.html"],
    }),
  ],
});

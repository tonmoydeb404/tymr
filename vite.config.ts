import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import { ManifestOptions, VitePWA } from "vite-plugin-pwa";
import manifest from "./public/manifest.json";

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 4030,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: { enabled: false },
      manifest: manifest as ManifestOptions,
      manifestFilename: "manifest.json",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

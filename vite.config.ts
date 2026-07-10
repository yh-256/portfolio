import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // GitHub Actions sets VITE_BASE_PATH to "/<repository-name>/".
  // For a user site (username.github.io), set it to "/".
  base: mode === "production" ? process.env.VITE_BASE_PATH || "/portfolio/" : "/",
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
}));

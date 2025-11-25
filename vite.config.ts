import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    allowedHosts: [
      "be46055241ff.ngrok-free.app",
      ".ngrok-free.app",
      ".ngrok.io",
    ],
  },
});

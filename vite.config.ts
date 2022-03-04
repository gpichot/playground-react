import legacy from "@vitejs/plugin-legacy";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  plugins: [legacy(), reactRefresh()],
  esbuild: {},
  resolve: {
    alias: {
      // for TypeScript path alias import like : @/x/y/z
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});

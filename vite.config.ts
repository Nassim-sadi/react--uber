import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // load all .env variables into an object
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        //bind @ to /src and make it recognizable to vscode

        // https://vitejs.dev/config/#resolve-alias

        "@": fileURLToPath(new URL("./src", import.meta.url)), // this is correct
      },
    },
    server: {
      port: parseInt(env.VITE_PORT) || 5173,
    },
  };
});

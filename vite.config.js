import path from "path";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const STEAM = env.VITE_STEAM === "true";
  return {
    plugins: [vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 3
          }
        }
      }
    })],
    base: "./",
    outDir: STEAM ? "../AppFiles" : "dist",
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
        "vue": "@vue/compat",
      },
      extensions: [".js", ".vue"]
    }
  };
});

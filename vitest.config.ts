import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import path from "path";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
  ],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@lingui/react/macro": path.resolve(
        __dirname,
        "./src/__mocks__/lingui-macro.tsx",
      ),
    },
  },
});

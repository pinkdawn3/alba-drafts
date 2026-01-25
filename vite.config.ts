import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { lingui } from "@lingui/vite-plugin";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    tailwindcss(),
    lingui(),
  ],
  base: "/alba-drafts/",
  build: {
    sourcemap: true,
  },
});

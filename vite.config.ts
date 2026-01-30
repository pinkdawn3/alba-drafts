import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { lingui } from "@lingui/vite-plugin";
import flowbiteReact from "flowbite-react/plugin/vite";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    tailwindcss(),
    flowbiteReact(),
    lingui(),
  ],
  base: "/alba-drafts/",
  build: {
    sourcemap: true,
  },
});

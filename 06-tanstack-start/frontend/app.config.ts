import { defineConfig } from "@tanstack/react-start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  tsr: {
    target: "react",
    autoCodeSplitting: true,
    appDirectory: "src",
  },
  vite: {
    plugins: [tailwindcss()],
  },
});

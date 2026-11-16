import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const hasResume = fs.existsSync(path.resolve(process.cwd(), "public/resume.pdf"));

export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const hasResume = fs.existsSync(path.resolve(process.cwd(), "public/resume.pdf"));
const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://varun-singh-portfolio.vercel.app").replace(/\/$/, "");

export default defineConfig({
  plugins: [react()],
  define: {
    __HAS_RESUME__: JSON.stringify(hasResume),
    __SITE_URL__: JSON.stringify(siteUrl),
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});

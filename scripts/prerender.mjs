import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve(process.cwd(), "dist");
const ssrDir = path.resolve(process.cwd(), "dist-ssr");

const templatePath = path.join(distDir, "index.html");
let template = fs.readFileSync(templatePath, "utf-8");

const entryFile = fs
  .readdirSync(ssrDir)
  .find((file) => file.startsWith("entry-server") && file.endsWith(".js"));

if (!entryFile) {
  throw new Error("Could not find SSR bundle in dist-ssr/");
}

const { render } = await import(pathToFileURL(path.join(ssrDir, entryFile)).href);
const appHtml = render("/");

// Preload primary Plus Jakarta Sans latin woff2 fonts
const assetsDir = path.join(distDir, "assets");
const fontPreloads = fs
  .readdirSync(assetsDir)
  .filter(
    (file) =>
      file.endsWith(".woff2") &&
      (file.startsWith("plus-jakarta-sans-latin-400-normal-") ||
        file.startsWith("plus-jakarta-sans-latin-700-normal-"))
  )
  .map(
    (file) =>
      `    <link rel="preload" as="font" type="font/woff2" href="/assets/${file}" crossorigin />`
  )
  .join("\n");

if (fontPreloads) {
  template = template.replace("</head>", `${fontPreloads}\n  </head>`);
}

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://varun-singh-portfolio.vercel.app").replace(/\/$/, "");
const html = template
  .replaceAll("__SITE_URL__", siteUrl)
  .replace("<!--app-html-->", appHtml);
fs.writeFileSync(templatePath, html, "utf-8");
console.log("Prerendered dist/index.html successfully.");

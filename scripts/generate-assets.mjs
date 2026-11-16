import fs from "node:fs";
import path from "node:path";
import { Resvg } from "@resvg/resvg-js";

const siteUrl = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://varun-singh.vercel.app").replace(/\/$/, "");
const siteHost = siteUrl.replace(/^https?:\/\//, "");

const publicDir = path.resolve(process.cwd(), "public");
fs.mkdirSync(publicDir, { recursive: true });

const fontFiles = [
  path.resolve(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff2"),
  path.resolve(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2"),
  path.resolve(process.cwd(), "node_modules/@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2"),
  path.resolve(process.cwd(), "node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2"),
].filter((f) => fs.existsSync(f));

const fontConfig = {
  fontFiles,
  loadSystemFonts: false,
  defaultFontFamily: "Plus Jakarta Sans",
};

// 1. Generate 1200x630 Open Graph Image
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#09090B" />
  <rect x="48" y="48" width="1104" height="534" rx="20" fill="#111113" stroke="#27272A" stroke-width="2" />

  <!-- Top bar -->
  <circle cx="96" cy="100" r="6" fill="#22C55E" />
  <text x="116" y="106" fill="#A1A1AA" font-family="JetBrains Mono" font-size="18" font-weight="400">
    ${siteHost}
  </text>
  <text x="1104" y="106" text-anchor="end" fill="#A1A1AA" font-family="JetBrains Mono" font-size="18" font-weight="400">
    HYDERABAD · AI ENGINEER / FDE
  </text>

  <!-- Main Heading -->
  <text x="96" y="218" fill="#FAFAFA" font-family="Plus Jakarta Sans" font-size="64" font-weight="700" letter-spacing="-1.5">
    Varun Singh
  </text>
  <text x="96" y="282" fill="#E4E4E7" font-family="Plus Jakarta Sans" font-size="34" font-weight="600" letter-spacing="-0.5">
    Software engineer building agentic AI systems
  </text>
  <text x="96" y="334" fill="#A1A1AA" font-family="Plus Jakarta Sans" font-size="24" font-weight="400">
    RAG, MCP and tool-using agents · Python, TypeScript, React
  </text>

  <!-- Featured Projects Strip -->
  <rect x="96" y="400" width="490" height="128" rx="14" fill="#18181B" stroke="#27272A" stroke-width="1.5" />
  <text x="124" y="446" fill="#FAFAFA" font-family="Plus Jakarta Sans" font-size="26" font-weight="700">
    RAG Workbench
  </text>
  <text x="124" y="484" fill="#A1A1AA" font-family="JetBrains Mono" font-size="16" font-weight="400">
    Hybrid RRF · Reranking · 100% Recall@5
  </text>

  <rect x="614" y="400" width="490" height="128" rx="14" fill="#18181B" stroke="#27272A" stroke-width="1.5" />
  <text x="642" y="446" fill="#FAFAFA" font-family="Plus Jakarta Sans" font-size="26" font-weight="700">
    SDLC Agent Orchestrator
  </text>
  <text x="642" y="484" fill="#A1A1AA" font-family="JetBrains Mono" font-size="16" font-weight="400">
    MCP Tools · Vitest · Human-in-the-loop PR
  </text>
</svg>
`;

const ogResvg = new Resvg(ogSvg, { font: fontConfig });
fs.writeFileSync(path.join(publicDir, "og-image.png"), ogResvg.render().asPng());

// 2. Generate Favicon SVG & PNGs
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect x="4" y="4" width="172" height="172" rx="36" fill="#09090B" stroke="#27272A" stroke-width="6" />
  <text x="90" y="114" text-anchor="middle" fill="#FAFAFA" font-family="Plus Jakarta Sans" font-size="76" font-weight="700" letter-spacing="-3">VS</text>
</svg>
`;

fs.writeFileSync(path.join(publicDir, "favicon.svg"), faviconSvg, "utf-8");

const appleResvg = new Resvg(faviconSvg, {
  font: fontConfig,
  fitTo: { mode: "width", value: 180 },
});
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleResvg.render().asPng());

const fav32Resvg = new Resvg(faviconSvg, {
  font: fontConfig,
  fitTo: { mode: "width", value: 32 },
});
fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), fav32Resvg.render().asPng());

// 3. Generate robots.txt and sitemap.xml from SITE_URL
fs.writeFileSync(
  path.join(publicDir, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf-8"
);

fs.writeFileSync(
  path.join(publicDir, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`,
  "utf-8"
);

console.log(`Generated assets for ${siteUrl}: og-image.png, favicons, robots.txt, sitemap.xml`);

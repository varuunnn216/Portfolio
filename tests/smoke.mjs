import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 4174;
const BASE_URL = `http://127.0.0.1:${PORT}`;

const server = spawn("python3", ["-m", "http.server", String(PORT), "--directory", "dist"], {
  stdio: "ignore",
});

async function waitForServer(url, retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error(`Server did not start at ${url}`);
}

try {
  await waitForServer(BASE_URL);

  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    args: ["--no-sandbox", "--disable-gpu", "--headless=new"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => {
    pageErrors.push(err.message);
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });

  // 1. Check title
  const title = await page.title();
  assert.equal(title, "Varun Singh | AI Engineer and Full-Stack Developer");

  // 2. Check no console/page errors
  assert.equal(consoleErrors.length, 0, `Console errors: ${consoleErrors.join("; ")}`);
  assert.equal(pageErrors.length, 0, `Page errors: ${pageErrors.join("; ")}`);

  // 3. Check all project links return 200
  const projectLinks = await page.$$eval("#projects a[href^='http']", (els) =>
    Array.from(new Set(els.map((a) => a.href)))
  );
  assert.ok(projectLinks.length >= 6, `Expected >= 6 project links, got ${projectLinks.length}`);

  for (const url of projectLinks) {
    const res = await fetch(url, { redirect: "follow" });
    assert.equal(res.status, 200, `Expected 200 for ${url}, got ${res.status}`);
  }

  // 4. Check no horizontal overflow at 1440px and 390px
  const overflow1440 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert.equal(overflow1440, false, "Horizontal overflow detected at 1440px");

  await page.setViewportSize({ width: 390, height: 844 });
  const overflow390 = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth
  );
  assert.equal(overflow390, false, "Horizontal overflow detected at 390px");

  await browser.close();
  console.log(`Smoke test passed: title OK, ${projectLinks.length} project links returned 200, 0 console errors, no overflow.`);
} finally {
  server.kill("SIGTERM");
}

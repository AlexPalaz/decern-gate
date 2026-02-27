#!/usr/bin/env node
/**
 * Renders docs/mappa-concettuale.mermaid to PNG.
 * Uses system Chrome on macOS if available, so you don't need to run
 * `npx puppeteer browsers install chrome-headless-shell`.
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const input = path.join(__dirname, "..", "docs", "mappa-concettuale.mermaid");
const output = path.join(__dirname, "..", "docs", "mappa-concettuale.png");

const env = { ...process.env };

if (process.platform === "darwin") {
  const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (fs.existsSync(chromePath)) {
    env.PUPPETEER_EXECUTABLE_PATH = chromePath;
  }
}

execSync(`npx mmdc -i "${input}" -o "${output}" -b transparent`, {
  stdio: "inherit",
  env,
});

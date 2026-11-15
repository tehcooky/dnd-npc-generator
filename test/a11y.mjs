import puppeteer from "puppeteer-core";
import { AxePuppeteer } from "@axe-core/puppeteer";

const url = process.env.A11Y_URL || "http://127.0.0.1:17341/";
const chrome = process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  const response = await page.goto(url, { waitUntil: "networkidle0" });
  if (!response || !response.ok()) {
    throw new Error(`Could not open ${url}. Start the site with: python3 -m http.server 17341 --bind 127.0.0.1`);
  }

  const creator = await new AxePuppeteer(page).analyze();
  let count = report("Creator", creator);

  await page.click("#save-pdf");
  await page.waitForSelector("#pdf-dialog[open]");
  const dialog = await new AxePuppeteer(page).analyze();
  count += report("PDF dialog", dialog);
  await page.click("#pdf-cancel");
  await page.waitForFunction(() => !document.querySelector("#pdf-dialog").open);

  await page.click("#create");
  await page.waitForSelector("#npc-name");
  const sheet = await new AxePuppeteer(page).analyze();
  count += report("Character sheet", sheet);

  if (count === 0) console.log("\nNo accessibility violations found.");
  process.exitCode = count ? 1 : 0;
} finally {
  await browser.close();
}

function report(title, results) {
  const violations = results.violations;
  console.log(`\n${title}: ${violations.length} violation${violations.length === 1 ? "" : "s"}`);
  for (const violation of violations) {
    console.log(`\n${(violation.impact || "issue").toUpperCase()} ${violation.id}`);
    console.log(violation.help);
    console.log(violation.helpUrl);
    for (const node of violation.nodes) {
      console.log(`- ${node.target.join(" ")}`);
      const summary = node.failureSummary?.split("\n").find((line) => line.trim());
      if (summary) console.log(`  ${summary.trim()}`);
    }
  }
  return violations.length;
}

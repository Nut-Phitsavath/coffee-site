import { test, expect } from "@playwright/test";

const WIDTHS = [390, 820, 1440];
const LANGS = ["lo", "en"];
const PAGES = ["", "/beans", "/beans/tha-teng-honey", "/story", "/where-to-buy"];

for (const width of WIDTHS) {
  for (const lang of LANGS) {
    for (const path of PAGES) {
      const name = `${width}-${lang}-${path.replaceAll("/", "_") || "home"}`;
      test(`${name}: no horizontal scroll, no console errors`, async ({ page }) => {
        const errors: string[] = [];
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        page.on("pageerror", (e) => errors.push(e.message));
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${lang}${path}`);
        await page.waitForLoadState("load");
        // scroll through so lazy images and reveals settle before the screenshot
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(900);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow, "horizontal overflow in px").toBeLessThanOrEqual(0);
        expect(errors).toEqual([]);
        await page.screenshot({ path: `test-results/screens/${name}.png`, fullPage: true });
      });
    }
  }
}

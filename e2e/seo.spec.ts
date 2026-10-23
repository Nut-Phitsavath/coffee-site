import { test, expect } from "@playwright/test";

test("story page head has title, hreflang and noindex", async ({ page }) => {
  await page.goto("/en/story");
  await expect(page).toHaveTitle("Our story | Brand Name");
  await expect(page.locator('link[rel="alternate"][hreflang="lo"]')).toHaveAttribute("href", "https://brandname.la/lo/story");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("sitemap lists every page in both languages", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  expect(xml).toContain("/lo/beans/house-espresso");
  expect(xml).toContain("/en/where-to-buy");
  expect(xml.match(/<loc>/g)).toHaveLength(16);
});

test("robots.txt disallows crawling while placeholder", async ({ request }) => {
  const txt = await (await request.get("/robots.txt")).text();
  expect(txt).toMatch(/Disallow: \//);
});

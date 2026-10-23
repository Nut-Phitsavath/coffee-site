import { test, expect } from "@playwright/test";

test("lao home shows hero copy and CTAs", async ({ page }) => {
  await page.goto("/lo");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ປູກເທິງພູພຽງບໍລະເວນ ຂົ້ວແບບຊ້າໆ");
  await page.getByRole("main").getByRole("link", { name: "ເບິ່ງເມັດກາເຟ" }).click();
  await expect(page).toHaveURL(/\/lo\/beans$/);
});

test("lao headline does not split the place name on a phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/lo");
  const lines = await page.getByRole("heading", { level: 1 }).evaluate((h1) => {
    const phrase = "ປູກເທິງພູພຽງບໍລະເວນ";
    const walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode()) && !node.textContent!.includes(phrase));
    const start = node!.textContent!.indexOf(phrase);
    const range = document.createRange();
    range.setStart(node!, start);
    range.setEnd(node!, start + phrase.length);
    return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
  });
  expect(lines).toBe(1);
});

test("english home has all sections", async ({ page }) => {
  await page.goto("/en");
  for (const h of ["This season's beans", "Coffee from the plateau", "Brew it at home", "Find Brand Name in Vientiane and Pakse"]) {
    await expect(page.getByRole("heading", { name: h })).toBeVisible();
  }
  await expect(page.getByText("1:16", { exact: true })).toBeVisible();
});

test("featured row opens its bean", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("main").getByRole("link", { name: /Tha Teng Honey/ }).first().click();
  await expect(page).toHaveURL(/\/en\/beans\/tha-teng-honey$/);
});

test.describe("no JS", () => {
  test.use({ javaScriptEnabled: false });
  test("below-fold content is visible without JS", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "Find Brand Name in Vientiane and Pakse" })).toHaveCSS("opacity", "1");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("below-fold content is visible without scrolling", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("load");
    await page.waitForTimeout(800); // let hydration and the reveal effect run
    await expect(page.getByRole("heading", { name: "Brew it at home" })).toHaveCSS("opacity", "1");
  });
});

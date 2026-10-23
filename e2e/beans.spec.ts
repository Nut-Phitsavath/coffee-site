import { test, expect, type Page } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 900 } });

const visibleCards = (page: Page) => page.locator("[data-bean-card]:visible");

test("roast filter works in place", async ({ page }) => {
  await page.goto("/en/beans");
  await expect(visibleCards(page)).toHaveCount(4);
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.waitForFunction(() => window.scrollY >= 290);
  const before = await page.evaluate(() => window.scrollY);

  const medium = page.getByRole("button", { name: "Medium roast" });
  await medium.click();
  await expect(medium).toHaveAttribute("aria-pressed", "true");
  await expect(visibleCards(page)).toHaveCount(2);
  await expect(visibleCards(page).getByRole("heading")).toHaveText(["Bolaven Natural", "Tha Teng Honey"]);
  expect(await page.evaluate(() => window.scrollY)).toBe(before);

  await page.getByRole("button", { name: "All" }).click();
  await expect(visibleCards(page)).toHaveCount(4);
});

test("card opens bean detail", async ({ page }) => {
  await page.goto("/en/beans");
  await page.getByRole("link", { name: /Paksong Washed/ }).click();
  await expect(page).toHaveURL(/\/en\/beans\/paksong-washed$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Paksong Washed");
  const main = page.getByRole("main");
  await expect(main.getByText("1,300 m", { exact: true })).toBeVisible();
  await expect(main.getByText("Typica", { exact: true })).toBeVisible();
  await expect(main.getByText("1:16", { exact: true })).toBeVisible();
  await main.getByRole("link", { name: "Where to buy" }).click();
  await expect(page).toHaveURL(/\/en\/where-to-buy$/);
});

test("more beans lists the other three", async ({ page }) => {
  await page.goto("/en/beans/paksong-washed");
  const more = page.locator("[data-more-beans]");
  await expect(more.getByRole("heading", { level: 3 })).toHaveText(["Bolaven Natural", "Tha Teng Honey", "House Espresso"]);
});

const NOT_FOUND = ["/lo/beans/nope", "/en/beans/nope", "/lo/about", "/en/story/extra", "/fr"];

for (const js of [true, false]) {
  test.describe(`404s are styled and bilingual (JS ${js ? "on" : "off"})`, () => {
    test.use({ javaScriptEnabled: js });
    for (const path of NOT_FOUND) {
      test(path, async ({ page }) => {
        const res = await page.goto(path);
        expect(res?.status()).toBe(404);
        await expect(page.locator("html")).toHaveAttribute("lang", "lo");
        await expect(page.getByRole("heading", { name: "ບໍ່ພົບໜ້ານີ້" })).toBeVisible();
        await expect(page.getByRole("heading", { name: "We couldn't find that page" })).toBeVisible();
        await expect(page.getByRole("link", { name: "ເບິ່ງເມັດກາເຟທັງໝົດ" })).toHaveAttribute("href", "/lo/beans");
        await expect(page.getByRole("link", { name: "See all beans" })).toHaveAttribute("href", "/en/beans");
        await expect(page.getByRole("banner")).toBeVisible();
        await expect(page).toHaveTitle("ບໍ່ພົບໜ້ານີ້ / We couldn't find that page | Brand Name");
      });
    }
  });
}

test("language switch keeps the bean and the scroll position", async ({ page }) => {
  await page.goto("/lo/beans/tha-teng-honey");
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForFunction(() => window.scrollY >= 590);
  await page.getByRole("banner").getByRole("link", { name: "EN", exact: true }).click();
  await expect(page).toHaveURL(/\/en\/beans\/tha-teng-honey$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  const y = await page.evaluate(() => window.scrollY);
  expect(Math.abs(y - 600)).toBeLessThan(50);
});

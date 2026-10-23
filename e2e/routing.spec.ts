import { test, expect } from "@playwright/test";

test("root redirects to Lao", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/lo$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "lo");
});

test("english root has lang=en", async ({ page }) => {
  const res = await page.goto("/en");
  expect(res?.status()).toBe(200);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("unknown locale is 404 (styled page covered in beans.spec)", async ({ page }) => {
  const res = await page.goto("/fr");
  expect(res?.status()).toBe(404);
});

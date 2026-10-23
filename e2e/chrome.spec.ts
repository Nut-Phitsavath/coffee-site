import { test, expect, type Page } from "@playwright/test";

test.describe("desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("nav marks the current page", async ({ page }) => {
    await page.goto("/en");
    const nav = page.getByRole("navigation", { name: "Main" });
    await expect(nav.getByRole("link")).toHaveCount(4);
    await expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("aria-current", "page");
    await expect(nav.getByRole("link", { name: "Our beans" })).not.toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeHidden();
  });

  test("language switch goes to the same page in the other language", async ({ page }) => {
    await page.goto("/lo");
    await page.getByRole("banner").getByRole("link", { name: "EN", exact: true }).click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("footer shows contact and photo credit", async ({ page }) => {
    await page.goto("/en");
    const footer = page.getByRole("contentinfo");
    await expect(footer).toContainText("+856 20 5555 0142");
    await expect(footer).toContainText("Pierre André, CC BY-SA 4.0");
  });
});

test.describe("phone", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  // The menu button only works once React has hydrated; retry the click until the dialog opens.
  const openMenu = async (page: Page) => {
    const dialog = page.getByRole("dialog");
    await expect(async () => {
      await page.getByRole("button", { name: "ເປີດເມນູ" }).click();
      await expect(dialog).toBeVisible({ timeout: 1000 });
    }).toPass();
    return dialog;
  };

  test("menu opens, closes on Escape and returns focus", async ({ page }) => {
    await page.goto("/lo");
    const openBtn = page.getByRole("button", { name: "ເປີດເມນູ" });
    await expect(openBtn).toBeVisible();
    await expect(page.getByRole("navigation", { name: "ເມນູຫຼັກ" })).toBeHidden();
    const dialog = await openMenu(page);
    await expect(dialog.getByRole("button", { name: "ປິດເມນູ" })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(openBtn).toBeFocused();
  });

  test("keyboard focus stays inside the open menu", async ({ page }) => {
    await page.goto("/lo");
    const dialog = await openMenu(page);
    // Never on page content behind the menu. (Native modal dialogs may hand focus to the browser UI, i.e. body, between cycles.)
    const focusInside = () => dialog.evaluate((d) => d.contains(document.activeElement) || document.activeElement === document.body);
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      expect(await focusInside()).toBe(true);
    }
    await dialog.getByRole("button", { name: "ປິດເມນູ" }).focus();
    await page.keyboard.press("Shift+Tab");
    expect(await focusInside()).toBe(true);
  });

  test("menu link navigates and closes the menu", async ({ page }) => {
    await page.goto("/lo");
    await (await openMenu(page)).getByRole("link", { name: "ເມັດກາເຟ" }).click();
    await expect(page).toHaveURL(/\/lo\/beans$/);
    await expect(page.getByRole("dialog")).toBeHidden();
  });
});

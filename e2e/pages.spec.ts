import { test, expect } from "@playwright/test";

test("story page shows the five steps in order", async ({ page }) => {
  await page.goto("/en/story");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("From the plateau to your cup");
  const steps = page.getByRole("main").getByRole("list").filter({ has: page.getByRole("heading", { name: "Pick" }) });
  await expect(steps.getByRole("listitem")).toHaveCount(5);
  await expect(steps.getByRole("heading")).toHaveText(["Pick", "Dry", "Hull and sort", "Roast", "Brew"]);
  await expect(page.getByText("Coffee cherries drying on a raised bed.").first()).toBeVisible();
});

test("where to buy lists places with map links", async ({ page }) => {
  await page.goto("/en/where-to-buy");
  await expect(page.getByRole("heading", { name: "Roastery and shop" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Pakse shop" })).toBeVisible();
  const map = page.getByRole("link", { name: "Open in Maps" }).first();
  await expect(map).toHaveAttribute("href", "https://www.google.com/maps/search/Ban%20Sisaket%20Vientiane");
  await expect(map).toHaveAttribute("target", "_blank");
  await expect(map).toHaveAttribute("rel", /noopener/);
});

test("copy button copies the phone number", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/en/where-to-buy");
  const btn = page.getByRole("button", { name: "Copy" }).first();
  await btn.click();
  await expect(page.getByRole("button", { name: "Copied" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe("+856 20 5555 0142");
  await expect(page.getByRole("button", { name: "Copied" })).toBeHidden({ timeout: 3000 });
});

test("where to buy in Lao", async ({ page }) => {
  await page.goto("/lo/where-to-buy");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ຊື້ໄດ້ທີ່ໃສ");
});

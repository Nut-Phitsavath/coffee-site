import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { expect, test } from "vitest";
import { getSiteContent } from "@/lib/content";

const sourceFiles = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? sourceFiles(p) : /\.(ts|tsx)$/.test(f) && !f.endsWith(".test.ts") ? [p] : [];
  });

test("brand name and nav labels come from the content module", async () => {
  const { brandName, ui } = await getSiteContent();
  expect(brandName).toBe("Brand Name");
  expect(ui.nav_main_label).toEqual({ en: "Main", lo: expect.any(String) });
  expect(ui.nav_footer_label.lo).not.toBe("");
});

test("no component, page or helper hard-codes the brand name or hero image path", () => {
  const offenders = [...sourceFiles("app"), ...sourceFiles("components"), path.join("lib", "metadata.ts")].filter((f) => {
    const src = readFileSync(f, "utf8");
    return src.includes("Brand Name") || src.includes("/images/hero.jpg");
  });
  expect(offenders).toEqual([]);
});

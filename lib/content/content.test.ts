import { expect, test } from "vitest";
import { getBean, getBeans, getBrewMethods, getPlaces, getSiteContent, getSteps, t, type Localized } from "@/lib/content";

const filled = (l: Localized) => l.lo.trim() !== "" && l.en.trim() !== "";
const localizedFields = (o: unknown): Localized[] =>
  o && typeof o === "object"
    ? "lo" in o && "en" in o
      ? [o as Localized]
      : Object.values(o).flatMap(localizedFields)
    : [];

test("every bean has both languages for every text field", async () => {
  for (const b of await getBeans()) expect(localizedFields(b).every(filled)).toBe(true);
});

test("there are four beans with unique slugs", async () => {
  const slugs = (await getBeans()).map((b) => b.slug);
  expect(slugs).toEqual(["paksong-washed", "bolaven-natural", "tha-teng-honey", "house-espresso"]);
});

test("every bean's brewMethod exists", async () => {
  const ids = new Set((await getBrewMethods()).map((m) => m.id));
  for (const b of await getBeans()) expect(ids.has(b.brewMethod)).toBe(true);
});

test("getBean returns null for unknown slug", async () => {
  expect(await getBean("nope")).toBeNull();
  expect((await getBean("tha-teng-honey"))?.name.en).toBe("Tha Teng Honey");
});

test("site content, steps, places and methods are fully translated", async () => {
  const all = [await getSiteContent(), ...(await getSteps()), ...(await getPlaces()), ...(await getBrewMethods())];
  for (const o of all) expect(localizedFields(o).every(filled)).toBe(true);
});

test("no em or en dashes in any copy", async () => {
  const text = JSON.stringify([await getSiteContent(), await getBeans(), await getSteps(), await getPlaces(), await getBrewMethods()]);
  expect(text).not.toMatch(/[\u2013\u2014]/);
});

test("featured bean exists", async () => {
  expect(await getBean((await getSiteContent()).featuredBeanSlug)).not.toBeNull();
});

test("t picks the requested language", () => {
  expect(t({ lo: "ລາວ", en: "English" }, "lo")).toBe("ລາວ");
  expect(t({ lo: "ລາວ", en: "English" }, "en")).toBe("English");
});

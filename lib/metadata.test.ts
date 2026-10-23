import { expect, test } from "vitest";
import { pageMetadata } from "@/lib/metadata";

const meta = await pageMetadata({ lang: "en", path: "/beans/paksong-washed", title: "Paksong Washed", description: "Washed at the farm." });

test("canonical and language alternates point at both locales", () => {
  expect(meta.alternates?.canonical).toBe("https://brandname.la/en/beans/paksong-washed");
  expect(meta.alternates?.languages).toEqual({
    lo: "https://brandname.la/lo/beans/paksong-washed",
    en: "https://brandname.la/en/beans/paksong-washed",
    "x-default": "https://brandname.la/lo/beans/paksong-washed",
  });
});

test("title gets the brand suffix, home is just the brand", async () => {
  expect(meta.title).toBe("Paksong Washed | Brand Name");
  expect((await pageMetadata({ lang: "lo", path: "", title: "ignored", description: "d" })).title).toBe("Brand Name");
});

test("placeholder site is noindex", () => {
  expect(meta.robots).toEqual({ index: false, follow: false });
});

test("open graph carries locale and hero image", () => {
  expect(meta.openGraph).toMatchObject({ locale: "en_US", images: ["/images/hero.jpg"] });
});

import { expect, test } from "vitest";
import { isCurrent, switchLocalePath, type Locale } from "@/lib/i18n";

test.each([
  ["/lo", "en", "/en"],
  ["/lo/", "en", "/en"],
  ["/lo/beans/tha-teng-honey", "en", "/en/beans/tha-teng-honey"],
  ["/en/where-to-buy", "lo", "/lo/where-to-buy"],
  ["/en/story?x=1", "lo", "/lo/story?x=1"],
])("switchLocalePath(%s, %s) = %s", (from, to, want) => {
  expect(switchLocalePath(from, to as Locale)).toBe(want);
});

test.each([
  ["/lo", "", true],
  ["/lo/", "", true],
  ["/lo/beans", "", false],
  ["/lo/beans/x", "/beans", true],
  ["/lo/beans", "/beans", true],
  ["/lo/story", "/beans", false],
])("isCurrent(%s, %s) = %s", (p, href, want) => {
  expect(isCurrent(p, href, "lo")).toBe(want);
});

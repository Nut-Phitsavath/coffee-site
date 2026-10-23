export const LOCALES = ["lo", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "lo";

export const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

/** Same page in another language: swaps only the first path segment. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const rest = pathname.replace(/^\/[^/?#]+/, "");
  return `/${to}${rest === "/" ? "" : rest}`;
}

/** Top-level section is active on its own page and anything below it ("" is home only). */
export function isCurrent(pathname: string, href: string, lang: Locale): boolean {
  const path = pathname.replace(/\/$/, "");
  const target = `/${lang}${href}`;
  return href === "" ? path === target : path === target || path.startsWith(`${target}/`);
}

import type { Metadata } from "next";
import { getSiteContent } from "./content";
import { LOCALES, DEFAULT_LOCALE, type Locale } from "./i18n";
import { SITE_NOINDEX, SITE_URL } from "./site";

export type PagePath = "" | "/beans" | `/beans/${string}` | "/story" | "/where-to-buy";

const url = (lang: Locale, path: PagePath) => `${SITE_URL}/${lang}${path}`;

export async function pageMetadata({ lang, path, title, description }: { lang: Locale; path: PagePath; title: string; description: string }): Promise<Metadata> {
  const { brandName, images } = await getSiteContent();
  return {
    metadataBase: new URL(SITE_URL),
    title: path === "" ? brandName : `${title} | ${brandName}`,
    description,
    alternates: {
      canonical: url(lang, path),
      languages: { ...Object.fromEntries(LOCALES.map((l) => [l, url(l, path)])), "x-default": url(DEFAULT_LOCALE, path) },
    },
    openGraph: { siteName: brandName, locale: lang === "lo" ? "lo_LA" : "en_US", images: [images.hero.src] },
    ...(SITE_NOINDEX && { robots: { index: false, follow: false } }),
  };
}

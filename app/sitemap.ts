import type { MetadataRoute } from "next";
import { getBeans } from "@/lib/content";
import { LOCALES } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = ["", "/beans", "/story", "/where-to-buy", ...(await getBeans()).map((b) => `/beans/${b.slug}`)];
  return LOCALES.flatMap((lang) => paths.map((p) => ({ url: `${SITE_URL}/${lang}${p}` })));
}

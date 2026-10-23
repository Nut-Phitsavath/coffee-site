import type { ui } from "./data";

export type Localized = { lo: string; en: string };
export type Roast = "light" | "medium" | "dark";
export type UiKey = keyof typeof ui;

/** `alt: null` marks a decorative image. */
export type ImageRef = { src: string; alt: Localized | null };

export type Bean = {
  slug: string;
  image: ImageRef;
  roast: Roast;
  brewMethod: string;
  name: Localized;
  process: Localized;
  variety: Localized;
  region: Localized;
  elevation: Localized;
  notes: Localized;
  description: Localized;
};

export type BrewMethod = { id: string; name: Localized; ratio: string; grind: Localized; time: Localized };
export type Step = { title: Localized; body: Localized };
export type Place = { name: Localized; address: Localized; hours: Localized; mapsQuery: string };

export type SiteImage = "hero" | "cherries" | "brew" | "texture" | "drying" | "roast" | "cafe";

export type SiteContent = {
  ui: Record<UiKey, Localized>;
  brandName: string;
  phone: string;
  facebook: string;
  featuredBeanSlug: string;
  images: Record<SiteImage, ImageRef>;
};

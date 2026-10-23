// The one door pages use to reach content.
// ponytail: getters read static data; swap these bodies for Sanity queries when the CMS arrives.
import type { Locale } from "@/lib/i18n";
import * as data from "./data";
import type { Bean, BrewMethod, Localized, Place, SiteContent, Step } from "./types";

export type * from "./types";

export const t = (value: Localized, lang: Locale): string => value[lang];

export async function getBeans(): Promise<Bean[]> {
  return data.beans;
}

export async function getBean(slug: string): Promise<Bean | null> {
  return data.beans.find((b) => b.slug === slug) ?? null;
}

export async function getBrewMethods(): Promise<BrewMethod[]> {
  return data.brewMethods;
}

export async function getSteps(): Promise<Step[]> {
  return data.steps;
}

export async function getPlaces(): Promise<Place[]> {
  return data.places;
}

export async function getSiteContent(): Promise<SiteContent> {
  return { ui: data.ui, brandName: data.brandName, phone: data.phone, facebook: data.facebook, featuredBeanSlug: data.featuredBeanSlug, images: data.images };
}

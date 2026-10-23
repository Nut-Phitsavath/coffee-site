import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeanGrid } from "@/components/BeanGrid";
import { beanMeta } from "@/components/BeanRow";
import { getBeans, getSiteContent, t } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Phrases } from "@/components/Phrases";

export async function generateMetadata({ params }: PageProps<"/[lang]/beans">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui } = await getSiteContent();
  return pageMetadata({ lang, path: "/beans", title: t(ui.nav_beans, lang), description: t(ui.beans_p, lang) });
}

export default async function BeansPage({ params }: PageProps<"/[lang]/beans">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [{ ui }, beans] = await Promise.all([getSiteContent(), getBeans()]);
  const tr = (k: keyof typeof ui) => t(ui[k], lang);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1 className="d1 sm"><Phrases text={tr("beans_h")} /></h1>
          <p className="lede">{tr("beans_p")}</p>
        </div>
      </section>
      <section className="sec pt0">
        <div className="wrap">
          <BeanGrid
            beans={beans.map((b) => ({
              slug: b.slug,
              href: `/${lang}/beans/${b.slug}`,
              name: t(b.name, lang),
              notes: t(b.notes, lang),
              meta: beanMeta(b, ui, lang),
              roast: b.roast,
              imageSrc: b.image.src,
            }))}
            labels={{ all: tr("f_all"), light: tr("light"), medium: tr("medium"), dark: tr("dark") }}
            groupLabel={tr("s_roast")}
            emptyLabel={tr("empty")}
          />
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BeanImage } from "@/components/BeanImage";
import { Reveal } from "@/components/Reveal";
import { getSiteContent, getSteps, t } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Phrases } from "@/components/Phrases";

export async function generateMetadata({ params }: PageProps<"/[lang]/story">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui } = await getSiteContent();
  return pageMetadata({ lang, path: "/story", title: t(ui.nav_story, lang), description: t(ui.story_lede, lang) });
}

export default async function StoryPage({ params }: PageProps<"/[lang]/story">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [{ ui, images }, steps] = await Promise.all([getSiteContent(), getSteps()]);
  const tr = (k: keyof typeof ui) => t(ui[k], lang);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1 className="d1"><Phrases text={tr("story_h")} /></h1>
        </div>
      </section>
      <figure className="full">
        <BeanImage image={images.drying} lang={lang} sizes="100vw" priority className="full-fig" />
        <figcaption className="wrap small cap-line">{tr("dry_cap")}</figcaption>
      </figure>
      <section className="sec">
        <div className="wrap prose">
          <Reveal as="p">{tr("story_lede")}</Reveal>
          <Reveal as="p">{tr("story_p1")}</Reveal>
          <Reveal as="p">{tr("story_p2")}</Reveal>
        </div>
      </section>
      <section className="sec pt0">
        <div className="wrap steps-grid">
          <BeanImage image={images.roast} lang={lang} sizes="(min-width: 1080px) 40vw, 100vw" className="steps-fig" />
          <div>
            <Reveal as="h2" className="d2">
              <Phrases text={tr("steps_h")} />
            </Reveal>
            <ol className="steps-list">
              {steps.map((s, i) => (
                <Reveal as="li" key={s.title.en} delay={i * 0.05}>
                  <h3>{t(s.title, lang)}</h3>
                  <p>{t(s.body, lang)}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeanImage } from "@/components/BeanImage";
import { BeanRow, beanMeta } from "@/components/BeanRow";
import { Button, TextLink } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { getBean, getBeans, getBrewMethods, getSiteContent, t } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Phrases } from "@/components/Phrases";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui } = await getSiteContent();
  return pageMetadata({ lang, path: "", title: t(ui.nav_home, lang), description: t(ui.hero_sub, lang) });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [{ ui, images, featuredBeanSlug }, beans, methods] = await Promise.all([getSiteContent(), getBeans(), getBrewMethods()]);
  const featured = (await getBean(featuredBeanSlug))!;
  const rest = beans.filter((b) => b.slug !== featured.slug);
  const tr = (k: keyof typeof ui) => t(ui[k], lang);

  return (
    <>
      <section className="hero hero-anim">
        <div className="hero-img">
          <Image src={images.hero.src} alt="" fill loading="eager" fetchPriority="high" sizes="100vw" />
        </div>
        <div className="hero-scrim" />
        <div className="wrap hero-wrap">
          <div className="hero-in">
            <p className="lbl">{tr("hero_eyebrow")}</p>
            <h1 className="d1"><Phrases text={tr("hero_h1")} /></h1>
            <p className="lede">{tr("hero_sub")}</p>
            <div className="ctas">
              <Button href={`/${lang}/beans`} arrow>
                {tr("see_beans")}
              </Button>
              <Button href={`/${lang}/where-to-buy`} variant="ghost">
                {tr("nav_buy")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <Reveal as="h2" className="d2">
              <Phrases text={tr("feat_h")} />
            </Reveal>
            <TextLink href={`/${lang}/beans`}>{tr("all_beans")}</TextLink>
          </div>
          <div className="feat-grid">
            <Reveal>
              <Link href={`/${lang}/beans/${featured.slug}`} className="feat-main zoom">
                <BeanImage image={featured.image} lang={lang} sizes="(min-width: 1080px) 55vw, (min-width: 700px) 50vw, 100vw" className="r45" />
                <div className="cap">
                  <h3 className="d3"><Phrases text={t(featured.name, lang)} /></h3>
                  <p className="notes">{t(featured.notes, lang)}</p>
                  <p className="meta">{beanMeta(featured, ui, lang)}</p>
                </div>
              </Link>
            </Reveal>
            <ul className="rows">
              {rest.map((b, i) => (
                <Reveal as="li" key={b.slug} delay={i * 0.06}>
                  <BeanRow bean={b} ui={ui} lang={lang} />
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="origin">
        <BeanImage image={images.cherries} lang={lang} sizes="100vw" className="origin-fig" />
        <div className="wrap origin-body">
          <div className="origin-txt">
            <Reveal as="h2" className="d2">
              <Phrases text={tr("origin_h")} />
            </Reveal>
            <Reveal as="p" className="body">
              {tr("origin_p")}
            </Reveal>
          </div>
          <dl className="facts">
            {(
              [
                ["f_elev", "f_elev_v"],
                ["f_where", "f_where_v"],
                ["f_harvest", "f_harvest_v"],
              ] as const
            ).map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <dt className="lbl">{tr(k)}</dt>
                <dd className="num">{tr(v)}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="sec">
        <div className="wrap brew-grid">
          <BeanImage image={images.brew} lang={lang} sizes="(min-width: 1080px) 40vw, 100vw" className="brew-fig" />
          <div className="brew-txt">
            <Reveal as="h2" className="d2">
              <Phrases text={tr("brew_h")} />
            </Reveal>
            <Reveal as="p" className="body">
              {tr("brew_p")}
            </Reveal>
            <div className="methods">
              {methods.map((m, i) => (
                <Reveal key={m.id} className="m" delay={i * 0.06}>
                  <h3 className="m-name">{t(m.name, lang)}</h3>
                  <p className="ratio">{m.ratio}</p>
                  <dl className="m-spec">
                    <div>
                      <dt>{tr("grind")}</dt>
                      <dd>{t(m.grind, lang)}</dd>
                    </div>
                    <div>
                      <dt>{tr("time")}</dt>
                      <dd className="num">{t(m.time, lang)}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="band-img">
          <Image src={images.texture.src} alt="" fill sizes="100vw" />
        </div>
        <div className="wrap band-in">
          <Reveal as="h2" className="d2">
            <Phrases text={tr("band_h")} />
          </Reveal>
          <Button href={`/${lang}/where-to-buy`} arrow>
            {tr("nav_buy")}
          </Button>
        </div>
      </section>
    </>
  );
}

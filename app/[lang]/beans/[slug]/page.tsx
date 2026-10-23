import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "@phosphor-icons/react/ssr";
import { BeanImage } from "@/components/BeanImage";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { getBean, getBeans, getBrewMethods, getSiteContent, t } from "@/lib/content";
import { LOCALES, isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Phrases } from "@/components/Phrases";

export async function generateStaticParams() {
  const beans = await getBeans();
  return LOCALES.flatMap((lang) => beans.map((b) => ({ lang, slug: b.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/beans/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const bean = await getBean(slug);
  if (!isLocale(lang) || !bean) return {};
  return pageMetadata({ lang, path: `/beans/${slug}`, title: t(bean.name, lang), description: t(bean.description, lang) });
}

export default async function BeanPage({ params }: PageProps<"/[lang]/beans/[slug]">) {
  const { lang, slug } = await params;
  const bean = await getBean(slug);
  if (!isLocale(lang) || !bean) notFound();
  const [{ ui }, beans, methods] = await Promise.all([getSiteContent(), getBeans(), getBrewMethods()]);
  const method = methods.find((m) => m.id === bean.brewMethod)!;
  const tr = (k: keyof typeof ui) => t(ui[k], lang);
  const specs = [
    [tr("s_region"), t(bean.region, lang)],
    [tr("s_elev"), t(bean.elevation, lang)],
    [tr("s_variety"), t(bean.variety, lang)],
    [tr("s_process"), t(bean.process, lang)],
    [tr("s_roast"), tr(bean.roast)],
    [tr("s_bag"), tr("bag_v")],
  ];

  return (
    <>
      <section>
        <div className="wrap det-grid">
          <BeanImage image={bean.image} lang={lang} sizes="(min-width: 1080px) 50vw, 100vw" priority className="det-fig" />
          <div className="det-body">
            <Link href={`/${lang}/beans`} className="back">
              <ArrowLeft size={16} aria-hidden />
              {tr("all_beans")}
            </Link>
            <h1 className="d1 sm"><Phrases text={t(bean.name, lang)} /></h1>
            <p className="notes-lg">{t(bean.notes, lang)}</p>
            <p className="body">{t(bean.description, lang)}</p>
            <dl className="specs">
              {specs.map(([k, v]) => (
                <div key={k}>
                  <dt className="lbl">{k}</dt>
                  <dd className="num">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="tip">
              <h2 className="lbl">{tr("how_brew")}</h2>
              <div className="tip-row">
                <span className="ratio">{method.ratio}</span>
                <span>
                  <strong>{t(method.name, lang)}</strong>
                  <br />
                  <span className="small">
                    {tr("grind")}: {t(method.grind, lang)}. {tr("time")}: {t(method.time, lang)}.
                  </span>
                </span>
              </div>
            </div>
            <div>
              <Button href={`/${lang}/where-to-buy`} arrow>
                {tr("nav_buy")}
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="sec pt0" data-more-beans="">
        <div className="wrap">
          <Reveal as="h2" className="d3">
            <Phrases text={tr("more")} />
          </Reveal>
          <div className="more-row">
            {beans
              .filter((b) => b.slug !== bean.slug)
              .map((b) => (
                <Link key={b.slug} href={`/${lang}/beans/${b.slug}`} className="mini zoom">
                  <BeanImage image={b.image} lang={lang} sizes="(min-width: 700px) 30vw, 74vw" className="sq" />
                  <div className="cap">
                    <h3 className="d4"><Phrases text={t(b.name, lang)} /></h3>
                    <p className="meta">{t(b.notes, lang)}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}

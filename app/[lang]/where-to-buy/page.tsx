import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, Clock } from "@phosphor-icons/react/ssr";
import { BeanImage } from "@/components/BeanImage";
import { CopyButton } from "@/components/CopyButton";
import { Reveal } from "@/components/Reveal";
import { getPlaces, getSiteContent, t } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/metadata";
import { Phrases } from "@/components/Phrases";

export async function generateMetadata({ params }: PageProps<"/[lang]/where-to-buy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { ui } = await getSiteContent();
  return pageMetadata({ lang, path: "/where-to-buy", title: t(ui.nav_buy, lang), description: t(ui.buy_p, lang) });
}

export default async function WhereToBuyPage({ params }: PageProps<"/[lang]/where-to-buy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const [{ ui, images, phone, facebook }, places] = await Promise.all([getSiteContent(), getPlaces()]);
  const tr = (k: keyof typeof ui) => t(ui[k], lang);
  const contacts = [
    [tr("phone"), phone],
    [tr("fb"), facebook],
  ];

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1 className="d1 sm"><Phrases text={tr("buy_h")} /></h1>
          <p className="lede">{tr("buy_p")}</p>
        </div>
      </section>
      <section className="sec pt0">
        <div className="wrap contact-grid">
          <div>
            {places.map((p) => (
              <Reveal as="article" key={p.mapsQuery} className="place">
                <h2 className="d3"><Phrases text={t(p.name, lang)} /></h2>
                <p>{t(p.address, lang)}</p>
                <p className="small with-icon">
                  <Clock size={16} aria-hidden />
                  <span className="num">{t(p.hours, lang)}</span>
                </p>
                <a className="maplink" href={`https://www.google.com/maps/search/${encodeURIComponent(p.mapsQuery)}`} target="_blank" rel="noopener noreferrer">
                  {tr("open_maps")}
                  <ArrowUpRight size={16} aria-hidden />
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal as="aside" className="reach">
            <BeanImage image={images.cafe} lang={lang} sizes="(min-width: 1080px) 40vw, 100vw" className="reach-fig" />
            <div className="reach-in">
              <h2 className="d3"><Phrases text={tr("reach_h")} /></h2>
              <p className="body">{tr("reach_p")}</p>
              {contacts.map(([label, value]) => (
                <div key={value} className="reach-row">
                  <div className="v">
                    <span className="small">{label}</span>
                    <strong className="num">{value}</strong>
                  </div>
                  <CopyButton value={value} label={tr("copy")} doneLabel={tr("copied")} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

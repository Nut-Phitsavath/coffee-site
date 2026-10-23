import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { t, type Bean, type UiKey, type Localized } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { BeanImage } from "./BeanImage";
import { Phrases } from "./Phrases";

/** "Natural · Medium roast" */
export const beanMeta = (bean: Bean, ui: Record<UiKey, Localized>, lang: Locale) =>
  `${t(bean.process, lang)} · ${t(ui[bean.roast], lang)}`;

export function BeanRow({ bean, ui, lang }: { bean: Bean; ui: Record<UiKey, Localized>; lang: Locale }) {
  return (
    <Link href={`/${lang}/beans/${bean.slug}`} className="row zoom">
      <BeanImage image={{ ...bean.image, alt: null }} lang={lang} sizes="84px" className="sq" />
      <div className="row-t">
        <h3 className="d4"><Phrases text={t(bean.name, lang)} /></h3>
        <p className="small">{t(bean.notes, lang)}</p>
        <p className="meta">{beanMeta(bean, ui, lang)}</p>
      </div>
      <ArrowRight size={20} aria-hidden className="row-arrow" />
    </Link>
  );
}

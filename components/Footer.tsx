import Link from "next/link";
import { FacebookLogo, MapPin, Phone } from "@phosphor-icons/react/ssr";
import { getPlaces, getSiteContent, t } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { NAV } from "./nav";

export async function Footer({ lang }: { lang: Locale }) {
  const [{ ui, phone, facebook, brandName }, places] = await Promise.all([getSiteContent(), getPlaces()]);
  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <Link href={`/${lang}`} className="wm">
              {brandName}
            </Link>
            <p className="small">{t(ui.ft_tag, lang)}</p>
          </div>
          <nav className="ft-nav" aria-label={t(ui.nav_footer_label, lang)}>
            {NAV.map((n) => (
              <Link key={n.href} href={`/${lang}${n.href}`}>
                {t(ui[n.key], lang)}
              </Link>
            ))}
          </nav>
          <div className="ft-reach">
            <span>
              <Phone size={18} aria-hidden />
              {phone}
            </span>
            <span>
              <FacebookLogo size={18} aria-hidden />
              {facebook}
            </span>
            <span>
              <MapPin size={18} aria-hidden />
              {t(places[0].address, lang)}
            </span>
          </div>
        </div>
        <p className="small ft-base">{t(ui.ft_credit, lang)}</p>
      </div>
    </footer>
  );
}

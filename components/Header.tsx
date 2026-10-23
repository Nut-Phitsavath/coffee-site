import Link from "next/link";
import { getSiteContent, t } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { MobileMenu } from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { NAV } from "./nav";

export async function Header({ lang }: { lang: Locale }) {
  const { ui, phone, brandName } = await getSiteContent();
  const navLabel = t(ui.nav_main_label, lang);
  const items = NAV.map((n) => ({ href: n.href, label: t(ui[n.key], lang) }));
  return (
    <header className="hd">
      <div className="wrap hd-in">
        <Link href={`/${lang}`} className="wm">
          {brandName}
        </Link>
        <NavLinks lang={lang} items={items} label={navLabel} className="nav" />
        <div className="hd-r">
          <LanguageSwitch lang={lang} label={t(ui.lang_label, lang)} />
          <MobileMenu
            lang={lang}
            items={items}
            navLabel={navLabel}
            brandName={brandName}
            openLabel={t(ui.menu, lang)}
            closeLabel={t(ui.close, lang)}
            langLabel={t(ui.lang_label, lang)}
            phone={phone}
          />
        </div>
      </div>
    </header>
  );
}

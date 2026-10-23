"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, switchLocalePath, type Locale } from "@/lib/i18n";

const NAMES: Record<Locale, string> = { lo: "ລາວ", en: "EN" };

export function LanguageSwitch({ lang, label }: { lang: Locale; label: string }) {
  const pathname = usePathname();
  return (
    <div className="lang" role="group" aria-label={label}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          href={switchLocalePath(pathname, l)}
          scroll={false}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
        >
          {NAMES[l]}
        </Link>
      ))}
    </div>
  );
}

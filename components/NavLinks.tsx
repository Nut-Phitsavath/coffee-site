"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isCurrent, type Locale } from "@/lib/i18n";
import type { NavItem } from "./nav";

type Props = {
  lang: Locale;
  items: NavItem[];
  label: string;
  className?: string;
  linkClassName?: string;
  trailing?: React.ReactNode;
  onNavigate?: () => void;
};

export function NavLinks({ lang, items, label, className, linkClassName, trailing, onNavigate }: Props) {
  const pathname = usePathname();
  return (
    <nav className={className} aria-label={label}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={`/${lang}${item.href}`}
          className={linkClassName}
          aria-current={isCurrent(pathname, item.href, lang) ? "page" : undefined}
          onClick={onNavigate}
        >
          {item.label}
          {trailing}
        </Link>
      ))}
    </nav>
  );
}

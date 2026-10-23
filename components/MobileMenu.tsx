"use client";

import { useRef } from "react";
import { ArrowRight, List, X } from "@phosphor-icons/react";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitch } from "./LanguageSwitch";
import { NavLinks } from "./NavLinks";
import type { NavItem } from "./nav";

type Props = {
  lang: Locale;
  items: NavItem[];
  navLabel: string;
  brandName: string;
  openLabel: string;
  closeLabel: string;
  langLabel: string;
  phone: string;
};

/** Full-screen menu on a native modal <dialog>: the page behind is inert, Escape closes, focus returns. */
export function MobileMenu({ lang, items, navLabel, brandName, openLabel, closeLabel, langLabel, phone }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const openBtn = useRef<HTMLButtonElement>(null);

  const open = () => {
    document.documentElement.style.overflow = "hidden";
    dialog.current?.showModal();
    openBtn.current?.setAttribute("aria-expanded", "true");
  };
  const close = () => dialog.current?.close();
  const onClose = () => {
    document.documentElement.style.overflow = "";
    openBtn.current?.setAttribute("aria-expanded", "false");
    openBtn.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <button ref={openBtn} type="button" className="icon-btn menu-open" aria-label={openLabel} aria-expanded="false" onClick={open}>
        <List size={20} aria-hidden />
      </button>
      <dialog ref={dialog} className="menu" aria-label={openLabel} onClose={onClose}>
        <div className="menu-top">
          <span className="wm">{brandName}</span>
          <button type="button" className="icon-btn" aria-label={closeLabel} onClick={close} autoFocus>
            <X size={20} aria-hidden />
          </button>
        </div>
        <NavLinks
          lang={lang}
          items={items}
          label={navLabel}
          className="menu-links"
          linkClassName="d2"
          trailing={<ArrowRight size={22} aria-hidden />}
          onNavigate={close}
        />
        <div className="menu-foot">
          <LanguageSwitch lang={lang} label={langLabel} />
          <p className="small">{phone}</p>
        </div>
      </dialog>
    </>
  );
}

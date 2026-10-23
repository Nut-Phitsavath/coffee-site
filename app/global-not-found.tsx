import Link from "next/link";
import { TextLink } from "@/components/Button";
import { Phrases } from "@/components/Phrases";
import { getSiteContent } from "@/lib/content";
import { fontVariables } from "./fonts";
import "./globals.css";

/**
 * One server-rendered 404 for every unmatched URL and every notFound().
 * The root layout lives in [lang], so a per-language not-found can't render on the server;
 * this page receives no props, so it says it in both languages (Lao first, the default).
 */
export default async function GlobalNotFound() {
  const { ui, brandName } = await getSiteContent();
  return (
    <html lang="lo" className={fontVariables}>
      <body>
        <title>{`${ui.not_found.lo} / ${ui.not_found.en} | ${brandName}`}</title>
        <header className="hd">
          <div className="wrap hd-in">
            <Link href="/lo" className="wm">
              {brandName}
            </Link>
          </div>
        </header>
        <main>
          <section className="page-head nf">
            <div className="wrap nf-grid">
              <div className="nf-lang">
                <h1 className="d1 sm">
                  <Phrases text={ui.not_found.lo} />
                </h1>
                <TextLink href="/lo/beans">{ui.not_found_link.lo}</TextLink>
              </div>
              <div className="nf-lang" lang="en">
                <h2 className="d1 sm">{ui.not_found.en}</h2>
                <TextLink href="/en/beans">{ui.not_found_link.en}</TextLink>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}

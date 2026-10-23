"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Roast } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Phrases } from "./Phrases";

export type BeanCardData = { slug: string; href: string; name: string; notes: string; meta: string; roast: Roast; imageSrc: string };
type Filter = "all" | Roast;
type Props = { beans: BeanCardData[]; labels: Record<Filter, string>; groupLabel: string; emptyLabel: string };

const FILTERS: Filter[] = ["all", "light", "medium", "dark"];

/** Beans list with an in-place roast filter (no navigation, no scroll change). */
export function BeanGrid({ beans, labels, groupLabel, emptyLabel }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = (b: BeanCardData) => filter === "all" || b.roast === filter;
  const count = beans.filter(shown).length;

  return (
    <>
      <div className="chips" role="group" aria-label={groupLabel}>
        {FILTERS.map((f) => (
          <button key={f} type="button" className="chip" aria-pressed={filter === f} onClick={() => setFilter(f)}>
            {labels[f]}
          </button>
        ))}
      </div>
      <div className="bean-grid">
        {beans.map((b) => (
          <div key={b.slug} className="card-cell" hidden={!shown(b)} data-bean-card="">
            <Reveal>
              <Link href={b.href} className="card zoom">
                <div className="ph r45">
                  <Image src={b.imageSrc} alt="" fill sizes="(min-width: 700px) 45vw, 100vw" />
                </div>
                <div className="cap">
                  <h2 className="d3"><Phrases text={b.name} /></h2>
                  <p className="notes">{b.notes}</p>
                  <p className="meta">{b.meta}</p>
                </div>
              </Link>
            </Reveal>
          </div>
        ))}
      </div>
      {count === 0 && <p className="empty">{emptyLabel}</p>}
    </>
  );
}

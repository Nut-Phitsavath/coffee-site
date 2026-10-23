import { Fragment } from "react";

/**
 * Lao has no spaces between words, and Chrome's Lao line breaker splits some names
 * (ບໍລະເວນ → ບໍລະ|ເວນ). Lao headings may only break at the spaces between phrases,
 * so each phrase becomes a no-wrap span (styled under :lang(lo) only).
 */
export function Phrases({ text }: { text: string }) {
  const parts = text.split(" ");
  return parts.map((p, i) => (
    <Fragment key={i}>
      <span className="phrase">{p}</span>
      {i < parts.length - 1 && " "}
    </Fragment>
  ));
}

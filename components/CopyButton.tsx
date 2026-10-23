"use client";

import { useRef, useState } from "react";

type Props = { value: string; label: string; doneLabel: string };

/** Copies `value`; if the clipboard is refused, selects the visible value so the visitor can copy it. */
export function CopyButton({ value, label, doneLabel }: Props) {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  const selectValue = () => {
    const strong = ref.current?.parentElement?.querySelector("strong");
    if (!strong) return;
    const range = document.createRange();
    range.selectNodeContents(strong);
    getSelection()?.removeAllRanges();
    getSelection()?.addRange(range);
  };

  const copy = () => {
    if (!navigator.clipboard) return selectValue();
    navigator.clipboard.writeText(value).then(() => {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    }, selectValue);
  };

  return (
    <button ref={ref} type="button" className="copy" onClick={copy}>
      {done ? doneLabel : label}
    </button>
  );
}

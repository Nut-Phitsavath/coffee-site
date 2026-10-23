"use client";

import { LazyMotion, domAnimation, m, useInView, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

// ponytail: `m` + domAnimation ships only the animate feature set (smaller than full `motion`)
const TAGS = { div: m.div, li: m.li, h2: m.h2, p: m.p, figure: m.figure, article: m.article, aside: m.aside };

type Props = { as?: keyof typeof TAGS; className?: string; delay?: number; children: React.ReactNode } & Record<`data-${string}`, string>;

/**
 * Rises 22px and fades in once when it scrolls into view.
 * Server HTML is always visible: only elements that start below the fold get hidden, after mount,
 * so no-JS visitors and above-the-fold content never wait on JavaScript.
 */
export function Reveal({ as = "div", className, delay = 0, children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    // Hiding below-the-fold content must happen before paint, so this effect sets state on purpose.
    if (!reduce && ref.current && ref.current.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce]);

  const Tag = TAGS[as];
  const hidden = armed && !inView && !reduce;
  return (
    <LazyMotion features={domAnimation} strict>
      <Tag
        ref={ref as never}
        className={className}
        initial={false}
        animate={hidden ? { opacity: 0, y: 22 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: hidden ? 0 : delay }}
        {...rest}
      >
        {children}
      </Tag>
    </LazyMotion>
  );
}

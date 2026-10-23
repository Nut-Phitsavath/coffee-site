import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

type Props = { href: string; variant?: "primary" | "ghost"; arrow?: boolean; children: React.ReactNode };

export function Button({ href, variant = "primary", arrow = false, children }: Props) {
  return (
    <Link href={href} className={`btn btn-${variant}`}>
      {children}
      {arrow && <ArrowRight size={18} aria-hidden />}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="tlink">
      {children}
      <ArrowRight size={16} aria-hidden />
    </Link>
  );
}

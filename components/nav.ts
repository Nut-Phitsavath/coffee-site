import type { UiKey } from "@/lib/content";

export const NAV = [
  { href: "", key: "nav_home" },
  { href: "/beans", key: "nav_beans" },
  { href: "/story", key: "nav_story" },
  { href: "/where-to-buy", key: "nav_buy" },
] as const satisfies readonly { href: string; key: UiKey }[];

export type NavItem = { href: string; label: string };

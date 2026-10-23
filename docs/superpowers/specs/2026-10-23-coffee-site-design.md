# Brand Name coffee site: frontend design

Date: 2026-10-23
Status: approved direction, awaiting spec review
Visual reference: test bench artifact https://claude.ai/artifact/NKiDPL8BaWpTGPhk5YZcrD (crema accent + serif headings is the chosen state)

## Intent

A client wants a website to promote a coffee bean product. They have no brand, copy or photos yet. We build an aesthetic, fully navigable placeholder site now so the client can see and react to something real, and so real content and a CMS can be dropped in later without redesigning or rewriting pages.

Success: the client opens the site on their phone, it already feels like a premium Lao coffee brand, and every later change is a content change, not a code change to pages.

## Goals

- Five page types, bilingual (Lao default, English), matching the approved bench at phone, tablet and desktop.
- All content comes through one typed content module, so a CMS (likely Sanity) can replace it by changing one file.
- Fast and static: every page prerendered, no server runtime required.

## Non-goals (for now)

- No CMS, no backend, no database, no admin.
- No cart, checkout, prices or accounts. "Where to buy" is the only conversion.
- No contact form (no backend to receive it).
- No language auto-detection from the browser. Visitors land on Lao and can switch.
- No light theme. The site is dark by design.

## Anti-goals (would be a failure even if it works)

- Looking like a template: generic hero, three equal feature cards, stock-gradient, Inter.
- Lao treated as a second-class translation: broken line breaks, clipped tone marks, Latin fallback fonts for Lao text.
- Content hard-coded inside page components, so swapping to a CMS means touching every page.
- The page jumping under the user when switching language or filtering beans.

## Decided by the user

| Topic | Decision |
|---|---|
| Stack | Next.js (App Router), TypeScript |
| Scope | Frontend only, placeholder content |
| Look | Dark roast editorial: espresso background, cream type, big moody photos |
| Accent | Crema gold `#D9A75E` |
| Headings | Serif: Gloock (Latin) + Noto Serif Lao |
| Pages | Home, Our beans, Bean detail, Story, Where to buy |
| Languages | Lao (default) and English |
| Brand name | Literal placeholder "Brand Name" |
| Buy action | Links to the Where to buy page, no cart |
| Images | Free stock photos, replaced by the client's later |
| Location | `D:\projects\coffee-site` |

## Claude's calls (user can override)

- **Routing for i18n:** a `[lang]` route segment with `generateStaticParams` for `lo` and `en`, plus a `next.config` redirect from `/` to `/lo`. No i18n library and no middleware/proxy. Reason: two locales and a handful of UI strings; content strings carry both languages themselves.
- **Content shape:** every translatable field is `{ lo: string; en: string }`. This is the same shape Sanity/Payload use for field-level translation, so the CMS swap keeps types intact.
- **Styling:** Tailwind CSS v4 with tokens in `@theme`. Motion (`motion/react`) for animation.
- **Icons:** Phosphor (`@phosphor-icons/react`), regular weight.
- **Tooling:** latest stable Next.js, npm, ESLint from `create-next-app`. Git repo initialised in `D:\projects\coffee-site`, work on a feature branch.
- **Hosting assumption:** Vercel (free tier). Nothing in the design depends on it; static output works anywhere.
- **Placeholder content:** Lao coffee from the Bolaven Plateau (Paksong), four beans, two shops, one phone number. All of it is invented and labelled as placeholder in the footer.
- **Lao copy:** drafted by Claude. Must be checked by a native speaker before the client sees it.

## Design tokens (locked)

Colours:

| Token | Hex | Use |
|---|---|---|
| `bg` | `#15100D` | page background (espresso) |
| `bg2` | `#1D1612` | alternate section, set-off panels |
| `bg3` | `#2A201B` | image placeholders, active language pill |
| `ink` | `#EEE3D1` | primary text (cream) |
| `ink2` | `#BBAA95` | secondary text, labels (passes 4.5:1 on `bg` and `bg2`) |
| `line` | `rgba(238,227,209,.14)` | dividers |
| `line2` | `rgba(238,227,209,.38)` | ghost button border |
| `accent` | `#D9A75E` | primary buttons, brew ratios, step numbers, links on dark |
| `on-accent` | `#15100D` | text on accent buttons |

Type (via `next/font/google`, `display: swap`):

| Role | Latin | Lao |
|---|---|---|
| Display / headings / wordmark | Gloock 400 | Noto Serif Lao 500/700 |
| Body / UI | Hanken Grotesk 400/500/600/700 | Noto Sans Lao Looped 400/500/600 |

One font stack per role with Latin first and Lao second, so mixed strings render each script in its own face.

Type scale (fluid, viewport-based in the real app):
- `d1` hero/page title: 2.5rem to 5.6rem, line-height 1.02
- `d1.sm` inner page title: 2.3rem to 4.5rem
- `d2` section heading: 1.95rem to 3.5rem, line-height 1.06
- `d3` card/sub heading: 1.45rem to 2rem
- `d4` row heading: 1.3rem
- body 16px / 1.6, lede 1.125rem, small 13px, label 12px uppercase +0.09em tracking

Lao rules (apply whenever `lang="lo"`):
- Headings: line-height 1.38, letter-spacing 0, slightly smaller sizes (bench values), `word-break: keep-all; overflow-wrap: anywhere` so lines break at the spaces between phrases, not inside words.
- Body line-height 1.8.
- Labels: no uppercase transform, no letter-spacing.
- `<html lang>` is set per locale.

Shape: buttons, chips and the language pill are full-pill. Photos and panels are square-cornered. No shadows on site content.

Breakpoints: phone below 700px, tablet 700 to 1079px, desktop 1080px and up. Content max width 1280px. Side padding 20 / 40 / 56px.

## Information architecture

| Route | Page |
|---|---|
| `/` | redirects to `/lo` |
| `/[lang]` | Home |
| `/[lang]/beans` | Our beans |
| `/[lang]/beans/[slug]` | Bean detail (4 static slugs) |
| `/[lang]/story` | Our story |
| `/[lang]/where-to-buy` | Where to buy |

Header (sticky, 64px, solid `bg`, bottom divider): wordmark left; nav centre-right on desktop (Home, Our beans, Our story, Where to buy) with `aria-current` underline in accent; language switch (ລາວ / EN pill); menu button on phone and tablet.

Language switch keeps the same page and slug, swapping only the `[lang]` segment, and keeps the scroll position.

Phone/tablet menu: full-screen overlay over the page (does not scroll the page), large serif links, language switch and phone number at the bottom, closes on Escape, link tap, or close button; focus returns to the menu button.

Footer: wordmark + tagline, nav, contact lines (phone, Facebook, address) with icons, and a credits line naming photo sources and saying all content is placeholder.

## Pages (sections in order)

The bench is the visual source of truth for each section's layout at all three widths.

**Home**
1. Hero: full-bleed photo (coffee beans in a burlap sack), dark scrim, left-aligned. Label, `d1` headline, lede, two buttons: "See the beans" (accent) and "Where to buy" (ghost). Bottom-aligned on phone/tablet, vertically centred on desktop.
2. This season's beans: `d2` + "All beans" text link. One featured bean large (4:5 image + caption), the other three as rows (square thumb, name, notes, process and roast, arrow). Two columns from tablet up.
3. Origin: full-bleed photo of Bolaven coffee cherries (4:5 phone, 16:9 tablet, 21:9 desktop), then heading + paragraph beside a facts list (Elevation, Grown around, Harvest) with values in the display face.
4. Brew it at home: photo (sticky on desktop) beside heading, paragraph, and four methods (Pour-over, French press, Lao sock filter, Espresso), each with ratio in large accent display type plus grind and time.
5. Band: dark beans texture with heavy scrim, `d2` "Find Brand Name in Vientiane and Pakse" + "Where to buy" button.

**Our beans**
- Page head: `d1.sm`, lede, roast filter chips (All, Light, Medium, Dark). Filtering happens in place (no navigation, no scroll jump) and has an empty state.
- Grid: one column on phone, two from tablet. Desktop staggers every second visible card down by 120px.
- Card: 4:5 image, name, tasting notes, "process · roast". Image zooms slightly on hover.

**Bean detail**
- Two columns on desktop with the image sticky. Back link, name, tasting notes (large), description, spec list in two columns (Region, Elevation, Variety, Process, Roast, Bag), a "How we brew it" panel on `bg2` with the ratio, and a "Where to buy" button.
- "More beans": the other three. Horizontal snap scroller on phone (no visible scrollbar), three columns from tablet.

**Our story**
- `d1` title, full-bleed drying-beds photo with a caption, three prose paragraphs (the first larger), then "How a bean gets to you" as a numbered list (Pick, Dry, Hull and sort, Roast, Brew) beside a roaster photo (sticky on desktop).

**Where to buy**
- `d1.sm` + lede. Places list (Roastery and shop in Vientiane, Pakse shop): name, address, hours with a clock icon, and an "Open in Maps" link to a Google Maps search in a new tab.
- Aside panel on `bg2`: café photo, "Order by message", delivery note, phone and Facebook rows each with a Copy button (shows "Copied", falls back to selecting the text).

## Content model and swap point

All content lives behind `lib/content/` (single public entry, e.g. `lib/content/index.ts`). Pages only call its async functions, never import raw data:

```ts
type Locale = "lo" | "en";
type Localized = { lo: string; en: string };
type Roast = "light" | "medium" | "dark";

type Bean = {
  slug: string; image: ImageRef; roast: Roast; brewMethod: string; // method id
  name: Localized; process: Localized; variety: Localized;
  region: Localized; elevation: Localized; notes: Localized; description: Localized;
};
type BrewMethod = { id: string; name: Localized; ratio: string; grind: Localized; time: Localized };
type Place = { name: Localized; address: Localized; hours: Localized; mapsQuery: string };
type ImageRef = { src: string; alt: Localized; width: number; height: number; credit?: string };

getBeans(): Promise<Bean[]>
getBean(slug): Promise<Bean | null>
getBrewMethods(): Promise<BrewMethod[]>
getPlaces(): Promise<Place[]>
getSiteContent(): Promise<SiteContent> // hero, origin, story, contact strings, footer, UI labels
```

Placeholder data is a typed TS file inside `lib/content/`. Replacing it with Sanity later means changing only the implementation of these functions. All strings shown in the bench, in both languages, are the starting copy; carry them over verbatim.

Unknown slugs and unsupported `[lang]` values return the Next not-found page.

## Images

- Stored locally in `public/images/`, rendered with `next/image` (hero `priority`, everything else lazy), explicit sizes to avoid layout shift.
- Sources used in the bench (download originals at about 2000px wide):
  - Unsplash photo IDs: hero `1524350876685-274059332603`, beans `1521302080334-4bebac2763a6`, `1587734195503-904fca47e0e9`, `1514432324607-a09d9b4aefdd`, `1497935586351-b67a49e012bf`, brew `1442512595331-e89e73853f31`, roaster `1511537190424-bbbab87ac5eb`, café `1453614512568-c4024d13c247`, texture `1447933601403-0c6688de566e`.
  - Wikimedia Commons: "Laos Plateau des Bolovens Plantations (3).jpg" by Pierre André, CC BY-SA 4.0 (credit required); "Coffee-cherries-afternoon-in-san-marcos-tarrazu-costa-rica.jpg", public domain.
- Never use photos showing another coffee brand's packaging.

## Motion

- Motion (`motion/react`), in small client-only leaf components; pages stay Server Components.
- Hero load-in: image settles from scale 1.06 over 1.6s; label, headline, lede and buttons rise 16px with an 80ms stagger.
- Scroll reveal: section headings, cards, rows, facts and steps rise 22px and fade in once when entering view. Content above the fold on load is never hidden.
- Hover: image zoom 1.04 on cards and rows, arrow nudges 3 to 4px, button press moves 1px down.
- Menu overlay fades and slides 10px.
- `prefers-reduced-motion: reduce` turns all of the above off.
- Easing `cubic-bezier(.16,1,.3,1)`.

## SEO and metadata

- Per page and per locale: title, description, Open Graph image (hero), `alternates.languages` for `lo` and `en` (hreflang), canonical.
- `sitemap.ts` covering both locales and all bean slugs. `robots.ts`.
- The site is placeholder content: keep `noindex` on until the client's real content ships (a single config flag).

## Accessibility

- Text contrast at least 4.5:1, including `ink2` and text on the accent button.
- Visible focus rings; `aria-current` on the active nav link; `aria-pressed` on filter chips and the language switch.
- Menu overlay is a modal dialog with focus moved in and returned on close.
- Alt text on content images in both languages; decorative images use empty alt.

## Verification (definition of done)

- `next build` succeeds with every route prerendered as static.
- Unit tests (Vitest) for the content module: every bean has both languages filled for every field, slugs are unique, every `brewMethod` id exists, `getBean` returns null for unknown slugs.
- Playwright e2e smoke: `/` redirects to `/lo`; every nav link works in both languages; the language switch keeps the same page; the bean filter hides and shows cards without changing scroll position; bean detail opens from a card; the phone menu opens, navigates and closes.
- Screenshots of every page at 390, 820 and 1440px wide in both languages: no horizontal scroll, no console errors, no clipped Lao tone marks.
- Lighthouse on Home (mobile): performance at least 90, accessibility 100.

## Left to the builder

Component breakdown, file layout beyond `lib/content/`, Tailwind token naming, exact fluid type formulas, how the language switch builds its target URL, test file organisation, and git branch naming.

## Open items (not blocking the build)

1. A native Lao speaker reviews all Lao copy.
2. Real brand name, logo, photos and copy from the client.
3. CMS choice when the client wants to edit: Sanity (hosted, free tier) recommended; Payload if they want to self-host.
4. Whether the client will ever sell online (would change the Where to buy page into a shop).

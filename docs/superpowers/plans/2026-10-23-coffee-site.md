# Brand Name Coffee Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A static, bilingual (Lao default, English) five-page Next.js promo site for a placeholder Lao coffee brand, matching the approved dark-roast bench.

**Architecture:** App Router with the root layout at `app/[lang]/layout.tsx` and `dynamicParams = false`, so every page is prerendered for `lo` and `en`. Pages are Server Components that read only from `lib/content` (the future CMS swap point). Interactivity lives in small client leaves: language switch, mobile menu, bean filter, copy button, scroll reveal.

**Tech Stack:** Next.js 16.4, React 19, TypeScript, Tailwind CSS 4.3 (`@tailwindcss/postcss`), Motion 14 (`motion/react`), `@phosphor-icons/react` 2.1, Vitest 5, Playwright 1.64.

**Spec:** `docs/superpowers/specs/2026-10-23-coffee-site-design.md`
**Visual and copy source of truth:** `docs/design/bench.src.html`. Its `T`, `METHODS`, `BEANS`, `STEPS`, `PLACES`, `PHONE`, `FB` objects hold every string in both languages, and its CSS holds every layout value per breakpoint. Port them verbatim, with the accent fixed to crema and headings fixed to serif.

## Global Constraints

- Accent `#D9A75E` (crema). Headings are serif only: Gloock + Noto Serif Lao. Drop the bench's Archivo/condensed and copper/cherry options.
- Tokens: bg `#15100D`, bg2 `#1D1612`, bg3 `#2A201B`, ink `#EEE3D1`, ink2 `#BBAA95`, line `rgba(238,227,209,.14)`, line2 `rgba(238,227,209,.38)`, on-accent `#15100D`.
- Body font Hanken Grotesk + Noto Sans Lao Looped. All fonts via `next/font/google`, exposed as CSS variables.
- Breakpoints: tablet `min-width: 700px`, desktop `min-width: 1080px` (media queries in the app, replacing the bench's container queries). Wrap max width 1280px, side padding 20/40/56px.
- Lao (`:lang(lo)`): headings line-height 1.38, letter-spacing 0, `word-break: keep-all; overflow-wrap: anywhere`, bench's smaller Lao sizes; body line-height 1.8; labels not uppercased.
- Locales are exactly `lo` and `en`; `lo` is the default; `/` redirects to `/lo` (non-permanent) via `next.config.ts` `redirects()`.
- Pages never import data files directly, only `@/lib/content`.
- No em dashes or en dashes in any visible copy.
- `prefers-reduced-motion: reduce` disables every animation and transition.
- Content above the fold is never hidden waiting for JS or an observer.
- Same-page actions (language switch, filter, menu open/close) never change scroll position.
- `SITE_NOINDEX = true` in `lib/site.ts` until real content ships.
- Git: the user commits. "Commit checkpoint" steps mean stop, show `git status --short` and a suggested message. Do not run `git commit` or `git push`.

## Review Focus

1. Switching language on a bean detail page keeps the slug (`/lo/beans/tha-teng-honey` to `/en/beans/tha-teng-honey`), and switching on `/lo` goes to `/en`, not `/en/` or `/`. Pinned in Task 3 unit tests.
2. A mistyped bean URL (`/lo/beans/nope`) shows the styled not-found page in the right language, not a crash or blank. Pinned in Task 5 e2e.
3. With JavaScript disabled, every section's content is visible (the reveal must not hide server-rendered content). Pinned in Task 4 e2e.
4. Long Lao headings at 390px wide never cause horizontal scroll on any page. Pinned in Task 8 e2e.
5. With reduced motion, below-the-fold content is fully visible (opacity 1) without needing to scroll it into view. Pinned in Task 4 e2e.

---

### Task 1: Scaffold, tokens, fonts, locale layout, test tooling

**Files:**
- Create (via create-next-app): `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`
- Create: `app/globals.css`, `app/fonts.ts`, `app/[lang]/layout.tsx`, `app/[lang]/page.tsx` (temporary stub), `lib/i18n.ts`, `lib/site.ts`, `vitest.config.ts`, `playwright.config.ts`, `e2e/routing.spec.ts`
- Delete: the scaffold's `app/layout.tsx`, `app/page.tsx`, `public/*.svg`

**Interfaces:**
- Produces: `type Locale = "lo" | "en"`, `LOCALES: readonly Locale[]`, `DEFAULT_LOCALE: Locale`, `isLocale(v: string): v is Locale` in `lib/i18n.ts`. `SITE_NOINDEX`, `SITE_URL` (placeholder `https://brandname.la`) in `lib/site.ts`. Font CSS variables `--font-display`, `--font-body` on `<html>`. Tailwind theme colours `bg`, `bg2`, `bg3`, `ink`, `ink2`, `line`, `line2`, `accent`, `on-accent`.

- [ ] **Step 1: Init repo and scaffold**

Run in `D:\projects\coffee-site`: `git init`, `git switch -c feat/placeholder-site`, then `npx create-next-app@16.4.2 . --ts --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --turbopack --yes`. Then `npm i motion@14 @phosphor-icons/react@2` and `npm i -D vitest@5 @playwright/test@1.64` and `npx playwright install chromium`.
Expected: `npm run dev` serves the default page.

- [ ] **Step 2: Write the failing routing e2e** in `e2e/routing.spec.ts`

```ts
test("root redirects to Lao", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/lo$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "lo");
});
test("english root has lang=en", async ({ page }) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("unknown locale is 404", async ({ page }) => {
  const res = await page.goto("/fr");
  expect(res?.status()).toBe(404);
});
```

`playwright.config.ts`: `webServer: { command: "npm run build && npm run start", port: 3000, reuseExistingServer: true }`, projects `chromium`. Add scripts `"test": "vitest run"`, `"e2e": "playwright test"`. `vitest.config.ts` includes `lib/**/*.test.ts` only, alias `@` to the root.

- [ ] **Step 3: Run it to verify it fails**

Run: `npm run e2e -- e2e/routing.spec.ts`. Expected: FAIL (no redirect, `/en` 404).

- [ ] **Step 4: Implement**

- `next.config.ts`: `redirects()` returns `{ source: "/", destination: "/lo", permanent: false }`; `images.formats: ["image/avif", "image/webp"]`.
- `app/fonts.ts`: `Gloock({ weight: "400", subsets: ["latin"], variable: "--font-gloock" })`, `Noto_Serif_Lao({ weight: ["500","700"], subsets: ["lao"], variable: "--font-serif-lao" })`, `Hanken_Grotesk({ weight: ["400","500","600","700"], subsets: ["latin"], variable: "--font-hanken" })`, `Noto_Sans_Lao_Looped({ weight: ["400","500","600"], subsets: ["lao"], variable: "--font-sans-lao" })`. If a `subsets` value is rejected at build, use the subset names the error lists.
- `app/globals.css`: `@import "tailwindcss";` then `@theme` with the Global Constraints colours, `--font-display: var(--font-gloock), var(--font-serif-lao), Georgia, serif;`, `--font-body: var(--font-hanken), var(--font-sans-lao), system-ui, sans-serif;`, breakpoints `--breakpoint-md: 700px; --breakpoint-lg: 1080px;`. Base: `html { color-scheme: dark; background: var(--color-bg); }`, body font/colour/size 16px/1.6, the `.d1`–`.d4`, `.lbl`, `.lede`, `.body`, `.small`, `.wrap`, `.btn` classes ported from the bench (they carry the fluid sizes, rewritten with `vw` instead of `cqi`) and the Lao rules from Global Constraints. A global `@media (prefers-reduced-motion: reduce)` block sets `animation: none !important; transition: none !important` on `*`.
- `app/[lang]/layout.tsx`: `export const dynamicParams = false`; `generateStaticParams()` returns `LOCALES.map(lang => ({ lang }))`; awaits `params`, calls `notFound()` if `!isLocale(lang)`, renders `<html lang={lang} className={all four font variables}>` with `<body>`. Header/footer come in Task 3.
- `app/[lang]/page.tsx`: temporary `<h1 className="d1">Brand Name</h1>`.

- [ ] **Step 5: Run to verify it passes**

Run: `npm run e2e -- e2e/routing.spec.ts`. Expected: 3 passed. `npm run lint` is clean.

- [ ] **Step 6: Commit checkpoint**: `chore: scaffold Next app with locale layout, tokens and fonts`

---

### Task 2: Content module (CMS swap point)

**Files:**
- Create: `lib/content/types.ts`, `lib/content/data.ts`, `lib/content/index.ts`
- Test: `lib/content/content.test.ts`

**Interfaces:**
- Consumes: `Locale` from `lib/i18n.ts`.
- Produces (from `@/lib/content`):
  - types `Localized = { lo: string; en: string }`, `Roast = "light" | "medium" | "dark"`, `ImageRef = { src: string; alt: Localized; width: number; height: number }`, `Bean`, `BrewMethod`, `Step = { title: Localized; body: Localized }`, `Place`, `SiteContent` (shapes per the spec's content model; `Bean.brewMethod` is a `BrewMethod.id`)
  - `getBeans(): Promise<Bean[]>`, `getBean(slug: string): Promise<Bean | null>`, `getBrewMethods(): Promise<BrewMethod[]>`, `getSteps(): Promise<Step[]>`, `getPlaces(): Promise<Place[]>`, `getSiteContent(): Promise<SiteContent>`
  - `t(value: Localized, lang: Locale): string`
  - `SiteContent` holds `ui: Record<UiKey, Localized>` where `UiKey` is the union of every key in the bench's `T` object, plus `phone: string`, `facebook: string`, `featuredBeanSlug: "bolaven-natural"`, and `images: Record<"hero" | "cherries" | "brew" | "texture" | "drying" | "roast" | "cafe", ImageRef>`.

- [ ] **Step 1: Write the failing tests** in `lib/content/content.test.ts`

```ts
const filled = (l: Localized) => l.lo.trim() !== "" && l.en.trim() !== "";
const localizedFields = (o: object): Localized[] =>
  Object.values(o).flatMap((v) => (v && typeof v === "object" && "lo" in v && "en" in v ? [v as Localized] : v && typeof v === "object" ? localizedFields(v) : []));

test("every bean has both languages for every text field", async () => {
  for (const b of await getBeans()) expect(localizedFields(b).every(filled)).toBe(true);
});
test("there are four beans with unique slugs", async () => {
  const slugs = (await getBeans()).map((b) => b.slug);
  expect(slugs).toEqual(["paksong-washed", "bolaven-natural", "tha-teng-honey", "house-espresso"]);
});
test("every bean's brewMethod exists", async () => {
  const ids = new Set((await getBrewMethods()).map((m) => m.id));
  for (const b of await getBeans()) expect(ids.has(b.brewMethod)).toBe(true);
});
test("getBean returns null for unknown slug", async () => {
  expect(await getBean("nope")).toBeNull();
  expect((await getBean("tha-teng-honey"))?.name.en).toBe("Tha Teng Honey");
});
test("site content, steps and places are fully translated", async () => {
  const all = [await getSiteContent(), ...(await getSteps()), ...(await getPlaces()), ...(await getBrewMethods())];
  for (const o of all) expect(localizedFields(o).every(filled)).toBe(true);
});
test("no em or en dashes in any copy", async () => {
  const text = JSON.stringify([await getSiteContent(), await getBeans(), await getSteps(), await getPlaces(), await getBrewMethods()]);
  expect(text).not.toMatch(/[\u2013\u2014]/);
});
test("featured bean exists", async () => {
  expect(await getBean((await getSiteContent()).featuredBeanSlug)).not.toBeNull();
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `npm test`. Expected: FAIL, module `@/lib/content` not found.

- [ ] **Step 3: Implement**

`types.ts` holds the types. `data.ts` ports the bench's `T` (as `ui`), `METHODS` (ids `pour-over`, `french-press`, `sock-filter`, `espresso`), `BEANS` (image paths `/images/bean-<slug>.jpg`), `STEPS`, `PLACES` (`q` becomes `mapsQuery`), `PHONE`, `FB` verbatim. Image alt text: bean images use the bean name, `cherries` uses `T.origin_alt`, `drying` uses `T.dry_cap`, the rest are decorative (`{ lo: "", en: "" }` is allowed only on `ImageRef.alt`, so exclude `alt` from the translated-field check by giving decorative images `alt: null` and typing `alt: Localized | null`). Widths/heights match the files downloaded in Task 4. `index.ts` exports async getters wrapping `data.ts` (the `// ponytail:` comment there notes that this is where Sanity queries go) plus `t()`.

- [ ] **Step 4: Run to verify it passes**

Run: `npm test`. Expected: 7 passed.

- [ ] **Step 5: Commit checkpoint**: `feat: typed bilingual content module`

---

### Task 3: Site chrome (header, language switch, mobile menu, footer)

**Files:**
- Create: `lib/i18n.ts` (add helper), `lib/i18n.test.ts`, `components/Header.tsx`, `components/LanguageSwitch.tsx` (client), `components/MobileMenu.tsx` (client), `components/Footer.tsx`, `components/NavLinks.tsx`
- Modify: `app/[lang]/layout.tsx` (render Header, `<main>`, Footer)
- Test: `e2e/chrome.spec.ts`

**Interfaces:**
- Consumes: `getSiteContent`, `getPlaces`, `t` from `@/lib/content`; `Locale`, `LOCALES`.
- Produces: `switchLocalePath(pathname: string, to: Locale): string` in `lib/i18n.ts`; `NAV: { href: "" | "/beans" | "/story" | "/where-to-buy"; key: UiKey }[]`; `isCurrent(pathname: string, href: string, lang: Locale): boolean` (beans is current on `/beans` and `/beans/*`). `<Header lang ui />`, `<Footer lang />`.

- [ ] **Step 1: Write failing unit tests** in `lib/i18n.test.ts`

```ts
test.each([
  ["/lo", "en", "/en"],
  ["/lo/", "en", "/en"],
  ["/lo/beans/tha-teng-honey", "en", "/en/beans/tha-teng-honey"],
  ["/en/where-to-buy", "lo", "/lo/where-to-buy"],
  ["/en/story?x=1", "lo", "/lo/story?x=1"],
])("switchLocalePath(%s, %s) = %s", (from, to, want) => expect(switchLocalePath(from, to as Locale)).toBe(want));
test.each([
  ["/lo", "", true], ["/lo/beans", "", false], ["/lo/beans/x", "/beans", true], ["/lo/beans", "/beans", true], ["/lo/story", "/beans", false],
])("isCurrent(%s, %s)", (p, href, want) => expect(isCurrent(p, href, "lo")).toBe(want));
```

- [ ] **Step 2: Write failing e2e** in `e2e/chrome.spec.ts`

- desktop (1440x900): nav shows 4 links; on `/en/story` the "Our story" link has `aria-current="page"`.
- language switch on `/lo/beans/tha-teng-honey` after scrolling to y=600: click `EN`, expect URL `/en/beans/tha-teng-honey`, `html[lang=en]`, and `window.scrollY` within 50px of 600.
- phone (390x844): menu button visible, nav hidden; open menu, expect `role=dialog` visible and focus inside; press Escape, dialog hidden and focus back on the menu button; open menu, tap "Our beans", URL `/lo/beans`, dialog hidden.
- footer on `/en` contains `+856 20 5555 0142` and "Pierre André, CC BY-SA 4.0".

- [ ] **Step 3: Run both to verify they fail**

Run: `npm test` and `npm run e2e -- e2e/chrome.spec.ts`. Expected: FAIL.

- [ ] **Step 4: Implement**

- `switchLocalePath` replaces only the first path segment and strips a trailing slash on the bare locale.
- Header is a Server Component, sticky, 64px, solid `bg`, bottom `line` border, layout per the bench's `.hd`. Nav hidden below 1080px.
- `LanguageSwitch` uses `usePathname()` and `<Link href={switchLocalePath(...)} scroll={false}>` for ລາວ / EN, with `aria-pressed` on the current one. Next keeps the scroll position because `scroll={false}` and both locales render the same layout.
- `MobileMenu`: button `aria-expanded`, overlay `role="dialog" aria-modal="true"`, fixed full-screen over the page (no `body` scroll lock that resets position; use `overflow: hidden` on `html` while open and restore it). Escape and link click close it; focus moves to the close button on open and back to the menu button on close. Fade + 10px slide per the bench's `.menu`, via CSS transitions.
- Footer ports the bench's footer with Phosphor `Phone`, `FacebookLogo`, `MapPin` icons (regular, size 18).

- [ ] **Step 5: Run to verify it passes**

Run: `npm test` (all pass) and `npm run e2e -- e2e/chrome.spec.ts` (all pass).

- [ ] **Step 6: Commit checkpoint**: `feat: header, language switch, mobile menu and footer`

---

### Task 4: Images, shared UI, scroll reveal, Home page

**Files:**
- Create: `scripts/fetch-images.mjs`, `public/images/*.jpg`, `components/Reveal.tsx` (client), `components/Button.tsx`, `components/BeanRow.tsx`, `components/home/Hero.tsx`, `components/home/Featured.tsx`, `components/home/Origin.tsx`, `components/home/Brew.tsx`, `components/home/Band.tsx`
- Modify: `app/[lang]/page.tsx`, `app/globals.css` (hero keyframes)
- Test: `e2e/home.spec.ts`

**Interfaces:**
- Consumes: content getters, `t`.
- Produces: `<Reveal as?: "div" | "li" | "section" | "article" className? delay?: number>` (rises 22px and fades in once when it enters the viewport); `<Button href variant: "primary" | "ghost" arrow?: boolean>`; `<TextLink href>`; `<BeanImage image: ImageRef lang sizes priority? className?>` (wraps `next/image` with `fill` inside an aspect box, so the box can hover-zoom).

- [ ] **Step 1: Fetch images** with `scripts/fetch-images.mjs` (Node `fetch`, writes to `public/images/`): Unsplash `https://images.unsplash.com/photo-<id>?w=2000&q=75&fm=jpg` for hero `1524350876685-274059332603`, `bean-paksong-washed` `1521302080334-4bebac2763a6`, `bean-bolaven-natural` `1587734195503-904fca47e0e9`, `bean-tha-teng-honey` `1514432324607-a09d9b4aefdd`, `bean-house-espresso` `1497935586351-b67a49e012bf`, `brew` `1442512595331-e89e73853f31`, `roast` `1511537190424-bbbab87ac5eb`, `cafe` `1453614512568-c4024d13c247`, `texture` `1447933601403-0c6688de566e`. Wikimedia (send a `User-Agent` header) `cherries` from `https://upload.wikimedia.org/wikipedia/commons/7/77/Laos_Plateau_des_Bolovens_Plantations_%283%29.jpg` and `drying` from `https://upload.wikimedia.org/wikipedia/commons/5/57/Coffee-cherries-afternoon-in-san-marcos-tarrazu-costa-rica.jpg`. Print each file's pixel size; put those into `data.ts` `width`/`height`.
Expected: 11 files, each over 100 KB.

- [ ] **Step 2: Write failing e2e** in `e2e/home.spec.ts`

```ts
test("lao home shows hero copy and CTAs", async ({ page }) => {
  await page.goto("/lo");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("ປູກເທິງພູພຽງບໍລະເວນ ຂົ້ວແບບຊ້າໆ");
  await page.getByRole("link", { name: "ເບິ່ງເມັດກາເຟ" }).click();
  await expect(page).toHaveURL(/\/lo\/beans$/);
});
test("english home has all sections", async ({ page }) => {
  await page.goto("/en");
  for (const h of ["This season's beans", "Coffee from the plateau", "Brew it at home", "Find Brand Name in Vientiane and Pakse"])
    await expect(page.getByRole("heading", { name: h })).toBeVisible();
  await expect(page.getByText("1:16")).toBeVisible();
});
test("featured row opens its bean", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("link", { name: /Tha Teng Honey/ }).first().click();
  await expect(page).toHaveURL(/\/en\/beans\/tha-teng-honey$/);
});
test.describe("no JS", () => {
  test.use({ javaScriptEnabled: false });
  test("below-fold content is visible without JS", async ({ page }) => {
    await page.goto("/en");
    await expect(page.getByRole("heading", { name: "Find Brand Name in Vientiane and Pakse" })).toHaveCSS("opacity", "1");
  });
});
test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("below-fold content is visible without scrolling", async ({ page }) => {
    await page.goto("/en");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Brew it at home" })).toHaveCSS("opacity", "1");
  });
});
```

- [ ] **Step 3: Run to verify it fails**

Run: `npm run e2e -- e2e/home.spec.ts`. Expected: FAIL.

- [ ] **Step 4: Implement**

- `Reveal`: server HTML renders visible. On mount (`useLayoutEffect`), if `useReducedMotion()` is false and the element's top is below `window.innerHeight`, set `armed = true`. Render `motion.<as>` with `initial={false}` and `animate={armed && !inView ? { opacity: 0, y: 22 } : { opacity: 1, y: 0 }}`, where `inView = useInView(ref, { once: true, amount: 0.12 })`, transition `{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }`. This never hides above-the-fold or no-JS content.
- Hero load-in is CSS (runs before hydration, does not delay LCP): the image settles from `scale(1.06)` over 1.6s, and the four hero children rise 16px with 0/80/160/240ms delays, per the bench's `.ani` rules.
- Sections port the bench's `pages.home` markup and CSS, with media queries at 700/1080px. Hero image `priority`, `sizes="100vw"`. Featured: main bean 4:5 + three `BeanRow`s. Origin: full-bleed `cherries` at 4:5/16:9/21:9 + facts `dl`. Brew: `brew` image (sticky on desktop) + four methods with the ratio in accent display type. Band: `texture` with a 0.74 scrim.
- Reveal wraps the same elements the bench marks `.rv`.

- [ ] **Step 5: Run to verify it passes**

Run: `npm run e2e -- e2e/home.spec.ts`. Expected: 5 passed.

- [ ] **Step 6: Commit checkpoint**: `feat: home page with reveal motion and local images`

---

### Task 5: Our beans (filter), bean detail, not-found

**Files:**
- Create: `app/[lang]/beans/page.tsx`, `app/[lang]/beans/[slug]/page.tsx`, `app/[lang]/not-found.tsx`, `components/beans/BeanCard.tsx`, `components/beans/BeanGrid.tsx` (client, filter), `components/beans/BeanSpecs.tsx`, `components/beans/MoreBeans.tsx`
- Test: `e2e/beans.spec.ts`

**Interfaces:**
- Consumes: `getBeans`, `getBean`, `getBrewMethods`, `getSiteContent`, `t`, `BeanImage`, `Button`, `Reveal`.
- Produces: `generateStaticParams` for `[slug]` returning all four slugs; `dynamicParams = false` on the slug page.

- [ ] **Step 1: Write failing e2e** in `e2e/beans.spec.ts`

- `/en/beans` shows 4 cards; clicking chip "Medium roast" sets its `aria-pressed="true"`, shows exactly 2 cards (Bolaven Natural, Tha Teng Honey), and leaves `window.scrollY` unchanged (scroll to 300 first); clicking "All" shows 4.
- clicking the "Paksong Washed" card goes to `/en/beans/paksong-washed`, the h1 is "Paksong Washed", the specs show "1,300 m" and "Typica", the tip shows "1:16", and "Where to buy" goes to `/en/where-to-buy`.
- "More beans" on that page lists the other three and not Paksong Washed.
- `/lo/beans/nope` returns status 404, shows the Lao not-found heading, and has a link back to `/lo/beans`.

- [ ] **Step 2: Run to verify it fails**

Run: `npm run e2e -- e2e/beans.spec.ts`. Expected: FAIL.

- [ ] **Step 3: Implement**

- Beans page: page head (`d1 sm`, lede, chips) + `BeanGrid` (client) receiving the four beans already localized by the server (`{ slug, name, notes, meta, roast, image }`) so the client bundle carries one language. The filter is `useState<"all" | Roast>`; hidden cards use the `hidden` attribute; the empty state uses `ui.empty`. Grid: 1 column, 2 from 700px, desktop staggers even visible cards by 120px (`:nth-child(even of :not([hidden]))`).
- Detail: two columns from 1080px with a sticky 4:5 image; back link, `d1 sm` name, notes, description, six specs in a 2-column `dl` (Bag = `ui.bag_v`), a brew tip panel on `bg2`, and a "Where to buy" button. `MoreBeans`: snap scroller at 74% column width with no visible scrollbar on phone, 3 columns from 700px.
- `not-found.tsx` reads the locale with `import { lang } from "next/root-params"` and renders a heading + text link to `/<lang>/beans`. Add `notFound: { en: "We couldn't find that page", lo: "ບໍ່ພົບໜ້ານີ້" }` and `notFoundLink: { en: "See all beans", lo: "ເບິ່ງເມັດກາເຟທັງໝົດ" }` to `ui` (marked as draft Lao).

- [ ] **Step 4: Run to verify it passes**

Run: `npm run e2e -- e2e/beans.spec.ts`. Expected: all passed. `npm test` still green.

- [ ] **Step 5: Commit checkpoint**: `feat: beans list with roast filter, bean detail and not-found`

---

### Task 6: Our story and Where to buy

**Files:**
- Create: `app/[lang]/story/page.tsx`, `app/[lang]/where-to-buy/page.tsx`, `components/CopyButton.tsx` (client)
- Test: `e2e/pages.spec.ts`

**Interfaces:**
- Consumes: `getSteps`, `getPlaces`, `getSiteContent`, `t`, `BeanImage`, `Reveal`.
- Produces: `<CopyButton value: string label: string doneLabel: string>`.

- [ ] **Step 1: Write failing e2e** in `e2e/pages.spec.ts`

- `/en/story`: h1 "From the plateau to your cup", an ordered list with 5 items whose headings are Pick, Dry, Hull and sort, Roast, Brew, and the drying caption visible.
- `/en/where-to-buy`: two places; the first "Open in Maps" link has `href` `https://www.google.com/maps/search/Ban%20Sisaket%20Vientiane`, `target="_blank"` and `rel` containing `noopener`.
- copy (grant `clipboard-read`/`clipboard-write` permissions): click the phone row's "Copy"; the button text becomes "Copied"; clipboard equals `+856 20 5555 0142`; the text reverts to "Copy" within 3s.
- `/lo/where-to-buy` shows "ຊື້ໄດ້ທີ່ໃສ".

- [ ] **Step 2: Run to verify it fails**

Run: `npm run e2e -- e2e/pages.spec.ts`. Expected: FAIL.

- [ ] **Step 3: Implement**

Port the bench's `pages.story` and `pages.buy` markup and CSS. Steps are an `<ol>` with CSS counters in accent display type. `CopyButton` calls `navigator.clipboard.writeText` inside the click handler; on rejection it selects the sibling value's text. It shows `doneLabel` for 1.6s. Maps links are `https://www.google.com/maps/search/${encodeURIComponent(mapsQuery)}`.

- [ ] **Step 4: Run to verify it passes**

Run: `npm run e2e -- e2e/pages.spec.ts`. Expected: all passed.

- [ ] **Step 5: Commit checkpoint**: `feat: story and where-to-buy pages`

---

### Task 7: Metadata, hreflang, sitemap, robots

**Files:**
- Create: `lib/metadata.ts`, `lib/metadata.test.ts`, `app/sitemap.ts`, `app/robots.ts`
- Modify: every `page.tsx` under `app/[lang]` (add `generateMetadata`)
- Test: `e2e/seo.spec.ts`

**Interfaces:**
- Consumes: `SITE_URL`, `SITE_NOINDEX`, `LOCALES`, content.
- Produces: `pageMetadata(args: { lang: Locale; path: "" | "/beans" | `/beans/${string}` | "/story" | "/where-to-buy"; title: string; description: string }): Metadata`. It sets `title` (`"<title> | Brand Name"`, except home, which is just "Brand Name"), `description`, `alternates.canonical` `${SITE_URL}/${lang}${path}`, `alternates.languages` `{ lo, en, "x-default": lo URL }`, `openGraph` with the hero image and `locale` `lo_LA`/`en_US`, and `robots: { index: false, follow: false }` when `SITE_NOINDEX`.

- [ ] **Step 1: Write failing unit test** in `lib/metadata.test.ts`: for `{ lang: "en", path: "/beans/paksong-washed", ... }`, assert the canonical is `https://brandname.la/en/beans/paksong-washed`, `languages.lo` is `https://brandname.la/lo/beans/paksong-washed`, `x-default` equals the lo URL, and `robots.index` is false.
- [ ] **Step 2: Write failing e2e** in `e2e/seo.spec.ts`: `/en/story` has `<title>` "Our story | Brand Name", `link[rel=alternate][hreflang=lo]` pointing at `/lo/story`, and `meta[name=robots]` containing `noindex`. `/sitemap.xml` returns 200 and contains `/lo/beans/house-espresso` and `/en/where-to-buy` (16 `<loc>` entries: 2 locales × (4 pages + 4 beans)).
- [ ] **Step 3: Run to verify both fail**: `npm test`, `npm run e2e -- e2e/seo.spec.ts`. Expected: FAIL.
- [ ] **Step 4: Implement** `pageMetadata`, `generateMetadata` on each page (titles from `ui` nav labels; descriptions from the page lede or bean description), `sitemap.ts` (16 URLs), and `robots.ts` (disallow all while `SITE_NOINDEX`).
- [ ] **Step 5: Run to verify it passes**: `npm test` and `npm run e2e -- e2e/seo.spec.ts`. Expected: all passed.
- [ ] **Step 6: Commit checkpoint**: `feat: per-locale metadata, hreflang, sitemap and robots`

---

### Task 8: Responsive sweep and final verification

**Files:**
- Create: `e2e/responsive.spec.ts`, `scripts/screenshots.mjs` (optional helper; Playwright test may write screenshots directly)
- Modify: any component the sweep shows broken

**Interfaces:**
- Consumes: all routes.

- [ ] **Step 1: Write the e2e** in `e2e/responsive.spec.ts`: for widths 390, 820 and 1440 × locales `lo`, `en` × paths `""`, `/beans`, `/beans/tha-teng-honey`, `/story`, `/where-to-buy`, load the page, collect `console` errors and `pageerror`s, then assert `document.documentElement.scrollWidth <= window.innerWidth`, zero errors, and save a full-page screenshot to `test-results/screens/<w>-<lang>-<page>.png`.
- [ ] **Step 2: Run it**: `npm run e2e -- e2e/responsive.spec.ts`. Fix every failure (most likely Lao headings, the `more-row` scroller, or the desktop nav at 1080px) until all 30 cases pass.
- [ ] **Step 3: Review screenshots** against the bench at the same width and language. Fix visible differences in spacing, type size or section layout.
- [ ] **Step 4: Lighthouse** on `/lo` (mobile, production build): `npx lighthouse http://localhost:3000/lo --preset=perf --form-factor=mobile --only-categories=performance,accessibility --quiet --chrome-flags="--headless=new"`. Expected: performance ≥ 90, accessibility 100. Fix the reported items if not.
- [ ] **Step 5: Full run**: `npm run lint && npm test && npm run build && npm run e2e`. Expected: all green, and the build output lists every route as static (○ or ●).
- [ ] **Step 6: Commit checkpoint**: `test: responsive sweep and verification fixes`

After Task 8: one fresh-context review of the whole branch against the spec. Fix every important finding with a failing test first.

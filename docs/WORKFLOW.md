# Workflow — How to Build This

**Version:** 1.0
**Date:** 2026-08-23

This is the operating manual. It answers "what do I do on Monday morning" for every week of the project.

---

## Part 1 — Operating rules

These exist because AI-assisted development fails in a specific way: it produces a lot of plausible code quickly, and by the time something is wrong you cannot tell which of the last two hundred changes caused it. Every rule below is a countermeasure.

**1. One thing per session.** One component, one section, one fix. Not "build the homepage". A session that touches twelve files cannot be reviewed, and cannot be reverted cleanly.

**2. Commit at every green state.** Green = `npm run lint && npm run build` both pass and the page looks right in the browser. Commit immediately. This is the undo button — without it, "revert the last AI change" means hand-editing.

**3. Never accept code you have not looked at.** You do not need to understand every line. You do need to know: which files changed, roughly what each change does, and whether any file outside the current task was touched. `git diff --stat` before every commit, every time.

**4. Build before commit, always.** Not `npm run dev` — `npm run build`. Type errors and Server/Client boundary violations frequently only appear in a production build.

**5. Stay inside the phase.** If a session starts editing files from a completed phase, stop it. Approved work does not get silently rewritten.

**6. Watch the bundle.** After each build, read the First Load JS figure for `/`. Budget is **185 KB gzipped** ([PRD.md](PRD.md) §7) — the 100 KB figure this document originally carried predates the framework measurement and is wrong. If it jumps, something became a Client Component — find it now, not at launch.

Measured so far: 168.8 KB gz framework-only at Phase 2 · **179.2 KB gz** at Phase 5, identical on all four routes.

**7. Placeholders stay visible.** Never let an AI fill a gap with realistic-looking invented content. See the `content-guard` skill.

**8. When a session goes wrong, revert — do not patch.** `git checkout .` and re-prompt with better instructions is faster than debugging generated code you did not write.

**9. Mobile first, and mobile is not an afterthought.** Design and verify every change at **360, 390 and 430 px before desktop**, preserving the desktop layout as you go. Roughly half the audience reads on a phone ([PRD.md](PRD.md) §4), and a desktop-first section reaches mobile as overrides that later have to be unpicked.

Definition of done for a section, not QA for later:

- navigation and drawer accessibility
- readable typography and spacing
- card stacking and content order
- touch targets at least 44×44 px
- no horizontal overflow
- visible keyboard focus
- `prefers-reduced-motion` honoured
- usable on a mid-range Android and on iOS Safari

Then `npm run lint`, `npm run build`, the responsive browser pass, and a bundle measurement — after *every* mobile-focused change, not at the end of the phase.

### Session template

Start each session with roughly this:

> We are in Phase N. Build only `<specific thing>`.
> Follow docs/DESIGN-SYSTEM.md for tokens and docs/ARCHITECTURE.md for structure.
> Do not modify files outside `<scope>`.
> Any unknown company information → `PLACEHOLDER:` — do not invent it.
> Run lint and build when done and show me the First Load JS.

End each session with:

```bash
npm run lint && npm run build
git diff --stat
git add -A && git commit -m "<message from the phase table>"
```

---

## Part 2 — Phases

Nine phases from brief §22, each with a gate. **No phase begins until the previous phase's exit check passes.**

Branch per phase, merge to `main` on green.

---

### Phase 1 — Requirements

**Goal:** Remove the guesswork before any code exists.

- [x] Documentation set written (PRD, Architecture, Design System, Workflow, Resources)
- [x] Claude Code guardrails (`CLAUDE.md`, two skills)
- [x] Brand colours sampled from the logo and contrast-tested
- [x] Manager questionnaire and WhatsApp messages prepared
- [x] Induction material extracted into [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md), tagged `[DRAFT]`/`[RISK]`
- [ ] **Send WhatsApp Message 1 — the name spelling.** On its own, first.
- [ ] Send WhatsApp Message 2 once Message 1 is answered
- [ ] Get the registration certificate photo (Q0)
- [ ] Get a decision on naming client brands (Q24)
- [x] Confirm Q5 public service titles and concise descriptions (2026-08-24)
- [ ] Update [PRD.md](PRD.md) tags as answers arrive

**Exit check:** Q5 and Q6 confirmed. Phase 2 can start without the rest — the induction material supplies working answers for goal, audience and services.

**Q0 update:** the domain is already registered on `.com.np`, so the spelling is effectively settled for the web address. Two things still need confirming: the **exact domain string** (it is baked into canonical URLs at build time) and whether it **matches the registered legal entity**. `.com.np` registration requires submitting company documents — asking which name was on them answers Q0 with no digging.

**Deliverable:** none in code.

---

### Phase 2 — Foundation

**Branch:** `feat/foundation`

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
git init && git add -A && git commit -m "Initial Next.js project setup"
```

Then:
- `next.config.ts` → `output: "export"`, `trailingSlash: true`, `images: { unoptimized: true }` ([ARCHITECTURE.md](ARCHITECTURE.md) §1.1)
- `tsconfig.json` → `"strict": true`
- Fonts via `next/font` (Geist or Inter) — **not** a Google Fonts link
- `globals.css` → `@theme` block with the full token set from [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md)
- Folder skeleton from [ARCHITECTURE.md](ARCHITECTURE.md) §2 — **no `app/api/` directory**
- `src/data/site.ts` with `PLACEHOLDER:` values
- `public/.htaccess` with the rules from [ARCHITECTURE.md](ARCHITECTURE.md) §9
- `.gitignore` check: `node_modules`, `.next`, **`out`**, `.env*.local`

**Exit check:** `npm run build` passes and **emits `out/` containing `index.html`** · fonts render · a test element using `text-brand` shows `#007B91` · `out/.htaccess` present · `out` is git-ignored.

Verifying the export works now — rather than at Phase 9 — is the point of this gate. A static-export problem found after five phases of building is a bad day.

**Commits:** `Initial Next.js project setup` → `Add design tokens and typography system` → `Add data layer skeleton`

---

### Phase 3 — Global components

**Branch:** `feat/layout`

Build in this order — each depends on the last:
1. `ui/container.tsx`
2. `ui/section.tsx`
3. `ui/section-heading.tsx`
4. `ui/button.tsx` (all three variants)
5. `layout/navbar.tsx` + `layout/mobile-menu.tsx`
6. `layout/footer.tsx`
7. Wire into `app/layout.tsx` + skip-to-content link

**Exit check:** nav works at 360/768/1440 · mobile drawer traps focus, closes on `Escape`, returns focus to trigger · full keyboard pass with visible focus everywhere · footer placeholders visible, no fake data · build passes.

**Commit:** `Build global layout, navigation and UI primitives`

---

### Phase 4 — Homepage ✅ COMPLETE

**Branch:** `feat/homepage`

**One section per session.** Order matters — hero first because it is the LCP element and sets the type scale everything else follows.

| Session | Section | Note |
|---|---|---|
| 4.1 | Hero | ✅ Complete — text LCP, no layout shift. |
| 4.2 | Positioning statement | ✅ Complete — editorial layout, copy remains a visible Q6 placeholder. |
| 4.3 | Services overview | ✅ Complete — six data-led cards; Q5 titles and concise descriptions approved 2026-08-24. |
| 4.4 | Why Pramiva | ✅ Complete — four approved differentiators; client names remain anonymised pending Q24. |
| 4.5 | Process | ✅ Complete — four-step assumed working model, pending management review. |
| 4.6 | Company intro | ✅ Complete — draft company story from supplied context; Q6 approval pending. |
| 4.7 | CTA band | ✅ Complete — single contact action; working Q4 wording pending approval. |

Metrics section is **omitted** unless Q23 supplies verified numbers.

**Exit check per session:** renders at all breakpoints · uses only design tokens · not `"use client"` · build passes · First Load JS still under 185 KB gz.

**Commits:** `Build homepage hero section`, `Add services overview section`, …

---

### Phase 5 — Internal pages ✅ COMPLETE

**Branch:** `feat/pages`

`/about`, `/services`, `/contact` (layout and copy structure only — the form is Phase 7). Reuse Phase 3 and 4 components; a new one-off component here is a signal the primitive should be generalised instead.

Built with no new one-off components: each route composes `Section`, `SectionHeading` and `Button` directly, and `cta-band.tsx` was generalised to take its copy as props rather than gaining a variant.

Decisions taken during the phase, for the record:

- About copy is drafted from [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) §3, §4 and §6 Option A so management corrects sentences instead of composing them. All of it is `[DRAFT]`. Values wording created **Q28**.
- Q5 was approved on 2026-08-24: six public service titles, concise descriptions and the short Services overview. The descriptions remain intentionally brief and make no performance claims.
- PRD §5.3 also lists "benefits" and a process block for `/services`. Benefits are omitted, because every benefit line would be an unapproved performance claim. The working model is presented once, on the homepage, rather than duplicated.
- `/contact` carries no closing CTA band — the site's single primary action already points at that page.

**Exit check:** all four routes render · no 404 in nav or footer · per-page metadata present · one `h1` per page · build passes.

Verified from `out/`: four routes emitted, exactly one `h1` and one `id="main"` per page, per-page `<title>` and description present, first-load JS **179.2 KB gz** on every route with an identical chunk set — the pages added no client JavaScript.

Verified in a browser: no horizontal overflow at 360/768/1024/1440/1920 · `aria-current` correct on every route · desktop tab order and visible focus intact · mobile drawer locks scroll, focuses the close button, closes on `Escape` and restores focus to the trigger.

**Commit:** `Add about, services and contact pages`

---

### Phase 6 — Interactions ← NEXT

**Branch:** `feat/motion`

1. `ui/reveal.tsx` with `LazyMotion strict` in `layout.tsx`
2. Apply `<Reveal>` by wrapping section children — **do not** convert sections to Client Components
3. Stagger where groups appear
4. Hover states on buttons, cards, links
5. `providers/smooth-scroll.tsx` — Lenis, within the §5.2 constraints

**🔴 Headroom before starting: 5.8 KB.** Phase 5 measured 179.2 KB gz against a 185 KB budget. Framer Motion (via `LazyMotion` + `domAnimation`) and Lenis together were estimated at roughly 8 KB gz — more than what is left. Build and measure after the *smallest* motion integration (step 1 alone, one `<Reveal>` in place) before writing any more of this phase. If step 1 alone breaches the budget, the choice is a lighter approach — IntersectionObserver reveals, CSS scroll-behaviour instead of Lenis — not a bigger budget.

**Exit check:** First Load JS still under 185 KB gz — *check this specifically, this is the phase that breaks it* · `prefers-reduced-motion` genuinely disables animation and Lenis · anchor links and browser find still work · no jank scrolling on a real mid-range phone · build passes.

**Commit:** `Add scroll reveals and micro-interactions`

---

### Phase 7 — Contact form

**Branch:** `feat/contact-form`

1. `lib/validation.ts` — Zod schema (client-side UX only)
2. `ui/field.tsx` — label/input/error with correct ARIA
3. `forms/contact-form.tsx` — client state, loading, success, error
4. `public/api/contact.php` — re-validate independently, honeypot, timing, rate limit
5. PHPMailer files into `public/api/lib/`
6. Mail config placed by hand outside `public_html` on the server

**Exit check:** submits successfully to a real inbox · every validation error reachable and announced · loading state visible · success state persists · a forced failure shows the fallback email · honeypot submission rejected · rate limit triggers on the 6th request · **a direct POST to `contact.php` with invalid data is rejected** · config file confirmed absent from `git status` · build passes.

**This phase must be tested on the server, not locally.** `next dev` does not execute PHP — the handler only runs once uploaded to cPanel.

**Commit:** `Implement contact form with server validation and email delivery`

---

### Phase 8 — Quality assurance

**Branch:** `fix/qa`

Run [PRD.md](PRD.md) §10 in full. Real devices, not just devtools emulation. axe DevTools on every page. Lighthouse mobile on a deployed preview, not localhost — localhost numbers are meaningless.

Send the staging URL for management sign-off (Q20 names the approvers).

**Exit check:** every §10 technical box ticked · design and content approved in writing.

**Commit:** `Fix accessibility and responsive issues from QA`

---

### Phase 9 — SEO & production

**Branch:** `feat/production`

0. **Delete the staging guard from `public/.htaccess`** — the `X-Robots-Tag "noindex, nofollow"` block added when the review build went up. Leaving it in place ships a site search engines are told to ignore. Verify with `curl -I https://<domain>/` after upload: no `X-Robots-Tag` header in the response.
1. `sitemap.ts`, `robots.ts` — **verify `robots.txt` does not disallow production**
2. Favicon set + OG image
3. `Organization` JSON-LD — only if Q6–Q9 answered
4. Analytics if Q14 says yes
5. `grep -rn "PLACEHOLDER:" src/` → **must be empty**
6. Set `NEXT_PUBLIC_SITE_URL` to the real domain, then `npm run build` — canonical URLs and the sitemap bake in at build time, so building with the wrong value ships wrong URLs
7. Zip `out/`, upload to `public_html`, extract in place
8. Verify `.htaccess` uploaded — *enable Show Hidden Files in File Manager first*
9. Verify HTTPS redirect and AutoSSL certificate
10. Send a live test enquiry through the production form
11. Post-launch: submit the sitemap to Search Console

**Keep the previous `out/` zip.** With no staging host and no rollback button, re-extracting the last known-good build is the only way back.

**Exit check:** every box in [PRD.md](PRD.md) §10 ticked.

**Commit:** `Prepare production deployment`

---

## Part 3 — Git

**Branches:** `main` is always deployable. One branch per phase, merge on green. Never commit straight to `main` after Phase 2.

**Commit messages:** imperative, one logical change. `Build homepage hero section`, not `updates`. When a section is wrong three days later, the log is how you find where it came from.

**Frequency:** every green state. A day of work in one commit cannot be bisected.

**Recovering from a bad session:**

```bash
git diff                  # what did it actually do?
git checkout .            # discard, re-prompt more specifically
git reset --hard HEAD~1   # if already committed (only on your own branch)
```

---

## Part 4 — Weekly rhythm

| Week | Phase | Depends on |
|---|---|---|
| 1 | Phase 1 — requirements, docs, manager chase | — |
| 2 | Phase 2 + 3 — foundation, layout | Q1–Q4 |
| 3 | Phase 4 — homepage | Q5, Q6 |
| 4 | Phase 5 + 6 — pages, motion | — |
| 5 | Phase 7 — contact form | Q10, cPanel access, PHP 8 |
| 6 | Phase 8 — QA + sign-off | Q20 |
| 7 | Phase 9 — production | Q12, Q13, Q21 |

Indicative, not committed. Q22 (target launch date) may compress this — if it does, the honest response is to cut scope from §3 non-goals, not to skip Phase 8.

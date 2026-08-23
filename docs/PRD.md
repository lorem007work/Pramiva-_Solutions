# Product Requirements Document — Pramiva Solutions Website

**Version:** 1.0
**Date:** 2026-08-23
**Status:** Requirements phase — awaiting management sign-off
**Source brief:** [documntation.md](../documntation.md)

---

## 0. How to read this document

Every requirement carries a status tag. This is the most important convention in the file — it tells you whether you may build against a line or not.

| Tag | Meaning | Action |
|---|---|---|
| `[CONFIRMED]` | Decided and signed off. | Build it. |
| `[ASSUMED]` | A sensible default chosen by the development side. Manager may override; cost of change is low if caught early. | Build it, mark it visibly, show it for approval. |
| `[DRAFT]` | Content is known from internal material and written up, but not signed off. | Build the structure. Do not publish the copy. |
| `[BLOCKED]` | Cannot be built or published until management answers. | Do not build. Do not guess. Use a `PLACEHOLDER:` value. |
| `[RISK]` | Publishing may cause commercial or legal harm. | Needs written approval, possibly from a third party. |

**Rule:** no `[BLOCKED]`, `[DRAFT]` or `[RISK]` item ships to production. The launch checklist in §10 enforces this.

Draft content extracted from internal induction material lives in [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md). It is a staging area, not approved copy.

---

## Q0 — company name: resolved for the website ✅

The registered domain is **pramivasolutions.com.np**, which agrees with the logo. Two official artefacts against one transcript — the site uses **Pramiva Solutions**.

Still open, low priority: whether the registered legal entity also reads *Pramiva*. Affects the legal pages and JSON-LD, not the build. See [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) §1.

## 🔴 Q12 — the domain does not resolve

`pramivasolutions.com.np` returns **SERVFAIL** from public resolvers *and* from the `.com.np` registry's own authoritative nameservers. A control lookup (`worldlink.com.np`) resolves normally, so this is specific to this domain, not a network fault.

Nothing is hosted there. Good news for deployment — there is no existing site to overwrite — but the domain is **not usable yet**. Likely either registration still pending manual approval (`.com.np` applications are reviewed by hand and can take days) or nameservers not yet pointed at the cPanel host.

Blocks Phase 9 only. Everything up to that point proceeds normally.

---

## 1. Problem statement

Pramiva Solutions has no corporate web presence. Prospective clients and partners have no way to evaluate the company, understand its services, or initiate contact.

The gap is not merely "no website" — it is that the company's positioning (a business-and-operations partner supporting other businesses) is unfamiliar enough that a generic template site would actively harm credibility. The site must communicate competence through its own execution quality.

## 2. Goals

`[ASSUMED]` — pending answer to Manager Question 1.

**Primary goal:** Establish professional credibility and generate qualified inbound enquiries from prospective business clients.

**Secondary goals:**
- Explain what Pramiva Solutions does, clearly enough that a visitor can self-qualify in under 60 seconds
- Provide a single, obvious path to contact
- Present the brand as technically capable through site performance and polish

**Success metrics** (measurable after launch):
- Contact form submission rate ≥ 2% of unique visitors
- Lighthouse mobile performance ≥ 95
- Bounce rate on Home < 60%
- Zero published claims that management has not approved

## 3. Non-goals

Explicitly out of scope for v1. Listing these prevents scope creep mid-build.

- E-commerce or payment processing
- User accounts, login, or a client portal
- Blog / CMS integration
- Multi-language support
- Live chat
- Booking / calendar integration
- Case study library
- Careers / job board

Any of these may become v2. None block launch.

## 4. Target audience

`[DRAFT]` — Manager Question 2. Internal material has narrowed this considerably.

**What we now know:** the company is based in **Lalpur, Nepal**, and delivers back-office and operations work for businesses **abroad** — the known partnership is **Australian**. This is an offshore operations/BPO model, B2B, English-language.

**Working assumption:** business owners and operations leads at small-to-medium businesses in Australia and comparable English-speaking markets, evaluating an outsourced operations partner. Reading in English, roughly half on mobile.

**Still to confirm:**
- Which markets beyond Australia are actually being targeted
- Target industries — or whether the offer is sector-agnostic
- Business size
- Decision-maker role
- Whether any EU/UK traffic is expected (determines cookie-consent obligations)

**Design implication of the offshore model:** the site is selling trust across a distance. A prospective client's unspoken question is "can I rely on a team I will never meet?" That makes the stated values — honesty, pride in work, clear communication ([CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) §4) — and the structured training academy (§7) load-bearing content, not filler. They answer the real objection.

**Why it matters:** audience determines tone of copy, whether pricing is mentioned, whether the site emphasises cost-saving or capability, and whether we need region-specific compliance (GDPR banner for EU traffic).

## 5. Information architecture

`[ASSUMED]` — Manager Question 3. Four pages, the minimum credible corporate site.

| Route | Page | Purpose | Status |
|---|---|---|---|
| `/` | Home | Position the company, route to CTA | `[ASSUMED]` |
| `/about` | About | Build trust — who we are, how we work | `[ASSUMED]` |
| `/services` | Services | Explain offerings in detail | `[ASSUMED]` |
| `/contact` | Contact | Convert | `[ASSUMED]` |
| `/careers` | Careers & Academy | Recruit locally, evidence training rigour | `[DRAFT]` — see below |
| `/privacy`, `/terms` | Legal | Compliance | `[BLOCKED]` — Q21 |

### Two candidate additions

**`/careers`** — `[DRAFT]`. The training academy ([CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) §7) is real, structured content and serves two audiences: recruits in Nepal, and prospective clients who want evidence that staff are trained rather than merely hired. Recommend including it in v1; it is a small page and it carries genuine weight for the trust problem noted in §4.

**A brand portfolio page** — `[RISK]`. **Not recommended for v1 in named form.** The client brands would be the strongest proof of capability on the site, and publishing them may breach client confidentiality and damage those brands' local market positioning. See [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) §6 for the full analysis and the three options.

*Recommended v1 approach:* an anonymised capability statement inside `/about` or `/services` — sectors and scale, no names. No separate page, no exposure, upgradeable later if written consent is obtained from both management and the client.

Deferred to v2: Insights/Blog, individual service pages, named case studies.

### 5.1 Home — section breakdown

| # | Section | Content status | Acceptance criteria |
|---|---|---|---|
| 1 | Navigation | `[CONFIRMED]` structure | Sticky, 4 links + CTA, keyboard-navigable, mobile drawer |
| 2 | Hero | `[BLOCKED]` copy (Q6) | Display headline, one supporting line, primary CTA. LCP element. No layout shift. |
| 3 | Positioning statement | `[BLOCKED]` copy (Q6) | One large editorial statement — what the company does, in the company's words |
| 4 | Services overview | `[BLOCKED]` list (Q5) | Grid of approved service categories, each linking to `/services` |
| 5 | Why Pramiva | `[BLOCKED]` copy | 3–4 differentiators. No unverifiable superlatives. |
| 6 | Metrics | `[BLOCKED]` (Q — see §9) | **Omit entirely unless verified numbers are supplied.** A fake stat is worse than no stat. |
| 7 | Process | `[ASSUMED]` | 3–4 step working approach |
| 8 | Company intro | `[BLOCKED]` copy (Q6) | Short paragraph + link to About |
| 9 | Final CTA | `[ASSUMED]` | Full-width, single action, repeats primary CTA |
| 10 | Footer | `[BLOCKED]` details (Q7–Q11) | Contact details, nav, social, legal links, copyright |

### 5.2 About
Company introduction, story, mission, vision, values, approach. Team section only if photographs and approval exist (Q17, Q20). All copy `[BLOCKED]`.

### 5.3 Services
Intro, service categories, per-service description, benefits, process, CTA. Service list `[BLOCKED]` on Q5 — **services must come from approved company material, never invented.**

### 5.4 Contact
Heading, short intro, form, email, phone, address, social links, map only if an address is confirmed. Details `[BLOCKED]` on Q7–Q11.

## 6. Functional requirements

### FR-1 Navigation `[CONFIRMED]`
Sticky header. Logo links home. Four page links plus one visually distinct CTA button. Below `md`, collapses to an accessible drawer: focus trapped while open, `Escape` closes, background scroll locked, focus returns to the trigger on close. Current page indicated in markup, not colour alone.

### FR-2 Primary CTA `[BLOCKED]` — Q4
One primary conversion action used site-wide. **Working default: "Contact Us".** One CTA only — competing CTAs dilute conversion.

### FR-3 Contact form `[CONFIRMED]` behaviour, `[BLOCKED]` destination (Q10)

Delivered by a **PHP handler on cPanel**, not a Next.js API route — the site is a static export and has no server. Validation runs twice, independently, in TypeScript and PHP. See [ARCHITECTURE.md](ARCHITECTURE.md) §6.

Fields: Name (required), Email (required, validated), Company (required), Phone (optional), Message (required, min 10 chars). Additional fields (service required, budget, project type) are **deferred** — brief §16 forbids adding them before management confirms usefulness.

Requirements:
- Client-side validation with inline, accessible errors (`aria-describedby`, `aria-invalid`, error text tied to the field, not colour-only)
- Server-side validation — the client schema is never trusted
- Loading state on submit; button disabled during flight
- Success state that persists (not a toast that vanishes before it is read)
- Error state offering a fallback contact method
- Spam protection: honeypot field + minimum time-to-submit + per-IP rate limit
- No enquiry may be silently lost — a delivery failure must surface to the user

### FR-4 Motion `[CONFIRMED]`
Scroll reveals (fade + slight rise), staggered groups, hover transitions on buttons/cards/links, smooth scrolling via Lenis. All motion respects `prefers-reduced-motion`: reveals resolve to final state instantly, Lenis is not initialised at all. No scroll hijacking, no section snapping, no parallax, no page-transition delay.

### FR-5 SEO `[CONFIRMED]`
Per-page `<title>` and meta description, Open Graph + Twitter card, favicon set, canonical URLs, `sitemap.ts`, `robots.ts`, `Organization` JSON-LD (fields `[BLOCKED]` on Q6–Q9), semantic headings with exactly one `h1` per page.

### FR-6 Analytics `[BLOCKED]` — Q14
Nothing that sets a cookie ships without a decision, because it triggers a consent requirement in EU markets.

Default if unanswered: **Cloudflare Web Analytics** — free, cookieless, a single script tag, needs no consent banner. cPanel's built-in AWStats is the zero-effort fallback: already installed, log-based, no JavaScript at all, but crude and it counts bots.

## 7. Non-functional requirements

| Area | Requirement | Verified by |
|---|---|---|
| Performance | Lighthouse mobile ≥ 95; LCP < 2.0s; CLS < 0.05; INP < 200ms | Lighthouse CI on staging |
| JS budget | **≤ 185 KB gzipped** first-load JS on `/` — see note | measured from `out/` |
| Accessibility | WCAG 2.1 AA. Zero critical axe violations. Full keyboard operation. Visible focus on every interactive element. | axe DevTools + manual keyboard pass |
| Responsive | Designed layouts at 360 / 768 / 1024 / 1440 / 1920. Mobile prioritised. | Manual device testing |
| Browsers | Latest 2 versions of Chrome, Safari, Firefox, Edge. iOS Safari and Chrome Android. | Manual |
| Type safety | TypeScript strict. Zero `any` in application code. Build fails on type error. | `npm run build` |
| Dependencies | Every package justified in [ARCHITECTURE.md](ARCHITECTURE.md). No package added because an AI suggested it. | Review at each phase gate |

### Note on the JS budget — measured, Phase 2

The original target was 100 KB gzipped. **That was wrong, and measuring early is why we know.**

A bare Next.js 16.3.2 + React 19.2.8 page with *zero* interactivity — no client components, no motion library, nothing — already ships **168.8 KB gzipped across six executed script tags**. That is the framework baseline, not our code. It cannot be reduced by writing better components.

The budget is therefore **185 KB gz**, leaving roughly 16 KB of headroom for Framer Motion via `LazyMotion` (~5 KB), Lenis (~3 KB), and the four permitted client components.

**What this does not change:** the Server-Component-by-default rule still matters. The baseline is fixed, but careless `"use client"` on a page root would add our own content on top of it — and that part *is* controllable.

**Escape hatch if Lighthouse falls short:** Next.js 15 has a materially lower baseline. Nothing is built yet, so pinning back is cheap now and expensive later. Decide at Phase 6, when motion lands and the number is real — not before.

## 8. Content governance `[CONFIRMED]`

This is a hard constraint, taken from brief §23 and §25, and enforced mechanically by the `content-guard` skill.

1. Internal induction/training material is **not** a source of publishable copy.
2. The following may not appear publicly without written management approval: employee count, founding year, client names, statistics of any kind, satisfaction rates, awards, partnerships, revenue, market-position claims, geographic coverage, testimonials, case studies.
3. Unknown values are written as `PLACEHOLDER: <what is needed>` in `src/data/*.ts` — never as a plausible-looking invention.
4. Before launch, `grep -r "PLACEHOLDER:" src/` must return zero results.

**Rationale:** the source material contained several unsupported claims. Publishing an unverified statistic on a corporate site is a commercial and legal risk that no amount of design quality offsets.

## 9. Open question register

Owner is management unless stated. Full text and suggested defaults in [MANAGER-QUESTIONNAIRE.md](MANAGER-QUESTIONNAIRE.md).

| # | Question | Blocks | Priority |
|---|---|---|---|
| 0 | Company name spelling | RESOLVED ✅ — domain + logo both read *Pramiva*. Legal entity name still to confirm. | Low |
| 1 | Primary business goal of the site | Copy direction, CTA choice | Blocker |
| 2 | Target audience / markets / industries | Tone, compliance, copy | Blocker |
| 3 | Required pages | Sitemap, nav, routing | Blocker |
| 4 | Primary CTA wording | Every page | Blocker |
| 5 | Publicly advertisable services + approved wording | Services page, Home §4 | Blocker |
| 6 | Approved company description | Hero, About, JSON-LD | Blocker |
| 7 | Display email | Footer, Contact | Blocker |
| 8 | Display phone | Footer, Contact | Blocker |
| 9 | Display address | Footer, Contact, JSON-LD | Blocker |
| 10 | Enquiry destination inbox | Form delivery | Blocker |
| 11 | Social media accounts | Footer | Non-blocking |
| 12 | Domain | ANSWERED ✅ `pramivasolutions.com.np` — but it does **not resolve**. See above. | 🔴 Phase 9 |
| 13 | Who controls DNS | Deployment | Blocker at Phase 9 |
| 14 | Analytics required? | Consent, scripts | Non-blocking |
| 15 | Logo in SVG/AI format | Nav, favicon quality | High — PNG degrades on retina |
| 16 | Official brand guidelines | Design tokens | Non-blocking |
| 17 | Team/office photography | About page design | Non-blocking — design assumes none |
| 18 | May client names be published? | About, Home | Non-blocking |
| 19 | Testimonials / case studies available? | Home, v2 scope | Non-blocking |
| 20 | Design approver / content approver | Sign-off process | Blocker at Phase 8 |
| 21 | Privacy Policy & Terms required? | Legal routes | Blocker at Phase 9 |
| 22 | Target launch date | Scheduling | High |
| 23 | Verified metrics for Home §6 | Home metrics section | Non-blocking — section omitted if absent |
| **24** | **May client brands be named publicly?** (needs SNS consent too) | Portfolio content | **🔴 Risk — anonymised by default** |
| 25 | Publish founding year (2025) and team size (~10)? | About page | Non-blocking — omitted by default |
| 26 | Include a Careers / Academy page in v1? | `/careers` route | Non-blocking — recommended yes |
| 27 | Exact postal address in Lalpur, Nepal | Contact page, JSON-LD | Blocker — "Lalpur" alone is not an address |

## 10. Launch checklist

Production release is blocked until every line passes.

**Content**
- [ ] Zero `PLACEHOLDER:` strings remain in `src/`
- [ ] **Company name spelling confirmed against the registration certificate (Q0)**
- [ ] **No client brand name appears anywhere unless written consent exists from both management and SNS (Q24)**
- [ ] `grep -rniE "SNS Multiservices|Turf Man|Perth Landscaper|Cleaning Team|Carry or Drag|Hardrex|Public Shed" src/` returns nothing (unless Q24 approved)
- [ ] Every published claim traced to written management approval
- [ ] No `[DRAFT]` or `[RISK]` content from [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) published without sign-off
- [ ] No dummy links (`#`, `example.com`) remain
- [ ] Contact details verified by sending a test enquiry and calling the number

**Technical**
- [ ] `npm run lint` clean
- [ ] `npm run build` succeeds with zero type errors and emits `out/`
- [ ] `.htaccess` present in `public_html` after upload — *verify with hidden files shown*
- [ ] HTTPS redirect working; AutoSSL certificate valid
- [ ] `api/contact.php` and `api/lib/` uploaded
- [ ] Mail config file present **outside** `public_html`, and **not** in the git repository
- [ ] PHP validation rules match `src/lib/validation.ts`
- [ ] Direct POST to `contact.php` with invalid data is rejected — the bundle is public, so this is the real gate
- [ ] Custom 404 page resolves
- [ ] All routes render; no 404s in the nav or footer
- [ ] Contact form delivers to the confirmed inbox — verified end-to-end in production
- [ ] Form loading, success, and error states all manually triggered and confirmed
- [ ] Lighthouse mobile ≥ 95 on the deployed site
- [ ] axe scan: zero critical violations
- [ ] Full keyboard pass on every page including the mobile drawer
- [ ] `prefers-reduced-motion` verified — animation genuinely disabled, not just shortened
- [ ] Tested on real iOS and Android hardware, not only devtools emulation
- [ ] Metadata, OG image, favicon, `sitemap.xml`, `robots.txt` all resolve
- [ ] `robots.txt` does **not** disallow production
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain before the production build — canonical URLs and the sitemap bake in at build time
- [ ] Domain resolving over HTTPS

**Sign-off**
- [ ] Design approved by the named approver (Q20)
- [ ] Content approved by the named approver (Q20)

---

## Change log

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-08-23 | Initial PRD derived from [documntation.md](../documntation.md) |

Update this document whenever management answers a question — change the tag, note it here. This PRD, not the original brief, is the operative spec from now on.

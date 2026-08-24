# Resources Required

**Version:** 1.0
**Date:** 2026-08-23

Everything needed before and during the build, with owner and blocking status.

**Blocking** = the build cannot proceed past a specific phase without it.
**Non-blocking** = work continues; the item is filled in later.

---

## 1. Local development environment

Owner: you. Needed before Phase 2.

| Item | Version | Verify | Status |
|---|---|---|---|
| Node.js | 20 LTS or 22 LTS | `node -v` | ☐ |
| npm | 10+ | `npm -v` | ☐ |
| Git | any recent | `git --version` | ☐ |
| VS Code | latest | — | ☐ |
| Claude Code | latest | — | ☐ |
| Chrome + devtools | latest | — | ☐ |

Recommended VS Code extensions: Tailwind CSS IntelliSense (autocomplete for the custom tokens), ESLint, Prettier, Error Lens.

If Node is missing or below 20, install the LTS from nodejs.org before anything else — Next.js 15 will not run on older versions.

---

## 2. Accounts

| Service | Purpose | Cost | Owner | Blocks | Status |
|---|---|---|---|---|---|
| GitHub | Version control | Free | You | Phase 2 | ☐ |
| **cPanel hosting** | Production hosting | Client's existing plan | **Manager** | Phase 9 | ☐ |
| **Domain** `.com.np` | Already registered ✓ | Free (Nepal ccTLD) | **Manager** | — | ☑ |
| Google Analytics | If required | Free | **Manager** (Q14) | Non-blocking | ☐ |
| Google Search Console | Post-launch indexing | Free | You | Post-launch | ☐ |

**Vercel and Resend are no longer used.** Deployment goes directly to cPanel; email is sent through the domain's own mailbox via PHPMailer over SMTP.

### cPanel access needed

| Item | Needed for | Status |
|---|---|---|
| cPanel login (or a sub-account) | Uploading the build, creating the mailbox | ☐ |
| The exact registered domain name | Canonical URLs, sitemap, OG tags — baked in at build time | ☐ |
| Confirmation that PHP 8.x is available | The contact form handler | ☐ |
| AutoSSL enabled / a valid certificate | HTTPS | ☐ |
| **Whether "Setup Node.js App" exists** | Informational only — static export is used regardless | ☐ |

### Files to fetch once

PHPMailer, three files only — no Composer needed, cPanel shared hosting often lacks it. Download from the PHPMailer GitHub release and place in `public/api/lib/`: `PHPMailer.php`, `SMTP.php`, `Exception.php`.

---

## 3. Brand assets

| Asset | Have it? | Owner | Blocks | Priority |
|---|---|---|---|---|
| Logo — transparent PNG | ✓ [logo.png](../logo.png), 2172×724 | — | — | — |
| **Logo — SVG or AI** | ✗ | **Manager (Q15)** | Non-blocking, quality impact | **High** |
| Logo — white/reverse variant | ✗ | Manager | Non-blocking | Medium |
| Brand colours | ✓ Sampled: `#389970`, `#007B91`, `#324043` | — | — | — |
| Official brand guidelines | ✗ | Manager (Q16) | Non-blocking | Low |
| Brand typeface | ✗ | Manager (Q16) | Non-blocking — Geist/Inter assumed | Low |
| Favicon source | Derivable from SVG | You | Phase 9 | Medium |
| OG share image (1200×630) | ✗ | You (design) | Phase 9 | Medium |
| Team / office photography | ✗ | Manager (Q17) | Non-blocking — design assumes none | Medium |

### Why the SVG matters

The logo currently exists only as a raster PNG. In a navigation bar at roughly 40px tall it will be downscaled, and on a retina display it will look soft against crisp text — precisely the detail that makes a site read as amateur. It also cannot produce a clean favicon at 16px or a scalable social image.

Interim mitigation: `next/image` serving at 2× the display size. It is a workaround, not a fix. Getting the vector file is the single highest-value asset request.

---

## 4. Information from management

Full text in [MANAGER-QUESTIONNAIRE.md](MANAGER-QUESTIONNAIRE.md). Summary of what stops work:

### Blockers — build stalls without these
| Q | Item | Stalls |
|---|---|---|
| 1 | Primary business goal | Copy direction |
| 2 | Target audience | Tone, compliance |
| 3 | Required pages | Sitemap, routing (Phase 3) |
| 4 | Primary CTA wording | Every page |
| 5 | Publicly advertisable services | Phase 4.3, Phase 5 |
| 6 | Approved company description | Hero, About, JSON-LD |
| 7–9 | Email, phone, address | Footer, Contact page |
| 10 | Enquiry destination inbox | Phase 7 |
| 12–13 | cPanel access + exact domain name | Phase 9, build-time canonical URLs |
| 20 | Design / content approvers | Phase 8 sign-off |
| 21 | Privacy Policy & Terms required? | Phase 9 |

### Non-blocking — proceed with a stated default
Q11 social accounts · Q14 analytics · Q16 brand guidelines · Q17 photography · Q18 client names · Q19 testimonials · Q23 verified metrics.

For each of these the default is the conservative one: omit the section entirely rather than fill it with something unverified.

---

## 5. Access and credentials

| Access | Held by | Needed for | Status |
|---|---|---|---|
| **cPanel login** | Manager | Uploading the build, creating the mailbox, SSL | ☐ |
| **Exact domain name as registered** | Manager | Build-time canonical URLs — see note | ☐ |
| Destination inbox for enquiries | Manager (Q10) | Form delivery + testing | ☐ |
| Social media account URLs | Manager (Q11) | Footer links | ☐ |
| Existing analytics property, if any | Manager (Q14) | Continuity of data | ☐ |

**The registered domain may settle Q0.** `.com.np` registration requires submitting company documentation to register.com.np. Whoever registered it had to provide official papers — asking which name appeared on them answers the Pramiva/Promeva question without waiting for the manager to dig anything out.

**A domain-name mismatch to watch for:** if the domain reads `pramiva.com.np` but the registered legal entity is *Promeva Solutions Private Limited*, the website address and the company's legal name will not match. Not fatal, but the manager should make that choice knowingly rather than discover it later.

---

## 6. Legal and compliance

| Item | Owner | Blocks | Status |
|---|---|---|---|
| Privacy Policy copy | Manager (Q21) | Phase 9 | ☐ |
| Terms of Service copy | Manager (Q21) | Phase 9 | ☐ |
| Cookie / consent stance | Manager (Q2 + Q14) | Analytics choice | ☐ |
| Consent for any published photo of a person | Manager (Q17) | About page | ☐ |

If Q2 confirms EU traffic **and** Q14 requests Google Analytics, a consent banner becomes mandatory under GDPR. That is added scope — a banner, a consent store, and conditional script loading.

**The clean way out:** Cloudflare Web Analytics — free, cookieless, one script tag, no banner required. cPanel also ships AWStats already installed, which needs no JavaScript at all. Recommend one of these unless the manager specifically needs Google Analytics' reporting depth. Flag the trade-off rather than absorbing the extra work silently.

A contact form collecting name, email and phone also requires a privacy notice link next to the submit button in EU markets.

---

## 7. Cost summary

| Item | Cost |
|---|---|
| Next.js, React, Tailwind, Framer Motion, Lenis, Zod | Free, open source |
| PHPMailer | Free, open source |
| cPanel hosting | Client's existing plan — no new cost |
| `.com.np` domain | Already registered, free |
| Email delivery | Included with cPanel — no third-party service |
| Fonts (Geist / Inter) | Free, open licence |

**Total additional recurring cost: zero.** Hosting and domain already exist, and nothing in the stack requires a paid service.

---

## 8. Pre-Phase-2 checklist

Do not run `create-next-app` until:

- [ ] Node 20+ verified with `node -v`
- [ ] Git installed and `user.name` / `user.email` configured
- [ ] GitHub repository created (private)
- [ ] WhatsApp message sent to the manager
- [ ] Q1–Q4 answered, or an explicit decision to proceed on stated assumptions
- [ ] [PRD.md](PRD.md), [ARCHITECTURE.md](ARCHITECTURE.md), [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) read once, end to end

# Architecture — Pramiva Solutions Website

**Version:** 1.0
**Date:** 2026-08-23
**Companion documents:** [PRD.md](PRD.md) · [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) · [WORKFLOW.md](WORKFLOW.md)

---

## 1. Stack

| Layer | Choice | Why this, and not something else |
|---|---|---|
| Framework | Next.js 15 (App Router) | Required by the brief. Server Components keep client JS small, which the performance budget depends on. |
| UI | React 19 | Bundled with Next 15. |
| Language | TypeScript, `strict: true` | Catches the class of error an AI-assisted build produces most: wrong prop shapes across many small components. |
| Styling | Tailwind CSS v4 | v4 configures via CSS `@theme` rather than a JS config file, so design tokens live in one place next to the CSS that uses them. |
| Animation | Framer Motion (via `LazyMotion`) | Chosen by the project owner. Loaded as a lazy feature bundle — see §5. |
| Smooth scroll | Lenis | Chosen by the project owner. Constrained — see §5.2. |
| Validation | Zod | Client-side validation and typed form state. |
| Build output | **Static export** (`output: 'export'`) | Required by cPanel — see §1.1 |
| Form backend | **PHP 8 + PHPMailer**, SMTP via cPanel mailbox | Static sites have no server. See §6 |
| Hosting | **cPanel shared hosting** | Client decision. Domain already registered on `.com.np` |
| Linting | ESLint (`next/core-web-vitals`) | Ships with `create-next-app`. |

**Removed from the stack:** Vercel and Resend. Deployment is direct to cPanel; email goes through the domain's own mailbox.

## 1.1 Why static export

cPanel serves files through Apache/LiteSpeed. It does not run a Node.js server the way Vercel does. Two options existed:

| | Static export | Node via cPanel Passenger |
|---|---|---|
| Reliability | Plain files. Cannot fail at runtime. | Passenger restarts, pinned old Node versions, silent 503s |
| Speed | Served straight from disk by LiteSpeed | Node process per request |
| API routes | ✗ None | ✓ Available |
| `next/image` optimization | ✗ Off | ✓ On |
| Deploy | Upload a folder | Build on server, restart app, hope |

**Static export wins here.** The API-route loss costs nothing because the contact form goes through PHP either way, so the only real sacrifice is automatic image optimization — handled manually in §7.

Even if the host does offer Node.js Selector, static export remains the recommendation. For a five-page marketing site the Node runtime adds failure modes and buys almost nothing.

### `next.config.ts`

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",          // emits static HTML into out/
  trailingSlash: true,       // /about/ → /about/index.html, which Apache serves correctly
  images: { unoptimized: true },  // no Node server to optimize on — see §7
};

export default nextConfig;
```

`trailingSlash: true` is not optional. Without it the export emits `about.html`, and Apache will not serve that at `/about`.

### What static export removes

- API routes (`app/api/**`) — **do not create any**, they fail silently at build
- Server Actions
- ISR / on-demand revalidation
- Runtime `next/image` optimization
- Middleware
- Runtime server env vars — **anything in the bundle is public**

**Server Components still work.** They render at build time into static HTML. The rendering model in §3 is unchanged, and the JS budget still matters.

### Dependency policy

Adding a package requires a written justification in this table. Brief §18 is explicit: *"Avoid installing dependencies simply because Claude recommends them."* If a need can be met with ~30 lines of local code, write the 30 lines.

Packages **not** used, and why: no UI component library (fights the custom editorial design), no icon library beyond a handful of hand-authored inline SVGs (brief §11 says minimise icons), no state manager (there is no client state beyond a menu boolean and a form), no `clsx`/`cn` helper unless conditional class logic actually appears in three or more places.

---

## 2. Directory structure

```
pramiva/
├── CLAUDE.md                    Claude Code operating rules — auto-loaded
├── .claude/skills/              Project skills (pramiva-ui, content-guard)
├── docs/                        This documentation set
├── next.config.ts               output: "export" — see §1.1
├── public/
│   ├── logo.svg                 PENDING — awaiting SVG from management (Q15)
│   ├── images/brand/
│   │   └── pramiva-logo.webp    Optimized transparent web asset
│   ├── favicon.ico, icon.svg, apple-icon.png
│   ├── og-image.png
│   ├── .htaccess                Apache rules — copied to out/ on export
│   └── api/
│       ├── contact.php          Form handler (see §6)
│       └── lib/                 PHPMailer.php, SMTP.php, Exception.php
└── src/
    ├── app/
    │   ├── layout.tsx           Root layout: fonts, providers, nav, footer
    │   ├── page.tsx             Home
    │   ├── globals.css          Tailwind import + @theme tokens
    │   ├── about/page.tsx
    │   ├── services/page.tsx
    │   ├── contact/page.tsx
    │   ├── careers/page.tsx     if Q26 approved
    │   ├── sitemap.ts
    │   ├── robots.ts
    │   └── not-found.tsx
    │
    ├── components/
    │   ├── layout/
    │   │   ├── navbar.tsx           "use client" — menu state
    │   │   ├── mobile-menu.tsx      "use client" — focus trap
    │   │   └── footer.tsx           server
    │   ├── sections/
    │   │   ├── hero.tsx
    │   │   ├── services-overview.tsx
    │   │   ├── why-pramiva.tsx
    │   │   ├── process.tsx
    │   │   ├── company-intro.tsx
    │   │   └── cta-band.tsx         all server
    │   ├── forms/
    │   │   └── contact-form.tsx     "use client"
    │   ├── providers/
    │   │   └── smooth-scroll.tsx    "use client" — Lenis
    │   └── ui/
    │       ├── button.tsx           server (renders <button> or <a>)
    │       ├── container.tsx        server
    │       ├── section.tsx          server — vertical rhythm wrapper
    │       ├── section-heading.tsx  server
    │       ├── reveal.tsx           "use client" — the ONLY motion consumer
    │       └── field.tsx            server — label + input + error slot
    │
    ├── data/
    │   ├── site.ts              Company name, contact, social, legal
    │   ├── navigation.ts        Nav and footer link structures
    │   ├── services.ts          Service catalogue
    │   └── seo.ts               Per-route metadata defaults
    │
    └── lib/
        ├── validation.ts        Zod schemas — shared client/server
        ├── motion.ts            Animation variants and durations
        ├── rate-limit.ts        In-memory per-IP limiter
        └── utils.ts             Small helpers only
```

---

## 3. Rendering model

**Default: Server Component. `"use client"` is an exception that must be justified.**

This is the single most consequential rule in the codebase. Framer Motion is a client library; if `"use client"` is placed at a page or section root, the entire subtree ships to the browser and the performance budget in [PRD.md](PRD.md) §7 is gone. The damage is invisible in development and only shows up in the `next build` bundle report.

The complete list of client components — four files, and it should not grow:

| Component | Reason |
|---|---|
| `navbar.tsx` | `useState` for the mobile menu |
| `mobile-menu.tsx` | Focus trap, `Escape` handler, scroll lock |
| `reveal.tsx` | Wraps Framer Motion |
| `smooth-scroll.tsx` | Lenis instance + rAF loop |
| `contact-form.tsx` | Form state, fetch, validation feedback |

Section components stay on the server and receive animation by *wrapping their children* in `<Reveal>`, rather than becoming client components themselves. `<Reveal>` accepts `children` — server-rendered content passed through a client boundary as a prop stays server-rendered. This pattern is what keeps the JS budget intact, and it is the thing most likely to be broken by a careless edit.

Verify after every phase:

```bash
npm run build   # First Load JS for / must stay under 100 KB
```

---

## 4. Data layer

No business string is ever written inside a component. Everything routes through `src/data/*.ts`.

```ts
// src/data/site.ts
export const site = {
  // 🔴 Q0 UNRESOLVED: logo says "Pramiva", legal entity claimed as "Promeva".
  // This is the ONLY place the name may appear. Never inline it anywhere else.
  name: "PLACEHOLDER: confirmed company name spelling (Q0)",
  legalName: "PLACEHOLDER: registered legal entity name (Q0)",

  tagline: "Think Bold. Build Smart. Scale Fast.",   // on the logo, already public — safe

  description: "PLACEHOLDER: approved company description (Q6)",
  email:       "PLACEHOLDER: display email address (Q7)",
  phone:       "PLACEHOLDER: display phone number (Q8)",
  address:     "PLACEHOLDER: full postal address, Lalitpur (Q27)",
  social: {
    // Only add keys that management confirms exist (Q11)
  },
} as const;
```

Four reasons this matters more than usual here:

1. Most content is unconfirmed. When answers arrive, one file changes instead of forty components.
2. `PLACEHOLDER:` becomes greppable. `grep -r "PLACEHOLDER:" src/` is a launch gate.
3. It removes the temptation for an AI session to invent a phone number to make a component render.
4. **The company name itself is disputed.** With `site.name` as the single source, resolving Q0 is a one-line change. Inline the name in twelve components and it becomes a find-and-replace across a codebase where one miss ships a misspelled company name to production.

`as const` gives literal types, so a typo in a component referencing `site.emial` fails the build.

### `src/data/brands.ts` — gated on Q24

Client brands are `[RISK]` content ([CONTENT-INVENTORY.md](CONTENT-INVENTORY.md) §6). The default build ships the anonymised form:

```ts
// src/data/brands.ts
// Q24 UNRESOLVED. Named brands require written consent from BOTH management and SNS.
// Until then only the anonymised summary is published.
export const portfolio = {
  summary:
    "PLACEHOLDER: approved anonymised capability statement (Q24) — " +
    "sectors and scale only, no client or brand names",
  brands: [],   // stays empty unless Q24 returns Option B with written consent
} as const;
```

Keeping the named data out of the repository entirely — rather than committed and conditionally rendered — means an accidental render, a leaked source map, or a future session cannot expose it. The draft cards live in [CONTENT-INVENTORY.md](CONTENT-INVENTORY.md), outside `src/`, where they cannot be imported by mistake.

---

## 5. Motion architecture

### 5.1 Framer Motion — bundle discipline

Framer Motion's full import is roughly 35KB gzipped. Loaded through `LazyMotion` with the `domAnimation` feature set it is roughly 5KB, which covers everything this site needs (opacity, transform, viewport triggers).

Rules:
- `LazyMotion` is mounted once, in `layout.tsx`, with `strict` enabled. `strict` makes the build fail if any component imports the full `motion` — the guard is mechanical, not a matter of discipline.
- Components import `m`, never `motion`.
- **No component imports `framer-motion` directly.** All animation goes through `<Reveal>`. One file to audit, one file to change if the library is ever swapped.

```tsx
// src/components/ui/reveal.tsx
"use client";
import { m, useReducedMotion } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;   // final state, no animation at all
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
```

The reduced-motion branch returns children unwrapped — not a zero-duration animation. A user with vestibular sensitivity gets no transform at all.

### 5.2 Lenis — constrained smooth scroll

Lenis normalises scroll easing. Brief §12 forbids scroll hijacking, and these two ideas sit close enough together that the boundary must be written down:

**Allowed:** light easing of the native scroll position; the page still scrolls at a natural rate, the scrollbar still tracks, wheel and trackpad and keyboard all behave normally.

**Forbidden:** section snapping, scroll-driven timelines that pin content, altered scroll direction, `duration` values high enough that the page feels detached from the input, anything that makes a fast flick feel slow.

Constraints:
- Disabled entirely under `prefers-reduced-motion` — the instance is never constructed
- Disabled on touch devices (`smoothTouch: false`); mobile OS scroll is already tuned and Lenis makes it feel wrong
- `lerp` ≈ 0.1, no `duration` override
- Must not break in-page anchor links or browser find-on-page

If the site ever feels like it is fighting the user's scroll, remove Lenis. It is a polish layer, not a requirement.

---

## 6. Contact form

### Flow

```
contact-form.tsx  ──validate (Zod)──▶  fetch POST /api/contact.php
                                             │
                                        [ PHP 8 on cPanel ]
                                             ├─ rate limit (file-based, per IP)
                                             ├─ honeypot + timing check
                                             ├─ re-validate everything server-side
                                             ├─ PHPMailer → SMTP (domain mailbox)
                                             └─ JSON response
```

Same origin, so no CORS configuration is needed.

### Validation happens twice, in two languages

```ts
// src/lib/validation.ts — client only
import { z } from "zod";

export const contactSchema = z.object({
  name:    z.string().trim().min(2).max(100),
  email:   z.string().trim().email().max(200),
  company: z.string().trim().min(1).max(150),
  phone:   z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000),
  website:  z.literal("").optional(),   // honeypot: bots fill it
  loadedAt: z.number(),                 // timing: submit <2s after load = bot
});
```

**The PHP handler must re-implement these same rules independently.** With a static site the entire JS bundle is public and trivially bypassed — anyone can POST directly to `contact.php`. Zod is a UX affordance only; PHP is the actual gate.

Because the rules now live in two languages, they will drift unless deliberately kept in step. **When one changes, change both** — the limits are duplicated as a comment block at the top of `contact.php` so the pairing is visible.

### `public/api/contact.php` — shape

```php
<?php
// Rules MUST mirror src/lib/validation.ts:
//   name 2-100 | email valid, <=200 | company 1-150
//   phone <=30 optional | message 10-3000
//   website MUST be empty (honeypot) | loadedAt >= 2s ago

require_once '/home/USERNAME/private/pramiva-mail-config.php';  // outside public_html
require_once __DIR__ . '/lib/PHPMailer.php';
require_once __DIR__ . '/lib/SMTP.php';
require_once __DIR__ . '/lib/Exception.php';

header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit; }

$in = json_decode(file_get_contents('php://input'), true);

// 1. honeypot — silent success so bots learn nothing
if (!empty($in['website'])) { echo json_encode(['ok' => true]); exit; }

// 2. timing, 3. rate limit, 4. field validation, 5. send
// ...
```

### Credentials never enter the repository

`pramiva-mail-config.php` holds the SMTP username and password and lives **outside `public_html`**, created by hand once through cPanel File Manager:

```php
<?php
define('SMTP_HOST', 'mail.yourdomain.com.np');
define('SMTP_USER', 'noreply@yourdomain.com.np');
define('SMTP_PASS', '...');
define('MAIL_TO',   '...');   // Q10 — enquiry destination
```

Two rules, both non-negotiable:

1. **Never in `public/`.** Anything under `public/` is copied into `out/` and uploaded — and would also be committed to git.
2. **Never in a `.env` file consumed by Next.** In a static export, every value reaching the bundle is public. There is no such thing as a server secret in the front end.

### Spam protection

Three layers, no CAPTCHA — a CAPTCHA costs an external script, a privacy disclosure, and conversion rate.

1. **Honeypot** — a `website` field hidden via CSS (`position:absolute; left:-9999px`, `tabindex="-1"`, `aria-hidden="true"`). Never `display:none`; some bots detect that. Non-empty → return success, send nothing.
2. **Timing** — `loadedAt` set on mount; submission under 2 seconds later is rejected.
3. **Rate limit** — PHP has no shared memory across requests, so this is file-based: a JSON counter keyed by hashed IP in the private directory, 5 submissions per 10 minutes.

### Sending

PHPMailer over **SMTP**, authenticated against the domain mailbox — not PHP's bare `mail()`. `mail()` sends unauthenticated from the web server and lands in spam often enough to lose enquiries silently, which is the worst possible failure for a contact form.

PHPMailer needs only three files (`PHPMailer.php`, `SMTP.php`, `Exception.php`) uploaded to `public/api/lib/`. No Composer required — cPanel shared hosting frequently lacks it.

Set the envelope `From:` to the domain mailbox and `Reply-To:` to the enquirer's address, so replying from the inbox reaches the sender directly.

### Error handling

PHP returns generic messages; details go to an error log in the private directory. A PHPMailer exception must never reach a visitor.

Delivery failure returns a visible error offering the direct email address as a fallback. A form that silently swallows an enquiry is worse than no form.

Field-level errors return as `{ field: message }` so the form can attach each one to the right input via `aria-describedby`.

### Environment variables

Only one, and it is public by design:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://yourdomain.com.np   # canonical URLs, sitemap, OG tags
```

All secrets live in the PHP config outside `public_html`. Nothing sensitive passes through the Next.js build.

---

## 6.1 Image optimization — manual

`images: { unoptimized: true }` means `next/image` no longer generates AVIF/WebP or responsive `srcset`. Since performance is a stated project requirement ([PRD.md](PRD.md) §7), this has to be replaced by hand:

- **Compress before committing.** Convert to WebP at ~80% quality with Squoosh or `sharp`. A 2MB hero JPEG will not be rescued at runtime here.
- **Keep `width` and `height`** on every `next/image` — this is what prevents layout shift, and it still works when unoptimized.
- **Serve at roughly 2× display size**, no larger. The logo at 40px tall needs an 80px asset, not the 1536px original.
- **Long cache headers** via `.htaccess` (§9).

Getting the logo as SVG (Q15) matters more under this setup than it did under Vercel: a vector has no resolution to optimize and stays sharp at any size for free.

---

## 7. SEO implementation

- Root `metadata` in `layout.tsx` with `metadataBase`, title template, and OG defaults
- Per-page `export const metadata` from `src/data/seo.ts`
- `sitemap.ts` and `robots.ts` as App Router file conventions — generated, never hand-maintained
- `Organization` JSON-LD in the root layout; emitted **only** once Q6–Q9 are answered, since structured data asserting a fake address is a genuine liability
- Exactly one `h1` per page; heading levels never skipped for styling reasons — size comes from the type scale, not the tag

---

## 8. Accessibility architecture

Not a QA phase — built into the primitives so it cannot be forgotten per-component:

- `ui/field.tsx` owns the label/input/error relationship. Every form field goes through it, so `aria-describedby` and `aria-invalid` are correct by construction.
- `ui/button.tsx` renders a real `<button>` or `<a>` — never a clickable `<div>`.
- Focus ring is a global token in `globals.css` applied via `:focus-visible`. It is never removed.
- Skip-to-content link as the first focusable element in `layout.tsx`.
- `mobile-menu.tsx` owns the focus trap, `Escape` handler, and scroll lock.
- Brand green fails AA for text — enforced in [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) §2.

---

## 9. Deployment — cPanel

### Build

```bash
npm run build      # emits out/ — static HTML, CSS, JS, plus public/ contents
```

`out/` is the entire deployable site. It is git-ignored; it is a build artefact.

### Upload

1. cPanel → **File Manager** → `public_html`
2. Upload the contents of `out/` (zip it, upload, extract in place — far faster than uploading hundreds of files individually)
3. Confirm `public_html/api/contact.php` and `public_html/api/lib/` are present
4. Confirm `public_html/.htaccess` is present — File Manager hides dotfiles until *Settings → Show Hidden Files* is enabled, and a missing `.htaccess` is a common silent failure

FTP or cPanel's Git Version Control can automate this later. Manual upload is fine at this frequency and has fewer ways to go wrong.

### One-time server setup

- Create the mailbox `noreply@<domain>` in cPanel → Email Accounts
- Create `/home/USERNAME/private/` **outside** `public_html`
- Place `pramiva-mail-config.php` there with the SMTP credentials (§6)
- Enable free AutoSSL in cPanel → SSL/TLS Status, then confirm HTTPS resolves

### `public/.htaccess`

Exported by the build. It handles what Vercel would have done automatically:

```apache
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Custom 404
ErrorDocument 404 /404.html

# Cache static assets aggressively — filenames are content-hashed
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css              "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/webp            "access plus 1 year"
  ExpiresByType font/woff2            "access plus 1 year"
  ExpiresByType text/html             "access plus 0 seconds"
</IfModule>

# Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript image/svg+xml
</IfModule>

# Block direct access to the mail config, belt and braces
<FilesMatch "config\.php$">
  Require all denied
</FilesMatch>
```

`text/html "access plus 0 seconds"` matters: HTML must not be cached or a deploy appears to do nothing for returning visitors.

### Review before launch

The client has chosen **direct deployment to cPanel** — no separate staging host.

A subdomain (`staging.<domain>`) costs nothing on the same cPanel account and gives the manager a real URL to approve before the live site changes. Recommended, but the decision is the client's. If it is skipped, upload during low-traffic hours and keep the previous `out/` zip so a bad deploy can be rolled back by re-extracting it.

### What is lost versus Vercel

Worth knowing, not worth reversing the decision over: no automatic per-branch preview URLs, no instant rollback button, no global CDN (visitors far from the host's datacentre see higher latency), no build-on-push. All are acceptable at this scale — but every deploy is now a manual step that can be forgotten or half-completed, which is exactly why the launch checklist exists.

---

## 10. Known risks

| Risk | Impact | Mitigation |
|---|---|---|
| `"use client"` creep from Framer Motion | Performance budget lost silently | `LazyMotion strict`, single `<Reveal>` consumer, bundle check at every phase gate |
| Lenis drifting toward scroll hijacking | Violates brief §12 | Written constraints in §5.2; remove if it fights the user |
| Logo only exists as PNG | Blurry nav on retina, poor favicon | Q15 requests SVG; interim uses `next/image` at 2× |
| Unconfirmed content hardened into components | Expensive rework, risk of publishing invented facts | `src/data/*` layer + `content-guard` skill + `PLACEHOLDER:` grep gate |
| **Company name spelling unresolved (Q0)** | Wrong domain purchased (non-refundable), misspelled name across the whole site, possible logo re-issue | Name confined to `site.name`; domain purchase blocked until the registration certificate is seen |
| **Client brand names published without consent (Q24)** | Possible breach of the SNS agreement; damage to a client's local market position; loss of the client | Named data never enters `src/`; anonymised default; grep gate in the launch checklist; `content-guard` skill blocks it |
| **SMTP credentials committed to git or placed in `public/`** | Mailbox compromised, used for spam, domain blacklisted | Config file lives outside `public_html`, created by hand on the server, never in the repo |
| **PHP and Zod validation rules drift apart** | Server accepts what the client rejects, or vice versa | Rules duplicated as a comment header in `contact.php`; changed in pairs |
| **Static export attempted with an API route present** | Build fails, or the route silently does not exist in production | No `app/api/**` directory — the form posts to `contact.php` |
| **`.htaccess` missing after upload** | No HTTPS redirect, no 404 page, no caching | File Manager hides dotfiles by default — explicitly verify after every deploy |
| **Deploying by hand** | Half-uploaded site, stale HTML cached, no rollback | Zip-and-extract rather than file-by-file; keep the previous `out/` zip |
| `.com.np` on an Australian-facing site | Nepal country signal to Google and to visitors | Raised with the client; decision taken to proceed |
| AI session edits files outside its phase | Regressions in approved work | Phase gates + commit at every green state ([WORKFLOW.md](WORKFLOW.md)) |

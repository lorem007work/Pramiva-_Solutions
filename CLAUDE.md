# Pramiva / Promeva Solutions Website

Corporate website. Next.js 15 App Router (static export) · TypeScript strict · Tailwind v4 · Framer Motion · Lenis · PHP/PHPMailer form handler · cPanel hosting.

## 🔴 The company name is unresolved

The logo says **Pramiva**. The stated legal entity is **Promeva Solutions Private Limited**. One of them is wrong and management has not yet said which.

- The name appears in **exactly one place**: `site.name` in `src/data/site.ts`
- Never type either spelling anywhere else — not in metadata, not in JSON-LD, not in a heading, not in a comment
- Do not register a domain, configure a sending address, or write the name into copy until it is confirmed against the registration certificate

See [docs/CONTENT-INVENTORY.md](docs/CONTENT-INVENTORY.md) §1.

## Documents

| File | Read it when |
|---|---|
| [docs/PRD.md](docs/PRD.md) | Deciding *what* to build, or whether a requirement is approved |
| [docs/CONTENT-INVENTORY.md](docs/CONTENT-INVENTORY.md) | Before writing any copy — what is known, and what is cleared |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Deciding *how* — structure, rendering model, form, deps |
| [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md) | Writing any markup or styling |
| [docs/WORKFLOW.md](docs/WORKFLOW.md) | Starting a session — which phase are we in |
| [documntation.md](documntation.md) | The original client brief. Historical source. PRD.md supersedes it. |

**[docs/CONTENT-INVENTORY.md](docs/CONTENT-INVENTORY.md) is a staging area, not approved copy.** Everything in it came from internal induction material. `[DRAFT]` means written up and awaiting sign-off — it does not mean cleared to publish.

## Deployment: static export → cPanel

`output: "export"`. There is **no server**. Consequences that bite:

- **Never create `app/api/**`.** The contact form posts to `public/api/contact.php`.
- **No server secrets.** Anything reaching the bundle is public. SMTP credentials live in a PHP config outside `public_html`, never in the repo, never in `public/`.
- **No runtime image optimization.** Compress images before committing; keep `width`/`height` on every `next/image`.
- Server Components still work — they render to HTML at build time.

## Commands

```bash
npm run dev     # dev server (does NOT run PHP — test the form on the server)
npm run lint    # must pass before commit
npm run build   # must pass before commit; emits out/; check First Load JS
```

## Hard rules

**Content**
1. Never invent company business information — no client names, statistics, employee counts, founding year, awards, partnerships, testimonials, addresses, phone numbers, or performance claims. Not even as a "realistic example".
2. Unknown values are written `PLACEHOLDER: <what is needed>` in `src/data/*.ts`. Never a plausible-looking invention.
3. The internal induction material is not a source of publishable copy. Knowing a fact ≠ being cleared to publish it.
4. **Never publish the client brand names** — SNS Multiservices, Turf Man, Perth Landscaper, Cleaning Team, Carry or Drag, Hardrex, Public Shed — without written consent from *both* management and SNS. See [docs/CONTENT-INVENTORY.md](docs/CONTENT-INVENTORY.md) §6. Default is the anonymised sector description.
5. Never write either spelling of the company name outside `src/data/site.ts`.

**Architecture**
6. Server Components by default. `"use client"` only in: `navbar`, `mobile-menu`, `reveal`, `smooth-scroll`, `contact-form`. Adding a sixth requires justification — it is how the JS budget gets lost. Baseline measured at Phase 2 is **168.8 KB gz** (framework only); budget is **185 KB gz**.
7. No component imports `framer-motion` directly. All animation goes through `ui/reveal.tsx`.
8. No business string hard-coded in a component. Everything from `src/data/*.ts`.
9. No hex value inside a component. Tokens only, from `globals.css`.

**Dependencies**
10. No new package without a written justification added to the [ARCHITECTURE.md](docs/ARCHITECTURE.md) stack table. If ~30 lines of local code does the job, write the 30 lines.

**Quality**
11. TypeScript strict. No `any` in application code.
12. Accessibility is not a later phase: semantic HTML, one `h1` per page, keyboard-operable, visible focus, labelled inputs, `prefers-reduced-motion` honoured.
13. Brand green `#389970` fails WCAG AA for text (3.52:1). Decorative use only. Use `#2A7355` when green must carry text.
14. Animate only `opacity` and `transform`.

**Process**
15. One section or component per session. Do not touch files outside the current phase ([docs/WORKFLOW.md](docs/WORKFLOW.md)).
16. Read a file before editing it.
17. Run `npm run lint && npm run build` before reporting work complete.
18. State assumptions explicitly rather than silently choosing.
19. Do not replace an established design decision without asking.

## Before any commit

```bash
npm run lint && npm run build
grep -rn "PLACEHOLDER:" src/    # expected during build; must be empty before launch
```

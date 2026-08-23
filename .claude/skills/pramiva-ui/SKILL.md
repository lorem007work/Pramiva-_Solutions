---
name: pramiva-ui
description: Design tokens, typography scale, spacing rhythm, motion contract, and component recipes for the Pramiva Solutions website. Load BEFORE writing or editing any component, section, page, or CSS in this project — including hero, navbar, footer, cards, buttons, forms, and any Tailwind class work. Triggers on "build the hero", "add a section", "style this", "create a component", "add animation", "make it responsive", or any markup/styling task in src/.
---

# Pramiva UI

Enforces one visual system across sessions. Without this, each session re-derives spacing and colour and the site drifts into looking assembled rather than designed.

Full reference: [docs/DESIGN-SYSTEM.md](../../../docs/DESIGN-SYSTEM.md). This file is the working subset.

## Colour — measured from logo.png

| Token | Hex | Use |
|---|---|---|
| `canvas` | `#FFFFFF` | Page background |
| `surface` | `#FAFAFA` | Alternating sections |
| `ink` | `#0A0A0A` | Primary text |
| `ink-muted` | `#52606D` | Secondary text |
| `ink-subtle` | `#6B7885` | Meta, eyebrows |
| `line` | `#E4E7EB` | Hairline borders |
| `brand` | `#007B91` | Primary brand teal — AA safe (4.95:1) |
| `brand-deep` | `#005E6E` | Teal hover — AAA (7.43:1) |
| `accent` | `#389970` | Brand green — **DECORATIVE ONLY** |
| `accent-text` | `#2A7355` | Green when it must carry text (5.70:1) |

### The contrast rule

`#389970` is **3.52:1 on white — it fails WCAG AA for normal text.** White text on `#389970` also fails.

- Green for text → use `accent-text` `#2A7355`
- Solid green button with white text → background `#2A7355`, never `#389970`
- `#389970` is fine for: large display accents, graphic shapes, dividers, icon strokes

Never write a hex in a component. Tokens only.

## Typography

One variable family (Geist or Inter), self-hosted via `next/font`. Never a Google Fonts `<link>`.

| Token | clamp | Line height | Tracking |
|---|---|---|---|
| `text-display` | `clamp(2.75rem, 7vw, 6.5rem)` | `0.95` | `-0.03em` |
| `text-h1` | `clamp(2.25rem, 5vw, 4rem)` | `1.05` | `-0.03em` |
| `text-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | `1.15` | `-0.02em` |
| `text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | `1.3` | `-0.01em` |
| `text-lead` | `clamp(1.125rem, 1.5vw, 1.375rem)` | `1.5` | `0` |
| body | `1rem` | `1.6` | `0` |
| `text-eyebrow` | `0.75rem` uppercase | `1.4` | `0.12em` |

Rules: line height narrows as size grows — this ratio is what makes big type read as editorial. Weight `500`–`600` for headings, never `700`+. Body copy capped at `max-w-[65ch]`. Heading level is semantic; size is a class.

## Spacing

Sections never set their own vertical padding — `<Section>` owns it.

- Between sections: `clamp(5rem, 12vw, 10rem)`
- Between subsections: `clamp(3rem, 7vw, 5rem)`
- Heading → content: `clamp(1.5rem, 3vw, 2.5rem)`

`<Container>` owns horizontal constraint: `max-w-[1280px]`, gutters `1.25rem` → `2rem` → `4rem`.

12-column grid, `gap: clamp(1rem, 2vw, 2rem)`. Three-up = 12/6/4 cols at mobile/tablet/desktop. No arbitrary positioning.

## Motion

Framer Motion only through `ui/reveal.tsx`. **No component imports `framer-motion` directly.**

- Reveal: `opacity 0→1`, `y 24px→0`, `600ms`, `cubic-bezier(0.22, 1, 0.36, 1)`, `viewport={{ once: true, margin: "-80px" }}`
- Stagger siblings by `80ms`
- Hover: `150ms` colour, `300ms` transform
- **Animate only `opacity` and `transform`.** Animating `height`/`top`/`margin`/`box-shadow` causes jank on mid-range Android.
- Reduced motion: `<Reveal>` returns children unwrapped — final state, no animation at all. Not a zero-duration tween.

## Component recipes

**Button** — `inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full transition-colors duration-150`
- Primary: `bg-ink text-canvas hover:bg-brand`
- Secondary: `border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-canvas`
- Ghost: `text-ink underline-offset-4 hover:text-brand`

Renders `<button>` when it acts, `<a>` when it navigates. Never a clickable `<div>`.

**Card** — `border border-line rounded-2xl p-8 transition-[border-color,transform] duration-300 hover:border-ink-subtle hover:-translate-y-1`. Transform only, no shadow animation. Clickable card = one `<a>` wrapping it, not nested links.

**Link underline** — `after:` pseudo-element, `scale-x-0 → scale-x-100`, `origin-right → origin-left` on hover, `duration-300`. Composited, zero layout cost.

**Focus ring** — global `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 3px; }`. `outline: none` anywhere is a bug.

**Eyebrow pair** — `<p class="text-eyebrow text-ink-subtle">01 — Services</p>` above `<h2 class="text-h2">`. The recurring editorial device; numerals instead of icons.

## Rendering

Server Component by default. `"use client"` permitted only in `navbar`, `mobile-menu`, `reveal`, `smooth-scroll`, `contact-form`.

Sections stay server-rendered and get animation by wrapping children in `<Reveal>` — passing server content through a client boundary as `children` keeps it on the server. Marking a section `"use client"` to animate it drags the whole subtree into the bundle and silently blows the JS budget.

## Checklist before finishing a component

- [ ] No hex values — tokens only
- [ ] Green not used for text or behind white text
- [ ] Vertical padding from `<Section>`, not local
- [ ] Semantic element; one `h1` per page; levels not skipped
- [ ] Keyboard operable, focus visible
- [ ] Body copy `max-w-[65ch]`
- [ ] Animates only opacity/transform
- [ ] Not `"use client"` unless on the approved list
- [ ] Checked at 360 / 768 / 1440

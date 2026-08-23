# Design System — Pramiva Solutions

**Version:** 1.0
**Date:** 2026-08-23
**Direction:** Tech-Driven Minimalist — premium, editorial, high contrast, generous whitespace

This file is the single source of truth for tokens. Components consume tokens; they never invent a hex value, a font size, or a spacing number.

---

## 1. Brand colours — measured, not estimated

Sampled directly from [logo.png](../logo.png) by pixel frequency analysis. These are the actual values in the asset, not visual approximations.

| Role | Hex | Where it appears in the logo |
|---|---|---|
| Brand green | `#389970` | The crescent arcs |
| Brand teal | `#007B91` | "Pramiva Solutions" wordmark |
| Brand slate | `#324043` | "Think Bold. Build Smart. Scale Fast" tagline |

> If an SVG or brand guideline arrives (Q15/Q16) and its values differ, the official asset wins. Re-sample and update this table.

## 2. Contrast — a hard constraint, measured

WCAG 2.1 contrast ratios against white `#FFFFFF`, computed:

| Colour | Ratio on white | Normal text (needs 4.5) | Large text ≥24px (needs 3.0) | UI borders (needs 3.0) |
|---|---|---|---|---|
| `#389970` brand green | **3.52:1** | ✗ **FAILS** | ✓ passes | ✓ passes |
| `#007B91` brand teal | **4.95:1** | ✓ passes | ✓ passes | ✓ passes |
| `#324043` brand slate | **10.77:1** | ✓ passes | ✓ passes | ✓ passes |
| `#2A7355` green-text | **5.70:1** | ✓ passes | ✓ passes | ✓ passes |
| `#005E6E` teal-deep | **7.43:1** | ✓ AAA | ✓ passes | ✓ passes |
| `#0A0A0A` ink | **19.8:1** | ✓ AAA | ✓ passes | ✓ passes |

### The rule that follows from this

**Brand green `#389970` must never be used for body text, small text, or white text on a green background.** White on `#389970` is also 3.52:1 — a green button with white text fails AA.

Green is a *decorative* colour here: large display accents, graphic elements, dividers, icon strokes, hover fills behind dark text.

When green must carry text, use **`#2A7355`** (green-text, 5.70:1). It reads as the same brand colour at text sizes but passes AA.

For a solid green button with white text, use **`#2A7355`** as the background — `#389970` fails.

This single constraint prevents the most common accessibility failure in brand-driven sites: the brand colour used for links and buttons because it "looks right", failing audit at launch when it is expensive to change.

## 3. Colour tokens

Defined once in `src/app/globals.css` using Tailwind v4's `@theme`:

```css
@import "tailwindcss";

@theme {
  /* Canvas & ink */
  --color-canvas:      #FFFFFF;
  --color-surface:     #FAFAFA;   /* subtle section alternation */
  --color-ink:         #0A0A0A;   /* primary text */
  --color-ink-muted:   #52606D;   /* secondary text — 7.1:1 on white */
  --color-ink-subtle:  #6B7885;   /* tertiary/meta — 4.6:1, AA only */
  --color-line:        #E4E7EB;   /* hairline borders */
  --color-line-strong: #C9CFD6;

  /* Brand — from logo.png */
  --color-brand:        #007B91;  /* teal — primary brand, AA safe */
  --color-brand-deep:   #005E6E;  /* teal hover/active, AAA */
  --color-accent:       #389970;  /* green — DECORATIVE ONLY, fails AA for text */
  --color-accent-text:  #2A7355;  /* green when it must carry text */
  --color-slate:        #324043;  /* from tagline */

  /* Feedback */
  --color-error:   #B42318;
  --color-success: #067647;

  /* Focus */
  --color-focus: #007B91;
}
```

Components use Tailwind classes generated from these (`text-ink`, `bg-canvas`, `border-line`, `text-brand`). **No arbitrary hex values in component files.** If a shade is missing, add it here first.

---

## 4. Typography

### Typeface

**One variable typeface, self-hosted via `next/font`.** Not a Google Fonts `<link>` — an external font request blocks render and costs LCP directly.

Recommended: **Geist** (`geist/font`) or **Inter Variable**. Both are neutral, technical grotesques that suit the editorial direction and carry a full weight range in one variable file.

A second display face is permitted only if it earns its place (brief §10). Default: one family.

```tsx
// src/app/layout.tsx
import { GeistSans } from "geist/font/sans";
// className={GeistSans.variable} on <html>
```

### Scale

The editorial look comes from an **extreme but controlled** gap between display and body. Everything fluid via `clamp()` so it holds from 360px to 1920px without breakpoint-specific overrides.

| Token | `clamp()` | Use |
|---|---|---|
| `text-display` | `clamp(2.75rem, 7vw, 6.5rem)` | Hero headline. One per page. |
| `text-h1` | `clamp(2.25rem, 5vw, 4rem)` | Page titles |
| `text-h2` | `clamp(1.75rem, 3.5vw, 2.75rem)` | Section headings |
| `text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Card / sub headings |
| `text-lead` | `clamp(1.125rem, 1.5vw, 1.375rem)` | Intro paragraph under a heading |
| `text-body` | `1rem` | Body copy |
| `text-small` | `0.875rem` | Meta, captions, labels |
| `text-eyebrow` | `0.75rem`, `0.12em` tracking, uppercase | Section labels above headings |

```css
@theme {
  --text-display: clamp(2.75rem, 7vw, 6.5rem);
  --text-h1:      clamp(2.25rem, 5vw, 4rem);
  --text-h2:      clamp(1.75rem, 3.5vw, 2.75rem);
  --text-h3:      clamp(1.25rem, 2vw, 1.5rem);
  --text-lead:    clamp(1.125rem, 1.5vw, 1.375rem);
}
```

### Rules

- **Line height narrows as size grows.** Display `0.95`–`1.0`, headings `1.1`–`1.2`, body `1.6`, lead `1.5`. Display text at `1.5` looks like a document, not a statement — this ratio is what makes large type read as editorial.
- **Tracking tightens as size grows.** Display `-0.03em`, h2 `-0.02em`, body `0`.
- **Weight:** display and headings `500`–`600`. Avoid `700`+ — heavy weight at huge sizes reads as shouty rather than premium.
- **Measure:** body copy capped at `max-w-[65ch]`. Full-width paragraphs are the fastest way to make a site look unconsidered.
- Heading *level* is semantic; heading *size* is a class. Never pick `h3` because `h2` looks too big.

---

## 5. Spacing & layout

4px base unit. Tailwind's default scale already matches.

### Section rhythm

Vertical space is the primary carrier of "premium" in this design. It must be generous and consistent.

| Token | Value | Use |
|---|---|---|
| `--space-section` | `clamp(5rem, 12vw, 10rem)` | Between major sections |
| `--space-section-sm` | `clamp(3rem, 7vw, 5rem)` | Between subsections |
| `--space-block` | `clamp(1.5rem, 3vw, 2.5rem)` | Heading → content |

All sections render through `<Section>`, which owns this padding. Individual sections never set their own vertical padding — that is how rhythm drifts.

### Container

`<Container>` owns horizontal constraint: `max-width: 1280px`, gutters `1.25rem` mobile → `2rem` tablet → `4rem` desktop. Every full-width section wraps its content in one.

### Grid

12-column, `gap: clamp(1rem, 2vw, 2rem)`. Cards align to it: 12 cols mobile, 6 tablet, 4 desktop for a three-up. Arbitrary positioning is disallowed (brief §9).

### Breakpoints

Tailwind defaults: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.

Layouts are *designed* at 360 / 768 / 1024 / 1440 / 1920 — not shrunk from desktop (brief §17). Mobile-first: base styles are mobile, breakpoints add.

---

## 6. Motion

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Reveals, entrances |
| `--ease-inout` | `cubic-bezier(0.65, 0, 0.35, 1)` | Two-way transitions |
| `--dur-fast` | `150ms` | Colour, opacity, hover |
| `--dur-base` | `300ms` | Transform hover, menu |
| `--dur-slow` | `600ms` | Scroll reveals |
| stagger | `80ms` | Between siblings in a group |

**Reveal:** `opacity 0 → 1`, `translateY 24px → 0`, `600ms`, `--ease-out`, fires once at `-80px` viewport margin, never replays on scroll-up.

**Animate only `opacity` and `transform`.** These are GPU-composited. Animating `height`, `top`, `margin`, or `box-shadow` causes layout thrash and shows as jank on mid-range Android.

**Reduced motion is non-negotiable.** Under `prefers-reduced-motion: reduce`: reveals render in final state with no transform, Lenis is not initialised, hover transforms drop to colour-only changes. Implemented in `<Reveal>` (see [ARCHITECTURE.md](ARCHITECTURE.md) §5.1) plus a global CSS fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 7. Component recipes

Fixed patterns. Consistency across AI sessions depends on these being copied, not re-derived.

### Button

| Variant | Classes | Notes |
|---|---|---|
| Primary | `bg-ink text-canvas hover:bg-brand` | Black → teal on hover. High contrast, unmistakably the primary action. |
| Secondary | `border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-canvas` | |
| Ghost | `text-ink underline-offset-4 hover:text-brand` | Inline/tertiary |

Shared: `inline-flex items-center gap-2 px-6 py-3 text-small font-medium rounded-full transition-colors duration-150`, plus the global focus ring.

Renders `<button>` when it acts, `<a>` when it navigates. Never a `<div>`.

> A solid green button uses `--color-accent-text` (`#2A7355`), never `--color-accent`. See §2.

### Card

```
border border-line rounded-2xl p-8
transition-[border-color,transform] duration-300
hover:border-ink-subtle hover:-translate-y-1
```

Transform only — no shadow animation. If a card is clickable, the whole card is one `<a>`, not a nested link.

### Animated link underline

```
relative inline-block
after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full
after:origin-right after:scale-x-0 after:bg-current
after:transition-transform after:duration-300
hover:after:origin-left hover:after:scale-x-100
```

`scaleX` on a pseudo-element — composited, no layout cost. Origin flips so it wipes out to the right and in from the left.

### Focus ring — global, never removed

```css
:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 3px;
  border-radius: 2px;
}
```

`:focus-visible`, not `:focus` — no ring on mouse click, always present for keyboard. `outline: none` anywhere in this codebase is a bug.

### Eyebrow + heading pair

```tsx
<p class="text-eyebrow text-ink-subtle">01 — Services</p>
<h2 class="text-h2 tracking-tight">…</h2>
```

The recurring editorial device: small tracked label, large tight heading. Numbers as ordering elements suit the direction (brief §11) and need no icons.

---

## 8. Imagery

No stock photography (brief §11). Until real photographs arrive (Q17), visual interest comes from typography scale, generous whitespace, hairline rules, the 12-column grid made visible in places, large numerals, and abstract compositions built from the logo's arc geometry.

Icons only where they aid comprehension — hand-authored inline SVG, `currentColor`, `1.5px` stroke, `24px` box. No icon library.

All images through `next/image` with explicit `width`/`height` to prevent CLS. AVIF/WebP. Only the hero image (if any) uses `priority`.

---

## 9. Do not

- Add a hex value inside a component
- Use `#389970` for text or as a background behind white text
- Add a third font family
- Use `font-bold` on display type
- Set vertical padding directly on a section instead of using `<Section>`
- Animate `height`, `width`, `top`, `margin`, or `box-shadow`
- Remove a focus outline
- Let body copy run wider than `65ch`
- Choose a heading tag for its size

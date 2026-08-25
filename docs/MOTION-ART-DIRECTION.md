# Motion and graphic direction

**Status:** Review brief for the current redesign  
**Reviewed:** 2026-08-25 at 1440px desktop and 390px mobile

## Outcome

The page already has the right raw material: real team photography, the logo's
right-opening crescent, restrained typography, and dark brand artwork in the
vision and closing bands. Improve the site by making those elements feel like
one system. Do not add unrelated blobs, particles, floating decorations,
parallax, scroll-jacking, or animation to every available element.

The motion hierarchy should be:

1. **Signature:** the homepage hero photograph and crescent assemble once.
2. **Orientation:** section headings and important groups reveal on entry.
3. **Feedback:** links, buttons, and actionable cards respond to hover, focus,
   and press.

Everything else stays still. Stillness is what gives the signature moment
weight.

## Review findings

### P0 — resolve before adding effects

- An early 1440px pass showed the hero crescent crowding the last H1 line. The
  latest live pass clears it, so preserve that separation and verify it rather
  than relying on the comment in `hero-split.tsx`. Copy must win over
  decoration at every breakpoint. Preserve the mobile order, which is working
  well.
- The homepage currently loads **213.4 KB gzipped JavaScript** across its script
  tags; the project budget is **185 KB**. `motion` added roughly 34 KB. The
  current effects are fade, translate, and scale, all of which can be expressed
  with CSS plus the earlier dependency-free IntersectionObserver.
- Staggered groups currently move twice: the `<Reveal>` parent rises and fades,
  then its `[data-stagger]` children run another rise-and-fade. Nested opacity
  and transforms make the entrance feel soft and overworked. A group gets one
  entrance system: parent reveal **or** child stagger, never both.
- The newly added nine-second `.drift` loop keeps the hero compositor active
  indefinitely for an effect deliberately described as too small to notice.
  Remove it. Signature motion should assemble the hero and then stop; continuous
  ambient motion adds battery cost and visual restlessness without information.
- The development console reports duplicate React keys for the three footer
  service links because they all use `/services` as the key. This is outside the
  art direction, but it blocks a clean browser review.

### P1 — graphic coherence

- Use the logo crescent as the only abstract motif. The hero mark, vision
  artwork, and CTA artwork should look like views of the same form at different
  scales.
- Keep the supplied photography documentary rather than stylised. Do not add
  colour filters, fake depth blur, glass cards, or stock imagery.
- Preserve the service icons as one thin-line family. Their motion, if any,
  belongs to hover feedback on an actionable parent; decorative icons should
  not loop or pulse.
- The logo rail is correctly quiet. Do not turn it into an auto-scrolling
  marquee; five logos do not justify continuous motion.

## Motion vocabulary

Only `opacity` and `transform` may animate.

| Role | Motion | Timing |
|---|---|---|
| Hero copy | opacity 0→1, translateY 12px→0 | 500ms; 80–90ms steps |
| Hero mark | opacity 0→1, scale .96→1 | 700–800ms; inner crescent follows outer |
| Hero photo | static overflow mask; child opacity 0→1, scale 1.025→1, translateX 12px→0 | 700ms; starts after headline |
| Section reveal | opacity 0→1, translateY 16px→0 | 520–600ms; once |
| Group stagger | children use the section reveal values; parent does not transform | 60–80ms between items |
| Hover feedback | translateY 0→-2px for buttons, 0→-4px for actionable cards | 180–300ms |
| Press feedback | scale 1→.98 | 120–180ms |

Use `cubic-bezier(0.22, 1, 0.36, 1)` for entrances. The entire hero should be
settled within about 900ms. Do not delay reading or interaction.

Under `prefers-reduced-motion: reduce`, render the final state immediately:
no transform, no stagger, no smooth scrolling, and no zero-duration imitation
of the same sequence.

## Implementation direction for Claude Code

Work in small, reviewable sessions and keep the existing dirty worktree intact.

### Session 1 — restore a lightweight motion foundation

Scope: `src/components/ui/reveal.tsx`, `src/app/globals.css`, `package.json`,
`package-lock.json`, and the matching architecture note only.

- Restore the previous dependency-free IntersectionObserver reveal.
- Remove `motion` if no remaining effect needs it. The present filled-crescent
  scale/fade does not need a motion library.
- Add an explicit group mode so a staggered list does not also animate its
  parent. Keep server components and the no-JavaScript visible state.
- Delete superseded/dead hero keyframes or attributes rather than leaving two
  animation systems in the stylesheet.
- Measure the exported homepage scripts after the build; do not call the task
  complete based on compilation alone.

### Session 2 — fix and refine only the hero

Scope: `hero-split.tsx` and the minimum shared CSS/reveal API required.

- Fix desktop separation first. At 1024, 1280, 1440, and 1920px, neither the
  mark nor photograph may cover any H1 glyph.
- Preserve the working phone sequence: eyebrow → H1 → photograph → lead → CTAs.
- Let the copy enter first, then assemble mark and photo as one signature
  object. Use a static overflow mask around the photo so the animated child
  still changes only transform and opacity.
- Do not animate layout, border radius, clip-path, width, height, or position.

### Session 3 — micro-interactions only

Scope one primitive or one section per session.

- Buttons: retain colour change, -2px hover lift, .98 press scale, and visible
  keyboard focus.
- Service cards: only lift if the whole card becomes a real link. Non-actionable
  information cards should not pretend to be clickable.
- Navigation underline and mobile press feedback are already sufficient.

## Acceptance checks

- `npm run lint` and `npm run build` pass.
- No browser console errors or React warnings.
- No horizontal overflow at 360, 390, 430, 768, 1024, 1440, and 1920px.
- Hero copy is never covered by decorative graphics.
- Slow-scroll review shows no section animating twice.
- Fast jump to the page bottom cannot leave content hidden.
- With JavaScript disabled, all content remains visible.
- With reduced motion enabled, the final state is immediate and static.
- Buttons and links remain usable while the hero entrance is running.
- Exported homepage JavaScript returns to the documented budget, or the owner
  explicitly approves and documents a new budget before the implementation is
  accepted.

## Copy/paste task prompt

> Read `CLAUDE.md`, `.claude/skills/pramiva-ui/SKILL.md`, and
> `docs/MOTION-ART-DIRECTION.md` in full. Work on Session 1 only: restore the
> lightweight reveal foundation and remove the double-animation path. Preserve
> all unrelated uncommitted redesign work. Do not redesign a section, add a
> dependency, or change business copy. Run lint and production build, measure
> the gzipped scripts referenced by `out/index.html`, then report the exact
> files changed, the before/after bundle figure, and any remaining browser
> warnings. Stop after Session 1 for review.

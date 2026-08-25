/** Small shared helpers only. Anything with a domain meaning belongs elsewhere. */

/**
 * True when a data value is still an unanswered gap rather than real content.
 *
 * Placeholders are rendered as visible text on purpose, but they must never be
 * wrapped in a `mailto:`/`tel:` link — a link to
 * "PLACEHOLDER: display email address (Q7)" is a broken control, not a gap.
 */
export function isPlaceholder(value: string) {
  return value.startsWith("PLACEHOLDER:");
}

/**
 * Compares a live pathname against a nav href, ignoring the trailing slash.
 *
 * `next.config.ts` sets `trailingSlash: true`, so the browser URL for a nav
 * link is `/about/` while the href in `data/navigation.ts` is `/about`. A bare
 * equality check therefore never matches on an internal page, and the current
 * page silently loses its `aria-current` marker.
 */
export function isCurrentPath(pathname: string, href: string) {
  const normalise = (value: string) => value.replace(/\/+$/, "") || "/";
  return normalise(pathname) === normalise(href);
}

/**
 * Stops a hyphenated word being split across two lines.
 *
 * U+002D HYPHEN-MINUS is a legitimate line-break opportunity, so at display
 * sizes "real-world" happily sets as "real-" on one line and "world" on the
 * next — which reads as a typesetting fault rather than as a compound word.
 *
 * U+2011 NON-BREAKING HYPHEN draws an identical glyph and is announced
 * identically by assistive technology; it simply carries no break opportunity.
 *
 * Applied at RENDER time only. The approved strings in src/data/* keep their
 * ordinary hyphens, because this is a typographic concern and not an edit to
 * the copy — no word, no punctuation and nothing the reader can see changes.
 *
 * Use it on large display type. Body copy at 16px has enough break
 * opportunities that forcing one closed can cause worse ragging than it fixes.
 */
export function withNonBreakingHyphens(text: string) {
  return text.replaceAll("-", "\u2011");
}

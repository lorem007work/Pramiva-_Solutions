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

type ServiceIconProps = {
  name: string;
  className?: string;
};

/**
 * Hand-authored line icons for the service set.
 *
 * Not an icon library. Six icons do not justify a dependency, and a package
 * would bring hundreds of unused glyphs plus its own stroke weight and grid
 * that would fight the type scale. These are drawn on a 24px box at 1.5
 * stroke, using `currentColor` so they inherit whatever ground they sit on —
 * the same reason the tone variables exist.
 *
 * Each shape describes the WORK rather than a brand: a magnifier for search, a
 * conversation for social, a target for paid advertising. No Google or
 * Facebook marks — third-party logos carry trademark usage rules, and a
 * generic target says the same thing without them.
 */
const paths: Record<string, React.ReactNode> = {
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
      <path d="M8.5 11h5M11 8.5v5" />
    </>
  ),
  social: (
    <>
      <path d="M4 6h16v10H9l-5 4V6Z" />
      <path d="M9 10h6M9 13h4" />
    </>
  ),
  advertising: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  systems: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  support: (
    <>
      <path d="M4 13a8 8 0 0 1 16 0" />
      <path d="M4 13v3a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2Z" />
      <path d="M20 13v3a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2Z" />
      <path d="M12 21h3" />
    </>
  ),
  automation: (
    <>
      <rect x="7" y="8" width="10" height="10" rx="2" />
      <path d="M12 3v5M9 3v2M15 3v2" />
      <path d="M3 12h4M17 12h4" />
      <path d="M10.5 12.5h3" />
    </>
  ),

  /* --- Capability pillars ---------------------------------------------------
     `support` (headset) and `automation` (robot) already carry the second and
     third pillar. Only the marketing pillar needed a new shape: the existing
     `social` and `advertising` icons each describe ONE service inside that
     group, so using either to stand for the whole group would misrepresent it. */
  megaphone: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l6 4V5L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M17 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M19.5 7a7 7 0 0 1 0 10" />
    </>
  ),

  /* --- Credibility strip ----------------------------------------------------
     Four facts, four shapes. Same 24px box and 1.5 stroke as the rest, so the
     strip reads as part of the set rather than as icons borrowed from a pack. */
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
    </>
  ),
  capability: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 13.5v7.5M13.5 17.25h7.5" />
    </>
  ),
};

export function ServiceIcon({ name, className = "" }: ServiceIconProps) {
  const shape = paths[name];
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {shape}
    </svg>
  );
}

/**
 * Named partner brands — Q24 Option B.
 *
 * Confirmed 2026-08-25: management asked for this section, and separately
 * confirmed that SNS itself has agreed in writing to being named publicly —
 * not just an internal instruction, which is what docs/CONTENT-INVENTORY.md
 * §6 required before any brand could be identified here. Written source for
 * that confirmation still needs a one-line citation added to this file and to
 * CONTENT-INVENTORY.md; ask whoever confirmed it for the email or message
 * thread so the record is complete.
 *
 * Only five brands are listed. The source material names six (this list plus
 * Public Shed), but no Public Shed logo was supplied — nothing is invented to
 * fill the gap. Add it once an asset exists.
 *
 * Logos were supplied as raw exports (PNG/JPG, up to 4494px, mixed
 * backgrounds) and processed before use: trimmed to their visible bounds,
 * capped at 480px on the long edge, converted to WebP. Originals kept at
 * pramiva-team-assets/brand-logos-embargoed/ — that folder name predates this
 * confirmation and should be renamed once the citation above is filled in.
 *
 * Sector line is descriptive only, not sourced from any approved marketing
 * copy — do not expand these into service descriptions without a separate
 * approval, per the same rule that applies to src/data/services.ts.
 */

export type Brand = {
  name: string;
  sector: string;
  logo: { src: string; width: number; height: number };
};

export const brands: Brand[] = [
  {
    name: "Turf Man",
    sector: "Turf & lawn supply",
    logo: { src: "/images/brands/turf-man.webp", width: 430, height: 480 },
  },
  {
    name: "Perth Landscaper",
    sector: "Landscaping",
    logo: { src: "/images/brands/perth-landscaper.webp", width: 480, height: 257 },
  },
  {
    name: "Cleaning Team",
    sector: "Cleaning services",
    logo: { src: "/images/brands/cleaning-team.webp", width: 480, height: 322 },
  },
  {
    name: "Carry or Drag",
    sector: "E-commerce retail",
    logo: { src: "/images/brands/carry-or-drag.webp", width: 480, height: 331 },
  },
  {
    name: "Hardtrex",
    sector: "Equipment hire",
    /* Re-exported 2026-08-25: the supplied file had a flat #D9D9D9 background
       baked in, which rendered as a grey box on the light section. The
       background is an export artifact, not part of the mark — the logo itself
       is unaltered. Dimensions updated to match the new file. */
    logo: { src: "/images/brands/hardtrex.webp", width: 600, height: 176 },
  },
];

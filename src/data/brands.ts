/**
 * Named partner brands — Q24 Option B.
 *
 * THE ONLY BASIS FOR NAMING THESE BRANDS IS AN OWNER RULING ON 2026-08-26.
 * The contradiction was put to the owner directly and they ruled that SNS has
 * agreed to being named publicly. No written citation has been supplied yet.
 *
 * docs/CONTENT-INVENTORY.md §6 recorded the opposite — "SNS has not separately
 * agreed to being named" — and graded this exact configuration "Option C.
 * Named without consent — Do not. Potential contract breach and damage to the
 * client's brands." §6 was deleted from the repo on 2026-08-26 as collateral in
 * an unrelated styling commit. That deletion is NOT a retraction and is not
 * part of the argument for naming; it is only why the text is no longer on
 * disk. Recover it with: git show 26cd619^:docs/CONTENT-INVENTORY.md
 *
 * Public Shed was previously absent only because no logo had been supplied.
 * One was supplied 2026-08-26 and is now listed. It is within §6's six names.
 *
 * MULCH EXPRESS AND GORKHA FLOORING appear in neither §6 nor CLAUDE.md rule 4
 * nor any prior assessment. That gap was put to the owner directly on
 * 2026-08-27 and they cleared both for publication. Their basis is the same as
 * the other six: an owner ruling, with no written citation on file.
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
    logo: { src: "/images/brands/turf-man.webp", width: 100, height: 112 },
  },
  {
    name: "Perth Landscaper",
    sector: "Landscaping",
    logo: { src: "/images/brands/perth-landscaper.webp", width: 209, height: 112 },
  },
  {
    name: "Cleaning Team",
    sector: "Cleaning services",
    logo: { src: "/images/brands/cleaning-team.webp", width: 167, height: 112 },
  },
  {
    name: "Carry or Drag",
    sector: "E-commerce retail",
    logo: { src: "/images/brands/carry-or-drag.webp", width: 162, height: 112 },
  },
  {
    name: "Hardtrex",
    sector: "Equipment hire",
    /* Re-exported 2026-08-25: the supplied file had a flat #D9D9D9 background
       baked in, which rendered as a grey box on the light section. The
       background is an export artifact, not part of the mark — the logo itself
       is unaltered. Dimensions updated to match the new file. */
    logo: { src: "/images/brands/hardtrex.webp", width: 336, height: 99 },
  },
  {
    name: "Public Shed",
    sector: "Home storage",
    logo: { src: "/images/brands/public-shed.webp", width: 156, height: 112 },
  },
  {
    name: "Mulch Express",
    sector: "Mulch and garden supply",
    logo: { src: "/images/brands/mulch-express.webp", width: 296, height: 77 },
  },
  {
    name: "Gorkha Flooring",
    sector: "Flooring supply and installation",
    logo: { src: "/images/brands/gorkha-flooring.webp", width: 298, height: 97 },
  },
  {
    /* Supplied 2026-08-27. Two items here still need confirming:
       - the trading name. "Nice and Clean" is taken from the supplied
         filename, not from the mark, because the file is the icon on its own
         with no wordmark. It is the alt text, so it is what a screen reader
         announces — get it checked before this ships.
       - the sector line, which is read off the mark (house, foliage, decking)
         rather than supplied. Descriptive only, same as the other eight.
       Consent basis is the same owner ruling that covers the rest of the list;
       the written citation at the top of this file is still outstanding. */
    name: "Nice and Clean",
    sector: "Home and exterior cleaning",
    logo: { src: "/images/brands/nice-and-clean.webp", width: 384, height: 242 },
  },
];

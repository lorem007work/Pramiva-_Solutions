/**
 * Scaffolded sections awaiting approved content.
 *
 * ⚠ NOTHING HERE IS PUBLISHABLE. Every value is a PLACEHOLDER, deliberately
 * left as a visible gap rather than filled with realistic sample data.
 *
 * That choice matters. Sample data — "500+ projects delivered", a smiling
 * stock portrait, a fabricated quote from "Sarah, Marketing Director" — reads
 * as finished, survives review because it looks plausible, and ships. A gap
 * cannot do that. The launch gate `grep -rn "PLACEHOLDER:" src/` catches every
 * line in this file.
 *
 * Open questions blocking each block are named against it. When answers land,
 * replace the values here; the components need no changes.
 *
 * 🔴 Q24 REMAINS IN FORCE. The client brand names — SNS Multiservices, Turf
 * Man, Perth Landscaper, Cleaning Team, Carry or Drag, Hardrex, Public Shed —
 * must not be typed into this file or any other until written consent exists
 * from BOTH management and SNS. The logo wall and case study entries below are
 * intentionally anonymous placeholders, not the real set with names removed.
 */

export type PendingStat = { value: string; label: string };
export type PendingLogo = { id: string; label: string };
export type PendingCase = { id: string; title: string; sector: string; summary: string };
export type PendingQuote = { id: string; quote: string; attribution: string; role: string };
export type PendingStep = { title: string; description: string };
export type PendingPerson = { id: string; name: string; role: string };
export type PendingBenefit = { icon: string; title: string; description: string };

/** Q23 — no verified figures exist. Values stay em-dashes until they do. */
export const pendingStats: PendingStat[] = [
  { value: "—", label: "PLACEHOLDER: metric 1 label (Q23)" },
  { value: "—", label: "PLACEHOLDER: metric 2 label (Q23)" },
  { value: "—", label: "PLACEHOLDER: metric 3 label (Q23)" },
  { value: "—", label: "PLACEHOLDER: metric 4 label (Q23)" },
];

/** Q24 — anonymous tiles. Do not substitute real brand names or marks. */
export const pendingLogos: PendingLogo[] = Array.from({ length: 6 }, (_, i) => ({
  id: `logo-${i + 1}`,
  label: `PLACEHOLDER: client logo ${i + 1} (Q24)`,
}));

/** Q24 — sector-level descriptions only, no client identified. */
export const pendingCases: PendingCase[] = [
  {
    id: "case-1",
    title: "PLACEHOLDER: case study title (Q24)",
    sector: "PLACEHOLDER: sector (Q24)",
    summary: "PLACEHOLDER: what the work involved, approved wording (Q24)",
  },
  {
    id: "case-2",
    title: "PLACEHOLDER: case study title (Q24)",
    sector: "PLACEHOLDER: sector (Q24)",
    summary: "PLACEHOLDER: what the work involved, approved wording (Q24)",
  },
  {
    id: "case-3",
    title: "PLACEHOLDER: case study title (Q24)",
    sector: "PLACEHOLDER: sector (Q24)",
    summary: "PLACEHOLDER: what the work involved, approved wording (Q24)",
  },
];

/** Q19 — none exist. A quote must be given by a real, named, consenting person. */
export const pendingQuotes: PendingQuote[] = [
  {
    id: "quote-1",
    quote: "PLACEHOLDER: testimonial, in the client's own words (Q19)",
    attribution: "PLACEHOLDER: person's name, with consent (Q19)",
    role: "PLACEHOLDER: role and company (Q19)",
  },
  {
    id: "quote-2",
    quote: "PLACEHOLDER: testimonial, in the client's own words (Q19)",
    attribution: "PLACEHOLDER: person's name, with consent (Q19)",
    role: "PLACEHOLDER: role and company (Q19)",
  },
];

/**
 * The induction material describes a working process, but that content is
 * barred from public pages. These steps need separately approved wording.
 */
export const pendingSteps: PendingStep[] = [
  { title: "PLACEHOLDER: step 1 title", description: "PLACEHOLDER: step 1 description" },
  { title: "PLACEHOLDER: step 2 title", description: "PLACEHOLDER: step 2 description" },
  { title: "PLACEHOLDER: step 3 title", description: "PLACEHOLDER: step 3 description" },
  { title: "PLACEHOLDER: step 4 title", description: "PLACEHOLDER: step 4 description" },
];

/**
 * Q17 — names, roles and photographs of real people. Every person needs to
 * consent to appearing before they are listed, separately from management
 * approving the section.
 */
export const pendingPeople: PendingPerson[] = Array.from({ length: 4 }, (_, i) => ({
  id: `person-${i + 1}`,
  name: `PLACEHOLDER: name, with consent (Q17)`,
  role: `PLACEHOLDER: role (Q17)`,
}));

/**
 * Benefit claims are not ours to write. Each line states something the company
 * does better or differently, which only management can assert.
 */
export const pendingBenefits: PendingBenefit[] = [
  { icon: "search", title: "PLACEHOLDER: benefit 1", description: "PLACEHOLDER: approved supporting line" },
  { icon: "support", title: "PLACEHOLDER: benefit 2", description: "PLACEHOLDER: approved supporting line" },
  { icon: "systems", title: "PLACEHOLDER: benefit 3", description: "PLACEHOLDER: approved supporting line" },
];

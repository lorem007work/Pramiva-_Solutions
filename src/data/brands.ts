/**
 * Client brand portfolio.
 *
 * 🔴 [RISK] — Q24 UNRESOLVED. See docs/CONTENT-INVENTORY.md §6.
 *
 * The company runs six consumer brands for an Australian partner. Publishing
 * their names would state publicly that Perth-facing local businesses have
 * their operations run from Nepal. That may breach a confidentiality clause,
 * may damage the client's own market position, and is not this company's
 * disclosure to make alone — the partner's written consent is required too.
 *
 * The named brand data deliberately DOES NOT EXIST in this repository. Draft
 * cards live in docs/CONTENT-INVENTORY.md, outside src/, so that no accidental
 * render, leaked source map, or future session can expose them.
 *
 * If Q24 returns Option B *with written consent from both parties*, add the
 * named entries then — not before.
 */

export const portfolio = {
  /**
   * Anonymised capability statement — sectors and scale, no names.
   * Delivers most of the credibility with none of the exposure.
   */
  summary: "PLACEHOLDER: approved anonymised capability statement (Q24)",

  /** Stays empty unless Q24 returns Option B with written consent. */
  brands: [] as { name: string; sector: string; description: string }[],
} as const;

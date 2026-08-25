/**
 * Partnership section framing copy.
 *
 * The logos themselves, and which sectors they belong to, live in
 * src/data/brands.ts. This file only holds the section's wording.
 *
 * 🔴 WORDING CHANGED 2026-08-25 — a barred sentence was removed.
 *
 * The description previously read: "we support the day-to-day operations
 * behind these consumer brands for an Australian partner." That describes how
 * work is divided with a client, which is precisely the category of content
 * barred from public pages — the same rule that deleted the homepage "How we
 * work" section and trimmed the service catalogue. It also volunteered the
 * partner's country, which narrows the client's identity further than the
 * logos alone do.
 *
 * It is replaced by a statement that a partnership exists and nothing about
 * what happens inside it. This is strictly less disclosive than what it
 * replaces, so removing it needed no new approval — but the replacement is
 * still a factual claim about a client relationship and should be confirmed.
 *
 * 🔴 STILL OPEN, AND NOT RESOLVED BY THIS CHANGE: whether the brand names in
 * brands.ts may be published at all. docs/CONTENT-INVENTORY.md §6 records that
 * SNS has NOT separately agreed to being named; brands.ts records that it has,
 * with the written citation still outstanding. Those two statements cannot
 * both be true. Until one is retracted, this section's *contents* are frozen —
 * this commit restyles the section and does not add, name or expose anything.
 */

export const partnership = {
  eyebrow: "Partnership",
  title: "Brands supported through an international client partnership.",
} as const;

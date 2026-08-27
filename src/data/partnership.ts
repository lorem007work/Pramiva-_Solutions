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
 * Resolved 2026-08-26: the owner re-confirmed SNS consent, superseding the
 * §6 record. The written citation is still outstanding — see brands.ts.
 */

export const partnership = {
  eyebrow: "Partnership",
  title: "Some of the brands we support.",
} as const;

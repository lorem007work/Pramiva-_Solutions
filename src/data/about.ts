/**
 * About page copy.
 *
 * ⚠ STATUS — every factual line below is [DRAFT], not approved.
 *
 * Source is docs/CONTENT-INVENTORY.md §3 (value proposition, the company's own
 * "engine room" phrasing), §4 (values) and §6 Option A (anonymised capability
 * statement). It is written up here so management can correct sentences rather
 * than compose them, per the phase decision recorded in docs/WORKFLOW.md.
 * Nothing here is cleared to publish until Q6, Q24 and Q28 are answered.
 *
 * Two things are deliberately absent:
 *  - The company name. Components read it from `site.ts`; it is never typed
 *    into copy (CLAUDE.md hard rule 5), which is why this file speaks as "we".
 *  - Client brand names. §6 keeps them embargoed pending Q24 *and* SNS's own
 *    written consent, so the track-record line stays sectors-and-scale only.
 */

export const about = {
  header: {
    eyebrow: "About",
    /** [DRAFT] Q6 — docs/CONTENT-INVENTORY.md §3, the drafted hero line. */
    title: "The engine room behind growing businesses.",
    /** [DRAFT] Q6 — same source. */
    description:
      "We handle the back-office and operations work that keeps a business running, so our clients can put their attention where it earns.",
  },

  story: {
    eyebrow: "01 — Our story",
    /** [DRAFT] Q6 */
    title: "Built to carry the work that keeps a business running.",
    /** [DRAFT] Q6, and Q27 for the location line. */
    paragraphs: [
      "We were founded to manage the essential back-office and operations work that keeps client businesses running smoothly — from customer service and digital marketing through to administration and reporting.",
      "Working from our operations hub in Lalitpur, Nepal, we combine practical operations experience with modern, smart solutions for growing businesses internationally, including businesses in Australia.",
      "The result is a working relationship rather than a hand-off: the day-to-day is handled, communication stays clear, and the support adapts as the business grows.",
    ],
  },

  values: {
    eyebrow: "02 — What we hold to",
    /** [DRAFT] Q28 */
    title: "The standards behind every task we take on.",
    /** [DRAFT] Q28 */
    description:
      "Working for clients we may never meet in person puts the weight on how we behave, not on what we promise.",
    /**
     * [DRAFT] Q28 — the three value NAMES come from
     * docs/CONTENT-INVENTORY.md §4. "Honesty is the number-one rule" and the
     * "a real person overseas relies on the output" framing are the company's
     * own words; the surrounding sentences are drafted and need approval.
     */
    items: [
      {
        title: "Honesty and trust",
        description:
          "Honesty is the first rule. Clients are told what is actually happening with their work, including when something has gone wrong.",
      },
      {
        title: "Pride in work",
        description:
          "Every task is done knowing a real person overseas is relying on the output to run their day.",
      },
      {
        title: "Clear communication",
        description:
          "Plain, direct updates across time zones, so no part of the work depends on guesswork.",
      },
    ],
  },

  /**
   * [DRAFT] Q24 — docs/CONTENT-INVENTORY.md §6, Option A (anonymised).
   *
   * Sectors and scale only. Naming the brands or the partner requires written
   * consent from management AND from the client whose brands they are; until
   * both exist this stays as written. Do not "improve" it by adding names.
   */
  capability: {
    eyebrow: "03 — Track record",
    title: "Operational support behind live consumer brands.",
    description:
      "We operate six consumer brands across turf supply, landscaping, cleaning, e-commerce, equipment hire and home goods for an Australian partner.",
    note: "PLACEHOLDER: approved wording for naming clients, or confirmation the anonymised form stands (Q24)",
  },

  cta: {
    eyebrow: "04 — Start a conversation",
    title: "Tell us what needs handling.",
    description:
      "Share where your operation needs support and we will come back with a practical next step.",
  },
} as const;

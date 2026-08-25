/**
 * Anonymised partnership summary — Q24 Option A.
 *
 * Source: docs/CONTENT-INVENTORY.md §6. The company supports several consumer
 * brands for an Australian partner (SNS Multiservices), operating brands
 * including Turf Man, Perth Landscaper, Cleaning Team, Carry or Drag, Hardrex
 * and Public Shed.
 *
 * 🔴 THE NAMES ABOVE ARE FOR THIS COMMENT ONLY — never copy them into the
 * exported content below. Several of those brands trade as local Perth
 * businesses; stating publicly that their operations run from Nepal could
 * affect their local sales and may breach a confidentiality clause. That is
 * not a risk this file may take on the strength of an internal instruction —
 * SNS has to agree to it too.
 *
 * What ships instead is sector and scale only, which discloses no client and
 * needs no one's permission. Confirmed with the founder/team on 2026-08-25:
 * build the anonymised version now; pursue named consent from SNS separately.
 *
 * Even the sector list is induction-derived, so treat this content the same
 * as any other [DRAFT] entry in CONTENT-INVENTORY.md — safe to publish because
 * it identifies no one, but worth a quick nod from management at the next
 * sign-off rather than being invented on the developer's authority alone.
 */

export const partnership = {
  eyebrow: "04 — Partnership",
  title: "Behind the scenes for consumer brands abroad.",
  description:
    "Alongside our Nepal and international client work, we support an Australian partner's consumer brands — handling the operations behind the scenes across the categories below.",
  sectors: [
    "Turf & lawn supply",
    "Landscaping",
    "Cleaning services",
    "E-commerce retail",
    "Equipment hire",
    "Home storage",
  ],
  /**
   * Deliberately generic — no client is named anywhere in this file. That is
   * the whole reason this section can exist yet. Upgradeable to named copy
   * once Q24 returns written consent from both parties.
   */
  note: "Client names are not published without consent from every party involved.",
} as const;

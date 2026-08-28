import { serviceGroups } from "@/data/services";

/**
 * The three homepage capability pillars.
 *
 * ⚠ NO NEW CLAIMS. This file deliberately holds almost no copy of its own.
 *
 * The homepage previously listed all six services as equal cards, which made
 * the mobile page enormous and asked a first-time visitor to evaluate six
 * things before understanding one. Three pillars replace them. But "summarise
 * six services into three" is exactly the moment a benefit claim gets invented
 * — a pillar blurb wants to say something like "marketing that drives growth",
 * and nobody has approved the company saying that.
 *
 * So a pillar carries only:
 *  - its group heading, read from services.ts (approved Q5 wording)
 *  - the titles of the services inside it, also read from services.ts
 *  - an icon name, which is presentation metadata, not copy
 *
 * The `services.ts` catalogue stays the single source. Retitling a service
 * there updates the pillar automatically, and nothing here can drift out of
 * step with what was approved.
 */

export type Pillar = {
  /** Matches a `heading` in services.ts — the join key, not new copy. */
  group: string;
  /** Card title. Same wording as the group unless the group name is a status. */
  title: string;
  /** Shape name in ui/service-icon.tsx. Presentation only. */
  icon: string;
  /**
   * Set on the pillar that is not a service we sell today.
   *
   * The brief is explicit that future work must not be presented as equal to
   * active work. A visitor who reads "AI and Automation" as a current offering
   * and enquires about it has been misled by the layout, not by the words.
   */
  future?: boolean;
};

export const pillars: Pillar[] = [
  {
    group: "Digital Marketing",
    title: "Digital Marketing",
    icon: "megaphone",
  },
  {
    group: "Customer Service and Systems",
    title: "Customer Service and Systems",
    icon: "support",
  },
  {
    // The group is named "Next Direction" — a status, not a capability. The
    // card is titled by what the capability actually is, and the status moves
    // to the badge, which is where a visitor can see it without reading it as
    // the service name.
    group: "Next Direction",
    title: "AI and Automation",
    icon: "automation",
    future: true,
  },
];

export type PillarService = { title: string; description: string };

/**
 * Joins each pillar to its approved services. Throws nothing away.
 *
 * The description comes back with the title now. Both are approved wording in
 * services.ts — the card is not summarising anything, it is showing the
 * sentence the service already ships with on /services.
 */
export function pillarServices(pillar: Pillar): PillarService[] {
  const group = serviceGroups.find((entry) => entry.heading === pillar.group);
  return group
    ? group.services.map(({ title, description }) => ({ title, description }))
    : [];
}

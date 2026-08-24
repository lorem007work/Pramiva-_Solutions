/**
 * Homepage-specific copy.
 *
 * Structural labels are safe to author. Company claims remain visible
 * placeholders until management approves them in writing.
 */
export const homepage = {
  positioning: {
    eyebrow: "02 — What we do",
    /** Q6 — draft source exists in docs/CONTENT-INVENTORY.md §3. */
    statement: "PLACEHOLDER: approved positioning statement (Q6)",
  },
  services: {
    eyebrow: "03 — Services",
    title: "PLACEHOLDER: approved services overview heading (Q5)",
    description: "PLACEHOLDER: approved services overview introduction (Q5)",
    ctaLabel: "Explore all services",
  },
  why: {
    eyebrow: "04 — Why Pramiva",
    title: "Built to keep growing businesses moving.",
    description:
      "Pramiva acts as a B2B engine room, combining operational experience with smart solutions so clients can focus on growth.",
    items: [
      {
        title: "The engine room behind growth",
        description:
          "We handle critical back-office and operations work, from customer service and digital marketing to administration and reporting, so client businesses can run smoothly and focus on growth.",
      },
      {
        title: "Experience meets innovation",
        description:
          "Pramiva combines hands-on operations experience with modern, practical solutions designed to help growing businesses succeed internationally.",
      },
      {
        title: "Three pillars, one direction",
        description:
          "Think Bold. Build Smart. Scale Fast. is the philosophy that shapes how Pramiva approaches ideas, systems and growth.",
      },
      {
        title: "Global support from Nepal",
        description:
          "From its operations hub in Lalpur, Nepal, Pramiva provides skilled and efficient support for international clients, including businesses in Australia.",
      },
    ],
  },
} as const;

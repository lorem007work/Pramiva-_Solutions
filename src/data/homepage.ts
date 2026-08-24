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
  process: {
    eyebrow: "05 — How we work",
    title: "A clear path from need to ongoing support.",
    description:
      "A practical four-step model for understanding the work, setting up the right support and improving it over time.",
    steps: [
      {
        title: "Understand the operation",
        description:
          "We begin by learning the client's goals, current workflow and the work that needs support.",
      },
      {
        title: "Design the system",
        description:
          "We define responsibilities, communication and practical workflows around the operation.",
      },
      {
        title: "Deliver with clarity",
        description:
          "We carry out the agreed support and keep communication clear throughout the working relationship.",
      },
      {
        title: "Improve and scale",
        description:
          "We review what is working, refine the system and adapt the support as the business grows.",
      },
    ],
  },
  company: {
    eyebrow: "06 — About Pramiva",
    title: "Experience-led support, built for international growth.",
    description: [
      "Pramiva Solutions was founded to manage the essential back-office and operations work that keeps client businesses running smoothly. From customer service and digital marketing to administration and reporting, we build support around the work clients need handled every day.",
      "Based in Lalpur, Nepal, Pramiva combines practical operations experience with modern, smart solutions for growing businesses internationally—giving clients more room to focus on growth.",
    ],
    motto: "Think Bold. Build Smart. Scale Fast.",
    ctaLabel: "Learn more about Pramiva",
  },
} as const;

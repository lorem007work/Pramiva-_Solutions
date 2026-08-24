import type { Metadata } from "next";
import { CaseStudies } from "@/components/sections/case-studies";
import { LogoWall } from "@/components/sections/logo-wall";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { TeamGrid } from "@/components/sections/team-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Internal preview of the scaffolded sections.
 *
 * These are deliberately NOT mounted on the public pages. Every value in them
 * is a visible PLACEHOLDER, and a review link shared with management should
 * not show "PLACEHOLDER: metric 1 label (Q23)" on the homepage.
 *
 * Keeping them here means the layouts can be reviewed now and mounted later
 * with a one-line import per section, once the content that unblocks each one
 * arrives.
 */
export const metadata: Metadata = {
  title: "Section preview",
  // Belt and braces alongside the robots.txt disallow. This page must never be
  // indexed: it is full of placeholder strings that would be attributed to the
  // company if a crawler reached them.
  robots: { index: false, follow: false },
};

const blocked = [
  ["Stats", "Q23 — no verified figures exist yet"],
  ["Client logos", "Q24 — brand names embargoed pending consent from management AND the client"],
  ["Case studies", "Q24 — same embargo"],
  ["Testimonials", "Q19 — none exist; each needs a named, consenting person"],
  ["Process", "Induction-derived process content is barred from public pages"],
  ["Team", "Q17 — names, roles, portraits, and each person's own consent"],
  ["Differentiators", "Benefit claims are management's to assert"],
];

export default function PreviewPage() {
  return (
    <main id="main">
      <Section aria-labelledby="preview-title">
        <SectionHeading
          id="preview-title"
          level="h1"
          eyebrow="Internal preview"
          title="Scaffolded sections."
          description="Layouts only. Every value below is a placeholder — nothing here is approved, and none of these sections are mounted on the public pages."
        />

        <dl className="mt-section-sm grid gap-4 sm:grid-cols-2">
          {blocked.map(([name, reason]) => (
            <div key={name} className="border-t border-line pt-4">
              <dt className="font-medium">{name}</dt>
              <dd className="mt-1 text-sm text-[color:var(--tone-muted)]">
                {reason}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Stats eyebrow="01 — Results" title="PLACEHOLDER: metrics section heading (Q23)" />
      <LogoWall eyebrow="02 — Clients" title="PLACEHOLDER: clients section heading (Q24)" />
      <CaseStudies eyebrow="03 — Work" title="PLACEHOLDER: work section heading (Q24)" />
      <Testimonials eyebrow="04 — Words" title="PLACEHOLDER: testimonials heading (Q19)" />
      <Process eyebrow="05 — How we work" title="PLACEHOLDER: process section heading" />
      <TeamGrid eyebrow="06 — People" title="PLACEHOLDER: team section heading (Q17)" />
      <WhyUs eyebrow="07 — Why us" title="PLACEHOLDER: differentiators heading" />
    </main>
  );
}

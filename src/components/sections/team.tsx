import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";

/**
 * The workspace section.
 *
 * The previous staff photographs were withdrawn at the team's request. These
 * replacements were supplied by the company and show the real office. The
 * employee is photographed from behind, and every screen is blurred.
 *
 * Neither image carries `priority`: this sits below the page header and the
 * story block, so it is never the LCP element and lazy loading is correct.
 * The pair is top-aligned rather than height-matched — the wide group shot
 * cannot be cropped square without cutting people off both ends of the table.
 */
export function Team() {
  const { workspace } = about;
  const { main, culture } = workspace.photos;

  return (
    <Section tone="surface" reveal aria-labelledby="about-workspace-title">
      <SectionHeading
        id="about-workspace-title"
        eyebrow={workspace.eyebrow}
        title={workspace.title}
        description={workspace.description}
      />

      <div className="mt-section-sm grid items-start gap-block md:grid-cols-12">
        <figure className="md:col-span-8">
          <Image
            src={main.src}
            alt={main.alt}
            width={main.width}
            height={main.height}
            sizes="(min-width: 768px) 66vw, 100vw"
            className="w-full rounded-2xl border border-line"
          />
          <figcaption className="mt-4 text-sm text-[color:var(--tone-eyebrow)]">
            {main.caption}
          </figcaption>
        </figure>

        <figure className="md:col-span-4">
          <Image
            src={culture.src}
            alt={culture.alt}
            width={culture.width}
            height={culture.height}
            sizes="(min-width: 768px) 33vw, 100vw"
            className="w-full rounded-2xl border border-line"
          />
          <figcaption className="mt-4 text-sm text-[color:var(--tone-eyebrow)]">
            {culture.caption}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

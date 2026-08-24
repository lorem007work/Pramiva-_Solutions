import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";

/**
 * The people section.
 *
 * Both photographs are real and are captioned as what they are — team meals,
 * not staged office shots. Saying otherwise would be inventing a scene onto a
 * real picture, which is the same failure as inventing a statistic.
 *
 * Neither image carries `priority`: this sits below the page header and the
 * story block, so it is never the LCP element and lazy loading is correct.
 * The pair is top-aligned rather than height-matched — the wide group shot
 * cannot be cropped square without cutting people off both ends of the table.
 */
export function Team() {
  const { people } = about;
  const { main, culture } = people.photos;

  return (
    <Section tone="surface" reveal aria-labelledby="about-people-title">
      <SectionHeading
        id="about-people-title"
        eyebrow={people.eyebrow}
        title={people.title}
        description={people.description}
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

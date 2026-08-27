import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { about } from "@/data/about";
import { homepage } from "@/data/homepage";

const glimpseLayout = [
  {
    src: "/images/office/office-active-blurred.webp",
    span: "col-span-2 lg:col-span-6",
    sizes: "(min-width: 1024px) 46vw, 100vw",
  },
  {
    src: "/images/office/office-room-1.webp",
    span: "lg:col-span-3",
    sizes: "(min-width: 1024px) 24vw, 50vw",
  },
  {
    src: "/images/office/office-focus-blurred.webp",
    span: "lg:col-span-3",
    sizes: "(min-width: 1024px) 24vw, 50vw",
  },
];

export function TeamPreview() {
  const { team } = homepage;
  const glimpse = glimpseLayout.map((entry) => {
    const photo = about.workspace.photos.find((item) => item.src === entry.src);
    if (!photo) {
      throw new Error(
        `TeamPreview: no photo in about.workspace.photos matches ${entry.src}`,
      );
    }
    return { ...entry, photo };
  });

  return (
    <Section
      tone="surface"
      reveal
      aria-labelledby="home-team-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <div
        data-stagger
        style={{ "--stagger-index": 0 } as React.CSSProperties}
        className="lg:col-span-5"
      >
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <h2 id="home-team-title" className="mt-4 max-w-2xl text-h2">
          {team.title}
        </h2>
      </div>

      <div
        data-stagger
        style={{ "--stagger-index": 1 } as React.CSSProperties}
        className="border-t-2 border-ink pt-block lg:col-span-6 lg:col-start-7"
      >
        <div className="space-y-6">
          {team.description.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index === 0
                  ? "max-w-lead text-lead"
                  : "max-w-copy text-[color:var(--tone-muted)]"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>

        <Button href="/about" variant="secondary" className="mt-block">
          {team.ctaLabel}
          <span aria-hidden="true">→</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 items-end gap-4 sm:gap-5 lg:col-span-12 lg:grid-cols-12 lg:gap-6">
        {glimpse.map(({ photo, span, sizes }, index) => (
          <ScrollReveal key={photo.src} delay={index * 0.15} className={span}>
            <figure>
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes={sizes}
                className="w-full rounded-2xl border border-[color:var(--tone-border)]"
              />
              <figcaption className="mt-3 text-sm text-[color:var(--tone-eyebrow)]">
                {photo.caption}
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

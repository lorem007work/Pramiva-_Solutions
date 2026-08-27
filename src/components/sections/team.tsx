import Image from "next/image";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/data/about";

// Company-supplied photographs of the real office. Faces and screens are
// blurred where the source image was treated; see data/about.ts.
export function Team() {
  const { workspace } = about;

  return (
    <Section tone="surface" reveal aria-labelledby="about-workspace-title">
      <SectionHeading
        id="about-workspace-title"
        eyebrow={workspace.eyebrow}
        title={workspace.title}
        description={workspace.description}
      />

      {/*
        CSS columns, not a grid. The set mixes landscape and portrait, and a
        grid would force one aspect ratio and crop heads out of the wide team
        shot. Columns let each photograph keep its own proportions.
      */}
      <div
        style={{ "--stagger-step": "40ms" } as React.CSSProperties}
        className="mt-section-sm gap-4 sm:columns-2 lg:columns-3 lg:gap-6"
      >
        {workspace.photos.map((photo, index) => (
          <figure
            key={photo.src}
            data-stagger
            style={{ "--stagger-index": index } as React.CSSProperties}
            className="mb-4 break-inside-avoid lg:mb-6"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              // Below the page header and story block, so never the LCP
              // element and lazy loading is correct.
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="w-full rounded-2xl border border-line"
            />
            <figcaption className="mt-3 text-sm text-[color:var(--tone-eyebrow)]">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}

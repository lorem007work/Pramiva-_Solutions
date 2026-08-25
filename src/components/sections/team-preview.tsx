import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { homepage } from "@/data/homepage";

/**
 * Company introduction, and the homepage's route through to /about.
 *
 * NO IMAGE HERE, DELIBERATELY
 *
 * This has held a staff photo collage and then an office photograph. Both were
 * withdrawn — first no staff photography on the homepage, then no real
 * photographs on the homepage at all.
 *
 * The section is kept rather than deleted because it is the landing page's
 * only narrative link into /about, and the copy is approved and still true
 * without a picture beside it. The photographs live on /about, which is where
 * the button below sends people.
 *
 * It is a TEXT layout, not the old split layout with the image removed. The
 * 6/6 split existed to balance a picture against copy; dropping the picture
 * out of that grid would have left half the section empty, which reads as an
 * image that failed to load. The 5/7 editorial split it uses now is the same
 * arrangement the About and Careers pages already use for this kind of block.
 *
 * `surface` rather than `canvas`: the partnership rail above is canvas, and
 * two white sections running together read as one long section.
 */
export function TeamPreview() {
  const { team } = homepage;

  return (
    <Section
      tone="surface"
      reveal
      aria-labelledby="home-team-title"
      containerClassName="grid gap-section-sm lg:grid-cols-12"
    >
      <div className="lg:col-span-5">
        <Eyebrow>{team.eyebrow}</Eyebrow>
        <h2 id="home-team-title" className="mt-4 max-w-2xl text-h2">
          {team.title}
        </h2>
      </div>

      <div className="border-t border-line-strong pt-block lg:col-span-6 lg:col-start-7">
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
    </Section>
  );
}

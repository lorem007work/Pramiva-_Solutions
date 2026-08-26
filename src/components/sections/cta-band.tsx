import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { ctas } from "@/data/navigation";

type CtaBandProps = {
  /** Unique per page — the band is the labelled region of its own section. */
  id: string;
  /** Optional: the homepage drops it, the inner pages keep their numbering. */
  eyebrow?: string;
  title: string;
  description: string;
};

/**
 * Closing conversion prompt, repeated on every route except /contact.
 *
 * Copy arrives as props rather than being read from one page's data file, so
 * the same band serves home, about, services and careers without a variant.
 *
 * CENTRED, NOT SPLIT
 *
 * This was a 3/8 editorial split with the action pushed to the right of a
 * paragraph. That composition is right for a section that carries information;
 * it is wrong for the last thing on the page, whose only job is to be acted
 * on. Centring puts the heading, the reassurance and the button on one axis,
 * so the eye arrives at the action rather than hunting to the right margin
 * for it.
 *
 * One action, no competing second link — a visitor who has read this far has
 * already been offered "explore services" twice further up.
 *
 * The label is "Start a conversation" rather than the header's "Start an
 * enquiry". Same destination, different moment: someone at the foot of the
 * page has read everything and is choosing whether to engage, not looking for
 * the contact route.
 */
export function CtaBand({ id, eyebrow, title, description }: CtaBandProps) {
  return (
    <Section
      tone="ink"
      backgroundImage="/images/brand/cta-bg.webp"
      /* Compact band, so the crop is severe — aim it at the bright corner. */
      backgroundPosition="right bottom"
      reveal
      aria-labelledby={id}
      className="relative overflow-hidden"
      containerClassName="relative flex flex-col items-center text-center"
    >
      {/* The dimensional brand mark now leads the hero instead. Using the
          same object twice on one page made it read as wallpaper rather than
          as the company's mark. */}

      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}

      <h2 id={id} className={`max-w-[18ch] text-display font-semibold ${eyebrow ? "mt-5" : ""}`}>
        {title}
      </h2>

      <p className="mt-7 max-w-lead text-lead text-[color:var(--tone-muted)] leading-relaxed">
        {description}
      </p>

      {/* Full width on a phone: a centred pill on a narrow screen is a small
          target floating in a wide band, and this is the page's last chance. */}
      <Button
        href={ctas.closing.href}
        variant="inverse"
        className="mt-block w-full sm:w-auto"
      >
        {ctas.closing.label}
        <span aria-hidden="true">→</span>
      </Button>
    </Section>
  );
}

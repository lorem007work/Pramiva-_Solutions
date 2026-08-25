import type { HTMLAttributes } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type SectionTone = "canvas" | "surface" | "soft" | "ink" | "brand";
type SectionSpacing = "default" | "compact";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  containerClassName?: string;
  reveal?: boolean;
  /**
   * Optional abstract artwork behind the ground, e.g. "/images/brand/hero-bg.webp".
   *
   * Only valid on a dark tone. The `.ground-art` scrim lays the tone's own
   * colour over the artwork at 72%, so body copy keeps its contrast ratio no
   * matter what the image turns out to look like — the accessibility guarantee
   * lives in the CSS rather than in whoever briefs the artwork.
   */
  backgroundImage?: string;
  /**
   * Which part of the artwork stays visible once `cover` crops it.
   *
   * This matters more than it looks. The generated frames are 16:9, but a
   * compact band can be 4.8:1 - so `cover` keeps a thin horizontal slice and
   * discards most of the composition. Pointing the crop at where the arcs
   * actually are is the difference between artwork and a smear.
   */
  backgroundPosition?: string;
};

/**
 * `ground*` classes live in globals.css and add generated depth — two wide
 * radial washes from the brand palette plus a fine grain overlay. Flat colour
 * reads as cheap at full-bleed size; there is nothing for the eye to cross.
 *
 * Contrast is unchanged by the washes because each ground keeps its solid
 * `background-color` underneath: white on `brand-deep` stays 7.4:1 (AAA) and
 * white on `ink` stays 19.8:1.
 */
const toneClasses: Record<SectionTone, string> = {
  canvas: "bg-canvas text-ink",
  surface: "ground ground-surface text-ink",
  /* The third temperature — see .ground-soft in globals.css. It remaps
     --tone-eyebrow because ink-subtle drops below AA on this tint. */
  soft: "ground ground-soft text-ink",
  ink: "ground ground-ink text-canvas",
  brand: "ground ground-brand text-canvas",
};

const spacingClasses: Record<SectionSpacing, string> = {
  default: "py-section",
  compact: "py-section-sm",
};

/** Owns section rhythm; feature sections should never add their own y-padding. */
export function Section({
  children,
  className = "",
  containerClassName = "",
  tone = "canvas",
  spacing = "default",
  reveal = false,
  backgroundImage,
  backgroundPosition,
  style,
  ...props
}: SectionProps) {
  const content = (
    <Container className={containerClassName}>{children}</Container>
  );

  return (
    <section
      className={`${toneClasses[tone]} ${spacingClasses[spacing]} ${
        backgroundImage ? "ground-art" : ""
      } ${className}`}
      style={
        backgroundImage
          ? ({
              ...style,
              "--ground-image": `url(${backgroundImage})`,
              ...(backgroundPosition ? { backgroundPosition } : null),
            } as React.CSSProperties)
          : style
      }
      {...props}
    >
      {reveal ? <Reveal>{content}</Reveal> : content}
    </section>
  );
}

import type { HTMLAttributes } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type SectionTone = "canvas" | "surface" | "ink" | "brand";
type SectionSpacing = "default" | "compact";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  containerClassName?: string;
  reveal?: boolean;
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
  ...props
}: SectionProps) {
  const content = (
    <Container className={containerClassName}>{children}</Container>
  );

  return (
    <section
      className={`${toneClasses[tone]} ${spacingClasses[spacing]} ${className}`}
      {...props}
    >
      {reveal ? <Reveal>{content}</Reveal> : content}
    </section>
  );
}

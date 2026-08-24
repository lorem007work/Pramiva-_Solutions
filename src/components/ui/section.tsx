import type { HTMLAttributes } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type SectionTone = "canvas" | "surface" | "ink";
type SectionSpacing = "default" | "compact";

type SectionProps = HTMLAttributes<HTMLElement> & {
  tone?: SectionTone;
  spacing?: SectionSpacing;
  containerClassName?: string;
  reveal?: boolean;
};

const toneClasses: Record<SectionTone, string> = {
  canvas: "bg-canvas text-ink",
  surface: "bg-surface text-ink",
  ink: "bg-ink text-canvas",
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

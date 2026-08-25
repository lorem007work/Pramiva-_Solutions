import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  level?: "h1" | "h2";
  /**
   * Visual size, independent of the semantic level.
   *
   * The two were welded together before: an `h2` was always `text-h2`. That is
   * wrong in both directions — a page's main statement can be an h2 that needs
   * display weight, and a supporting block can be an h2 that must NOT compete
   * with the section above it. Heading level is a document-structure decision;
   * size is a design one.
   */
  size?: "h1" | "h2" | "h3";
  align?: "start" | "center";
  className?: string;
  id?: string;
  // Position in a group's stagger. Set it so the heading leads its own
  // section instead of sitting still while the items below animate.
  stagger?: number;
};

/** A semantic heading with the recurring editorial eyebrow/title treatment. */
const sizeClasses = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
} as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  size,
  align = "start",
  className = "",
  id,
  stagger,
}: SectionHeadingProps) {
  const Heading = level;
  const alignment =
    align === "center" ? "mx-auto items-center text-center" : "items-start";
  // Defaults to matching the semantic level, so every existing call site
  // renders exactly as it did before this prop existed.
  const sizeClass = sizeClasses[size ?? level];

  return (
    <div
      className={`flex max-w-3xl flex-col ${alignment} ${className}`}
      {...(stagger === undefined
        ? null
        : {
            "data-stagger": "",
            style: { "--stagger-index": stagger } as React.CSSProperties,
          })}
    >
      {eyebrow ? (
        <p className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={`${eyebrow ? "mt-4" : ""} ${sizeClass}`}>
        {title}
      </Heading>
      {description ? (
        <div className="mt-5 max-w-lead text-lead text-[color:var(--tone-muted)]">
          {description}
        </div>
      ) : null}
    </div>
  );
}

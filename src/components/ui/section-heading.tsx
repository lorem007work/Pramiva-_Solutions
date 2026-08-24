import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  level?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
  id?: string;
};

/** A semantic heading with the recurring editorial eyebrow/title treatment. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  align = "start",
  className = "",
  id,
}: SectionHeadingProps) {
  const Heading = level;
  const alignment =
    align === "center" ? "mx-auto items-center text-center" : "items-start";
  const size = level === "h1" ? "text-h1" : "text-h2";

  return (
    <div className={`flex max-w-3xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="text-eyebrow uppercase text-[color:var(--tone-eyebrow)]">
          {eyebrow}
        </p>
      ) : null}
      <Heading id={id} className={`${eyebrow ? "mt-4" : ""} ${size}`}>
        {title}
      </Heading>
      {description ? (
        <div className="mt-5 max-w-[65ch] text-lead text-[color:var(--tone-muted)]">
          {description}
        </div>
      ) : null}
    </div>
  );
}

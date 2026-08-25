import type { HTMLAttributes, ReactNode } from "react";

type EyebrowProps = HTMLAttributes<HTMLParagraphElement> & {
  children: ReactNode;
  /**
   * `p` standalone, `span` when it sits inside a block that already owns the
   * paragraph semantics — a <dt>, a <li>, or a heading group.
   */
  as?: "p" | "span";
};

/**
 * The recurring editorial label above a heading.
 *
 * Extracted because the same three classes — size, uppercase, and the tone
 * variable — were repeated verbatim at twelve call sites. That is fine until
 * one of them is written as `text-ink-subtle` instead of the tone variable, at
 * which point it silently goes near-invisible on a dark ground. Naming it once
 * removes the opportunity.
 *
 * The colour comes from --tone-eyebrow rather than a fixed token, so the label
 * adapts to whatever ground it lands on. That indirection is load-bearing:
 * .ground-soft remaps it because --color-ink-subtle measures 4.19:1 on that
 * tint — below AA — where on white it is 4.52 and passes.
 *
 * Remaining props are spread so a call site can attach the hero's stagger
 * attributes without this component knowing anything about them.
 */
export function Eyebrow({
  children,
  as = "p",
  className = "",
  ...props
}: EyebrowProps) {
  const Tag = as;

  return (
    <Tag
      className={`text-eyebrow uppercase text-[color:var(--tone-eyebrow)] ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "inverse"
  | "outline-inverse"
  | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
};

type ActionButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & {
    href?: never;
  };

type LinkButtonProps = CommonProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, keyof CommonProps>;

export type ButtonProps = ActionButtonProps | LinkButtonProps;

const variantClasses: Record<ButtonVariant, string> = {
  /* Brand teal, not ink.
     Measured before changing: white on #007B91 is 4.95:1, which clears AA for
     normal text, and the #005E6E hover is 7.43:1 (AAA). The green #389970
     would have been the obvious "brand" choice and is the trap — white on it
     is 3.52:1 and fails outright. See DESIGN-SYSTEM.md §2.
     A black button is the safe default any site could have used; the teal is
     the colour the company actually owns, and the primary action is where a
     brand colour earns its place. */
  primary: "bg-brand text-canvas hover:bg-brand-deep",
  /* Outlined in the same teal so the pair reads as one system. The border sits
     at 40% so it stays quieter than the filled button beside it — a secondary
     action that draws equal attention is not secondary. */
  secondary:
    "border border-brand/40 text-brand hover:border-brand hover:bg-brand hover:text-canvas",
  inverse: "bg-canvas text-ink hover:bg-line",
  // secondary's teal is 3.83:1 on the dark hero — below AA. White outline instead.
  "outline-inverse":
    "border border-canvas/40 text-canvas hover:border-canvas hover:bg-canvas hover:text-ink",
  /* No colour of its own: it inherits from whatever ground it sits on. Setting
     text-ink here made the button invisible on dark sections - the same
     hardcoded-colour failure the tone variables exist to prevent. On light
     grounds inheritance resolves to ink, so nothing changes there. */
  ghost: "underline-offset-4 hover:text-brand",
};

const baseClasses =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[background-color,border-color,color,transform] duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50";

/** Renders a semantic link for navigation and a button for actions. */
export function Button(props: ButtonProps) {
  if ("href" in props && props.href !== undefined) {
    const {
      children,
      variant = "primary",
      className = "",
      href,
      ...linkProps
    } = props;

    return (
      <Link
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    className = "",
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

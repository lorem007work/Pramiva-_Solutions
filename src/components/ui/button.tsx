import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "inverse" | "ghost";

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
  primary: "bg-ink text-canvas hover:bg-brand",
  secondary:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  inverse: "bg-canvas text-ink hover:bg-line",
  ghost: "text-ink underline-offset-4 hover:text-brand",
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

import type { HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement>;

/** Owns the site's shared width constraint and responsive page gutters. */
export function Container({ className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-page px-5 md:px-8 lg:px-16 ${className}`}
      {...props}
    />
  );
}

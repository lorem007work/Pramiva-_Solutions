import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  inverted?: boolean;
  /**
   * Eager-load and hint high priority. Set by the navbar only.
   *
   * On any route without an above-the-fold photograph, the header logo IS the
   * largest contentful paint — it is the only image on the first screen. Left
   * lazy it was being discovered late and then treated as the LCP element,
   * which is the worst of both. The footer copy of this same file stays lazy;
   * it is never above the fold.
   */
  priority?: boolean;
};

/**
 * Shared brand artwork. Parent links provide the accessible name, so the
 * repeated image itself stays decorative.
 */
export function BrandLogo({
  className = "",
  inverted = false,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/images/brand/pramiva-logo.webp"
      alt=""
      width={416}
      height={138}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={`${inverted ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  inverted?: boolean;
};

/**
 * Shared brand artwork. Parent links provide the accessible name, so the
 * repeated image itself stays decorative.
 */
export function BrandLogo({
  className = "",
  inverted = false,
}: BrandLogoProps) {
  return (
    <Image
      src="/images/brand/pramiva-logo.webp"
      alt=""
      width={640}
      height={213}
      className={`${inverted ? "brightness-0 invert" : ""} ${className}`}
    />
  );
}

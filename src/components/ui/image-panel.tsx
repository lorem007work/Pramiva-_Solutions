import Image from "next/image";

type ImagePanelProps = {
  src: string;
  alt: string;
  /** Intrinsic pixel size. Required — it is what reserves the box and stops CLS. */
  width: number;
  height: number;
  /** True only for an above-the-fold LCP candidate. Never for more than one per page. */
  priority?: boolean;
  sizes?: string;
  /** Aspect ratio and radius live here, so each call site picks its own crop. */
  className?: string;
  /** Almost always an object-position — which part of the photograph survives the crop. */
  imageClassName?: string;
};

/**
 * A photograph in a fixed frame.
 *
 * The frame owns the aspect ratio and the image fills it with object-cover, so
 * the rendered box never depends on the asset's own proportions. That is what
 * lets one asset serve a tall panel on desktop and a short band on mobile
 * without shipping two files or letting a phone spend 60% of its first screen
 * on the empty half of a photograph.
 *
 * `object-position` is exposed rather than fixed at center because the subject
 * of a real photograph is rarely in the middle of it. Centre-cropping a group
 * shot is how people end up decapitated at the breakpoint nobody tested.
 *
 * No hover treatment. Per the design direction an image only reacts to the
 * pointer when the thing containing it is genuinely clickable, and these are
 * not links.
 */
export function ImagePanel({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes,
  className = "",
  imageClassName = "",
}: ImagePanelProps) {
  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        // An LCP image must not be lazy, and a below-fold one must be.
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={`h-full w-full object-cover ${imageClassName}`}
      />
    </div>
  );
}

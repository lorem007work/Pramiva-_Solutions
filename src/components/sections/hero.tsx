import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { primaryCta } from "@/data/navigation";
import { site } from "@/data/site";

/**
 * Homepage LCP section. This stays a Server Component: the headline is plain
 * HTML, there is no hero image to shift layout, and the artwork is decorative.
 */
export function Hero() {
  return (
    <Section
      aria-labelledby="home-hero-title"
      className="relative min-h-[calc(100svh-5rem)] overflow-hidden"
      containerClassName="relative grid items-center gap-12 lg:grid-cols-12"
    >
      <div className="relative z-10 lg:col-span-8">
        <p className="text-eyebrow uppercase text-ink-subtle">{site.tagline}</p>

        <h1 id="home-hero-title" className="mt-block max-w-5xl text-display">
          {site.heroHeadline}
        </h1>

        <p className="mt-block max-w-[60ch] text-lead text-ink-muted">
          {site.description}
        </p>

        <div className="mt-block">
          <Button href={primaryCta.href}>{primaryCta.label}</Button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="relative mx-auto aspect-square w-full max-w-64 sm:max-w-80 lg:col-span-4 lg:max-w-md"
      >
        <div className="absolute inset-0 rounded-full border border-line-strong" />
        <div className="absolute inset-[12%] rotate-45 rounded-full border-[12px] border-brand border-r-transparent border-b-transparent sm:border-[18px]" />
        <div className="absolute inset-[27%] -rotate-45 rounded-full border-[9px] border-accent border-t-transparent border-l-transparent sm:border-[13px]" />
        <div className="absolute inset-[44%] rounded-full bg-brand-deep" />
        <div className="absolute top-1/2 -right-section h-px w-[200%] bg-line" />
        <div className="absolute -bottom-8 -left-2 text-display text-line-strong">
          01
        </div>
      </div>
    </Section>
  );
}

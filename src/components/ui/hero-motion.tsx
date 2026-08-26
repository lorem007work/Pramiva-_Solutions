"use client";

import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import type { ReactNode } from "react";

/**
 * THE ONLY FRAMER MOTION CONSUMER IN THE CODEBASE, AND IT IS HOMEPAGE-ONLY.
 *
 * WHY THIS FILE EXISTS RATHER THAN LIVING IN ui/reveal.tsx
 *
 * `reveal.tsx` is reached through `Section`, and every route uses `Section`.
 * Putting the library there put +33.7 KB gz on /about, /services, /contact and
 * /careers to pay for an effect that only ever ran on the homepage — which is
 * what took the site to 213.4 KB against a 185 KB budget and got the whole
 * dependency reverted on 2026-08-25.
 *
 * Nothing outside `sections/hero-split.tsx` may import this file. That single
 * import path is the only reason the cost stays confined to `/`; the moment a
 * shared component imports it, Next hoists the library into the common chunk
 * and every route pays again. Section entrances everywhere — the homepage
 * included — stay on the CSS reveal in ui/reveal.tsx.
 *
 * Re-adopted 2026-08-25 on the project owner's decision, homepage-only, with
 * the budget consequence accepted and recorded in docs/ARCHITECTURE.md §5.1.
 *
 * WHAT THE LIBRARY IS ACTUALLY BUYING
 *
 * Orchestration. The fold has four copy blocks and a brand mark that has to
 * arrive as one movement, and the previous CSS version sequenced them with
 * hand-counted `animation-delay` values on each element. Every timing change
 * meant re-deriving five numbers by hand, and the mark — which runs longer
 * than the copy — drifted against them. `staggerChildren` puts the sequence in
 * one place: the parent owns the rhythm, children declare only their own
 * movement, and the mark can hang off `delayChildren` without arithmetic.
 *
 * LazyMotion + `m` + `domAnimation`, not `motion`: the full import pulls
 * layout animation, drag, gestures and SVG path support whether or not they
 * are used. `strict` fails the build if a plain `motion.*` component appears,
 * so the saving cannot quietly regress.
 */

/* docs/MOTION-ART-DIRECTION.md: entrances use cubic-bezier(0.22, 1, 0.36, 1),
   and the whole fold is settled inside about 900ms. Nobody should have to sit
   through a hero. */
const EASE = [0.22, 1, 0.36, 1] as const;

const sequence = {
  hidden: {},
  shown: {
    transition: {
      /* 90ms apart, first child at 60ms. Four copy blocks therefore land by
         ~500 + 60 + 270 = 830ms, inside the budget above. */
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const copyItem = {
  hidden: { opacity: 0, y: 12 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/*
  The mark scales rather than rises: it is the one element that is a picture
  rather than a line of type, and a translate would make it read as another
  paragraph arriving. 0.96 is deliberately shallow — anything deeper reads as a
  zoom effect, which is the AI-template tell this page is trying to avoid.

  It runs 750ms against the copy's 500ms and starts with the second block, so
  the type is legible before the artwork has finished settling. Reading is
  never blocked on decoration.
*/
const markItem = {
  hidden: { opacity: 0, scale: 0.96 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.75, ease: EASE },
  },
};

type SequenceProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps the whole fold and owns its rhythm. Children opt into the sequence by
 * being a `HeroItem` or a `HeroMark`; anything else renders untouched.
 *
 * REDUCED MOTION IS HANDLED BY MotionConfig, NOT BY A BRANCH.
 *
 * This used to return a plain <div> when useReducedMotion() was true. That
 * hook returns null on the server, so the server always emitted the motion
 * path — `<div data-hero-step style="opacity:0">` — while a reduced-motion
 * client rendered a bare <div>. React 19 reported "some attributes of the
 * server rendered HTML didn't match... This won't be patched up" and left the
 * inline opacity:0 in place, so the entire fold was invisible to exactly the
 * users the branch existed to serve.
 *
 * `reducedMotion="user"` keeps ONE tree for server and client and lets Motion
 * drop the transforms while still animating opacity to 1.
 */
export function HeroSequence({ children, className = "" }: SequenceProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <m.div
          className={className}
          variants={sequence}
          initial="hidden"
          animate="shown"
        >
          {children}
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}

type ItemProps = {
  children: ReactNode;
  className?: string;
  /** Set on the mark so it scales instead of rising. */
  variant?: "copy" | "mark";
};

/**
 * One beat of the fold.
 *
 * `data-hero-step` is not styling — it is the no-JavaScript guard. Motion
 * writes `opacity: 0` into the server-rendered HTML, so a visitor whose script
 * never runs would be left looking at an empty fold. The `<noscript>` rule in
 * app/layout.tsx keys off this attribute and forces the final state back.
 */
export function HeroItem({
  children,
  className = "",
  variant = "copy",
}: ItemProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-hero-step
        className={className}
        variants={variant === "mark" ? markItem : copyItem}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

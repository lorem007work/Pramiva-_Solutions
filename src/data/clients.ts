/**
 * Client and brand information.
 *
 * ⚠ THIRD-PARTY CONTENT. Every name in this file belongs to another company.
 *
 * Publication is disabled until written consent is documented from both
 * management and the client. Keep names out of `src/` until that gate clears.
 */

export type Brand = {
  name: string;
  /** What the brand sells or does. Never what Pramiva achieved for it. */
  description: string;
};

export const principalClient = {
  name: "Client portfolio",
  summary: "Named client information is currently held from publication.",
  relationship: "Client details will appear only after written approval.",
} as const;

export const brands: Brand[] = [];

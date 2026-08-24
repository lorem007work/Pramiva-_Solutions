import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { mainNav, primaryCta } from "@/data/navigation";
import { site } from "@/data/site";
import "./globals.css";

// One typeface. next/font self-hosts at build time — no external request,
// which matters because a blocking font fetch costs LCP directly.
// Geist_Mono is intentionally not loaded: nothing in this design uses it.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en",
    // JPEG, not PNG or WebP: every OG consumer supports it, LinkedIn does not
    // reliably render WebP, and platforms composite on white so alpha is moot.
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased">
        {/* First focusable element on every page — keyboard users skip the nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-canvas"
        >
          Skip to content
        </a>
        <Navbar siteName={site.name} links={mainNav} primaryCta={primaryCta} />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

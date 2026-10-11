import type { Metadata, Viewport } from "next";
import { Fragment_Mono } from "next/font/google";
import localFont from "next/font/local";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { profile, siteUrl } from "@/lib/profile";
import "./globals.css";

// Archivo trimmed to the weights and widths the site uses (52 KB vs 90 KB). See app/fonts/README.md.
const archivo = localFont({
  src: "./fonts/archivo-latin-var.woff2",
  weight: "400 800",
  variable: "--font-archivo",
  display: "swap",
  adjustFontFallback: "Arial",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fragment",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.description,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en_GB",
  },
  twitter: { card: "summary_large_image" },
  alternates: {
    types: { "application/rss+xml": [{ url: "/rss.xml", title: `${profile.name}: Writing` }] },
  },
  verification: { google: "WA0ezcf4u4NL-rtImvfNJJxScFWJsox8Y25kK2owesM" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0f15" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${archivo.variable} ${fragmentMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import crypto from "crypto";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { organizationStructuredData, websiteStructuredData } from "@/lib/seo/structuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SpecFoundry - Professional Engineering Calculators & Reference",
  description:
    "Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering. Thread calculations, material properties, and tolerance analysis.",
  keywords: [
    "engineering calculators",
    "machining calculators", 
    "thread calculator",
    "material calculator",
    "tolerance calculator",
    "engineering reference",
    "manufacturing tools",
    "precision engineering",
    "CNC calculator",
    "machining reference",
    "engineering software",
    "manufacturing calculator",
    "engineering tools",
  ],
  authors: [{ name: "SpecFoundry Team" }],
  creator: "SpecFoundry",
  publisher: "SpecFoundry",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "SpecFoundry - Professional Engineering Calculators",
    description: "Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering applications.",
    type: "website",
    url: "https://specfoundry.com",
    siteName: "SpecFoundry",
    images: [
      {
        url: "https://specfoundry.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "SpecFoundry - Professional Engineering Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SpecFoundry - Professional Engineering Calculators",
    description: "Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering.",
    images: ["https://specfoundry.com/og-image.png"],
    creator: "@specfoundry",
    site: "@specfoundry",
  },
  other: {
    "application-name": "SpecFoundry",
    "apple-mobile-web-app-title": "SpecFoundry",
    "msapplication-TileColor": "#000000",
    "theme-color": "#000000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;
  const isDev = process.env.NODE_ENV === 'development';
  const nonce = crypto.randomUUID();
  
  // CSP needs 'unsafe-eval' in development for Next.js hot reloading
  const cspContent = [
    "default-src 'self';",
    `script-src 'self' 'nonce-${nonce}'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com;`,
    "style-src 'self' 'unsafe-inline';",
    "img-src 'self' data: https://www.google-analytics.com;",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com;",
    "font-src 'self' data:;",
    "frame-ancestors 'none';",
  ].join(" ");

  return (
    <html lang="en">
      <head>
        {/* Security Headers - CSP for static site */}
        <meta httpEquiv="Content-Security-Policy" content={cspContent} />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
        {/* Structured Data */}
        <Script
          id="organization-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData.specfoundry()) }}
        />
        <Script
          id="website-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          nonce={nonce}
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData()) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive" nonce={nonce}>{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
              });
            `}</Script>
          </>
        ) : null}

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}

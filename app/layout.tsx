import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSettingsProvider } from "@/lib/contexts/AppSettingsContext";
import { SearchProvider } from "@/lib/contexts/SearchContext";
import { CommandPalette } from "@/components/CommandPalette";
import { MobileFAB } from "@/components/MobileFAB";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
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
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-4G1TTCZS6F';
  const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {gaId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        ) : null}
        
        {/* Google Search Console */}
        {gscVerification ? (
          <meta name="google-site-verification" content={gscVerification} />
        ) : null}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData.specfoundry()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData()),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppSettingsProvider>
          <SearchProvider>
            {gaId && <GoogleAnalytics gaId={gaId} />}
            {children}
            <CommandPalette />
            <MobileFAB />
          </SearchProvider>
        </AppSettingsProvider>
      </body>
    </html>
  );
}

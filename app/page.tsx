import { Metadata } from "next";
import { generateMetadata } from "@/lib/seo/metadata";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = generateMetadata({
  title: "SpecFoundry - Professional Engineering Calculators & Reference",
  description: "Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering. Thread calculations, material properties, and tolerance analysis.",
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
  canonical: "/",
  openGraph: {
    title: "SpecFoundry - Professional Engineering Calculators",
    description: "Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering applications.",
    type: "website",
    url: "https://specfoundry.com",
  },
  twitter: {
    title: "SpecFoundry - Professional Engineering Calculators",
    description: "Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering.",
  },
});

export default function Home() {
  return (
    <HomeContent />
  );
}

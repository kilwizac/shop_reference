import { Metadata } from "next";
import { generateMetadata, calculatorMetadata } from "@/lib/seo/metadata";
import { calculatorStructuredData } from "@/lib/seo/structuredData";
import ThreadCalculatorClient from "./ThreadCalculatorClient";

export const metadata: Metadata = generateMetadata(calculatorMetadata.threadCalculator());

export default function ThreadCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorStructuredData.threadCalculator()),
        }}
      />
      <ThreadCalculatorClient />
    </>
  );
}
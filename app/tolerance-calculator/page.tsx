import { Metadata } from "next";
import { generateMetadata, calculatorMetadata } from "@/lib/seo/metadata";
import { calculatorStructuredData } from "@/lib/seo/structuredData";
import ToleranceCalculatorClient from "./ToleranceCalculatorClient";

export const metadata: Metadata = generateMetadata(calculatorMetadata.toleranceCalculator());

export default function ToleranceCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorStructuredData.toleranceCalculator()),
        }}
      />
      <ToleranceCalculatorClient />
    </>
  );
}


import { Metadata } from "next";
import { generateMetadata, calculatorMetadata } from "@/lib/seo/metadata";
import { calculatorStructuredData } from "@/lib/seo/structuredData";
import MaterialCalculatorClient from "./MaterialCalculatorClient";

export const metadata: Metadata = generateMetadata(calculatorMetadata.materialCalculator());

export default function MaterialCalculatorPage() {
        return (
          <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorStructuredData.materialCalculator()),
        }}
      />
      <MaterialCalculatorClient />
    </>
  );
}
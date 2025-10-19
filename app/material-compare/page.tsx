import { Metadata } from "next";
import { generateMetadata, calculatorMetadata } from "@/lib/seo/metadata";
import { calculatorStructuredData } from "@/lib/seo/structuredData";
import MaterialCompareClient from "./MaterialCompareClient";

export const metadata: Metadata = generateMetadata(calculatorMetadata.materialCompare());

export default function MaterialComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorStructuredData.materialCompare()),
        }}
      />
      <MaterialCompareClient />
    </>
  );
}

import { Metadata } from "next";
import { Suspense } from "react";
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
      <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Loading...</h2>
          <p className="text-gray-600 dark:text-gray-400">Please wait while the calculator loads.</p>
        </div>
      </div>}>
        <MaterialCompareClient />
      </Suspense>
    </>
  );
}

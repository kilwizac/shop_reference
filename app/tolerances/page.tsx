import { Metadata } from "next";
import { generateMetadata, referenceMetadata } from "@/lib/seo/metadata";
import TolerancesClient from "./TolerancesClient";

export const metadata: Metadata = generateMetadata(referenceMetadata.tolerances());

export default function TolerancesPage() {
  return <TolerancesClient />;
}

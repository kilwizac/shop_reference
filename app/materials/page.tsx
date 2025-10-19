import { Metadata } from "next";
import { generateMetadata, referenceMetadata } from "@/lib/seo/metadata";
import MaterialsClient from "./MaterialsClient";

export const metadata: Metadata = generateMetadata(referenceMetadata.materials());

export default function MaterialsPage() {
  return <MaterialsClient />;
}
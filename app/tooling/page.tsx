import { Metadata } from "next";
import ToolingClient from "./ToolingClient";

export const metadata: Metadata = {
  title: "Tooling Reference | SpecFoundry",
  description: "Machine tool specifications: Tapers (CAT, BT, R8, Morse), Collets (ER, 5C), and Insert Nomenclature.",
};

export default function ToolingPage() {
  return <ToolingClient />;
}

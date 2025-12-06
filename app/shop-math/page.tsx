import { Metadata } from "next";
import ShopMathClient from "./ShopMathClient";

export const metadata: Metadata = {
  title: "Shop Math Calculators | SpecFoundry",
  description: "Essential machine shop calculators: Bolt Circle, Sine Bar, Right Triangle Trigonometry, and Unit Conversions.",
};

export default function ShopMathPage() {
  return <ShopMathClient />;
}

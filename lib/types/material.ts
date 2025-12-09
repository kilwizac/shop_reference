/**
 * Enhanced material property types for SpecFoundry
 * Includes property ranges, citations, and metadata
 */

export interface MaterialProperty {
  value: number;
  unit: string;
  // Some entries include a range, others omit it entirely
  range?: [number, number] | number[];
  citation?: string;
}

export interface MaterialProperties {
  density?: MaterialProperty;
  expansion?: MaterialProperty;
  tensileStrength?: MaterialProperty;
  yieldStrength?: MaterialProperty;
  hardness?: MaterialProperty;
}

export interface EnhancedMaterial {
  name: string;
  density: number; // Legacy support
  expansion: number; // Legacy support
  tensileStrength?: number; // Legacy support
  yieldStrength?: number; // Legacy support
  hardness?: number; // Legacy support
  category: string;
  subcategory?: string;
  description?: string;
  applications?: string[];
  properties?: MaterialProperties;
}

export type MaterialShape =
  | "rectangle"
  | "round"
  | "tube"
  | "square_tube"
  | "hex"
  | "angle"
  | "channel"
  | "ibeam"
  | "sheet";

export interface MaterialFilter {
  category?: string;
  subcategory?: string;
  densityRange?: [number, number];
  expansionRange?: [number, number];
  tensileStrengthRange?: [number, number];
  yieldStrengthRange?: [number, number];
  hardnessRange?: [number, number];
}

export interface MaterialCategory {
  name: string;
  subcategories: string[];
  description: string;
  color: string;
}

export interface PropertyRange {
  min: number;
  max: number;
  step: number;
  unit: string;
}

export interface MaterialPropertyRanges {
  density: PropertyRange;
  expansion: PropertyRange;
  tensileStrength: PropertyRange;
  yieldStrength: PropertyRange;
  hardness: PropertyRange;
}

export interface ChartDataPoint {
  material: string;
  value: number;
  category: string;
}

export interface PropertyChartData {
  property: string;
  unit: string;
  data: ChartDataPoint[];
}

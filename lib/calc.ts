/**
 * Shared calculation library for SpecFoundry
 * Contains all calculation functions with TypeScript types
 */

import materialsData from '../data/materials.json';
import {
  convertWeightForDisplay,
  getVolumeUnit,
  getWeightUnit,
  getDensityUnit,
  type UnitSystem
} from './utils/units';
import { validateMaterialInputs } from './utils/validation';

// ============================================================================
// TYPES
// ============================================================================

export interface MaterialProperties {
  name: string;
  density: number; // lb/in³
  expansion: number; // ×10⁻⁶ in/in/°F
  tensileStrength?: number; // ksi
  yieldStrength?: number; // ksi
  hardness?: number; // HB
}

export interface SectionProperties {
  area: number;
  Ixx: number; // Moment of inertia about x-axis
  Iyy: number; // Moment of inertia about y-axis
  Zxx: number; // Section modulus about x-axis
  Zyy: number; // Section modulus about y-axis
  rxx: number; // Radius of gyration about x-axis
  ryy: number; // Radius of gyration about y-axis
}

export interface ThreadData {
  size: string;
  major: number;
  tpi?: number;
  pitch?: number;
  tapDrill: string | number;
  decimal?: number;
  diameter?: number;
}

export interface FitData {
  designation: string;
  type: string;
  description: string;
  applications: string;
}


export interface ThermalExpansionResult {
  expansion: number;
  finalLength: number;
  coefficient: number;
}

export interface WeightResult {
  volume: number;
  weight: number;
  weightKg: number;
  density: number;
  surfaceArea?: number;
}

export interface TapDrillResult {
  tapDrillDiameter: number;
  threadDepth: number;
}

export interface ThreadDepthResult {
  threadHeight: number;
  minorDiameter: number;
  pitchDiameter: number;
  stressArea: number;
  minorArea: number;
  pitchArea: number;
  clearanceClose: number;
  clearanceStandard: number;
  clearanceLoose: number;
}

export interface FitResult {
  holeMax: number;
  holeMin: number;
  holeTol: number;
  shaftMax: number;
  shaftMin: number;
  shaftTol: number;
  maxClearance: number;
  minClearance: number;
  fitType: string;
}

export interface BilateralToleranceResult {
  maxLimit: number;
  minLimit: number;
  totalTolerance: number;
  midTolerance: number;
}

export interface RoughnessResult {
  micrometers: number;
  microinches: number;
  rms: number;
  rz: number;
}

// ============================================================================
// MATERIAL CALCULATIONS
// ============================================================================

/**
 * Calculate volume for various shapes
 */
export function calculateVolume(
  shape: string,
  length: number,
  width: number,
  height: number,
  diameter: number,
  wallThickness: number,
  flatToFlat?: number,
  legWidth?: number,
  legHeight?: number,
  legThickness?: number,
  flangeWidth?: number,
  flangeThickness?: number,
  webHeight?: number,
  webThickness?: number,
  sheetThickness?: number,
  innerFilletRadius?: number,
  outerFilletRadius?: number
): number | null {
  if (!length) return null;

  switch (shape) {
    case "rectangle":
      if (!width || !height) return null;
      return length * width * height;

    case "round":
      if (!diameter) return null;
      return Math.PI * Math.pow(diameter / 2, 2) * length;

    case "tube":
      if (!diameter || !wallThickness) return null;
      const outerRadius = diameter / 2;
      const innerRadius = outerRadius - wallThickness;
      return Math.PI * (Math.pow(outerRadius, 2) - Math.pow(innerRadius, 2)) * length;

    case "square_tube":
      if (!width || !wallThickness) return null;
      const outerArea = width * width;
      const innerDim = width - 2 * wallThickness;
      const innerArea = innerDim * innerDim;
      return (outerArea - innerArea) * length;

    case "hex":
      if (!flatToFlat) return null;
      const side = flatToFlat / Math.sqrt(3);
      const hexArea = (3 * Math.sqrt(3) / 2) * Math.pow(side, 2);
      return hexArea * length;

    case "angle":
      if (!legWidth || !legHeight || !legThickness) return null;
      const angleArea =
        legWidth * legThickness + legHeight * legThickness - legThickness * legThickness;
      return angleArea * length;

    case "channel":
    case "ibeam":
      if (!flangeWidth || !webHeight || !flangeThickness || !webThickness) return null;
      const structuralArea =
        2 * flangeWidth * flangeThickness + (webHeight - 2 * flangeThickness) * webThickness;
      return structuralArea * length;

    case "sheet":
      if (!width || !sheetThickness) return null;
      return length * width * sheetThickness;

    default:
      return null;
  }
}

/**
 * Calculate surface area for L-angle with optional fillets
 */
function calculateAngleSurfaceArea(
  legWidth: number,
  legHeight: number,
  legThickness: number,
  length: number,
  innerFilletRadius?: number,
  outerFilletRadius?: number
): number {
  // Basic perimeter calculation
  const perimeter = 2 * (legWidth + legHeight) - 2 * legThickness;
  
  // Add fillet contributions if specified
  let filletContribution = 0;
  if (innerFilletRadius && innerFilletRadius > 0) {
    // Inner fillet adds quarter circle arc length
    filletContribution += (Math.PI * innerFilletRadius) / 2;
  }
  if (outerFilletRadius && outerFilletRadius > 0) {
    // Outer fillet adds quarter circle arc length
    filletContribution += (Math.PI * outerFilletRadius) / 2;
  }
  
  const totalPerimeter = perimeter + filletContribution;
  
  // End face areas (two ends)
  const endArea = legWidth * legThickness + legHeight * legThickness - legThickness * legThickness;
  
  return totalPerimeter * length + 2 * endArea;
}

/**
 * Calculate surface area for C-channel with optional fillets
 */
function calculateChannelSurfaceArea(
  flangeWidth: number,
  webHeight: number,
  flangeThickness: number,
  webThickness: number,
  length: number,
  innerFilletRadius?: number,
  outerFilletRadius?: number
): number {
  // Basic perimeter calculation
  const perimeter = 2 * flangeWidth + 2 * webHeight - 2 * webThickness;
  
  // Add fillet contributions if specified
  let filletContribution = 0;
  if (innerFilletRadius && innerFilletRadius > 0) {
    // Inner fillets at flange-to-web junctions (4 locations)
    filletContribution += 4 * (Math.PI * innerFilletRadius) / 2;
  }
  if (outerFilletRadius && outerFilletRadius > 0) {
    // Outer fillets at flange-to-web junctions (4 locations)
    filletContribution += 4 * (Math.PI * outerFilletRadius) / 2;
  }
  
  const totalPerimeter = perimeter + filletContribution;
  
  // End face area
  const endArea = 2 * flangeWidth * flangeThickness + (webHeight - 2 * flangeThickness) * webThickness;
  
  return totalPerimeter * length + 2 * endArea;
}

/**
 * Calculate surface area for I-beam with optional fillets
 */
function calculateIBeamSurfaceArea(
  flangeWidth: number,
  webHeight: number,
  flangeThickness: number,
  webThickness: number,
  length: number,
  innerFilletRadius?: number,
  outerFilletRadius?: number
): number {
  // Basic perimeter calculation
  const perimeter = 2 * flangeWidth + 2 * webHeight - 2 * webThickness;
  
  // Add fillet contributions if specified
  let filletContribution = 0;
  if (innerFilletRadius && innerFilletRadius > 0) {
    // Inner fillets at flange-to-web junctions (4 locations)
    filletContribution += 4 * (Math.PI * innerFilletRadius) / 2;
  }
  if (outerFilletRadius && outerFilletRadius > 0) {
    // Outer fillets at flange-to-web junctions (4 locations)
    filletContribution += 4 * (Math.PI * outerFilletRadius) / 2;
  }
  
  const totalPerimeter = perimeter + filletContribution;
  
  // End face area
  const endArea = 2 * flangeWidth * flangeThickness + (webHeight - 2 * flangeThickness) * webThickness;
  
  return totalPerimeter * length + 2 * endArea;
}

/**
 * Calculate surface area for various shapes
 */
export function calculateSurfaceArea(
  shape: string,
  length: number,
  width: number,
  height: number,
  diameter: number,
  wallThickness: number,
  flatToFlat?: number,
  legWidth?: number,
  legHeight?: number,
  legThickness?: number,
  flangeWidth?: number,
  flangeThickness?: number,
  webHeight?: number,
  webThickness?: number,
  sheetThickness?: number,
  innerFilletRadius?: number,
  outerFilletRadius?: number
): number {
  switch (shape) {
    case "rectangle":
      if (!width || !height || !length) return 0;
      return 2 * (length * width + length * height + width * height);

    case "round":
      if (!diameter || !length) return 0;
      return 2 * Math.PI * (diameter / 2) * length + 2 * Math.PI * Math.pow(diameter / 2, 2);

    case "tube":
      if (!diameter || !length || !wallThickness) return 0;
      const outerCirc = Math.PI * diameter;
      const innerCirc = Math.PI * (diameter - 2 * wallThickness);
      return (
        (outerCirc + innerCirc) * length +
        2 * Math.PI * (Math.pow(diameter / 2, 2) - Math.pow(diameter / 2 - wallThickness, 2))
      );

    case "square_tube":
      if (!width || !length || !wallThickness) return 0;
      const outerPerim = 4 * width;
      const innerPerim = 4 * (width - 2 * wallThickness);
      return (
        (outerPerim + innerPerim) * length +
        2 * (width * width - Math.pow(width - 2 * wallThickness, 2))
      );

    case "hex":
      if (!flatToFlat || !length) return 0;
      const side = flatToFlat / Math.sqrt(3);
      const perimeter = 6 * side;
      const hexArea = (3 * Math.sqrt(3) / 2) * Math.pow(side, 2);
      return perimeter * length + 2 * hexArea;

    case "sheet":
      if (!length || !width || !sheetThickness) return 0;
      return 2 * (length * width) + 2 * (length * sheetThickness) + 2 * (width * sheetThickness);

    case "angle":
      if (!legWidth || !legHeight || !legThickness || !length) return 0;
      return calculateAngleSurfaceArea(legWidth, legHeight, legThickness, length, innerFilletRadius, outerFilletRadius);

    case "channel":
      if (!flangeWidth || !webHeight || !flangeThickness || !webThickness || !length) return 0;
      return calculateChannelSurfaceArea(flangeWidth, webHeight, flangeThickness, webThickness, length, innerFilletRadius, outerFilletRadius);

    case "ibeam":
      if (!flangeWidth || !webHeight || !flangeThickness || !webThickness || !length) return 0;
      return calculateIBeamSurfaceArea(flangeWidth, webHeight, flangeThickness, webThickness, length, innerFilletRadius, outerFilletRadius);

    default:
      return 0;
  }
}

/**
 * Calculate section properties for various shapes
 */
export function calculateSectionProperties(
  shape: string,
  width: number,
  height: number,
  diameter: number,
  wallThickness: number,
  flatToFlat?: number,
  legWidth?: number,
  legHeight?: number,
  legThickness?: number,
  flangeWidth?: number,
  flangeThickness?: number,
  webHeight?: number,
  webThickness?: number,
  sheetThickness?: number,
  innerFilletRadius?: number,
  outerFilletRadius?: number
): SectionProperties | null {
  let area = 0;
  let Ixx = 0;
  let Iyy = 0;

  switch (shape) {
    case "rectangle":
      if (!width || !height) return null;
      area = width * height;
      Ixx = (width * Math.pow(height, 3)) / 12;
      Iyy = (height * Math.pow(width, 3)) / 12;
      break;

    case "round":
      if (!diameter) return null;
      area = Math.PI * Math.pow(diameter / 2, 2);
      Ixx = Iyy = (Math.PI * Math.pow(diameter, 4)) / 64;
      break;

    case "tube":
      if (!diameter || !wallThickness) return null;
      const Do = diameter;
      const Di = diameter - 2 * wallThickness;
      area = (Math.PI / 4) * (Math.pow(Do, 2) - Math.pow(Di, 2));
      Ixx = Iyy = (Math.PI / 64) * (Math.pow(Do, 4) - Math.pow(Di, 4));
      break;

    case "square_tube":
      if (!width || !wallThickness) return null;
      const outerSize = width;
      const innerSize = width - 2 * wallThickness;
      area = Math.pow(outerSize, 2) - Math.pow(innerSize, 2);
      Ixx = Iyy = (Math.pow(outerSize, 4) - Math.pow(innerSize, 4)) / 12;
      break;

    case "hex":
      if (!flatToFlat) return null;
      const side = flatToFlat / Math.sqrt(3);
      area = (3 * Math.sqrt(3) / 2) * Math.pow(side, 2);
      Ixx = Iyy = (5 * Math.sqrt(3) / 16) * Math.pow(side, 4);
      break;

    case "angle":
      if (!legWidth || !legHeight || !legThickness) return null;
      area = legWidth * legThickness + legHeight * legThickness - legThickness * legThickness;

      const A1 = legWidth * legThickness;
      const A2 = (legHeight - legThickness) * legThickness;

      const y1 = legThickness / 2;
      const y2 = legThickness + (legHeight - legThickness) / 2;

      const centroidY = (A1 * y1 + A2 * y2) / area;

      Ixx =
        (legThickness * Math.pow(legWidth, 3)) / 12 +
        A1 * Math.pow(y1 - centroidY, 2) +
        (legThickness * Math.pow(legHeight - legThickness, 3)) / 12 +
        A2 * Math.pow(y2 - centroidY, 2);

      Iyy =
        (legWidth * Math.pow(legThickness, 3)) / 12 +
        ((legHeight - legThickness) * Math.pow(legThickness, 3)) / 12;
      break;

    case "channel":
    case "ibeam":
      if (!flangeWidth || !webHeight || !flangeThickness || !webThickness) return null;
      area = 2 * flangeWidth * flangeThickness + (webHeight - 2 * flangeThickness) * webThickness;

      const webHt = webHeight - 2 * flangeThickness;

      Ixx =
        (2 * flangeWidth * Math.pow(flangeThickness, 3)) / 12 +
        2 * (flangeWidth * flangeThickness) * Math.pow((webHeight - flangeThickness) / 2, 2) +
        (webThickness * Math.pow(webHt, 3)) / 12;

      Iyy =
        (2 * flangeThickness * Math.pow(flangeWidth, 3)) / 12 +
        (webHt * Math.pow(webThickness, 3)) / 12;
      break;

    case "sheet":
      if (!width || !sheetThickness) return null;
      area = width * sheetThickness;
      Ixx = (width * Math.pow(sheetThickness, 3)) / 12;
      Iyy = (sheetThickness * Math.pow(width, 3)) / 12;
      break;

    default:
      return null;
  }

  if (area === 0) return null;

  const heightForZ =
    shape === "round" || shape === "tube"
      ? diameter
      : shape === "hex"
        ? flatToFlat
        : shape === "angle" || shape === "channel" || shape === "ibeam"
          ? webHeight
          : shape === "sheet"
            ? sheetThickness
            : height;

  const widthForZ =
    shape === "round" || shape === "tube"
      ? diameter
      : shape === "hex"
        ? flatToFlat
        : shape === "angle"
          ? legWidth
          : shape === "channel" || shape === "ibeam"
            ? flangeWidth
            : width;

  // Safety check for undefined dimensions
  if (!heightForZ || !widthForZ) return null;

  const Zxx = Ixx / (heightForZ / 2);
  const Zyy = Iyy / (widthForZ / 2);

  const rxx = Math.sqrt(Ixx / area);
  const ryy = Math.sqrt(Iyy / area);

  return { area, Ixx, Iyy, Zxx, Zyy, rxx, ryy };
}

/**
 * Calculate thermal expansion
 */
export function calculateThermalExpansion(
  originalLength: number,
  tempChange: number,
  expansionCoefficient: number // ×10⁻⁶ in/in/°F
): ThermalExpansionResult | null {
  if (!originalLength || !tempChange) return null;

  const alpha = expansionCoefficient * 1e-6;
  const deltaL = originalLength * alpha * tempChange;
  const finalLength = originalLength + deltaL;

  return {
    expansion: Math.abs(deltaL),
    finalLength,
    coefficient: expansionCoefficient,
  };
}

// ============================================================================
// THREAD CALCULATIONS
// ============================================================================

/**
 * Calculate tap drill size for imperial threads
 */
export function calculateTapDrill(
  majorDiameter: number,
  threadsPerInch: number,
  threadEngagement: number // percentage (0-100)
): TapDrillResult | null {
  if (!majorDiameter || !threadsPerInch || !threadEngagement) return null;

  const engagement = threadEngagement / 100;
  const threadDepth = 0.6495 / threadsPerInch;
  const tapDrillDiameter = majorDiameter - threadDepth * engagement * 2;

  return { tapDrillDiameter, threadDepth };
}

/**
 * Calculate tap drill size for metric threads
 */
export function calculateMetricTapDrill(
  nominalDiameter: number,
  pitch: number,
  threadEngagement: number // percentage (0-100)
): TapDrillResult | null {
  if (!nominalDiameter || !pitch || !threadEngagement) return null;

  const engagement = threadEngagement / 100;
  const threadDepth = pitch * 0.6495;
  const tapDrillDiameter = nominalDiameter - threadDepth * engagement * 2;

  return { tapDrillDiameter, threadDepth };
}

/**
 * Calculate thread depth and related dimensions
 */
export function calculateThreadDepth(
  majorDiameter: number,
  pitch: number, // TPI for imperial, mm for metric
  units: "imperial" | "metric"
): ThreadDepthResult | null {
  if (!majorDiameter || !pitch) return null;

  const h = units === "imperial" ? 0.6495 / pitch : pitch * 0.6495;
  const minorDiameter = majorDiameter - 2 * h;
  const pitchDiameter = majorDiameter - 2 * h * 0.64952;

  // Calculate stress area (tensile stress area)
  const stressArea =
    units === "imperial"
      ? (Math.PI * Math.pow(majorDiameter - 0.9743 / pitch, 2)) / 4
      : (Math.PI * Math.pow(majorDiameter - 0.9382 * pitch, 2)) / 4;

  // Calculate minor area (root area)
  const minorArea = (Math.PI * Math.pow(minorDiameter, 2)) / 4;

  // Calculate pitch area
  const pitchArea = (Math.PI * Math.pow(pitchDiameter, 2)) / 4;

  // Clearance holes
  const clearanceClose = majorDiameter * 1.05;
  const clearanceStandard = majorDiameter * 1.1;
  const clearanceLoose = majorDiameter * 1.15;

  return {
    threadHeight: h,
    minorDiameter,
    pitchDiameter,
    stressArea,
    minorArea,
    pitchArea,
    clearanceClose,
    clearanceStandard,
    clearanceLoose,
  };
}

// ============================================================================
// TOLERANCE CALCULATIONS
// ============================================================================

/**
 * Calculate IT grade tolerance value
 */
export function calculateITTolerance(nominal: number, grade: number): number {
  let i = 0;
  if (nominal <= 3) i = 0.55;
  else if (nominal <= 6) i = 0.73;
  else if (nominal <= 10) i = 0.9;
  else if (nominal <= 18) i = 1.08;
  else if (nominal <= 30) i = 1.31;
  else if (nominal <= 50) i = 1.56;
  else if (nominal <= 80) i = 1.86;
  else if (nominal <= 120) i = 2.17;
  else if (nominal <= 180) i = 2.52;
  else if (nominal <= 250) i = 2.89;
  else if (nominal <= 315) i = 3.22;
  else if (nominal <= 400) i = 3.54;
  else if (nominal <= 500) i = 3.89;
  else i = 4.21;

  if (grade <= 1) return 0.3 + 0.001 * nominal;
  if (grade === 2) return 0.5 + 0.002 * nominal;
  if (grade === 3) return 0.8 + 0.002 * nominal;
  if (grade === 4) return 1.2 + 0.002 * nominal;

  return Math.pow(10, grade - 5) * i;
}

/**
 * Calculate fundamental deviation for shafts
 */
export function calculateShaftDeviation(
  nominal: number,
  letter: string
): { upper: number; lower: number } {
  const D = Math.pow(nominal, 1 / 3);
  let es = 0;
  let ei = 0;

  switch (letter.toLowerCase()) {
    case "a":
      es = -270 * D - 3;
      break;
    case "b":
      es = -140 * D - 2.5;
      break;
    case "c":
      es = -60 * D - 1;
      break;
    case "d":
      es = nominal <= 50 ? -16 * D : -11 * D - 0.5;
      break;
    case "e":
      es = nominal <= 50 ? -11 * D : -7.5 * D - 0.4;
      break;
    case "f":
      es = nominal <= 50 ? -5.5 * D : -4 * D - 0.2;
      break;
    case "g":
      es = nominal <= 50 ? -2.5 * D : -1.5 * D - 0.1;
      break;
    case "h":
      es = 0;
      break;
    case "js":
      es = 0;
      ei = 0;
      break;
    case "k":
      ei = nominal <= 3 ? 0 : 0.6 * D;
      break;
    case "n":
      ei = nominal <= 3 ? 4 : 1.5 * D + 4;
      break;
    case "p":
      ei = nominal <= 3 ? 6 : 2 * D + 6;
      break;
    case "s":
      ei = nominal <= 50 ? 4 * D + 14 : 3 * D + 17;
      break;
    default:
      es = 0;
  }

  return { upper: es, lower: ei };
}

/**
 * Calculate ISO 286 fit
 */
export function calculateFit(
  nominalSize: number,
  holeTolerance: string,
  shaftTolerance: string
): FitResult | null {
  if (!nominalSize) return null;

  // Extract grade numbers
  const holeGrade = Number.parseInt(holeTolerance.match(/\d+/)?.[0] || "7");
  const shaftGrade = Number.parseInt(shaftTolerance.match(/\d+/)?.[0] || "6");
  const shaftLetter = shaftTolerance.match(/[a-zA-Z]+/)?.[0] || "g";

  // Calculate tolerance zones
  const holeTol = calculateITTolerance(nominalSize, holeGrade);
  const shaftTol = calculateITTolerance(nominalSize, shaftGrade);

  // Calculate deviations
  const shaftDeviation = calculateShaftDeviation(nominalSize, shaftLetter);

  // Hole limits (H is always 0 to +tolerance)
  const holeMax = nominalSize + holeTol / 1000;
  const holeMin = nominalSize;

  // Shaft limits
  const shaftMax = nominalSize + (shaftDeviation.upper || 0) / 1000;
  const shaftMin = nominalSize + (shaftDeviation.upper || 0) / 1000 - shaftTol / 1000;

  // Calculate clearances/interferences
  const maxClearance = holeMax - shaftMin;
  const minClearance = holeMin - shaftMax;

  let fitType = "";
  if (minClearance > 0) fitType = "Clearance Fit";
  else if (maxClearance < 0) fitType = "Interference Fit";
  else fitType = "Transition Fit";

  return {
    holeMax,
    holeMin,
    holeTol: holeTol / 1000,
    shaftMax,
    shaftMin,
    shaftTol: shaftTol / 1000,
    maxClearance,
    minClearance,
    fitType,
  };
}

/**
 * Calculate bilateral tolerance
 */
export function calculateBilateralTolerance(
  nominalDimension: number,
  upperDeviation: number,
  lowerDeviation: number
): BilateralToleranceResult | null {
  if (!nominalDimension || isNaN(upperDeviation) || isNaN(lowerDeviation)) return null;

  const maxLimit = nominalDimension + upperDeviation;
  const minLimit = nominalDimension + lowerDeviation;
  const totalTolerance = upperDeviation - lowerDeviation;
  const midTolerance = (upperDeviation + lowerDeviation) / 2;

  return {
    maxLimit,
    minLimit,
    totalTolerance,
    midTolerance,
  };
}

/**
 * Convert surface roughness between units
 */
export function convertRoughness(
  value: number,
  fromUnit: "micrometers" | "microinches"
): RoughnessResult | null {
  if (!value) return null;

  if (fromUnit === "micrometers") {
    return {
      micrometers: value,
      microinches: value * 39.37,
      rms: value * 1.11,
      rz: value * 4.5,
    };
  } else {
    return {
      micrometers: value / 39.37,
      microinches: value,
      rms: (value / 39.37) * 1.11,
      rz: (value / 39.37) * 4.5,
    };
  }
}


// ============================================================================
// MATERIAL DATA AND WEIGHT CALCULATIONS
// ============================================================================

// Export materials from JSON data
export const materials: Record<string, MaterialProperties> = materialsData;

/**
 * Calculate weight with proper unit handling
 * @param volume - Volume in input units (mm³ for metric, in³ for imperial)
 * @param densityLbPerIn3 - Material density in lb/in³
 * @param unitSystem - Current unit system
 * @returns Weight calculation result with proper units
 */
export function calculateWeightWithUnits(
  volume: number,
  densityLbPerIn3: number,
  unitSystem: UnitSystem
) {
  if (!volume || !densityLbPerIn3) return null;

  // Convert volume to consistent units (in³) for density calculation
  const volumeIn3 = unitSystem === 'metric' 
    ? volume * Math.pow(1/25.4, 3) // Convert mm³ to in³
    : volume; // Already in in³

  // Calculate weight in lb (volume in in³ × density in lb/in³)
  const weightLb = volumeIn3 * densityLbPerIn3;
  
  // Convert to display units
  const weight = convertWeightForDisplay(weightLb, unitSystem);
  const weightKg = unitSystem === 'imperial' ? weightLb * 0.453592 : weight;

  return {
    volume,
    weight,
    weightKg,
    density: densityLbPerIn3,
    volumeUnit: getVolumeUnit(unitSystem),
    weightUnit: getWeightUnit(unitSystem),
    densityUnit: getDensityUnit(unitSystem)
  };
}

// Re-export validation function
export { validateMaterialInputs };


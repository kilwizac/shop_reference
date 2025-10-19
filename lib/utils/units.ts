/**
 * Units conversion utilities for SpecFoundry
 * Handles conversions between imperial and metric units
 */

export type UnitSystem = 'imperial' | 'metric';

// Conversion constants
export const MM_TO_INCH = 1 / 25.4;
export const INCH_TO_MM = 25.4;
export const LB_TO_KG = 0.453592;
export const KG_TO_LB = 1 / 0.453592;

/**
 * Convert length from mm to inches
 */
export function mmToInches(mm: number): number {
  return mm * MM_TO_INCH;
}

/**
 * Convert length from inches to mm
 */
export function inchesToMm(inches: number): number {
  return inches * INCH_TO_MM;
}

/**
 * Convert volume from mm³ to in³
 */
export function mm3ToIn3(mm3: number): number {
  return mm3 * Math.pow(MM_TO_INCH, 3);
}

/**
 * Convert volume from in³ to mm³
 */
export function in3ToMm3(in3: number): number {
  return in3 * Math.pow(INCH_TO_MM, 3);
}

/**
 * Convert weight from kg to lb
 */
export function kgToLb(kg: number): number {
  return kg * KG_TO_LB;
}

/**
 * Convert weight from lb to kg
 */
export function lbToKg(lb: number): number {
  return lb * LB_TO_KG;
}

/**
 * Convert density from kg/mm³ to lb/in³
 */
export function kgPerMm3ToLbPerIn3(kgPerMm3: number): number {
  return kgPerMm3 * (KG_TO_LB / Math.pow(INCH_TO_MM, 3));
}

/**
 * Convert density from lb/in³ to kg/mm³
 */
export function lbPerIn3ToKgPerMm3(lbPerIn3: number): number {
  return lbPerIn3 * (LB_TO_KG / Math.pow(MM_TO_INCH, 3));
}

/**
 * Get density in the correct units for the given system
 * @param densityLbPerIn3 - Density in lb/in³ (from materials data)
 * @param unitSystem - Target unit system
 * @returns Density in appropriate units for the system
 */
export function getDensityForSystem(densityLbPerIn3: number, unitSystem: UnitSystem): number {
  if (unitSystem === 'imperial') {
    return densityLbPerIn3; // Already in lb/in³
  } else {
    // Convert to kg/mm³ for metric calculations
    return lbPerIn3ToKgPerMm3(densityLbPerIn3);
  }
}

/**
 * Convert volume to consistent units for weight calculation
 * @param volume - Volume in input units
 * @param inputUnits - Units of the input volume
 * @param targetUnits - Units needed for density calculation
 * @returns Volume in target units
 */
export function convertVolumeForDensity(
  volume: number,
  inputUnits: UnitSystem,
  targetUnits: UnitSystem
): number {
  if (inputUnits === targetUnits) {
    return volume;
  }
  
  if (inputUnits === 'metric' && targetUnits === 'imperial') {
    // Convert mm³ to in³
    return mm3ToIn3(volume);
  } else if (inputUnits === 'imperial' && targetUnits === 'metric') {
    // Convert in³ to mm³
    return in3ToMm3(volume);
  }
  
  return volume;
}

/**
 * Convert weight to display units
 * @param weight - Weight in lb
 * @param targetUnits - Target unit system for display
 * @returns Weight in target units
 */
export function convertWeightForDisplay(weight: number, targetUnits: UnitSystem): number {
  if (targetUnits === 'imperial') {
    return weight; // Already in lb
  } else {
    return lbToKg(weight); // Convert to kg
  }
}

/**
 * Get volume unit string for display
 */
export function getVolumeUnit(unitSystem: UnitSystem): string {
  return unitSystem === 'imperial' ? 'in³' : 'mm³';
}

/**
 * Get weight unit string for display
 */
export function getWeightUnit(unitSystem: UnitSystem): string {
  return unitSystem === 'imperial' ? 'lb' : 'kg';
}

/**
 * Get density unit string for display
 */
export function getDensityUnit(unitSystem: UnitSystem): string {
  return unitSystem === 'imperial' ? 'lb/in³' : 'kg/mm³';
}

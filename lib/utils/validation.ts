/**
 * Validation utilities for calculator inputs
 * Provides inline warnings for out-of-range or invalid values
 */

export interface ValidationResult {
  isValid: boolean;
  warning?: string;
  severity?: 'info' | 'warning' | 'error';
}

// Validation Functions
export const validateChipLoad = (chipLoad: number, material: string): ValidationResult => {
  if (chipLoad <= 0) {
    return { isValid: false, warning: 'Chip load must be positive', severity: 'error' };
  }
  
  if (material === 'aluminum' && chipLoad > 0.015) {
    return { isValid: true, warning: 'High chip load for aluminum - may cause poor surface finish', severity: 'warning' };
  }
  
  if (material.includes('steel') && chipLoad > 0.008) {
    return { isValid: true, warning: 'High chip load for steel - reduce if tool chatter occurs', severity: 'warning' };
  }
  
  if (chipLoad < 0.0001) {
    return { isValid: true, warning: 'Very low chip load - may cause rubbing instead of cutting', severity: 'warning' };
  }
  
  return { isValid: true };
};

export const validateRPM = (rpm: number): ValidationResult => {
  if (rpm <= 0) {
    return { isValid: false, warning: 'RPM must be positive', severity: 'error' };
  }
  
  if (rpm > 50000) {
    return { isValid: true, warning: 'Very high RPM - ensure spindle is rated for this speed', severity: 'warning' };
  }
  
  if (rpm < 10) {
    return { isValid: true, warning: 'Very low RPM - may not be achievable on most machines', severity: 'warning' };
  }
  
  return { isValid: true };
};

export const validateCuttingSpeed = (speed: number, units: 'imperial' | 'metric'): ValidationResult => {
  if (speed <= 0) {
    return { isValid: false, warning: 'Cutting speed must be positive', severity: 'error' };
  }
  
  const maxSpeed = units === 'imperial' ? 2000 : 600;
  if (speed > maxSpeed) {
    return { isValid: true, warning: 'Extremely high cutting speed - verify tool and material compatibility', severity: 'warning' };
  }
  
  return { isValid: true };
};

// Tolerance Validation
export const validateTolerance = (upper: number, lower: number): ValidationResult => {
  if (upper < lower) {
    return { isValid: false, warning: 'Upper deviation must be greater than lower deviation', severity: 'error' };
  }
  
  if (upper === lower) {
    return { isValid: false, warning: 'Upper and lower deviations cannot be equal', severity: 'error' };
  }
  
  const totalTolerance = upper - lower;
  if (totalTolerance < 0.001) {
    return { isValid: true, warning: 'Very tight tolerance - may require precision grinding', severity: 'warning' };
  }
  
  if (totalTolerance > 1) {
    return { isValid: true, warning: 'Very loose tolerance - typical for rough machining only', severity: 'info' };
  }
  
  return { isValid: true };
};

export const validateNominalSize = (size: number, units: 'imperial' | 'metric'): ValidationResult => {
  if (size <= 0) {
    return { isValid: false, warning: 'Nominal size must be positive', severity: 'error' };
  }
  
  const maxSize = units === 'imperial' ? 100 : 2500;
  if (size > maxSize) {
    return { isValid: true, warning: 'Very large dimension - verify calculator is appropriate for this size', severity: 'warning' };
  }
  
  if (size < 0.001) {
    return { isValid: true, warning: 'Very small dimension - precision may be limited', severity: 'warning' };
  }
  
  return { isValid: true };
};

// Material Calculator Validation
export const validateDimension = (dimension: number, dimensionName: string): ValidationResult => {
  if (dimension < 0) {
    return { isValid: false, warning: `${dimensionName} cannot be negative`, severity: 'error' };
  }
  
  if (dimension === 0) {
    return { isValid: false, warning: `${dimensionName} must be greater than zero`, severity: 'error' };
  }
  
  if (dimension > 1000) {
    return { isValid: true, warning: `Very large ${dimensionName.toLowerCase()} - verify units are correct`, severity: 'warning' };
  }
  
  return { isValid: true };
};

export const validateWallThickness = (thickness: number, outerDimension: number): ValidationResult => {
  if (thickness <= 0) {
    return { isValid: false, warning: 'Wall thickness must be positive', severity: 'error' };
  }
  
  if (thickness >= outerDimension / 2) {
    return { isValid: false, warning: 'Wall thickness must be less than half the outer dimension', severity: 'error' };
  }
  
  if (thickness < outerDimension * 0.05) {
    return { isValid: true, warning: 'Very thin wall - may be difficult to machine without deformation', severity: 'warning' };
  }
  
  return { isValid: true };
};

// Thread Calculator Validation
export const validateThreadEngagement = (engagement: number): ValidationResult => {
  if (engagement <= 0 || engagement > 100) {
    return { isValid: false, warning: 'Thread engagement must be between 0 and 100%', severity: 'error' };
  }
  
  if (engagement < 50) {
    return { isValid: true, warning: 'Low thread engagement - may have reduced strength', severity: 'warning' };
  }
  
  if (engagement > 85) {
    return { isValid: true, warning: 'High thread engagement - may be difficult to tap', severity: 'info' };
  }
  
  return { isValid: true };
};

export const validateThreadPitch = (pitch: number, diameter: number, units: 'imperial' | 'metric'): ValidationResult => {
  if (pitch <= 0) {
    return { isValid: false, warning: 'Thread pitch must be positive', severity: 'error' };
  }
  
  if (units === 'imperial') {
    // TPI validation
    if (pitch > 80) {
      return { isValid: true, warning: 'Very fine thread - may be difficult to manufacture', severity: 'warning' };
    }
    if (pitch < 4) {
      return { isValid: true, warning: 'Very coarse thread - verify this is correct', severity: 'warning' };
    }
  } else {
    // Metric pitch validation
    if (pitch > diameter * 0.3) {
      return { isValid: true, warning: 'Very coarse pitch for this diameter', severity: 'warning' };
    }
    if (pitch < diameter * 0.05) {
      return { isValid: true, warning: 'Very fine pitch for this diameter', severity: 'warning' };
    }
  }
  
  return { isValid: true };
};

export const validateThreadDiameter = (diameter: number, units: 'imperial' | 'metric'): ValidationResult => {
  if (diameter <= 0) {
    return { isValid: false, warning: 'Thread diameter must be positive', severity: 'error' };
  }
  
  if (units === 'imperial') {
    if (diameter < 0.01) {
      return { isValid: true, warning: 'Very small diameter - may be difficult to machine', severity: 'warning' };
    }
    if (diameter > 6) {
      return { isValid: true, warning: 'Very large diameter - verify units are correct', severity: 'warning' };
    }
  } else {
    if (diameter < 0.5) {
      return { isValid: true, warning: 'Very small diameter - may be difficult to machine', severity: 'warning' };
    }
    if (diameter > 150) {
      return { isValid: true, warning: 'Very large diameter - verify units are correct', severity: 'warning' };
    }
  }
  
  return { isValid: true };
};

export const validateTPI = (tpi: number): ValidationResult => {
  if (tpi <= 0) {
    return { isValid: false, warning: 'TPI must be positive', severity: 'error' };
  }
  
  if (tpi > 80) {
    return { isValid: true, warning: 'Very fine thread - may be difficult to manufacture', severity: 'warning' };
  }
  
  if (tpi < 4) {
    return { isValid: true, warning: 'Very coarse thread - verify this is correct', severity: 'warning' };
  }
  
  return { isValid: true };
};

// Temperature validation
export const validateTemperature = (temp: number): ValidationResult => {
  if (Math.abs(temp) > 1000) {
    return { isValid: true, warning: 'Extreme temperature change - verify material properties remain valid', severity: 'warning' };
  }
  
  return { isValid: true };
};

// Material inputs validation helper
export function validateMaterialInputs(
  shape: string,
  length: string,
  width: string,
  height: string,
  diameter: string,
  wallThickness: string,
  flatToFlat?: string,
  legWidth?: string,
  legHeight?: string,
  legThickness?: string,
  flangeWidth?: string,
  flangeThickness?: string,
  webHeight?: string,
  webThickness?: string,
  sheetThickness?: string,
  area?: string,
  innerFilletRadius?: string,
  outerFilletRadius?: string
): Record<string, ValidationResult | undefined> {
  const l = Number.parseFloat(length);
  const w = Number.parseFloat(width);
  const h = Number.parseFloat(height);
  const d = Number.parseFloat(diameter);
  const t = Number.parseFloat(wallThickness);

  const validations: Record<string, ValidationResult | undefined> = {};

  if (length) validations.length = validateDimension(l, 'Length');

  switch (shape) {
    case "rectangle":
      if (width) validations.width = validateDimension(w, 'Width');
      if (height) validations.height = validateDimension(h, 'Height');
      break;

    case "round":
      if (diameter) validations.diameter = validateDimension(d, 'Diameter');
      break;

    case "tube":
      if (diameter) validations.diameter = validateDimension(d, 'Outer Diameter');
      if (wallThickness && diameter) {
        validations.wallThickness = validateWallThickness(t, d);
      }
      break;

    case "square_tube":
      if (width) validations.width = validateDimension(w, 'Outer Size');
      if (wallThickness && width) {
        validations.wallThickness = validateWallThickness(t, w);
      }
      break;

    case "hex":
      const ftf = Number.parseFloat(flatToFlat || "");
      if (flatToFlat) validations.flatToFlat = validateDimension(ftf, 'Flat-to-Flat');
      break;

    case "angle":
      const lw = Number.parseFloat(legWidth || "");
      const lh = Number.parseFloat(legHeight || "");
      const lt = Number.parseFloat(legThickness || "");
      const ifr = Number.parseFloat(innerFilletRadius || "");
      const ofr = Number.parseFloat(outerFilletRadius || "");
      if (legWidth) validations.legWidth = validateDimension(lw, 'Leg Width');
      if (legHeight) validations.legHeight = validateDimension(lh, 'Leg Height');
      if (legThickness) validations.legThickness = validateDimension(lt, 'Leg Thickness');
      if (innerFilletRadius) validations.innerFilletRadius = validateDimension(ifr, 'Inner Fillet Radius');
      if (outerFilletRadius) validations.outerFilletRadius = validateDimension(ofr, 'Outer Fillet Radius');
      break;

    case "channel":
      const fw = Number.parseFloat(flangeWidth || "");
      const wh = Number.parseFloat(webHeight || "");
      const ft = Number.parseFloat(flangeThickness || "");
      const wt = Number.parseFloat(webThickness || "");
      const cifr = Number.parseFloat(innerFilletRadius || "");
      const cofr = Number.parseFloat(outerFilletRadius || "");
      if (flangeWidth) validations.flangeWidth = validateDimension(fw, 'Flange Width');
      if (webHeight) validations.webHeight = validateDimension(wh, 'Web Height');
      if (flangeThickness) validations.flangeThickness = validateDimension(ft, 'Flange Thickness');
      if (webThickness) validations.webThickness = validateDimension(wt, 'Web Thickness');
      if (innerFilletRadius) validations.innerFilletRadius = validateDimension(cifr, 'Inner Fillet Radius');
      if (outerFilletRadius) validations.outerFilletRadius = validateDimension(cofr, 'Outer Fillet Radius');
      break;

    case "ibeam":
      const ifw = Number.parseFloat(flangeWidth || "");
      const iwh = Number.parseFloat(webHeight || "");
      const ift = Number.parseFloat(flangeThickness || "");
      const iwt = Number.parseFloat(webThickness || "");
      const iifr = Number.parseFloat(innerFilletRadius || "");
      const iofr = Number.parseFloat(outerFilletRadius || "");
      if (flangeWidth) validations.flangeWidth = validateDimension(ifw, 'Flange Width');
      if (webHeight) validations.webHeight = validateDimension(iwh, 'Web Height');
      if (flangeThickness) validations.flangeThickness = validateDimension(ift, 'Flange Thickness');
      if (webThickness) validations.webThickness = validateDimension(iwt, 'Web Thickness');
      if (innerFilletRadius) validations.innerFilletRadius = validateDimension(iifr, 'Inner Fillet Radius');
      if (outerFilletRadius) validations.outerFilletRadius = validateDimension(iofr, 'Outer Fillet Radius');
      break;

    case "sheet":
      const sw = Number.parseFloat(width);
      const st = Number.parseFloat(sheetThickness || "");
      if (width) validations.width = validateDimension(sw, 'Width');
      if (sheetThickness) validations.sheetThickness = validateDimension(st, 'Thickness');
      break;
  }

  return validations;
}


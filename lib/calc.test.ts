/**
 * Test file for unit conversion calculations
 * Verifies that the Material Calculator unit fixes work correctly
 */

import { describe, it, expect } from 'vitest';
import { calculateWeightWithUnits } from './calc';

describe('Material Calculator Unit Conversions', () => {
  it('should calculate weight correctly for imperial units', () => {
    // Test case: 1 in³ of steel (density = 0.284 lb/in³)
    const volume = 1; // 1 in³
    const density = 0.284; // lb/in³
    const result = calculateWeightWithUnits(volume, density, 'imperial');
    
    expect(result).not.toBeNull();
    expect(result!.weight).toBeCloseTo(0.284, 3); // Should be 0.284 lb
    expect(result!.weightKg).toBeCloseTo(0.1288, 3); // Should be ~0.1288 kg
  });

  it('should calculate weight correctly for metric units', () => {
    // Test case: 1 mm³ of steel (density = 0.284 lb/in³)
    // 1 mm³ = (1/25.4)³ in³ = 0.000061 in³
    const volume = 1; // 1 mm³
    const density = 0.284; // lb/in³
    const result = calculateWeightWithUnits(volume, density, 'metric');
    
    expect(result).not.toBeNull();
    // Expected: 1 mm³ = 0.000061 in³, weight = 0.000061 × 0.284 = 0.000017 lb
    // Convert to kg: 0.000017 × 0.453592 = 0.0000077 kg
    expect(result!.weight).toBeCloseTo(0.0000077, 6);
    expect(result!.weightKg).toBeCloseTo(0.0000077, 6);
  });

  it('should handle larger metric volumes correctly', () => {
    // Test case: 1000 mm³ (1 cm³) of steel
    const volume = 1000; // 1000 mm³
    const density = 0.284; // lb/in³
    const result = calculateWeightWithUnits(volume, density, 'metric');
    
    expect(result).not.toBeNull();
    // Expected: 1000 mm³ = 1000 × (1/25.4)³ in³ = 0.061 in³
    // Weight = 0.061 × 0.284 = 0.0173 lb = 0.00785 kg
    expect(result!.weight).toBeCloseTo(0.00785, 4);
    expect(result!.weightKg).toBeCloseTo(0.00785, 4);
  });

  it('should maintain consistency between unit systems', () => {
    // Test the same physical volume in both systems
    const imperialVolume = 1; // 1 in³
    const metricVolume = Math.pow(25.4, 3); // 1 in³ = 16387.064 mm³
    const density = 0.284; // lb/in³
    
    const imperialResult = calculateWeightWithUnits(imperialVolume, density, 'imperial');
    const metricResult = calculateWeightWithUnits(metricVolume, density, 'metric');
    
    expect(imperialResult).not.toBeNull();
    expect(metricResult).not.toBeNull();
    
    // Both should give the same weight in kg
    expect(imperialResult!.weightKg).toBeCloseTo(metricResult!.weightKg, 3);
  });
});
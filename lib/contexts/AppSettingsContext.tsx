"use client";

import React, { createContext, useContext, useCallback, useEffect } from 'react';
import { useLocalStorage } from '@/lib/hooks/useLocalStorage';

// ============================================================================
// TYPES
// ============================================================================

export type UnitSystem = 'imperial' | 'metric';
export type PrecisionLevel = 2 | 3 | 4 | 5 | 6;

export interface AppSettings {
  unitSystem: UnitSystem;
  precision: PrecisionLevel;
  showAltUnits: boolean;
  altUnitPrecision: PrecisionLevel;
}

export interface FormattedValue {
  primary: string;
  alternative?: string;
  unit: string;
  altUnit?: string;
}

// ============================================================================
// CONTEXT
// ============================================================================

interface AppSettingsContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  formatValue: (value: number, unitType: 'length' | 'weight' | 'volume' | 'area' | 'density' | 'speed' | 'rpm' | 'feed' | 'torque' | 'pressure' | 'temperature' | 'angle') => FormattedValue;
  formatNumber: (value: number, precision?: PrecisionLevel) => string;
  getUnitString: (unitType: 'length' | 'weight' | 'volume' | 'area' | 'density' | 'speed' | 'rpm' | 'feed' | 'torque' | 'pressure' | 'temperature' | 'angle', system?: UnitSystem) => string;
  convertValue: (value: number, fromSystem: UnitSystem, toSystem: UnitSystem, unitType: 'length' | 'weight' | 'volume' | 'area' | 'density' | 'speed' | 'rpm' | 'feed' | 'torque' | 'pressure' | 'temperature' | 'angle') => number;
}

const AppSettingsContext = createContext<AppSettingsContextType | undefined>(undefined);

// ============================================================================
// PROVIDER
// ============================================================================

const defaultSettings: AppSettings = {
  unitSystem: 'imperial',
  precision: 3,
  showAltUnits: true,
  altUnitPrecision: 2,
};

export function AppSettingsProvider({ children }: { children: React.ReactNode }) {
  const { value: settings, setValue: setSettings, isHydrated } = useLocalStorage('app_settings', defaultSettings);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  }, [setSettings]);

  // ============================================================================
  // UNIT CONVERSION FUNCTIONS
  // ============================================================================

  const convertLength = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    return fromSystem === 'imperial' ? value * 25.4 : value / 25.4;
  }, []);

  const convertWeight = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    return fromSystem === 'imperial' ? value * 0.453592 : value / 0.453592;
  }, []);

  const convertVolume = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    const factor = fromSystem === 'imperial' ? Math.pow(25.4, 3) : Math.pow(1/25.4, 3);
    return value * factor;
  }, []);

  const convertArea = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    const factor = fromSystem === 'imperial' ? Math.pow(25.4, 2) : Math.pow(1/25.4, 2);
    return value * factor;
  }, []);

  const convertDensity = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    // lb/in³ to kg/mm³
    return fromSystem === 'imperial' ? value * 0.453592 / Math.pow(25.4, 3) : value / (0.453592 / Math.pow(25.4, 3));
  }, []);

  const convertSpeed = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    // SFM to m/min
    return fromSystem === 'imperial' ? value * 0.3048 : value / 0.3048;
  }, []);

  const convertPressure = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    // psi to MPa
    return fromSystem === 'imperial' ? value * 0.00689476 : value / 0.00689476;
  }, []);

  const convertTemperature = useCallback((value: number, fromSystem: UnitSystem, toSystem: UnitSystem): number => {
    if (fromSystem === toSystem) return value;
    // °F to °C
    return fromSystem === 'imperial' ? (value - 32) * 5/9 : value * 9/5 + 32;
  }, []);

  // ============================================================================
  // CONVERSION DISPATCHER
  // ============================================================================

  const convertValue = useCallback((
    value: number, 
    fromSystem: UnitSystem, 
    toSystem: UnitSystem, 
    unitType: 'length' | 'weight' | 'volume' | 'area' | 'density' | 'speed' | 'rpm' | 'feed' | 'torque' | 'pressure' | 'temperature' | 'angle'
  ): number => {
    if (fromSystem === toSystem) return value;

    switch (unitType) {
      case 'length':
        return convertLength(value, fromSystem, toSystem);
      case 'weight':
        return convertWeight(value, fromSystem, toSystem);
      case 'volume':
        return convertVolume(value, fromSystem, toSystem);
      case 'area':
        return convertArea(value, fromSystem, toSystem);
      case 'density':
        return convertDensity(value, fromSystem, toSystem);
      case 'speed':
        return convertSpeed(value, fromSystem, toSystem);
      case 'pressure':
        return convertPressure(value, fromSystem, toSystem);
      case 'temperature':
        return convertTemperature(value, fromSystem, toSystem);
      case 'rpm':
      case 'feed':
      case 'torque':
      case 'angle':
        // These don't need conversion or use different logic
        return value;
      default:
        return value;
    }
  }, [convertLength, convertWeight, convertVolume, convertArea, convertDensity, convertSpeed, convertPressure, convertTemperature]);

  // ============================================================================
  // UNIT STRING GETTERS
  // ============================================================================

  const getUnitString = useCallback((
    unitType: 'length' | 'weight' | 'volume' | 'area' | 'density' | 'speed' | 'rpm' | 'feed' | 'torque' | 'pressure' | 'temperature' | 'angle',
    system?: UnitSystem
  ): string => {
    const targetSystem = system ?? settings.unitSystem;

    switch (unitType) {
      case 'length':
        return targetSystem === 'imperial' ? 'in' : 'mm';
      case 'weight':
        return targetSystem === 'imperial' ? 'lb' : 'kg';
      case 'volume':
        return targetSystem === 'imperial' ? 'in³' : 'mm³';
      case 'area':
        return targetSystem === 'imperial' ? 'in²' : 'mm²';
      case 'density':
        return targetSystem === 'imperial' ? 'lb/in³' : 'kg/mm³';
      case 'speed':
        return targetSystem === 'imperial' ? 'SFM' : 'm/min';
      case 'rpm':
        return 'RPM';
      case 'feed':
        return targetSystem === 'imperial' ? 'in/min' : 'mm/min';
      case 'torque':
        return targetSystem === 'imperial' ? 'lb⋅ft' : 'N⋅m';
      case 'pressure':
        return targetSystem === 'imperial' ? 'psi' : 'MPa';
      case 'temperature':
        return targetSystem === 'imperial' ? '°F' : '°C';
      case 'angle':
        return '°';
      default:
        return '';
    }
  }, [settings.unitSystem]);

  // ============================================================================
  // FORMATTING FUNCTIONS
  // ============================================================================

  const formatNumber = useCallback((value: number, precision?: PrecisionLevel): string => {
    const targetPrecision = precision ?? settings.precision;
    return value.toFixed(targetPrecision);
  }, [settings.precision]);

  const formatValue = useCallback((
    value: number, 
    unitType: 'length' | 'weight' | 'volume' | 'area' | 'density' | 'speed' | 'rpm' | 'feed' | 'torque' | 'pressure' | 'temperature' | 'angle'
  ): FormattedValue => {
    const primaryValue = formatNumber(value);
    const primaryUnit = getUnitString(unitType, settings.unitSystem);

    if (!settings.showAltUnits) {
      return {
        primary: primaryValue,
        unit: primaryUnit,
      };
    }

    const altSystem: UnitSystem = settings.unitSystem === 'imperial' ? 'metric' : 'imperial';
    const altValue = convertValue(value, settings.unitSystem, altSystem, unitType);
    const altValueFormatted = formatNumber(altValue, settings.altUnitPrecision);
    const altUnit = getUnitString(unitType, altSystem);

    return {
      primary: primaryValue,
      alternative: altValueFormatted,
      unit: primaryUnit,
      altUnit: altUnit,
    };
  }, [settings, formatNumber, getUnitString, convertValue]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: AppSettingsContextType = {
    settings,
    updateSettings,
    formatValue,
    formatNumber,
    getUnitString,
    convertValue,
  };

  return (
    <AppSettingsContext.Provider value={contextValue}>
      {children}
    </AppSettingsContext.Provider>
  );
}

// ============================================================================
// HOOK
// ============================================================================

export function useAppSettings(): AppSettingsContextType {
  const context = useContext(AppSettingsContext);
  if (context === undefined) {
    throw new Error('useAppSettings must be used within an AppSettingsProvider');
  }
  return context;
}



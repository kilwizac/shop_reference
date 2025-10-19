"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard } from "@/components/ResultCard";
import { ShareButton } from "@/components/ShareButton";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useAppSettings } from "@/lib/contexts/AppSettingsContext";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import { useNamespacedStorage } from "@/lib/hooks/useLocalStorage";
import {
  validateDimension,
  validateTemperature,
} from "@/lib/utils/validation";
import {
  calculateVolume,
  calculateSurfaceArea,
  calculateSectionProperties,
  materials,
  validateMaterialInputs,
  calculateWeightWithUnits,
} from "@/lib/calc";
import { lbPerIn3ToKgPerMm3 } from "@/lib/utils/units";

export default function MaterialCalculatorClient() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const { formatValue, settings } = useAppSettings();

  // Helper function to safely get material
  const getMaterial = (materialType: string) => {
    if (!materials || !materialType) return null;
    return materials[materialType as keyof typeof materials] || null;
  };


  // Persistent preferences
  const { state: prefs, updateState: updatePrefs, isHydrated } = useNamespacedStorage(
    "materialCalc_prefs",
    {
      activeTab: "weight",
      // Weight Calculator State
      materialType: "steel_1018",
      shape: "rectangle",
      length: "",
      width: "",
      height: "",
      diameter: "",
      wallThickness: "",
      // New shape parameters
      flatToFlat: "",
      legWidth: "",
      legHeight: "",
      legThickness: "",
      flangeWidth: "",
      flangeThickness: "",
      webHeight: "",
      webThickness: "",
      sheetThickness: "",
      sheetArea: "",
      innerFilletRadius: "",
      outerFilletRadius: "",
      // Thermal Expansion State
      thermalMaterial: "steel_1018",
      originalLength: "",
      tempChange: "",
    }
  );

  // URL params for sharing
  const urlParams = useUrlParams(prefs, "mc");

  // Load from URL on mount
  useEffect(() => {
    if (isHydrated && !urlParams.isInitialized) {
      const urlState = urlParams.getStateFromUrl();
      if (Object.keys(urlState).length > 0) {
        updatePrefs(urlState);
      }
      urlParams.setIsInitialized(true);
    }
  }, [isHydrated]);

  // Update URL when state changes
  useEffect(() => {
    if (isHydrated && urlParams.isInitialized) {
      urlParams.updateUrl(prefs);
    }
  }, [prefs, isHydrated, urlParams.isInitialized]);

  // Calculate weight
  const calculateWeight = () => {
    const l = Number.parseFloat(prefs.length);
    const w = Number.parseFloat(prefs.width);
    const h = Number.parseFloat(prefs.height);
    const d = Number.parseFloat(prefs.diameter);
    const t = Number.parseFloat(prefs.wallThickness);
    const ftf = Number.parseFloat(prefs.flatToFlat);
    const lw = Number.parseFloat(prefs.legWidth);
    const lh = Number.parseFloat(prefs.legHeight);
    const lt = Number.parseFloat(prefs.legThickness);
    const fw = Number.parseFloat(prefs.flangeWidth);
    const ft = Number.parseFloat(prefs.flangeThickness);
    const wh = Number.parseFloat(prefs.webHeight);
    const wt = Number.parseFloat(prefs.webThickness);
    const st = Number.parseFloat(prefs.sheetThickness);
    const ifr = Number.parseFloat(prefs.innerFilletRadius);
    const ofr = Number.parseFloat(prefs.outerFilletRadius);
    
    const volume = calculateVolume(
      prefs.shape, l, w, h, d, t, ftf, lw, lh, lt, fw, ft, wh, wt, st, ifr, ofr
    );
    if (!volume) return null;

    const material = getMaterial(prefs.materialType);
    
    if (!material) {
      return null;
    }
    
    // Use the new unit-aware calculation
    const weightResult = calculateWeightWithUnits(
      volume,
      material.density,
      settings.unitSystem
    );
    
    if (!weightResult) return null;

    return {
      volume: weightResult.volume,
      weight: weightResult.weight,
      weightKg: weightResult.weightKg,
      density: weightResult.density,
      surfaceArea: calculateSurfaceArea(prefs.shape, l, w, h, d, t, ftf, lw, lh, lt, fw, ft, wh, wt, st, ifr, ofr)
    };
  };

  // Calculate thermal expansion
  const calculateThermalExpansion = () => {
    const L0 = Number.parseFloat(prefs.originalLength);
    const dT = Number.parseFloat(prefs.tempChange);

    if (!L0 || !dT) return null;

    const material = getMaterial(prefs.thermalMaterial);
    
    if (!material) {
      return null;
    }
    
    const alpha = material.expansion * 1e-6;
    const deltaL = L0 * alpha * dT;
    const finalLength = L0 + deltaL;

    return {
      expansion: Math.abs(deltaL),
      finalLength,
      coefficient: material.expansion
    };
  };

  // Calculate section properties
  const getSectionProperties = () => {
    const w = Number.parseFloat(prefs.width);
    const h = Number.parseFloat(prefs.height);
    const d = Number.parseFloat(prefs.diameter);
    const t = Number.parseFloat(prefs.wallThickness);
    const ftf = Number.parseFloat(prefs.flatToFlat);
    const lw = Number.parseFloat(prefs.legWidth);
    const lh = Number.parseFloat(prefs.legHeight);
    const lt = Number.parseFloat(prefs.legThickness);
    const fw = Number.parseFloat(prefs.flangeWidth);
    const ft = Number.parseFloat(prefs.flangeThickness);
    const wh = Number.parseFloat(prefs.webHeight);
    const wt = Number.parseFloat(prefs.webThickness);
    const st = Number.parseFloat(prefs.sheetThickness);
    const ifr = Number.parseFloat(prefs.innerFilletRadius);
    const ofr = Number.parseFloat(prefs.outerFilletRadius);

    return calculateSectionProperties(
      prefs.shape, w, h, d, t, ftf, lw, lh, lt, fw, ft, wh, wt, st, ifr, ofr
    );
  };

  const weightResults = calculateWeight();
  const thermalResults = calculateThermalExpansion();
  const sectionProps = getSectionProperties();

  // Validations
  const validations = validateMaterialInputs(
    prefs.shape,
    prefs.length,
    prefs.width,
    prefs.height,
    prefs.diameter,
    prefs.wallThickness,
    prefs.flatToFlat,
    prefs.legWidth,
    prefs.legHeight,
    prefs.legThickness,
    prefs.flangeWidth,
    prefs.flangeThickness,
    prefs.webHeight,
    prefs.webThickness,
    prefs.sheetThickness,
    undefined, // area parameter
    prefs.innerFilletRadius,
    prefs.outerFilletRadius
  );

  const tempValidation = prefs.tempChange 
    ? validateTemperature(Number.parseFloat(prefs.tempChange))
    : undefined;

  const originalLengthValidation = prefs.originalLength
    ? validateDimension(Number.parseFloat(prefs.originalLength), 'Length')
    : undefined;

  if (!isHydrated) {
    return <div className="min-h-screen bg-white dark:bg-black" />;
  }

  // Safety check for materials object
  if (!materials || Object.keys(materials).length === 0) {
    return <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">Loading Materials...</h2>
        <p className="text-gray-600 dark:text-gray-400">Please wait while materials are being loaded.</p>
      </div>
    </div>;
  }

  // Helper to render shape-specific inputs
  const renderShapeInputs = () => {
    switch (prefs.shape) {
      case "rectangle":
        return (
          <>
            <NumberInput
              label={`WIDTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.width}
              onChange={(value) => updatePrefs({ width: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="2"
              validation={validations.width}
            />
            <div className="md:col-span-2">
              <NumberInput
                label={`HEIGHT (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
                value={prefs.height}
                onChange={(value) => updatePrefs({ height: value })}
                step={0.1}
                unit={settings.unitSystem === "imperial" ? "in" : "mm"}
                placeholder="1"
                validation={validations.height}
              />
            </div>
          </>
        );

      case "round":
        return (
          <div className="md:col-span-2">
            <NumberInput
              label={`DIAMETER (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.diameter}
              onChange={(value) => updatePrefs({ diameter: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="1.5"
              validation={validations.diameter}
            />
          </div>
        );

      case "tube":
        return (
          <>
            <NumberInput
              label={`OUTER DIAMETER (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.diameter}
              onChange={(value) => updatePrefs({ diameter: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="2"
              validation={validations.diameter}
            />
            <NumberInput
              label={`WALL THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.wallThickness}
              onChange={(value) => updatePrefs({ wallThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.wallThickness}
            />
          </>
        );

      case "square_tube":
        return (
          <>
            <NumberInput
              label={`OUTER WIDTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.width}
              onChange={(value) => updatePrefs({ width: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="2"
              validation={validations.width}
            />
            <NumberInput
              label={`WALL THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.wallThickness}
              onChange={(value) => updatePrefs({ wallThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.wallThickness}
            />
          </>
        );

      case "hex":
        return (
          <div className="md:col-span-2">
            <NumberInput
              label={`FLAT-TO-FLAT (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.flatToFlat}
              onChange={(value) => updatePrefs({ flatToFlat: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="1"
              validation={validations.flatToFlat}
            />
          </div>
        );

      case "angle":
        return (
          <>
            <NumberInput
              label={`LEG WIDTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.legWidth}
              onChange={(value) => updatePrefs({ legWidth: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="2"
              validation={validations.legWidth}
            />
            <NumberInput
              label={`LEG HEIGHT (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.legHeight}
              onChange={(value) => updatePrefs({ legHeight: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="2"
              validation={validations.legHeight}
            />
            <NumberInput
              label={`LEG THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.legThickness}
              onChange={(value) => updatePrefs({ legThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.25"
              validation={validations.legThickness}
            />
            <NumberInput
              label={`INNER FILLET RADIUS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.innerFilletRadius}
              onChange={(value) => updatePrefs({ innerFilletRadius: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.innerFilletRadius}
            />
            <NumberInput
              label={`OUTER FILLET RADIUS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.outerFilletRadius}
              onChange={(value) => updatePrefs({ outerFilletRadius: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.outerFilletRadius}
            />
          </>
        );

      case "channel":
        return (
          <>
            <NumberInput
              label={`FLANGE WIDTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.flangeWidth}
              onChange={(value) => updatePrefs({ flangeWidth: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="3"
              validation={validations.flangeWidth}
            />
            <NumberInput
              label={`WEB HEIGHT (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.webHeight}
              onChange={(value) => updatePrefs({ webHeight: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="6"
              validation={validations.webHeight}
            />
            <NumberInput
              label={`FLANGE THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.flangeThickness}
              onChange={(value) => updatePrefs({ flangeThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.25"
              validation={validations.flangeThickness}
            />
            <NumberInput
              label={`WEB THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.webThickness}
              onChange={(value) => updatePrefs({ webThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.25"
              validation={validations.webThickness}
            />
            <NumberInput
              label={`INNER FILLET RADIUS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.innerFilletRadius}
              onChange={(value) => updatePrefs({ innerFilletRadius: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.innerFilletRadius}
            />
            <NumberInput
              label={`OUTER FILLET RADIUS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.outerFilletRadius}
              onChange={(value) => updatePrefs({ outerFilletRadius: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.outerFilletRadius}
            />
          </>
        );

      case "ibeam":
        return (
          <>
            <NumberInput
              label={`FLANGE WIDTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.flangeWidth}
              onChange={(value) => updatePrefs({ flangeWidth: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="4"
              validation={validations.flangeWidth}
            />
            <NumberInput
              label={`WEB HEIGHT (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.webHeight}
              onChange={(value) => updatePrefs({ webHeight: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="8"
              validation={validations.webHeight}
            />
            <NumberInput
              label={`FLANGE THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.flangeThickness}
              onChange={(value) => updatePrefs({ flangeThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.375"
              validation={validations.flangeThickness}
            />
            <NumberInput
              label={`WEB THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.webThickness}
              onChange={(value) => updatePrefs({ webThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.25"
              validation={validations.webThickness}
            />
            <NumberInput
              label={`INNER FILLET RADIUS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.innerFilletRadius}
              onChange={(value) => updatePrefs({ innerFilletRadius: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.25"
              validation={validations.innerFilletRadius}
            />
            <NumberInput
              label={`OUTER FILLET RADIUS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.outerFilletRadius}
              onChange={(value) => updatePrefs({ outerFilletRadius: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.25"
              validation={validations.outerFilletRadius}
            />
          </>
        );

      case "sheet":
        return (
          <>
            <NumberInput
              label={`WIDTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.width}
              onChange={(value) => updatePrefs({ width: value })}
              step={0.1}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="12"
              validation={validations.width}
            />
            <NumberInput
              label={`THICKNESS (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
              value={prefs.sheetThickness}
              onChange={(value) => updatePrefs({ sheetThickness: value })}
              step={0.01}
              unit={settings.unitSystem === "imperial" ? "in" : "mm"}
              placeholder="0.125"
              validation={validations.sheetThickness}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold hover:opacity-60 transition-opacity"
            >
              SpecFoundry
            </Link>
            <div className="flex gap-8 items-center">
              <div className="relative">
                <button
                  onClick={() => {
                    const newState = !isReferencesOpen;
                    setIsReferencesOpen(newState);
                    if (newState) {
                      setIsCalculatorsOpen(false);
                    }
                  }}
                  className="hover:opacity-60 transition-opacity text-sm flex items-center gap-1"
                >
                  References
                  <span className="text-xs">
                    {isReferencesOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isReferencesOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-50">
                    <Link
                      href="/tolerances"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                      onClick={() => setIsReferencesOpen(false)}
                    >
                      Tolerances
                    </Link>
                    <Link
                      href="/materials"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                      onClick={() => setIsReferencesOpen(false)}
                    >
                      Materials
                    </Link>
                    <Link
                      href="/processes"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                      onClick={() => setIsReferencesOpen(false)}
                    >
                      Processes
                    </Link>
                    <Link
                      href="/standards"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
                      onClick={() => setIsReferencesOpen(false)}
                    >
                      Standards
                    </Link>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    const newState = !isCalculatorsOpen;
                    setIsCalculatorsOpen(newState);
                    if (newState) {
                      setIsReferencesOpen(false);
                    }
                  }}
                  className="hover:opacity-60 transition-opacity text-sm flex items-center gap-1"
                >
                  Calculators
                  <span className="text-xs">
                    {isCalculatorsOpen ? "▲" : "▼"}
                  </span>
                </button>
                {isCalculatorsOpen && (
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-50">
                  <Link
                    href="/thread-calculator"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Thread Calculator
                    </Link>
                    <Link
                      href="/tolerance-calculator"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Tolerance Calculator
                    </Link>
                    <Link
                      href="/material-calculator"
                      className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
                      onClick={() => setIsCalculatorsOpen(false)}
                    >
                      Material Calculator
                    </Link>
                  </div>
                )}
              </div>
              <Link
                href="/about"
                className="hover:opacity-60 transition-opacity text-sm"
              >
                About
              </Link>
              <Link
                href="/material-compare"
                className="hover:opacity-60 transition-opacity text-sm"
              >
                Material Compare
              </Link>
              <SettingsPanel />
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2 tracking-wider">
            CALC-004 | REV B | MATERIAL CALCULATOR
          </div>
          <h1 className="text-4xl font-bold mb-3">Material Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate weights, volumes, thermal expansion, and section properties
          </p>
        </div>
      </section>

      {/* Units Toggle & Share */}
      <section className="border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <ShareButton getShareUrl={() => urlParams.getShareableUrl(prefs)} />
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => updatePrefs({ activeTab: "weight" })}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                prefs.activeTab === "weight"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Weight Calculator
            </button>
            <button
              onClick={() => updatePrefs({ activeTab: "section" })}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                prefs.activeTab === "section"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Section Properties
            </button>
            <button
              onClick={() => updatePrefs({ activeTab: "thermal" })}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                prefs.activeTab === "thermal"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Thermal Expansion
            </button>
            <button
              onClick={() => updatePrefs({ activeTab: "reference" })}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                prefs.activeTab === "reference"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Material Reference
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Weight Calculator */}
          {prefs.activeTab === "weight" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Input Parameters
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        MATERIAL
                      </label>
                      <select
                        value={prefs.materialType}
                        onChange={(e) => updatePrefs({ materialType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        {Object.entries(materials).map(([key, mat]) => (
                          <option key={key} value={key}>{mat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        SHAPE
                      </label>
                      <select
                        value={prefs.shape}
                        onChange={(e) => updatePrefs({ shape: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <optgroup label="Basic Shapes">
                        <option value="rectangle">Rectangle/Bar</option>
                        <option value="round">Round Bar</option>
                        <option value="tube">Round Tube</option>
                        <option value="square_tube">Square Tube</option>
                          <option value="hex">Hex Bar</option>
                        </optgroup>
                        <optgroup label="Structural Shapes">
                          <option value="angle">Angle (L)</option>
                          <option value="channel">Channel (C)</option>
                          <option value="ibeam">I-Beam</option>
                        </optgroup>
                        <optgroup label="Sheet/Plate">
                          <option value="sheet">Sheet/Plate</option>
                        </optgroup>
                      </select>
                    </div>

                    <NumberInput
                      label={`LENGTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
                      value={prefs.length}
                      onChange={(value) => updatePrefs({ length: value })}
                      step={0.1}
                      unit={settings.unitSystem === "imperial" ? "in" : "mm"}
                        placeholder="12"
                      validation={validations.length}
                      />

                    {renderShapeInputs()}
                    </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">MATERIAL DENSITY:</h3>
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {(() => {
                        const material = getMaterial(prefs.materialType);
                        if (!material) {
                          return 'Material not found';
                        }
                        return settings.unitSystem === "imperial" 
                          ? `${material.density} lb/in³`
                          : `${lbPerIn3ToKgPerMm3(material.density).toFixed(6)} kg/mm³`;
                      })()}
                        </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  {weightResults && (
                    <ResultCard
                      title="Weight Calculation"
                      calculatorName="Material Calculator - Weight"
                      inputs={[
                        { label: "Material", value: getMaterial(prefs.materialType)?.name || 'Unknown' },
                        { label: "Shape", value: prefs.shape.replace('_', ' ') },
                        { 
                          label: "Length", 
                          value: prefs.length, 
                          unit: settings.unitSystem === "imperial" ? "in" : "mm",
                          altValue: prefs.length ? formatValue(parseFloat(prefs.length), 'length').alternative : undefined,
                          altUnit: settings.unitSystem === "imperial" ? "mm" : "in"
                        },
                      ]}
                      outputs={[
                        { 
                          label: "Weight", 
                          value: formatValue(weightResults.weight, 'weight').primary, 
                          unit: formatValue(weightResults.weight, 'weight').unit,
                          altValue: formatValue(weightResults.weight, 'weight').alternative,
                          altUnit: formatValue(weightResults.weight, 'weight').altUnit
                        },
                        { 
                          label: "Volume", 
                          value: formatValue(weightResults.volume, 'volume').primary, 
                          unit: formatValue(weightResults.volume, 'volume').unit,
                          altValue: formatValue(weightResults.volume, 'volume').alternative,
                          altUnit: formatValue(weightResults.volume, 'volume').altUnit
                        },
                        { 
                          label: "Surface Area", 
                          value: formatValue(weightResults.surfaceArea || 0, 'area').primary, 
                          unit: formatValue(weightResults.surfaceArea || 0, 'area').unit,
                          altValue: formatValue(weightResults.surfaceArea || 0, 'area').alternative,
                          altUnit: formatValue(weightResults.surfaceArea || 0, 'area').altUnit
                        },
                      ]}
                    />
                  )}

                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      WEIGHT
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {weightResults ? formatValue(weightResults.weight, 'weight').primary : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">
                      {formatValue(weightResults?.weight || 0, 'weight').unit.toUpperCase()}
                    </div>
                    {settings.showAltUnits && weightResults && (
                      <div className="text-xs opacity-60 mt-1">
                        {formatValue(weightResults.weight, 'weight').alternative} {formatValue(weightResults.weight, 'weight').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      VOLUME
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {weightResults ? formatValue(weightResults.volume, 'volume').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(weightResults?.volume || 0, 'volume').unit}
                    </div>
                    {settings.showAltUnits && weightResults && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(weightResults.volume, 'volume').alternative} {formatValue(weightResults.volume, 'volume').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      ALT WEIGHT
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {weightResults ? weightResults.weightKg.toFixed(2) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {settings.unitSystem === "imperial" ? "kg" : "lb"}
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      SURFACE AREA
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {weightResults ? formatValue(weightResults.surfaceArea || 0, 'area').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(weightResults?.surfaceArea || 0, 'area').unit}
                    </div>
                    {settings.showAltUnits && weightResults && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(weightResults.surfaceArea || 0, 'area').alternative} {formatValue(weightResults.surfaceArea || 0, 'area').altUnit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section Properties Tab */}
          {prefs.activeTab === "section" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Section Properties Input
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        SHAPE
                      </label>
                      <select
                        value={prefs.shape}
                        onChange={(e) => updatePrefs({ shape: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <optgroup label="Basic Shapes">
                          <option value="rectangle">Rectangle/Bar</option>
                          <option value="round">Round Bar</option>
                          <option value="tube">Round Tube</option>
                          <option value="square_tube">Square Tube</option>
                          <option value="hex">Hex Bar</option>
                        </optgroup>
                        <optgroup label="Structural Shapes">
                          <option value="angle">Angle (L)</option>
                          <option value="channel">Channel (C)</option>
                          <option value="ibeam">I-Beam</option>
                        </optgroup>
                        <optgroup label="Sheet/Plate">
                          <option value="sheet">Sheet/Plate</option>
                        </optgroup>
                      </select>
                    </div>

                    {renderShapeInputs()}
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">SECTION PROPERTIES:</h3>
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      Calculates area, moment of inertia, section modulus, and radius of gyration
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  {sectionProps && (
                    <ResultCard
                      title="Section Properties"
                      calculatorName="Material Calculator - Section Properties"
                      inputs={[
                        { label: "Shape", value: prefs.shape.replace('_', ' ') },
                        { 
                          label: "Dimensions", 
                          value: `${prefs.width || prefs.diameter || '---'} × ${prefs.height || prefs.flatToFlat || '---'}`,
                          unit: settings.unitSystem === "imperial" ? "in" : "mm"
                        },
                      ]}
                      outputs={[
                        { 
                          label: "Area", 
                          value: formatValue(sectionProps.area, 'area').primary, 
                          unit: formatValue(sectionProps.area, 'area').unit,
                          altValue: formatValue(sectionProps.area, 'area').alternative,
                          altUnit: formatValue(sectionProps.area, 'area').altUnit
                        },
                        { 
                          label: "Ixx", 
                          value: formatValue(sectionProps.Ixx, 'area').primary, 
                          unit: formatValue(sectionProps.Ixx, 'area').unit,
                          altValue: formatValue(sectionProps.Ixx, 'area').alternative,
                          altUnit: formatValue(sectionProps.Ixx, 'area').altUnit
                        },
                        { 
                          label: "Iyy", 
                          value: formatValue(sectionProps.Iyy, 'area').primary, 
                          unit: formatValue(sectionProps.Iyy, 'area').unit,
                          altValue: formatValue(sectionProps.Iyy, 'area').alternative,
                          altUnit: formatValue(sectionProps.Iyy, 'area').altUnit
                        },
                      ]}
                    />
                  )}

                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      AREA
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {sectionProps ? formatValue(sectionProps.area, 'area').primary : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">
                      {formatValue(sectionProps?.area || 0, 'area').unit.toUpperCase()}
                    </div>
                    {settings.showAltUnits && sectionProps && (
                      <div className="text-xs opacity-60 mt-1">
                        {formatValue(sectionProps.area, 'area').alternative} {formatValue(sectionProps.area, 'area').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      Ixx (MOMENT OF INERTIA)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {sectionProps ? formatValue(sectionProps.Ixx, 'area').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(sectionProps?.Ixx || 0, 'area').unit}
                    </div>
                    {settings.showAltUnits && sectionProps && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(sectionProps.Ixx, 'area').alternative} {formatValue(sectionProps.Ixx, 'area').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      Iyy (MOMENT OF INERTIA)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {sectionProps ? formatValue(sectionProps.Iyy, 'area').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(sectionProps?.Iyy || 0, 'area').unit}
                    </div>
                    {settings.showAltUnits && sectionProps && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(sectionProps.Iyy, 'area').alternative} {formatValue(sectionProps.Iyy, 'area').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      Zxx (SECTION MODULUS)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {sectionProps ? formatValue(sectionProps.Zxx, 'area').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(sectionProps?.Zxx || 0, 'area').unit}
                    </div>
                    {settings.showAltUnits && sectionProps && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(sectionProps.Zxx, 'area').alternative} {formatValue(sectionProps.Zxx, 'area').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      Zyy (SECTION MODULUS)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {sectionProps ? formatValue(sectionProps.Zyy, 'area').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(sectionProps?.Zyy || 0, 'area').unit}
                    </div>
                    {settings.showAltUnits && sectionProps && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(sectionProps.Zyy, 'area').alternative} {formatValue(sectionProps.Zyy, 'area').altUnit}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Thermal Expansion Tab */}
          {prefs.activeTab === "thermal" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Thermal Expansion Input
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        MATERIAL
                      </label>
                      <select
                        value={prefs.thermalMaterial}
                        onChange={(e) => updatePrefs({ thermalMaterial: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        {Object.entries(materials).map(([key, mat]) => (
                          <option key={key} value={key}>{mat.name}</option>
                        ))}
                      </select>
                    </div>

                    <NumberInput
                      label={`ORIGINAL LENGTH (${settings.unitSystem === "imperial" ? "IN" : "MM"})`}
                      value={prefs.originalLength}
                      onChange={(value) => updatePrefs({ originalLength: value })}
                      step={0.1}
                      unit={settings.unitSystem === "imperial" ? "in" : "mm"}
                      placeholder="12"
                      validation={originalLengthValidation}
                    />

                    <NumberInput
                      label="TEMPERATURE CHANGE (°F)"
                      value={prefs.tempChange}
                      onChange={(value) => updatePrefs({ tempChange: value })}
                      step={1}
                      unit="°F"
                      placeholder="100"
                      validation={tempValidation}
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">THERMAL EXPANSION COEFFICIENT:</h3>
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-400">
                      {(() => {
                        const material = getMaterial(prefs.thermalMaterial);
                        if (!material) {
                          return 'Material not found';
                        }
                        return `${material.expansion} ×10⁻⁶ in/in/°F`;
                      })()}
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  {thermalResults && (
                    <ResultCard
                      title="Thermal Expansion"
                      calculatorName="Material Calculator - Thermal Expansion"
                      inputs={[
                        { label: "Material", value: getMaterial(prefs.thermalMaterial)?.name || 'Unknown' },
                        { 
                          label: "Original Length", 
                          value: prefs.originalLength, 
                          unit: settings.unitSystem === "imperial" ? "in" : "mm",
                          altValue: prefs.originalLength ? formatValue(parseFloat(prefs.originalLength), 'length').alternative : undefined,
                          altUnit: settings.unitSystem === "imperial" ? "mm" : "in"
                        },
                        { 
                          label: "Temperature Change", 
                          value: prefs.tempChange, 
                          unit: "°F"
                        },
                      ]}
                      outputs={[
                        { 
                          label: "Expansion", 
                          value: formatValue(thermalResults.expansion, 'length').primary, 
                          unit: formatValue(thermalResults.expansion, 'length').unit,
                          altValue: formatValue(thermalResults.expansion, 'length').alternative,
                          altUnit: formatValue(thermalResults.expansion, 'length').altUnit
                        },
                        { 
                          label: "Final Length", 
                          value: formatValue(thermalResults.finalLength, 'length').primary, 
                          unit: formatValue(thermalResults.finalLength, 'length').unit,
                          altValue: formatValue(thermalResults.finalLength, 'length').alternative,
                          altUnit: formatValue(thermalResults.finalLength, 'length').altUnit
                        },
                      ]}
                    />
                  )}

                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      EXPANSION
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {thermalResults ? formatValue(thermalResults.expansion, 'length').primary : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">
                      {formatValue(thermalResults?.expansion || 0, 'length').unit.toUpperCase()}
                    </div>
                    {settings.showAltUnits && thermalResults && (
                      <div className="text-xs opacity-60 mt-1">
                        {formatValue(thermalResults.expansion, 'length').alternative} {formatValue(thermalResults.expansion, 'length').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      FINAL LENGTH
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {thermalResults ? formatValue(thermalResults.finalLength, 'length').primary : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {formatValue(thermalResults?.finalLength || 0, 'length').unit}
                    </div>
                    {settings.showAltUnits && thermalResults && (
                      <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {formatValue(thermalResults.finalLength, 'length').alternative} {formatValue(thermalResults.finalLength, 'length').altUnit}
                      </div>
                    )}
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      COEFFICIENT
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {thermalResults ? thermalResults.coefficient.toFixed(1) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      ×10⁻⁶ in/in/°F
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Material Reference Tab */}
          {prefs.activeTab === "reference" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Material List */}
                <div className="lg:col-span-1">
                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <h3 className="text-lg font-bold mb-4">Materials</h3>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {Object.entries(materials).map(([key, material]) => (
                        <button
                          key={key}
                          onClick={() => updatePrefs({ materialType: key })}
                          className={`w-full text-left p-2 text-sm border transition-colors ${
                            prefs.materialType === key
                              ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                              : 'border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900'
                          }`}
                        >
                          {material.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Material Details */}
                <div className="lg:col-span-3">
                  {(() => {
                    const material = getMaterial(prefs.materialType);
                    if (!material) return null;

                    return (
                      <div className="border border-gray-300 dark:border-gray-700 p-6">
                        <h2 className="text-2xl font-bold mb-4">{material.name}</h2>
                        
                        {(material as any).description && (
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{(material as any).description}</p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Basic Properties */}
                          <div>
                            <h3 className="text-lg font-bold mb-3">Basic Properties</h3>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Density:</span>
                                <span className="font-mono">
                                  {material.density} lb/in³
                                  {settings.unitSystem === "metric" && (
                                    <span className="text-xs text-gray-500 ml-2">
                                      ({lbPerIn3ToKgPerMm3(material.density).toFixed(6)} kg/mm³)
                                    </span>
                                  )}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600 dark:text-gray-400">Thermal Expansion:</span>
                                <span className="font-mono">{material.expansion} ×10⁻⁶ in/in/°F</span>
                              </div>
                              {material.tensileStrength && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Tensile Strength:</span>
                                  <span className="font-mono">{material.tensileStrength} ksi</span>
                                </div>
                              )}
                              {material.yieldStrength && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Yield Strength:</span>
                                  <span className="font-mono">{material.yieldStrength} ksi</span>
                                </div>
                              )}
                              {material.hardness && (
                                <div className="flex justify-between">
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Hardness:</span>
                                  <span className="font-mono">{material.hardness} HB</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Applications */}
                          {(material as any).applications && (
                            <div>
                              <h3 className="text-lg font-bold mb-3">Applications</h3>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                                {(material as any).applications.map((app: string, index: number) => (
                                  <li key={index}>• {app}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Detailed Properties */}
                        {(material as any).properties && (
                          <div className="mt-6">
                            <h3 className="text-lg font-bold mb-3">Detailed Properties</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {Object.entries((material as any).properties).map(([prop, data]: [string, any]) => (
                                <div key={prop} className="border border-gray-200 dark:border-gray-800 p-3">
                                  <h4 className="font-bold text-sm mb-2">{prop.toUpperCase()}</h4>
                                  <div className="text-sm space-y-1">
                                    <div className="flex justify-between">
                                      <span>Value:</span>
                                      <span className="font-mono">{data.value} {data.unit}</span>
                                    </div>
                                    {data.range && (
                                      <div className="flex justify-between">
                                        <span>Range:</span>
                                        <span className="font-mono text-xs">
                                          {data.range[0]} - {data.range[1]} {data.unit}
                                        </span>
                                      </div>
                                    )}
                                    {data.citation && (
                                      <div className="text-xs text-gray-500 mt-2">
                                        <div className="font-bold">Source:</div>
                                        <div>{data.citation}</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-10 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 SpecFoundry. Built for engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

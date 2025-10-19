"use client";

import Link from "next/link";
import { useState } from "react";
import { NumberInput } from "@/components/NumberInput";
import { SettingsPanel } from "@/components/SettingsPanel";
import {
  validateNominalSize,
  validateTolerance,
} from "@/lib/utils/validation";
import {
  calculateITTolerance,
  calculateShaftDeviation,
  calculateFit,
  calculateBilateralTolerance,
  convertRoughness,
} from "@/lib/calc";

export default function ToleranceCalculatorClient() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fit-calculator");
  const [units, setUnits] = useState<"imperial" | "metric">("metric");

  // Fit Calculator State
  const [nominalSize, setNominalSize] = useState("");
  const [holeTolerance, setHoleTolerance] = useState("H7");
  const [shaftTolerance, setShaftTolerance] = useState("g6");

  // Bilateral Tolerance State
  const [nominalDimension, setNominalDimension] = useState("");
  const [upperDeviation, setUpperDeviation] = useState("");
  const [lowerDeviation, setLowerDeviation] = useState("");

  // Surface Roughness State
  const [raValue, setRaValue] = useState("");
  const [fromUnit, setFromUnit] = useState<"micrometers" | "microinches">("micrometers");

  // Calculate IT grade tolerance value
  const calculateITToleranceLocal = (nominal: number, grade: number): number => {
    return calculateITTolerance(nominal, grade);
  };

  // Calculate fundamental deviation for shafts
  const calculateShaftDeviationLocal = (nominal: number, letter: string): { upper: number; lower: number } => {
    return calculateShaftDeviation(nominal, letter);
  };


  // Calculate fit
  const calculateFitLocal = () => {
    const nominal = Number.parseFloat(nominalSize);
    if (!nominal) return null;

    return calculateFit(nominal, holeTolerance, shaftTolerance);
  };

  // Calculate bilateral tolerance
  const calculateBilateralToleranceLocal = () => {
    const nominal = Number.parseFloat(nominalDimension);
    const upper = Number.parseFloat(upperDeviation);
    const lower = Number.parseFloat(lowerDeviation);

    if (!nominal || isNaN(upper) || isNaN(lower)) return null;

    return calculateBilateralTolerance(nominal, upper, lower);
  };

  // Convert surface roughness
  const convertRoughnessLocal = () => {
    const value = Number.parseFloat(raValue);
    if (!value) return null;

    return convertRoughness(value, fromUnit);
  };

  const fitResults = calculateFitLocal();
  const bilateralResults = calculateBilateralToleranceLocal();
  const roughnessResults = convertRoughnessLocal();

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
            CALC-003 | REV A | TOLERANCE CALCULATOR
          </div>
          <h1 className="text-4xl font-bold mb-3">Tolerance Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate ISO 286 fits, bilateral tolerances, and surface roughness conversions
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("fit-calculator")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "fit-calculator"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              ISO 286 Fits
            </button>
            <button
              onClick={() => setActiveTab("bilateral")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "bilateral"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Bilateral Tolerances
            </button>
            <button
              onClick={() => setActiveTab("surface-roughness")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "surface-roughness"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Surface Roughness
            </button>
            <button
              onClick={() => setActiveTab("reference")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "reference"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Tolerance Reference
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Fit Calculator */}
          {activeTab === "fit-calculator" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Input Parameters
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <NumberInput
                        value={nominalSize}
                        onChange={setNominalSize}
                        label="NOMINAL SIZE (MM)"
                        placeholder="30"
                        step={0.1}
                        unit="mm"
                        validation={nominalSize ? validateNominalSize(Number.parseFloat(nominalSize), 'metric') : undefined}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        HOLE TOLERANCE
                      </label>
                      <select
                        value={holeTolerance}
                        onChange={(e) => setHoleTolerance(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="H6">H6</option>
                        <option value="H7">H7</option>
                        <option value="H8">H8</option>
                        <option value="H9">H9</option>
                        <option value="H10">H10</option>
                        <option value="H11">H11</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        SHAFT TOLERANCE
                      </label>
                      <select
                        value={shaftTolerance}
                        onChange={(e) => setShaftTolerance(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="c11">c11 - Loose</option>
                        <option value="d9">d9 - Loose</option>
                        <option value="f7">f7 - Close Running</option>
                        <option value="g6">g6 - Close Running</option>
                        <option value="h6">h6 - Sliding</option>
                        <option value="h7">h7 - Sliding</option>
                        <option value="k6">k6 - Transition</option>
                        <option value="n6">n6 - Transition</option>
                        <option value="p6">p6 - Light Press</option>
                        <option value="s6">s6 - Press Fit</option>
                      </select>
                    </div>
                  </div>

                  {/* Formulas */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">ISO 286 TOLERANCE GRADES:</h3>
                    <div className="space-y-1 text-xs font-mono text-gray-600 dark:text-gray-400">
                      <div>IT5-IT7: Precision fits, bearing assemblies</div>
                      <div>IT8-IT10: General purpose machining</div>
                      <div>IT11-IT13: Rough machining, castings</div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      FIT TYPE
                    </div>
                    <div className="text-2xl font-bold">
                      {fitResults ? fitResults.fitType : "---"}
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      MAX CLEARANCE
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {fitResults ? 
                        (fitResults.maxClearance >= 0 ? "+" : "") + 
                        (fitResults.maxClearance * 1000).toFixed(3) 
                        : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      μm (micrometers)
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      MIN CLEARANCE
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {fitResults ? 
                        (fitResults.minClearance >= 0 ? "+" : "") + 
                        (fitResults.minClearance * 1000).toFixed(3) 
                        : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      μm (micrometers)
                    </div>
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              {fitResults && (
                <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-8">
                  <h3 className="text-lg font-bold mb-4">Detailed Dimensions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-300 dark:border-gray-700 p-6">
                      <h4 className="text-sm font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                        HOLE ({holeTolerance})
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Maximum:</span>
                          <span className="font-mono text-lg font-bold">{fitResults.holeMax.toFixed(4)} mm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Minimum:</span>
                          <span className="font-mono text-lg font-bold">{fitResults.holeMin.toFixed(4)} mm</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-800">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Tolerance:</span>
                          <span className="font-mono text-lg font-bold">±{(fitResults.holeTol * 1000 / 2).toFixed(3)} μm</span>
                        </div>
                      </div>
                    </div>

                    <div className="border border-gray-300 dark:border-gray-700 p-6">
                      <h4 className="text-sm font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                        SHAFT ({shaftTolerance})
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Maximum:</span>
                          <span className="font-mono text-lg font-bold">{fitResults.shaftMax.toFixed(4)} mm</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Minimum:</span>
                          <span className="font-mono text-lg font-bold">{fitResults.shaftMin.toFixed(4)} mm</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-800">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Tolerance:</span>
                          <span className="font-mono text-lg font-bold">±{(fitResults.shaftTol * 1000 / 2).toFixed(3)} μm</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Common Fits Reference */}
              <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-bold mb-4">Common ISO 286 Fits</h3>
                <div className="border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="text-left p-3 font-bold text-xs">FIT DESIGNATION</th>
                        <th className="text-left p-3 font-bold text-xs">TYPE</th>
                        <th className="text-left p-3 font-bold text-xs">DESCRIPTION</th>
                        <th className="text-left p-3 font-bold text-xs">APPLICATIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H11/c11</td>
                        <td className="p-3 text-sm">Clearance</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Loose running fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Large clearances</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H9/d9</td>
                        <td className="p-3 text-sm">Clearance</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Free running fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Rough work, low accuracy</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H8/f7</td>
                        <td className="p-3 text-sm">Clearance</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Close running fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Precision running parts</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H7/g6</td>
                        <td className="p-3 text-sm">Clearance</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Sliding fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Precise location, free movement</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H7/h6</td>
                        <td className="p-3 text-sm">Clearance</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Locational clearance</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Accurate location, easy assembly</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H7/k6</td>
                        <td className="p-3 text-sm">Transition</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Transition fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Precise location</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H7/n6</td>
                        <td className="p-3 text-sm">Transition</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Transition fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">More interference, press fit</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 font-mono text-sm font-medium">H7/p6</td>
                        <td className="p-3 text-sm">Interference</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Light press fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Light assembly force</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-sm font-medium">H7/s6</td>
                        <td className="p-3 text-sm">Interference</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Press fit</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Permanent assembly</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Bilateral Tolerance Calculator */}
          {activeTab === "bilateral" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Input Parameters
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <NumberInput
                        value={nominalDimension}
                        onChange={setNominalDimension}
                        label="NOMINAL DIMENSION (MM)"
                        placeholder="50.000"
                        step={0.001}
                        unit="mm"
                        validation={nominalDimension ? validateNominalSize(Number.parseFloat(nominalDimension), 'metric') : undefined}
                      />
                    </div>

                    <NumberInput
                      value={upperDeviation}
                      onChange={setUpperDeviation}
                      label="UPPER DEVIATION (MM)"
                      placeholder="+0.025"
                      step={0.001}
                      unit="mm"
                    />

                    <NumberInput
                      value={lowerDeviation}
                      onChange={setLowerDeviation}
                      label="LOWER DEVIATION (MM)"
                      placeholder="-0.025"
                      step={0.001}
                      unit="mm"
                      validation={upperDeviation && lowerDeviation ? 
                        validateTolerance(Number.parseFloat(upperDeviation), Number.parseFloat(lowerDeviation)) : undefined}
                    />
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">BILATERAL TOLERANCE:</h3>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div>• Upper deviation: Plus (+) tolerance from nominal</div>
                      <div>• Lower deviation: Minus (-) tolerance from nominal</div>
                      <div>• Example: 50.000 +0.025/-0.025 mm</div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      TOTAL TOLERANCE
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {bilateralResults ? bilateralResults.totalTolerance.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">MM</div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      MAXIMUM LIMIT
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {bilateralResults ? bilateralResults.maxLimit.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      mm
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      MINIMUM LIMIT
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {bilateralResults ? bilateralResults.minLimit.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      mm
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      MID TOLERANCE
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {bilateralResults ? 
                        (bilateralResults.midTolerance >= 0 ? "+" : "") +
                        bilateralResults.midTolerance.toFixed(4) 
                        : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      mm
                    </div>
                  </div>
                </div>
              </div>

              {/* Tolerance Types Reference */}
              <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-bold mb-4">Tolerance Notation Types</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border border-gray-300 dark:border-gray-700 p-5">
                    <h4 className="text-sm font-bold mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
                      BILATERAL (EQUAL)
                    </h4>
                    <div className="font-mono text-2xl mb-2">50 ± 0.05</div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Equal tolerance in both directions
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Max: 50.05 mm<br/>
                      Min: 49.95 mm
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-5">
                    <h4 className="text-sm font-bold mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
                      BILATERAL (UNEQUAL)
                    </h4>
                    <div className="font-mono text-2xl mb-2">
                      50 <sup className="text-sm">+0.03</sup><sub className="text-sm">-0.02</sub>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Different tolerance each direction
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Max: 50.03 mm<br/>
                      Min: 49.98 mm
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-5">
                    <h4 className="text-sm font-bold mb-3 pb-2 border-b border-gray-200 dark:border-gray-800">
                      UNILATERAL
                    </h4>
                    <div className="font-mono text-2xl mb-2">
                      50 <sup className="text-sm">+0.05</sup><sub className="text-sm">0</sub>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Tolerance in one direction only
                    </p>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Max: 50.05 mm<br/>
                      Min: 50.00 mm
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Surface Roughness Converter */}
          {activeTab === "surface-roughness" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Input Parameters
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberInput
                      value={raValue}
                      onChange={setRaValue}
                      label="Ra VALUE"
                      placeholder="3.2"
                      step={0.01}
                      unit={fromUnit === "micrometers" ? "μm" : "μin"}
                    />

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        UNIT
                      </label>
                      <select
                        value={fromUnit}
                        onChange={(e) => setFromUnit(e.target.value as "micrometers" | "microinches")}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="micrometers">Micrometers (μm)</option>
                        <option value="microinches">Microinches (μin)</option>
                      </select>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">SURFACE ROUGHNESS:</h3>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                      <div>• Ra: Arithmetic average roughness</div>
                      <div>• RMS: Root mean square roughness</div>
                      <div>• Rz: Average peak-to-valley height</div>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      Ra (MICROMETERS)
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {roughnessResults ? roughnessResults.micrometers.toFixed(2) : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">μm</div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      Ra (MICROINCHES)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {roughnessResults ? roughnessResults.microinches.toFixed(1) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      μin
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      RMS (APPROX)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {roughnessResults ? roughnessResults.rms.toFixed(2) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      μm
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      Rz (APPROX)
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {roughnessResults ? roughnessResults.rz.toFixed(2) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      μm
                    </div>
                  </div>
                </div>
              </div>

              {/* Surface Finish Reference */}
              <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-bold mb-4">Surface Finish by Process</h3>
                <div className="border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="text-left p-3 font-bold text-xs">PROCESS</th>
                        <th className="text-left p-3 font-bold text-xs">Ra (μm)</th>
                        <th className="text-left p-3 font-bold text-xs">Ra (μin)</th>
                        <th className="text-left p-3 font-bold text-xs">DESCRIPTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 text-sm font-medium">Lapping / Polishing</td>
                        <td className="p-3 font-mono text-sm">0.025 - 0.05</td>
                        <td className="p-3 font-mono text-sm">1 - 2</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Mirror finish</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 text-sm font-medium">Grinding / Honing</td>
                        <td className="p-3 font-mono text-sm">0.1 - 0.2</td>
                        <td className="p-3 font-mono text-sm">4 - 8</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">High quality surface</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 text-sm font-medium">Fine Grinding / Reaming</td>
                        <td className="p-3 font-mono text-sm">0.4 - 0.8</td>
                        <td className="p-3 font-mono text-sm">16 - 32</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Precision machining</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 text-sm font-medium">Milling / Turning</td>
                        <td className="p-3 font-mono text-sm">1.6 - 3.2</td>
                        <td className="p-3 font-mono text-sm">63 - 125</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Standard machined</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-3 text-sm font-medium">Rough Machining</td>
                        <td className="p-3 font-mono text-sm">6.3 - 12.5</td>
                        <td className="p-3 font-mono text-sm">250 - 500</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">Non-critical surfaces</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-sm font-medium">Sawing / Casting</td>
                        <td className="p-3 font-mono text-sm">25 - 50</td>
                        <td className="p-3 font-mono text-sm">1000 - 2000</td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">As-cast, rough cut</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tolerance Reference Tab */}
          {activeTab === "reference" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Tolerance Standards & Reference</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="border border-gray-300 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                      ISO Tolerance Grades
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-bold">IT01 - IT5:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          Gauge blocks, precision instruments, measuring tools
                        </p>
                      </div>
                      <div>
                        <span className="font-bold">IT6 - IT7:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          Close fits, bearings, precision running parts
                        </p>
                      </div>
                      <div>
                        <span className="font-bold">IT8 - IT10:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          General purpose machining, shafts, holes
                        </p>
                      </div>
                      <div>
                        <span className="font-bold">IT11 - IT13:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          Rough machining, castings, forgings
                        </p>
                      </div>
                      <div>
                        <span className="font-bold">IT14 - IT18:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          Very rough work, sand castings, raw materials
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                      Fit Types
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="font-bold">Clearance Fit:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          Minimum clearance is positive - parts can move freely
                        </p>
                      </div>
                      <div>
                        <span className="font-bold">Transition Fit:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          May have clearance or interference - precise location
                        </p>
                      </div>
                      <div>
                        <span className="font-bold">Interference Fit:</span>
                        <p className="text-gray-600 dark:text-gray-400">
                          Maximum clearance is negative - requires force to assemble
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6 mb-8">
                  <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    General Tolerance Standards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-bold mb-2">ISO 2768 - General Tolerances</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• f (fine): ±0.05 to ±0.2 mm</li>
                        <li>• m (medium): ±0.1 to ±0.5 mm</li>
                        <li>• c (coarse): ±0.2 to ±1.0 mm</li>
                        <li>• v (very coarse): ±0.5 to ±2.0 mm</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-2">Decimal Place Guidelines</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• ±0.X mm: Rough machining</li>
                        <li>• ±0.0X mm: Standard machining</li>
                        <li>• ±0.00X mm: Precision machining</li>
                        <li>• ±0.000X mm: High precision/grinding</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    GD&T Tolerance Symbols
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-bold mb-2">Form Tolerances</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Straightness - Controls line elements</li>
                        <li>• Flatness - Controls surface deviation</li>
                        <li>• Circularity - Controls roundness</li>
                        <li>• Cylindricity - Controls cylinder form</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold mb-2">Location Tolerances</h4>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Position - Controls feature location</li>
                        <li>• Concentricity - Controls center alignment</li>
                        <li>• Symmetry - Controls symmetrical features</li>
                        <li>• Runout - Controls rotation variation</li>
                      </ul>
                    </div>
                  </div>
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

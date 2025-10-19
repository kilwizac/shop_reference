"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import {
  calculateTapDrill,
  calculateMetricTapDrill,
  calculateThreadDepth,
} from "@/lib/calc";
import {
  uncThreadData,
  unefThreadData,
  nptThreadData,
  calculateEngagementLength,
  calculateTorqueRecommendation,
  type UnifiedThreadData,
  type NPTThreadData,
} from "@/lib/utils/threadData";
import { NumberInput } from "@/components/NumberInput";
import {
  validateThreadDiameter,
  validateTPI,
  validateThreadEngagement,
  validateThreadPitch,
  validateNominalSize,
  validateTolerance,
} from "@/lib/utils/validation";

export default function ThreadCalculatorClient() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tap-drill");
  const [units, setUnits] = useState<"imperial" | "metric">("imperial");
  const [threadSystem, setThreadSystem] = useState<"unified" | "npt">("unified");

  // Tap Drill Calculator State
  const [threadSize, setThreadSize] = useState("");
  const [threadsPerInch, setThreadsPerInch] = useState("");
  const [threadEngagement, setThreadEngagement] = useState("75");

  // Metric Thread State
  const [metricDiameter, setMetricDiameter] = useState("");
  const [metricPitch, setMetricPitch] = useState("");

  // Thread Depth State
  const [majorDiameter, setMajorDiameter] = useState("");
  const [pitch, setPitch] = useState("");
  const [threadClass, setThreadClass] = useState("2");

  // Engagement & Torque Calculator State
  const [selectedMaterial, setSelectedMaterial] = useState<"steel" | "aluminum" | "castIron" | "brass" | "plastic">("steel");
  const [selectedGrade, setSelectedGrade] = useState<"grade2" | "grade5" | "grade8">("grade5");
  
  // Reference table filter
  const [selectedThreadType, setSelectedThreadType] = useState<"UNC" | "UNF" | "UNEF" | "ALL">("ALL");
  const [selectedEngagement, setSelectedEngagement] = useState(75);

  // Common UNC threads
  const uncThreads = [
    { size: "#4-40", major: 0.112, tpi: 40, tapDrill: "3/32", decimal: 0.0935 },
    { size: "#6-32", major: 0.138, tpi: 32, tapDrill: "#36", decimal: 0.1065 },
    { size: "#8-32", major: 0.164, tpi: 32, tapDrill: "#29", decimal: 0.136 },
    { size: "#10-24", major: 0.19, tpi: 24, tapDrill: "#25", decimal: 0.1495 },
    { size: "#10-32", major: 0.19, tpi: 32, tapDrill: "#21", decimal: 0.159 },
    { size: "1/4-20", major: 0.25, tpi: 20, tapDrill: "#7", decimal: 0.201 },
    { size: "1/4-28", major: 0.25, tpi: 28, tapDrill: "#3", decimal: 0.213 },
    { size: "5/16-18", major: 0.3125, tpi: 18, tapDrill: "F", decimal: 0.257 },
    { size: "5/16-24", major: 0.3125, tpi: 24, tapDrill: "I", decimal: 0.272 },
    { size: "3/8-16", major: 0.375, tpi: 16, tapDrill: "5/16", decimal: 0.3125 },
    { size: "3/8-24", major: 0.375, tpi: 24, tapDrill: "Q", decimal: 0.332 },
    { size: "7/16-14", major: 0.4375, tpi: 14, tapDrill: "U", decimal: 0.368 },
    { size: "7/16-20", major: 0.4375, tpi: 20, tapDrill: "25/64", decimal: 0.3906 },
    { size: "1/2-13", major: 0.5, tpi: 13, tapDrill: "27/64", decimal: 0.4219 },
    { size: "1/2-20", major: 0.5, tpi: 20, tapDrill: "29/64", decimal: 0.4531 },
    { size: "9/16-12", major: 0.5625, tpi: 12, tapDrill: "31/64", decimal: 0.4844 },
    { size: "9/16-18", major: 0.5625, tpi: 18, tapDrill: "33/64", decimal: 0.5156 },
    { size: "5/8-11", major: 0.625, tpi: 11, tapDrill: "17/32", decimal: 0.5312 },
    { size: "5/8-18", major: 0.625, tpi: 18, tapDrill: "37/64", decimal: 0.5781 },
    { size: "3/4-10", major: 0.75, tpi: 10, tapDrill: "21/32", decimal: 0.6562 },
    { size: "3/4-16", major: 0.75, tpi: 16, tapDrill: "11/16", decimal: 0.6875 },
  ];

  // Common metric threads
  const metricThreads = [
    { size: "M3x0.5", diameter: 3, pitch: 0.5, tapDrill: 2.5 },
    { size: "M4x0.7", diameter: 4, pitch: 0.7, tapDrill: 3.3 },
    { size: "M5x0.8", diameter: 5, pitch: 0.8, tapDrill: 4.2 },
    { size: "M6x1.0", diameter: 6, pitch: 1.0, tapDrill: 5.0 },
    { size: "M8x1.25", diameter: 8, pitch: 1.25, tapDrill: 6.8 },
    { size: "M8x1.0", diameter: 8, pitch: 1.0, tapDrill: 7.0 },
    { size: "M10x1.5", diameter: 10, pitch: 1.5, tapDrill: 8.5 },
    { size: "M10x1.25", diameter: 10, pitch: 1.25, tapDrill: 8.8 },
    { size: "M12x1.75", diameter: 12, pitch: 1.75, tapDrill: 10.2 },
    { size: "M12x1.25", diameter: 12, pitch: 1.25, tapDrill: 10.8 },
    { size: "M14x2.0", diameter: 14, pitch: 2.0, tapDrill: 12.0 },
    { size: "M16x2.0", diameter: 16, pitch: 2.0, tapDrill: 14.0 },
    { size: "M18x2.5", diameter: 18, pitch: 2.5, tapDrill: 15.5 },
    { size: "M20x2.5", diameter: 20, pitch: 2.5, tapDrill: 17.5 },
    { size: "M24x3.0", diameter: 24, pitch: 3.0, tapDrill: 21.0 },
  ];

  // Calculate tap drill size
  const calculateTapDrillResults = () => {
    const d = Number.parseFloat(threadSize);
    const tpi = Number.parseFloat(threadsPerInch);
    const engagement = Number.parseFloat(threadEngagement) / 100;

    if (!d || !tpi || !engagement) return null;

    const result = calculateTapDrill(d, tpi, engagement);
    return { tapDrillDiameter: result?.tapDrillDiameter, threadDepth: result?.threadDepth };
  };

  // Calculate metric tap drill
  const calculateMetricTapDrillResults = () => {
    const d = Number.parseFloat(metricDiameter);
    const p = Number.parseFloat(metricPitch);
    const engagement = Number.parseFloat(threadEngagement) / 100;

    if (!d || !p || !engagement) return null;

    const result = calculateMetricTapDrill(d, p, engagement);
    return { tapDrillDiameter: result?.tapDrillDiameter, threadDepth: result?.threadDepth };
  };

  // Calculate thread depth
  const calculateThreadDepthResults = () => {
    const d = Number.parseFloat(majorDiameter);
    const p = Number.parseFloat(pitch);

    if (!d || !p) return null;

    const result = calculateThreadDepth(d, p, units);
    return result;
  };

  const tapDrillResults = calculateTapDrillResults();
  const metricTapResults = calculateMetricTapDrillResults();
  const threadDepthResults = calculateThreadDepthResults();

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
            CALC-002 | REV A | THREAD CALCULATOR
          </div>
          <h1 className="text-4xl font-bold mb-3">Thread Calculator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Calculate tap drill sizes, thread depths, and thread specifications for imperial and metric threads
          </p>
        </div>
      </section>

      {/* Units Toggle */}
      <section className="border-b border-gray-200 dark:border-gray-800 py-4">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Thread Standard:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setUnits("imperial")}
                  className={`px-4 py-2 text-sm font-medium transition-colors border ${
                    units === "imperial"
                      ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                      : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                  }`}
                >
                  Imperial
                </button>
                <button
                  onClick={() => setUnits("metric")}
                  className={`px-4 py-2 text-sm font-medium transition-colors border ${
                    units === "metric"
                      ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                      : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                  }`}
                >
                  Metric (ISO)
                </button>
              </div>
            </div>
            {units === "imperial" && (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Thread Type:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setThreadSystem("unified")}
                    className={`px-4 py-2 text-sm font-medium transition-colors border ${
                      threadSystem === "unified"
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                        : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    UNC/UNF/UNEF
                  </button>
                  <button
                    onClick={() => setThreadSystem("npt")}
                    className={`px-4 py-2 text-sm font-medium transition-colors border ${
                      threadSystem === "npt"
                        ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                        : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                    }`}
                  >
                    NPT/NPTF (Pipe)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("tap-drill")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "tap-drill"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Tap Drill Calculator
            </button>
            <button
              onClick={() => setActiveTab("thread-depth")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "thread-depth"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Thread Depth
            </button>
            {threadSystem === "unified" && units === "imperial" && (
              <button
                onClick={() => setActiveTab("torque-engagement")}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === "torque-engagement"
                    ? "border-b-2 border-black dark:border-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Torque & Engagement
              </button>
            )}
            {threadSystem === "npt" && units === "imperial" && (
              <button
                onClick={() => setActiveTab("npt-calculator")}
                className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === "npt-calculator"
                    ? "border-b-2 border-black dark:border-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                NPT/NPTF Calculator
              </button>
            )}
            <button
              onClick={() => setActiveTab("reference")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "reference"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Thread Reference
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Tap Drill Calculator */}
          {activeTab === "tap-drill" && (
            <div className="space-y-8">
              {units === "imperial" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Input Section */}
                  <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                      Input Parameters (Imperial)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <NumberInput
                        value={threadSize}
                        onChange={setThreadSize}
                        label="MAJOR DIAMETER (INCHES)"
                        placeholder="0.250"
                        step={0.001}
                        unit="in"
                        validation={threadSize ? validateThreadDiameter(Number.parseFloat(threadSize), 'imperial') : undefined}
                      />

                      <NumberInput
                        value={threadsPerInch}
                        onChange={setThreadsPerInch}
                        label="THREADS PER INCH (TPI)"
                        placeholder="20"
                        step={1}
                        unit="TPI"
                        validation={threadsPerInch ? validateTPI(Number.parseFloat(threadsPerInch)) : undefined}
                      />

                      <div className="md:col-span-2">
                        <NumberInput
                          value={threadEngagement}
                          onChange={setThreadEngagement}
                          label="THREAD ENGAGEMENT (%)"
                          placeholder="75"
                          step={5}
                          unit="%"
                          validation={threadEngagement ? validateThreadEngagement(Number.parseFloat(threadEngagement)) : undefined}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Standard: 75% | High Strength: 60% | Soft Materials: 50%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-3">
                    <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                      <div className="font-mono text-xs mb-1 opacity-70">
                        TAP DRILL SIZE
                      </div>
                      <div className="text-3xl font-bold font-mono">
                        {tapDrillResults?.tapDrillDiameter ? tapDrillResults.tapDrillDiameter.toFixed(4) : "---"}
                      </div>
                      <div className="text-xs font-bold mt-1 opacity-70">INCHES</div>
                    </div>

                    <div className="border border-gray-300 dark:border-gray-700 p-4">
                      <div className="font-mono text-xs text-gray-500 mb-1">
                        THREAD DEPTH
                      </div>
                      <div className="text-2xl font-bold font-mono">
                        {tapDrillResults?.threadDepth ? tapDrillResults.threadDepth.toFixed(4) : "---"}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        inches
                      </div>
                    </div>

                    {/* Formulas */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                      <h3 className="text-xs font-bold mb-2">FORMULAS:</h3>
                      <div className="space-y-1 text-xs font-mono text-gray-600 dark:text-gray-400">
                        <div>H = 0.6495 / TPI</div>
                        <div>Tap = D - (2×H×E%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Input Section */}
                  <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                    <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                      Input Parameters (Metric)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                          NOMINAL DIAMETER (MM)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={metricDiameter}
                          onChange={(e) => setMetricDiameter(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                          placeholder="6"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                          PITCH (MM)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={metricPitch}
                          onChange={(e) => setMetricPitch(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                          placeholder="1.0"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                          THREAD ENGAGEMENT (%)
                        </label>
                        <input
                          type="number"
                          step="5"
                          value={threadEngagement}
                          onChange={(e) => setThreadEngagement(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                          placeholder="75"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Standard: 75% | High Strength: 60% | Soft Materials: 50%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-3">
                    <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                      <div className="font-mono text-xs mb-1 opacity-70">
                        TAP DRILL SIZE
                      </div>
                      <div className="text-3xl font-bold font-mono">
                        {metricTapResults?.tapDrillDiameter ? metricTapResults.tapDrillDiameter.toFixed(2) : "---"}
                      </div>
                      <div className="text-xs font-bold mt-1 opacity-70">MM</div>
                    </div>

                    <div className="border border-gray-300 dark:border-gray-700 p-4">
                      <div className="font-mono text-xs text-gray-500 mb-1">
                        THREAD DEPTH
                      </div>
                      <div className="text-2xl font-bold font-mono">
                        {metricTapResults?.threadDepth ? metricTapResults.threadDepth.toFixed(3) : "---"}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        mm
                      </div>
                    </div>

                    {/* Formulas */}
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                      <h3 className="text-xs font-bold mb-2">FORMULAS:</h3>
                      <div className="space-y-1 text-xs font-mono text-gray-600 dark:text-gray-400">
                        <div>H = P × 0.6495</div>
                        <div>Tap = D - (2×H×E%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reference Table */}
              <div className="border-t-2 border-gray-300 dark:border-gray-700 pt-8">
                <h3 className="text-lg font-bold mb-4">
                  {units === "imperial" ? "Common UNC/UNF Threads" : "Common Metric Threads (ISO)"}
                </h3>
                <div className="border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="text-left p-3 font-bold text-xs">THREAD SIZE</th>
                        {units === "imperial" ? (
                          <>
                            <th className="text-left p-3 font-bold text-xs">MAJOR DIA (IN)</th>
                            <th className="text-left p-3 font-bold text-xs">TPI</th>
                            <th className="text-left p-3 font-bold text-xs">TAP DRILL</th>
                            <th className="text-left p-3 font-bold text-xs">DECIMAL (IN)</th>
                          </>
                        ) : (
                          <>
                            <th className="text-left p-3 font-bold text-xs">DIAMETER (MM)</th>
                            <th className="text-left p-3 font-bold text-xs">PITCH (MM)</th>
                            <th className="text-left p-3 font-bold text-xs">TAP DRILL (MM)</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {units === "imperial" ? (
                        uncThreads.map((thread, idx) => (
                          <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                            <td className="p-3 font-mono text-sm font-medium">{thread.size}</td>
                            <td className="p-3 font-mono text-sm">{thread.major.toFixed(4)}</td>
                            <td className="p-3 font-mono text-sm">{thread.tpi}</td>
                            <td className="p-3 font-mono text-sm">{thread.tapDrill}</td>
                            <td className="p-3 font-mono text-sm">{thread.decimal.toFixed(4)}</td>
                          </tr>
                        ))
                      ) : (
                        metricThreads.map((thread, idx) => (
                          <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                            <td className="p-3 font-mono text-sm font-medium">{thread.size}</td>
                            <td className="p-3 font-mono text-sm">{thread.diameter}</td>
                            <td className="p-3 font-mono text-sm">{thread.pitch}</td>
                            <td className="p-3 font-mono text-sm">{thread.tapDrill.toFixed(1)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Thread Depth Calculator */}
          {activeTab === "thread-depth" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Thread Depth Calculator
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberInput
                      value={majorDiameter}
                      onChange={setMajorDiameter}
                      label={units === "imperial" ? "MAJOR DIAMETER (INCHES)" : "MAJOR DIAMETER (MM)"}
                      placeholder={units === "imperial" ? "0.250" : "6.0"}
                      step={units === "imperial" ? 0.001 : 0.1}
                      unit={units === "imperial" ? "in" : "mm"}
                      validation={majorDiameter ? validateThreadDiameter(Number.parseFloat(majorDiameter), units) : undefined}
                    />

                    <NumberInput
                      value={pitch}
                      onChange={setPitch}
                      label={units === "imperial" ? "THREADS PER INCH (TPI)" : "PITCH (MM)"}
                      placeholder={units === "imperial" ? "20" : "1.0"}
                      step={units === "imperial" ? 1 : 0.1}
                      unit={units === "imperial" ? "TPI" : "mm"}
                      validation={pitch ? validateThreadPitch(Number.parseFloat(pitch), Number.parseFloat(majorDiameter || "0"), units) : undefined}
                    />

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        THREAD CLASS
                      </label>
                      <select
                        value={threadClass}
                        onChange={(e) => setThreadClass(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="1">Class 1 (Loose)</option>
                        <option value="2">Class 2 (Standard)</option>
                        <option value="3">Class 3 (Tight)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-1">
                        Class 2 is standard for most applications
                      </p>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      THREAD HEIGHT
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {threadDepthResults?.threadHeight ? threadDepthResults.threadHeight.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">
                      {units === "imperial" ? "INCHES" : "MM"}
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      MINOR DIAMETER
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {threadDepthResults?.minorDiameter ? threadDepthResults.minorDiameter.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {units === "imperial" ? "inches" : "mm"}
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      PITCH DIAMETER
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {threadDepthResults?.pitchDiameter ? threadDepthResults.pitchDiameter.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {units === "imperial" ? "inches" : "mm"}
                    </div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      STRESS AREA
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {threadDepthResults?.stressArea ? threadDepthResults.stressArea.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {units === "imperial" ? "in²" : "mm²"}
                    </div>
                  </div>

                  {/* Clearance Holes */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">CLEARANCE HOLES:</h3>
                    <div className="space-y-1 text-xs font-mono text-gray-600 dark:text-gray-400">
                      <div>Close: {threadDepthResults?.clearanceClose ? threadDepthResults.clearanceClose.toFixed(4) : "---"}</div>
                      <div>Standard: {threadDepthResults?.clearanceStandard ? threadDepthResults.clearanceStandard.toFixed(4) : "---"}</div>
                      <div>Loose: {threadDepthResults?.clearanceLoose ? threadDepthResults.clearanceLoose.toFixed(4) : "---"}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Torque & Engagement Calculator */}
          {activeTab === "torque-engagement" && units === "imperial" && threadSystem === "unified" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    Torque & Engagement Calculator
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <NumberInput
                      value={threadSize}
                      onChange={setThreadSize}
                      label="MAJOR DIAMETER (INCHES)"
                      placeholder="0.250"
                      step={0.001}
                      unit="in"
                      validation={threadSize ? validateThreadDiameter(Number.parseFloat(threadSize), 'imperial') : undefined}
                    />

                    <NumberInput
                      value={threadsPerInch}
                      onChange={setThreadsPerInch}
                      label="THREADS PER INCH (TPI)"
                      placeholder="20"
                      step={1}
                      unit="TPI"
                      validation={threadsPerInch ? validateTPI(Number.parseFloat(threadsPerInch)) : undefined}
                    />

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        MATERIAL TYPE
                      </label>
                      <select
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="steel">Steel</option>
                        <option value="aluminum">Aluminum</option>
                        <option value="castIron">Cast Iron</option>
                        <option value="brass">Brass</option>
                        <option value="plastic">Plastic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        BOLT GRADE
                      </label>
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value as any)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="grade2">Grade 2 (Low Strength)</option>
                        <option value="grade5">Grade 5 (Medium Strength)</option>
                        <option value="grade8">Grade 8 (High Strength)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                    <div className="font-mono text-xs mb-1 opacity-70">
                      MINIMUM ENGAGEMENT
                    </div>
                    <div className="text-3xl font-bold font-mono">
                      {threadSize && threadsPerInch ? 
                        calculateEngagementLength(Number.parseFloat(threadSize), selectedMaterial).minimum.toFixed(3) : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-70">INCHES</div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      RECOMMENDED ENGAGEMENT
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {threadSize && threadsPerInch ? 
                        calculateEngagementLength(Number.parseFloat(threadSize), selectedMaterial).recommended.toFixed(3) : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">inches</div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      DRY TORQUE
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {threadSize && threadsPerInch ? 
                        `${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).dry.min.toFixed(0)}-${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).dry.max.toFixed(0)}` : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">lb-ft</div>
                  </div>

                  <div className="border border-gray-300 dark:border-gray-700 p-4">
                    <div className="font-mono text-xs text-gray-500 mb-1">
                      LUBRICATED TORQUE
                    </div>
                    <div className="text-2xl font-bold font-mono">
                      {threadSize && threadsPerInch ? 
                        `${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).lubricated.min.toFixed(0)}-${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).lubricated.max.toFixed(0)}` : "---"}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">lb-ft</div>
                  </div>

                  {/* Notes */}
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                    <h3 className="text-xs font-bold mb-2">NOTES:</h3>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {threadSize && threadsPerInch ? 
                        calculateEngagementLength(Number.parseFloat(threadSize), selectedMaterial).notes : 
                        "Enter thread parameters to see recommendations"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NPT/NPTF Calculator */}
          {activeTab === "npt-calculator" && units === "imperial" && threadSystem === "npt" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Input Section */}
                <div className="lg:col-span-2 border border-gray-300 dark:border-gray-700 p-6">
                  <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    NPT/NPTF Pipe Thread Calculator
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        PIPE SIZE
                      </label>
                      <select
                        value={threadSize}
                        onChange={(e) => setThreadSize(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="">Select pipe size</option>
                        {nptThreadData.map((thread) => (
                          <option key={thread.size} value={thread.size}>
                            {thread.size} - {thread.nominalOD.toFixed(3)}" OD
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                        THREAD TYPE
                      </label>
                      <select
                        value={threadClass}
                        onChange={(e) => setThreadClass(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                      >
                        <option value="npt">NPT (Standard)</option>
                        <option value="nptf">NPTF (Dryseal)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Results Section */}
                <div className="space-y-3">
                  {threadSize && nptThreadData.find(t => t.size === threadSize) && (() => {
                    const thread = nptThreadData.find(t => t.size === threadSize)!;
                    return (
                      <>
                        <div className="border border-gray-300 dark:border-gray-700 bg-black dark:bg-white text-white dark:text-black p-4">
                          <div className="font-mono text-xs mb-1 opacity-70">
                            TAP DRILL SIZE
                          </div>
                          <div className="text-3xl font-bold font-mono">
                            {thread.tapDrill}
                          </div>
                          <div className="text-xs font-bold mt-1 opacity-70">
                            ({thread.tapDrillDecimal.toFixed(3)}")
                          </div>
                        </div>

                        <div className="border border-gray-300 dark:border-gray-700 p-4">
                          <div className="font-mono text-xs text-gray-500 mb-1">
                            NOMINAL OD
                          </div>
                          <div className="text-2xl font-bold font-mono">
                            {thread.nominalOD.toFixed(3)}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">inches</div>
                        </div>

                        <div className="border border-gray-300 dark:border-gray-700 p-4">
                          <div className="font-mono text-xs text-gray-500 mb-1">
                            TPI
                          </div>
                          <div className="text-2xl font-bold font-mono">
                            {thread.tpi}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">threads per inch</div>
                        </div>

                        <div className="border border-gray-300 dark:border-gray-700 p-4">
                          <div className="font-mono text-xs text-gray-500 mb-1">
                            HAND TIGHT TURNS
                          </div>
                          <div className="text-2xl font-bold font-mono">
                            {thread.handTightEngagement}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">turns</div>
                        </div>

                        <div className="border border-gray-300 dark:border-gray-700 p-4">
                          <div className="font-mono text-xs text-gray-500 mb-1">
                            WRENCH TIGHT TURNS
                          </div>
                          <div className="text-2xl font-bold font-mono">
                            {thread.wrenchTightEngagement}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">turns</div>
                        </div>

                        <div className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700">
                          <h3 className="text-xs font-bold mb-2">PITCH DIAMETER:</h3>
                          <div className="space-y-1 text-xs font-mono text-gray-600 dark:text-gray-400">
                            <div>At Gage Plane: {thread.pitchDiameter.atGagePlane.toFixed(4)}"</div>
                            <div>Small End: {thread.pitchDiameter.smallEnd.toFixed(4)}"</div>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Thread Reference */}
          {activeTab === "reference" && (
            <div className="space-y-8">
              <div className="border border-gray-300 dark:border-gray-700 p-6">
                <h2 className="text-xl font-bold mb-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                  Thread Reference Tables
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                      THREAD TYPE
                    </label>
                    <select
                      value={selectedThreadType}
                      onChange={(e) => setSelectedThreadType(e.target.value as any)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                    >
                      <option value="ALL">All Threads</option>
                      <option value="UNC">UNC (Coarse)</option>
                      <option value="UNF">UNF (Fine)</option>
                      <option value="UNEF">UNEF (Extra Fine)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                      ENGAGEMENT %
                    </label>
                    <select
                      value={selectedEngagement}
                      onChange={(e) => setSelectedEngagement(Number.parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-black font-mono text-lg"
                    >
                      <option value={50}>50%</option>
                      <option value={60}>60%</option>
                      <option value={70}>70%</option>
                      <option value={75}>75% (Standard)</option>
                      <option value={80}>80%</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold mb-2 text-gray-600 dark:text-gray-400">
                      UNITS
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setUnits("imperial")}
                        className={`px-4 py-2 text-sm font-medium transition-colors border ${
                          units === "imperial"
                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                            : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                        }`}
                      >
                        Imperial
                      </button>
                      <button
                        onClick={() => setUnits("metric")}
                        className={`px-4 py-2 text-sm font-medium transition-colors border ${
                          units === "metric"
                            ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                            : "border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white"
                        }`}
                      >
                        Metric
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 dark:border-gray-800 overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="text-left p-3 font-bold text-xs">THREAD SIZE</th>
                        <th className="text-left p-3 font-bold text-xs">MAJOR DIA</th>
                        <th className="text-left p-3 font-bold text-xs">TPI</th>
                        <th className="text-left p-3 font-bold text-xs">TAP DRILL</th>
                        <th className="text-left p-3 font-bold text-xs">DECIMAL</th>
                        <th className="text-left p-3 font-bold text-xs">TORQUE (DRY)</th>
                        <th className="text-left p-3 font-bold text-xs">TORQUE (LUB)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {units === "imperial" ? (
                        [...uncThreadData, ...unefThreadData]
                          .filter(thread => selectedThreadType === "ALL" || thread.threadType === selectedThreadType)
                          .map((thread, idx) => {
                            const drillData = thread.drillSizes.find(d => d.engagement === selectedEngagement);
                            return (
                              <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                                <td className="p-3 font-mono text-sm font-medium">{thread.size}</td>
                                <td className="p-3 font-mono text-sm">{thread.majorDiameter.toFixed(4)}</td>
                                <td className="p-3 font-mono text-sm">{thread.tpi}</td>
                                <td className="p-3 font-mono text-sm">{drillData?.drillSize || "---"}</td>
                                <td className="p-3 font-mono text-sm">{drillData?.decimal.toFixed(4) || "---"}</td>
                                <td className="p-3 font-mono text-sm">
                                  {thread.torque ? `${thread.torque.dry.min}-${thread.torque.dry.max}` : "---"}
                                </td>
                                <td className="p-3 font-mono text-sm">
                                  {thread.torque ? `${thread.torque.lubricated.min}-${thread.torque.lubricated.max}` : "---"}
                                </td>
                              </tr>
                            );
                          })
                      ) : (
                        metricThreads.map((thread, idx) => (
                          <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                            <td className="p-3 font-mono text-sm font-medium">{thread.size}</td>
                            <td className="p-3 font-mono text-sm">{thread.diameter}</td>
                            <td className="p-3 font-mono text-sm">{thread.pitch}</td>
                            <td className="p-3 font-mono text-sm">{thread.tapDrill.toFixed(1)}</td>
                            <td className="p-3 font-mono text-sm">{thread.tapDrill.toFixed(3)}</td>
                            <td className="p-3 font-mono text-sm">---</td>
                            <td className="p-3 font-mono text-sm">---</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
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

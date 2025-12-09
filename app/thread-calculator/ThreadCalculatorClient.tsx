"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";
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
} from "@/lib/utils/threadData";
import { NumberInput } from "@/components/NumberInput";
import {
  validateThreadDiameter,
  validateTPI,
  validateThreadEngagement,
  validateThreadPitch,
} from "@/lib/utils/validation";

export default function ThreadCalculatorClient() {
  const [activeTab, setActiveTab] = useState("tap-drill");
  const [units, setUnits] = useState<"imperial" | "metric">("imperial");
  const [threadSystem, setThreadSystem] = useState<"unified" | "npt">("unified");

  const [threadSize, setThreadSize] = useState("");
  const [threadsPerInch, setThreadsPerInch] = useState("");
  const [threadEngagement, setThreadEngagement] = useState("75");
  const [metricDiameter, setMetricDiameter] = useState("");
  const [metricPitch, setMetricPitch] = useState("");
  const [majorDiameter, setMajorDiameter] = useState("");
  const [pitch, setPitch] = useState("");
  const [threadClass, setThreadClass] = useState("2");
  const [selectedMaterial, setSelectedMaterial] = useState<"steel" | "aluminum" | "castIron" | "brass" | "plastic">("steel");
  const [selectedGrade, setSelectedGrade] = useState<"grade2" | "grade5" | "grade8">("grade5");
  const [selectedThreadType, setSelectedThreadType] = useState<"UNC" | "UNF" | "UNEF" | "ALL">("ALL");
  const [selectedEngagement, setSelectedEngagement] = useState(75);

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

  const calculateTapDrillResults = () => {
    const d = Number.parseFloat(threadSize);
    const tpi = Number.parseFloat(threadsPerInch);
    const engagement = Number.parseFloat(threadEngagement) / 100;

    if (!d || !tpi || !engagement) return null;

    const result = calculateTapDrill(d, tpi, engagement);
    return { tapDrillDiameter: result?.tapDrillDiameter, threadDepth: result?.threadDepth };
  };

  const calculateMetricTapDrillResults = () => {
    const d = Number.parseFloat(metricDiameter);
    const p = Number.parseFloat(metricPitch);
    const engagement = Number.parseFloat(threadEngagement) / 100;

    if (!d || !p || !engagement) return null;

    const result = calculateMetricTapDrill(d, p, engagement);
    return { tapDrillDiameter: result?.tapDrillDiameter, threadDepth: result?.threadDepth };
  };

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

  const tabs = [
    { id: "tap-drill", label: "Tap Drill Calculator" },
    { id: "thread-depth", label: "Thread Depth" },
    ...(threadSystem === "unified" && units === "imperial" ? [{ id: "torque-engagement", label: "Torque & Engagement" }] : []),
    ...(threadSystem === "npt" && units === "imperial" ? [{ id: "npt-calculator", label: "NPT/NPTF Calculator" }] : []),
    { id: "reference", label: "Thread Reference" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 pb-8 bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 mb-2 tracking-wider font-semibold">
                CALC-002 | REV A
              </div>
              <h1 className="text-4xl font-bold mb-3 tracking-tight">Thread Calculator</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Calculate tap drill sizes, thread depths, and thread specifications.
              </p>
            </div>
            
            {/* Quick Settings */}
            <div className="flex flex-col gap-3 min-w-[200px]">
              <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setUnits("imperial")}
                  className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    units === "imperial"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  Imperial
                </button>
                <button
                  onClick={() => setUnits("metric")}
                  className={`flex-1 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    units === "metric"
                      ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                  }`}
                >
                  Metric
                </button>
              </div>

              {units === "imperial" && (
                <div className="flex bg-gray-200 dark:bg-gray-800 rounded-lg p-1">
                   <button
                    onClick={() => setThreadSystem("unified")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      threadSystem === "unified"
                        ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    UNC/UNF
                  </button>
                  <button
                    onClick={() => setThreadSystem("npt")}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                      threadSystem === "npt"
                        ? "bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white"
                        : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    NPT/Pipe
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === "tap-drill" && (
            <div className="space-y-8 animate-fade-in-up">
              {units === "imperial" ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                       <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                       Input Parameters (Imperial)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <NumberInput
                        value={threadSize}
                        onChange={setThreadSize}
                        label="Major Diameter (in)"
                        placeholder="0.250"
                        step={0.001}
                        unit="in"
                        validation={threadSize ? validateThreadDiameter(Number.parseFloat(threadSize), 'imperial') : undefined}
                      />

                      <NumberInput
                        value={threadsPerInch}
                        onChange={setThreadsPerInch}
                        label="Threads Per Inch (TPI)"
                        placeholder="20"
                        step={1}
                        unit="TPI"
                        validation={threadsPerInch ? validateTPI(Number.parseFloat(threadsPerInch)) : undefined}
                      />

                      <div className="md:col-span-2">
                        <NumberInput
                          value={threadEngagement}
                          onChange={setThreadEngagement}
                          label="Thread Engagement (%)"
                          placeholder="75"
                          step={5}
                          unit="%"
                          validation={threadEngagement ? validateThreadEngagement(Number.parseFloat(threadEngagement)) : undefined}
                        />
                        <div className="flex gap-2 mt-2">
                          {[50, 60, 75].map(val => (
                            <button
                              key={val}
                              onClick={() => setThreadEngagement(val.toString())}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400"
                            >
                              Set {val}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Results Section */}
                  <div className="space-y-4">
                    <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl p-6 shadow-lg transform transition-all hover:scale-[1.02]">
                      <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
                        Tap Drill Size
                      </div>
                      <div className="text-4xl font-bold font-mono tracking-tight">
                        {tapDrillResults?.tapDrillDiameter ? tapDrillResults.tapDrillDiameter.toFixed(4) : "---"}
                      </div>
                      <div className="text-xs font-bold mt-1 opacity-60">INCHES</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">
                        Thread Depth
                      </div>
                      <div className="text-3xl font-bold font-mono text-gray-900 dark:text-white">
                        {tapDrillResults?.threadDepth ? tapDrillResults.threadDepth.toFixed(4) : "---"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">inches</div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50 p-6">
                      <h3 className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase mb-3">Formulas</h3>
                      <div className="space-y-2 text-xs font-mono text-blue-700 dark:text-blue-400">
                        <div>H = 0.6495 / TPI</div>
                        <div>Tap = D - (2×H×E%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                       <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                       Input Parameters (Metric)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Nominal Diameter (mm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={metricDiameter}
                          onChange={(e) => setMetricDiameter(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                          placeholder="6"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Pitch (mm)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={metricPitch}
                          onChange={(e) => setMetricPitch(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                          placeholder="1.0"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Thread Engagement (%)
                        </label>
                        <input
                          type="number"
                          step="5"
                          value={threadEngagement}
                          onChange={(e) => setThreadEngagement(e.target.value)}
                          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono"
                          placeholder="75"
                        />
                        <div className="flex gap-2 mt-2">
                          {[50, 60, 75].map(val => (
                            <button
                              key={val}
                              onClick={() => setThreadEngagement(val.toString())}
                              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-600 dark:text-gray-400"
                            >
                              Set {val}%
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl p-6 shadow-lg transform transition-all hover:scale-[1.02]">
                      <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
                        Tap Drill Size
                      </div>
                      <div className="text-4xl font-bold font-mono tracking-tight">
                        {metricTapResults?.tapDrillDiameter ? metricTapResults.tapDrillDiameter.toFixed(2) : "---"}
                      </div>
                      <div className="text-xs font-bold mt-1 opacity-60">MM</div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                      <div className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-1">
                        Thread Depth
                      </div>
                      <div className="text-3xl font-bold font-mono text-gray-900 dark:text-white">
                        {metricTapResults?.threadDepth ? metricTapResults.threadDepth.toFixed(3) : "---"}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">mm</div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50 p-6">
                      <h3 className="text-xs font-bold text-green-800 dark:text-green-300 uppercase mb-3">Formulas</h3>
                      <div className="space-y-2 text-xs font-mono text-green-700 dark:text-green-400">
                        <div>H = P × 0.6495</div>
                        <div>Tap = D - (2×H×E%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-12">
                <h3 className="text-lg font-bold mb-6 text-gray-900 dark:text-white">
                  {units === "imperial" ? "Common UNC/UNF Threads" : "Common Metric Threads (ISO)"}
                </h3>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wider text-gray-500">
                          <th className="px-6 py-4 font-semibold">Thread Size</th>
                          {units === "imperial" ? (
                            <>
                              <th className="px-6 py-4 font-semibold">Major Dia (in)</th>
                              <th className="px-6 py-4 font-semibold">TPI</th>
                              <th className="px-6 py-4 font-semibold">Tap Drill</th>
                              <th className="px-6 py-4 font-semibold">Decimal (in)</th>
                            </>
                          ) : (
                            <>
                              <th className="px-6 py-4 font-semibold">Diameter (mm)</th>
                              <th className="px-6 py-4 font-semibold">Pitch (mm)</th>
                              <th className="px-6 py-4 font-semibold">Tap Drill (mm)</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {units === "imperial" ? (
                          uncThreads.map((thread, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="px-6 py-3 font-mono text-sm font-medium">{thread.size}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.major.toFixed(4)}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.tpi}</td>
                              <td className="px-6 py-3 font-mono text-sm font-medium text-blue-600 dark:text-blue-400">{thread.tapDrill}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.decimal.toFixed(4)}</td>
                            </tr>
                          ))
                        ) : (
                          metricThreads.map((thread, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="px-6 py-3 font-mono text-sm font-medium">{thread.size}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.diameter}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.pitch}</td>
                              <td className="px-6 py-3 font-mono text-sm font-medium text-green-600 dark:text-green-400">{thread.tapDrill.toFixed(1)}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "thread-depth" && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                    Thread Depth Calculator
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NumberInput
                      value={majorDiameter}
                      onChange={setMajorDiameter}
                      label={units === "imperial" ? "Major Diameter (in)" : "Major Diameter (mm)"}
                      placeholder={units === "imperial" ? "0.250" : "6.0"}
                      step={units === "imperial" ? 0.001 : 0.1}
                      unit={units === "imperial" ? "in" : "mm"}
                      validation={majorDiameter ? validateThreadDiameter(Number.parseFloat(majorDiameter), units) : undefined}
                    />

                    <NumberInput
                      value={pitch}
                      onChange={setPitch}
                      label={units === "imperial" ? "Threads Per Inch (TPI)" : "Pitch (mm)"}
                      placeholder={units === "imperial" ? "20" : "1.0"}
                      step={units === "imperial" ? 1 : 0.1}
                      unit={units === "imperial" ? "TPI" : "mm"}
                      validation={pitch ? validateThreadPitch(Number.parseFloat(pitch), Number.parseFloat(majorDiameter || "0"), units) : undefined}
                    />

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Thread Class
                      </label>
                      <select
                        value={threadClass}
                        onChange={(e) => setThreadClass(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="1">Class 1 (Loose)</option>
                        <option value="2">Class 2 (Standard)</option>
                        <option value="3">Class 3 (Tight)</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2">
                        Class 2 is standard for most applications
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl p-6 shadow-lg">
                    <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
                      Thread Height
                    </div>
                    <div className="text-3xl font-bold font-mono tracking-tight">
                      {threadDepthResults?.threadHeight ? threadDepthResults.threadHeight.toFixed(4) : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-60">
                      {units === "imperial" ? "INCHES" : "MM"}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                      <div className="text-xs font-medium uppercase text-gray-500 mb-1">Minor Diameter</div>
                      <div className="text-xl font-bold font-mono text-gray-900 dark:text-white">
                        {threadDepthResults?.minorDiameter ? threadDepthResults.minorDiameter.toFixed(4) : "---"}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                      <div className="text-xs font-medium uppercase text-gray-500 mb-1">Pitch Diameter</div>
                      <div className="text-xl font-bold font-mono text-gray-900 dark:text-white">
                        {threadDepthResults?.pitchDiameter ? threadDepthResults.pitchDiameter.toFixed(4) : "---"}
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                      <div className="text-xs font-medium uppercase text-gray-500 mb-1">Stress Area</div>
                      <div className="text-xl font-bold font-mono text-gray-900 dark:text-white">
                        {threadDepthResults?.stressArea ? threadDepthResults.stressArea.toFixed(4) : "---"}
                      </div>
                      <div className="text-xs text-gray-500">{units === "imperial" ? "in²" : "mm²"}</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                    <h3 className="text-xs font-bold uppercase mb-2">Clearance Holes</h3>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Close:</span>
                        <span>{threadDepthResults?.clearanceClose ? threadDepthResults.clearanceClose.toFixed(4) : "---"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Standard:</span>
                        <span>{threadDepthResults?.clearanceStandard ? threadDepthResults.clearanceStandard.toFixed(4) : "---"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Loose:</span>
                        <span>{threadDepthResults?.clearanceLoose ? threadDepthResults.clearanceLoose.toFixed(4) : "---"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "torque-engagement" && units === "imperial" && threadSystem === "unified" && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-orange-600 rounded-full"></span>
                    Torque & Engagement
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <NumberInput
                      value={threadSize}
                      onChange={setThreadSize}
                      label="Major Diameter (in)"
                      placeholder="0.250"
                      step={0.001}
                      unit="in"
                      validation={threadSize ? validateThreadDiameter(Number.parseFloat(threadSize), 'imperial') : undefined}
                    />

                    <NumberInput
                      value={threadsPerInch}
                      onChange={setThreadsPerInch}
                      label="Threads Per Inch (TPI)"
                      placeholder="20"
                      step={1}
                      unit="TPI"
                      validation={threadsPerInch ? validateTPI(Number.parseFloat(threadsPerInch)) : undefined}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Material Type
                      </label>
                      <select
                        value={selectedMaterial}
                        onChange={(e) => setSelectedMaterial(e.target.value as typeof selectedMaterial)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="steel">Steel</option>
                        <option value="aluminum">Aluminum</option>
                        <option value="castIron">Cast Iron</option>
                        <option value="brass">Brass</option>
                        <option value="plastic">Plastic</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Bolt Grade
                      </label>
                      <select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value as typeof selectedGrade)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="grade2">Grade 2 (Low Strength)</option>
                        <option value="grade5">Grade 5 (Medium Strength)</option>
                        <option value="grade8">Grade 8 (High Strength)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl p-6 shadow-lg">
                    <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
                      Min. Engagement
                    </div>
                    <div className="text-3xl font-bold font-mono tracking-tight">
                      {threadSize && threadsPerInch ? 
                        calculateEngagementLength(Number.parseFloat(threadSize), selectedMaterial).minimum.toFixed(3) : "---"}
                    </div>
                    <div className="text-xs font-bold mt-1 opacity-60">INCHES</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                       <div className="text-xs font-medium uppercase text-gray-500 mb-1">Dry Torque</div>
                       <div className="text-lg font-bold font-mono">
                          {threadSize && threadsPerInch ? 
                          `${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).dry.min.toFixed(0)}-${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).dry.max.toFixed(0)}` : "---"}
                       </div>
                       <div className="text-xs text-gray-500">lb-ft</div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                       <div className="text-xs font-medium uppercase text-gray-500 mb-1">Lubricated</div>
                       <div className="text-lg font-bold font-mono">
                          {threadSize && threadsPerInch ? 
                          `${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).lubricated.min.toFixed(0)}-${calculateTorqueRecommendation(Number.parseFloat(threadSize), Number.parseFloat(threadsPerInch), selectedGrade).lubricated.max.toFixed(0)}` : "---"}
                       </div>
                       <div className="text-xs text-gray-500">lb-ft</div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-100 dark:border-yellow-800/50 p-6">
                    <h3 className="text-xs font-bold text-yellow-800 dark:text-yellow-300 uppercase mb-2">Notes</h3>
                    <div className="text-xs text-yellow-800 dark:text-yellow-400 leading-relaxed">
                      {threadSize && threadsPerInch ? 
                        calculateEngagementLength(Number.parseFloat(threadSize), selectedMaterial).notes : 
                        "Enter thread parameters to see recommendations"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "npt-calculator" && units === "imperial" && threadSystem === "npt" && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                    NPT/NPTF Pipe Thread
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Pipe Size
                      </label>
                      <select
                        value={threadSize}
                        onChange={(e) => setThreadSize(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                      <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Thread Type
                      </label>
                      <select
                        value={threadClass}
                        onChange={(e) => setThreadClass(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="npt">NPT (Standard)</option>
                        <option value="nptf">NPTF (Dryseal)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {threadSize && nptThreadData.find(t => t.size === threadSize) && (() => {
                    const thread = nptThreadData.find(t => t.size === threadSize)!;
                    return (
                      <>
                        <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl p-6 shadow-lg">
                          <div className="text-xs font-medium uppercase tracking-wider opacity-80 mb-1">
                            Tap Drill Size
                          </div>
                          <div className="text-3xl font-bold font-mono tracking-tight">
                            {thread.tapDrill}
                          </div>
                          <div className="text-xs font-bold mt-1 opacity-60">
                            ({thread.tapDrillDecimal.toFixed(3)}")
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                             <div className="text-xs font-medium uppercase text-gray-500 mb-1">Nominal OD</div>
                             <div className="text-xl font-bold font-mono text-gray-900 dark:text-white">
                               {thread.nominalOD.toFixed(3)}
                             </div>
                           </div>
                           <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm">
                             <div className="text-xs font-medium uppercase text-gray-500 mb-1">TPI</div>
                             <div className="text-xl font-bold font-mono text-gray-900 dark:text-white">
                               {thread.tpi}
                             </div>
                           </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                           <h3 className="text-xs font-bold uppercase mb-2">Engagement Turns</h3>
                           <div className="flex justify-between items-center mb-1">
                             <span className="text-xs text-gray-500">Hand Tight:</span>
                             <span className="text-sm font-mono font-bold">{thread.handTightEngagement}</span>
                           </div>
                           <div className="flex justify-between items-center">
                             <span className="text-xs text-gray-500">Wrench Tight:</span>
                             <span className="text-sm font-mono font-bold">{thread.wrenchTightEngagement}</span>
                           </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {activeTab === "reference" && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-gray-600 rounded-full"></span>
                  Thread Reference Tables
                </h2>

                <div className="flex flex-col md:flex-row gap-6 mb-8 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                      Thread System
                    </label>
                    <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setUnits("imperial")}
                        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                          units === "imperial"
                            ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Imperial
                      </button>
                      <button
                        onClick={() => setUnits("metric")}
                        className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                          units === "metric"
                            ? "bg-gray-100 dark:bg-gray-700 text-black dark:text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        Metric
                      </button>
                    </div>
                  </div>

                  {units === "imperial" && (
                    <>
                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Thread Type
                        </label>
                        <select
                          value={selectedThreadType}
                          onChange={(e) => setSelectedThreadType(e.target.value as typeof selectedThreadType)}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="ALL">All Threads</option>
                          <option value="UNC">UNC (Coarse)</option>
                          <option value="UNF">UNF (Fine)</option>
                          <option value="UNEF">UNEF (Extra Fine)</option>
                        </select>
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                          Engagement %
                        </label>
                        <select
                          value={selectedEngagement}
                          onChange={(e) => setSelectedEngagement(Number.parseInt(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value={50}>50%</option>
                          <option value={60}>60%</option>
                          <option value={70}>70%</option>
                          <option value={75}>75% (Standard)</option>
                          <option value={80}>80%</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>

                <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500">
                          <th className="px-6 py-4 font-semibold">Thread Size</th>
                          <th className="px-6 py-4 font-semibold">Major Dia</th>
                          <th className="px-6 py-4 font-semibold">TPI/Pitch</th>
                          <th className="px-6 py-4 font-semibold">Tap Drill</th>
                          <th className="px-6 py-4 font-semibold">Decimal</th>
                          <th className="px-6 py-4 font-semibold">Torque (Dry)</th>
                          <th className="px-6 py-4 font-semibold">Torque (Lub)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {units === "imperial" ? (
                          [...uncThreadData, ...unefThreadData]
                            .filter(thread => selectedThreadType === "ALL" || thread.threadType === selectedThreadType)
                            .map((thread, idx) => {
                              const drillData = thread.drillSizes.find(d => d.engagement === selectedEngagement);
                              return (
                                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                  <td className="px-6 py-3 font-mono text-sm font-medium">{thread.size}</td>
                                  <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.majorDiameter.toFixed(4)}</td>
                                  <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.tpi}</td>
                                  <td className="px-6 py-3 font-mono text-sm font-medium text-blue-600 dark:text-blue-400">{drillData?.drillSize || "---"}</td>
                                  <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{drillData?.decimal.toFixed(4) || "---"}</td>
                                  <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                                    {thread.torque ? `${thread.torque.dry.min}-${thread.torque.dry.max}` : "---"}
                                  </td>
                                  <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">
                                    {thread.torque ? `${thread.torque.lubricated.min}-${thread.torque.lubricated.max}` : "---"}
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          metricThreads.map((thread, idx) => (
                            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                              <td className="px-6 py-3 font-mono text-sm font-medium">{thread.size}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.diameter}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.pitch}</td>
                              <td className="px-6 py-3 font-mono text-sm font-medium text-green-600 dark:text-green-400">{thread.tapDrill.toFixed(1)}</td>
                              <td className="px-6 py-3 font-mono text-sm text-gray-600 dark:text-gray-400">{thread.tapDrill.toFixed(3)}</td>
                              <td className="px-6 py-3 text-sm text-gray-400">---</td>
                              <td className="px-6 py-3 text-sm text-gray-400">---</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

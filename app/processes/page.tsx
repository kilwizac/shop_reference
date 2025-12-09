"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function ProcessesPage() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("milling");
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
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-[var(--z-dropdown)]">
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
                  <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-[var(--z-dropdown)]">
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
            PRC-003 | REV A | MACHINING PROCESS SPECIFICATIONS
          </div>
          <h1 className="text-4xl font-bold mb-3">Processes</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Machining operations, tool selection, and cutting
            parameters for precision manufacturing
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("milling")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "milling"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Milling
            </button>
            <button
              onClick={() => setActiveTab("turning")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "turning"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Turning
            </button>
            <button
              onClick={() => setActiveTab("drilling")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "drilling"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Drilling
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "tools"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Tool Selection
            </button>
            <button
              onClick={() => setActiveTab("formulas")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "formulas"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Formulas
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Milling Tab */}
          {activeTab === "milling" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">
                  HSS End Mills (High Speed Steel)
                </h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Material
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Surface Speed (SFM)
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Feed per Tooth (IPT)
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Depth of Cut
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Aluminum</td>
                        <td className="p-4 font-mono text-sm">300-800</td>
                        <td className="p-4 font-mono text-sm">0.003-0.010</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          1-2x diameter
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Mild Steel (1018)</td>
                        <td className="p-4 font-mono text-sm">80-110</td>
                        <td className="p-4 font-mono text-sm">0.002-0.006</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          0.5-1x diameter
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Alloy Steel (4140)</td>
                        <td className="p-4 font-mono text-sm">50-80</td>
                        <td className="p-4 font-mono text-sm">0.002-0.005</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          0.5-1x diameter
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Stainless Steel (304)</td>
                        <td className="p-4 font-mono text-sm">50-90</td>
                        <td className="p-4 font-mono text-sm">0.001-0.004</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          0.3-0.8x diameter
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-sm">Brass</td>
                        <td className="p-4 font-mono text-sm">200-300</td>
                        <td className="p-4 font-mono text-sm">0.003-0.008</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          1-2x diameter
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Carbide End Mills</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Material
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Surface Speed (SFM)
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Feed per Tooth (IPT)
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Depth of Cut
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Aluminum</td>
                        <td className="p-4 font-mono text-sm">800-1500</td>
                        <td className="p-4 font-mono text-sm">0.005-0.015</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          2-3x diameter
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Mild Steel (1018)</td>
                        <td className="p-4 font-mono text-sm">300-500</td>
                        <td className="p-4 font-mono text-sm">0.004-0.010</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          1-2x diameter
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Alloy Steel (4140)</td>
                        <td className="p-4 font-mono text-sm">250-400</td>
                        <td className="p-4 font-mono text-sm">0.003-0.008</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          0.8-1.5x diameter
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-sm">Stainless Steel (304)</td>
                        <td className="p-4 font-mono text-sm">200-350</td>
                        <td className="p-4 font-mono text-sm">0.003-0.007</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          0.5-1x diameter
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-sm">Titanium (Ti-6Al-4V)</td>
                        <td className="p-4 font-mono text-sm">150-250</td>
                        <td className="p-4 font-mono text-sm">0.002-0.005</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          0.3-0.5x diameter
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Turning Tab */}
          {activeTab === "turning" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Turning Operations</h2>

              <div className="border border-gray-200 dark:border-gray-800">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="text-left p-4 font-bold text-sm">
                        Material
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Surface Speed (SFM)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Feed Rate (IPR)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Depth of Cut
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Tool Material
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Aluminum 6061</td>
                      <td className="p-4 font-mono text-sm">1000-1500</td>
                      <td className="p-4 font-mono text-sm">0.010-0.025</td>
                      <td className="p-4 font-mono text-sm">0.050-0.200"</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Carbide
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Mild Steel 1018</td>
                      <td className="p-4 font-mono text-sm">400-600</td>
                      <td className="p-4 font-mono text-sm">0.008-0.020</td>
                      <td className="p-4 font-mono text-sm">0.040-0.150"</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Carbide/HSS
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Alloy Steel 4140</td>
                      <td className="p-4 font-mono text-sm">300-450</td>
                      <td className="p-4 font-mono text-sm">0.006-0.015</td>
                      <td className="p-4 font-mono text-sm">0.030-0.120"</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Carbide
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Stainless 304</td>
                      <td className="p-4 font-mono text-sm">250-400</td>
                      <td className="p-4 font-mono text-sm">0.005-0.012</td>
                      <td className="p-4 font-mono text-sm">0.025-0.100"</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Carbide
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-sm">Brass 360</td>
                      <td className="p-4 font-mono text-sm">600-900</td>
                      <td className="p-4 font-mono text-sm">0.010-0.020</td>
                      <td className="p-4 font-mono text-sm">0.040-0.180"</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        HSS/Carbide
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Drilling Tab */}
          {activeTab === "drilling" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Drilling Parameters</h2>

              <div className="border border-gray-200 dark:border-gray-800">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="text-left p-4 font-bold text-sm">
                        Material
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Surface Speed (SFM)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Feed Rate (IPR)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Point Angle
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Coolant
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Aluminum</td>
                      <td className="p-4 font-mono text-sm">200-300</td>
                      <td className="p-4 font-mono text-sm">0.004-0.010</td>
                      <td className="p-4 font-mono text-sm">118°-135°</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Required
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Low Carbon Steel</td>
                      <td className="p-4 font-mono text-sm">80-110</td>
                      <td className="p-4 font-mono text-sm">0.003-0.008</td>
                      <td className="p-4 font-mono text-sm">118°</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Recommended
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Alloy Steel</td>
                      <td className="p-4 font-mono text-sm">60-90</td>
                      <td className="p-4 font-mono text-sm">0.002-0.006</td>
                      <td className="p-4 font-mono text-sm">118°-135°</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Required
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Stainless Steel</td>
                      <td className="p-4 font-mono text-sm">40-70</td>
                      <td className="p-4 font-mono text-sm">0.002-0.005</td>
                      <td className="p-4 font-mono text-sm">135°</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Required
                      </td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-sm">Cast Iron</td>
                      <td className="p-4 font-mono text-sm">70-100</td>
                      <td className="p-4 font-mono text-sm">0.003-0.008</td>
                      <td className="p-4 font-mono text-sm">118°</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Optional (dry)
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 text-sm">Brass</td>
                      <td className="p-4 font-mono text-sm">150-200</td>
                      <td className="p-4 font-mono text-sm">0.004-0.010</td>
                      <td className="p-4 font-mono text-sm">118°</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                        Optional
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tool Selection Tab */}
          {activeTab === "tools" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Tool Selection Guide</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">End Mill Selection</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">2 Flute:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Aluminum, plastics. Large chip evacuation, deep slotting
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">3 Flute:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        General purpose, aluminum to steel. Balanced performance
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">4 Flute:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Steel, stainless. Better finish, side milling
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">6+ Flute:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Finishing operations. Excellent surface finish
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Insert Grades</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">Uncoated Carbide:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Aluminum, non-ferrous. Best for soft materials
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">TiN Coated:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        General purpose steel. 2-3x longer life
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">TiAlN Coated:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        High-temp alloys, stainless. Excellent for hardened
                        steel
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">CBN/PCD:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Very hard materials, high production. Extreme tool life
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Coolant Selection</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">Water-Soluble:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        General purpose, best cooling. Most common
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Synthetic:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        High-speed operations. Excellent cooling
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Cutting Oil:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Threading, tapping. Better lubrication
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Dry (No Coolant):</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Cast iron, some aluminum. Environmental benefit
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">
                    Recommended Tool Coatings
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">Aluminum:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        Uncoated carbide, bright finish
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Mild Steel:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        TiN, TiCN coatings
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Stainless Steel:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        TiAlN, AlTiN coatings
                      </p>
                    </div>
                    <div>
                      <span className="font-bold">Hardened Steel:</span>
                      <p className="text-gray-600 dark:text-gray-400">
                        AlTiN, diamond coatings
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Formulas Tab */}
          {activeTab === "formulas" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Machining Formulas</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-4">Milling Formulas</h3>
                  <div className="space-y-4 text-sm font-mono">
                    <div>
                      <div className="font-bold mb-1">RPM (Spindle Speed):</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        RPM = (SFM × 3.82) / D
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        D = Tool diameter in inches
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Feed Rate (IPM):</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        IPM = RPM × IPT × N
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        N = Number of flutes
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Metal Removal Rate:</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        MRR = WOC × DOC × IPM
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        WOC = Width of cut, DOC = Depth of cut
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-4">Turning Formulas</h3>
                  <div className="space-y-4 text-sm font-mono">
                    <div>
                      <div className="font-bold mb-1">RPM (Spindle Speed):</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        RPM = (SFM × 3.82) / D
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        Length = Total length of cut
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-4">Drilling Formulas</h3>
                  <div className="space-y-4 text-sm font-mono">
                    <div>
                      <div className="font-bold mb-1">RPM (Spindle Speed):</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        RPM = (SFM × 3.82) / D
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        D = Drill diameter in inches
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Feed Rate (IPM):</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        IPM = RPM × IPR
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        IPR = Feed per revolution
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">Drill Time:</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        Time = (Depth + D/3) / IPM
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mt-1">
                        Add 1/3 diameter for drill point
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-4">Common Conversions</h3>
                  <div className="space-y-4 text-sm font-mono">
                    <div>
                      <div className="font-bold mb-1">SFM to M/min:</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        M/min = SFM × 0.3048
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">IPM to mm/min:</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        mm/min = IPM × 25.4
                      </div>
                    </div>
                    <div>
                      <div className="font-bold mb-1">IPT to mm/tooth:</div>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 border border-gray-300 dark:border-gray-700">
                        mm/tooth = IPT × 25.4
                      </div>
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

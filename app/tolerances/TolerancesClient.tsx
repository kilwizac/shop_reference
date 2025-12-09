"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function TolerancesClient() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("gdnt");
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
            TOL-001 | REV A | TOLERANCE SPECIFICATIONS
          </div>
          <h1 className="text-4xl font-bold mb-3">Tolerances</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Standard fits, geometric dimensioning and tolerancing symbols, and
            surface finish specifications
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("gdnt")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "gdnt"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              GD&T Symbols
            </button>
            <button
              onClick={() => setActiveTab("fits")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "fits"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Standard Fits
            </button>
            <button
              onClick={() => setActiveTab("surface")}
              className={`px-6 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === "surface"
                  ? "border-b-2 border-black dark:border-white"
                  : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Surface Finish
            </button>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* GD&T Symbols Tab */}
          {activeTab === "gdnt" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Geometric Dimensioning & Tolerancing (GD&T) Symbols
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Form Tolerances</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Symbol
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Name
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">—</td>
                        <td className="p-4 text-sm">Straightness</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls how much a surface or axis can deviate from a
                          straight line
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">⌓</td>
                        <td className="p-4 text-sm">Flatness</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls how much a surface can deviate from a flat
                          plane
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">◯</td>
                        <td className="p-4 text-sm">Circularity (Roundness)</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls circular elements of a surface
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-2xl font-mono">⌭</td>
                        <td className="p-4 text-sm">Cylindricity</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the overall form of a cylindrical feature
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">
                  Orientation Tolerances
                </h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Symbol
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Name
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">∠</td>
                        <td className="p-4 text-sm">Angularity</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the angle of a surface or axis relative to a
                          datum
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">⊥</td>
                        <td className="p-4 text-sm">Perpendicularity</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls a 90° relationship between features
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-2xl font-mono">∥</td>
                        <td className="p-4 text-sm">Parallelism</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls parallelism between two features
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">Location Tolerances</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Symbol
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Name
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">⌖</td>
                        <td className="p-4 text-sm">Position</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the location of a feature relative to datums
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">◎</td>
                        <td className="p-4 text-sm">Concentricity</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the median points of a feature
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-2xl font-mono">⌯</td>
                        <td className="p-4 text-sm">Symmetry</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls symmetry of a feature about a datum plane
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">
                  Profile & Runout Tolerances
                </h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Symbol
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Name
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">⌒</td>
                        <td className="p-4 text-sm">Profile of a Line</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the profile of a line element
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">⌓</td>
                        <td className="p-4 text-sm">Profile of a Surface</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the profile of a surface
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 text-2xl font-mono">↗</td>
                        <td className="p-4 text-sm">Circular Runout</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls circular elements during rotation
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 text-2xl font-mono">↗↗</td>
                        <td className="p-4 text-sm">Total Runout</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Controls the entire surface during rotation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Standard Fits Tab */}
          {activeTab === "fits" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Standard Hole and Shaft Fits (ISO 286)
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">
                  Common Hole Basis Fits
                </h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Fit Designation
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Type
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Description
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Applications
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">H7/p6</td>
                        <td className="p-4 text-sm">Interference</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Heavy press fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Permanent assemblies
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">H7/n6</td>
                        <td className="p-4 text-sm">Interference</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Medium press fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Gears, pulleys on shafts
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">H7/k6</td>
                        <td className="p-4 text-sm">Transition</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Light press/slip fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Precise location
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">H7/h6</td>
                        <td className="p-4 text-sm">Clearance</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Sliding fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Accurate location, easy assembly
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">H7/g6</td>
                        <td className="p-4 text-sm">Clearance</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Close running fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Precision running parts
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">H8/f7</td>
                        <td className="p-4 text-sm">Clearance</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Easy running fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Bearings, general machinery
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">H9/d9</td>
                        <td className="p-4 text-sm">Clearance</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Loose running fit
                        </td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Large clearances, rough work
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">ISO Tolerance Grades</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Grade
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Precision Level
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Typical Applications
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">IT01 - IT5</td>
                        <td className="p-4 text-sm">High precision</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Gauge blocks, precision instruments
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">IT6 - IT7</td>
                        <td className="p-4 text-sm">Precision</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Fits, bearings, close running parts
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">IT8 - IT11</td>
                        <td className="p-4 text-sm">Medium</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          General machining, shafts, holes
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">IT12 - IT18</td>
                        <td className="p-4 text-sm">Coarse</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Rough machining, castings, non-critical
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Surface Finish Tab */}
          {activeTab === "surface" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Surface Finish Standards (Ra)
              </h2>

              <div>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">
                          Ra (μm)
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Ra (μin)
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Process
                        </th>
                        <th className="text-left p-4 font-bold text-sm">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">0.025 - 0.05</td>
                        <td className="p-4 font-mono text-sm">1 - 2</td>
                        <td className="p-4 text-sm">Lapping, polishing</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Mirror finish, gauge surfaces
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">0.1 - 0.2</td>
                        <td className="p-4 font-mono text-sm">4 - 8</td>
                        <td className="p-4 text-sm">Grinding, honing</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          High quality surface, bearing surfaces
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">0.4 - 0.8</td>
                        <td className="p-4 font-mono text-sm">16 - 32</td>
                        <td className="p-4 text-sm">Fine grinding, reaming</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Precision machine parts
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">1.6 - 3.2</td>
                        <td className="p-4 font-mono text-sm">63 - 125</td>
                        <td className="p-4 text-sm">Milling, turning</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Standard machined surfaces
                        </td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">6.3 - 12.5</td>
                        <td className="p-4 font-mono text-sm">250 - 500</td>
                        <td className="p-4 text-sm">Rough machining</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          Non-critical surfaces
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">25 - 50</td>
                        <td className="p-4 font-mono text-sm">1000 - 2000</td>
                        <td className="p-4 text-sm">Sawing, casting</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">
                          As-cast, rough cut surfaces
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 SpecFoundry. Built for engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

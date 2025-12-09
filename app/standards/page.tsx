"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";

export default function StandardsPage() {
  const [activeTab, setActiveTab] = useState("threads");
  
  const tabs = [
    { id: "threads", label: "Thread Specs" },
    { id: "fasteners", label: "Fasteners" },
    { id: "welds", label: "Weld Symbols" },
    { id: "drawing", label: "Drawing Conventions" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />

      {/* Header */}
      <section className="border-b border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2 tracking-wider">
            STD-004 | REV C | ENGINEERING STANDARDS REFERENCE
          </div>
          <h1 className="text-4xl font-bold mb-3">Standards</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Thread specifications, fastener standards, weld symbols, and
            technical drawing conventions
          </p>
        </div>
      </section>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* Thread Specifications Tab */}
          {activeTab === "threads" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Unified Thread Standards (UNC/UNF)
              </h2>

              <div className="mb-8">
                <h3 className="text-lg font-bold mb-4">
                  Coarse Threads (UNC) - Inch
                </h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">Size</th>
                        <th className="text-left p-4 font-bold text-sm">Threads/Inch</th>
                        <th className="text-left p-4 font-bold text-sm">Tap Drill (in)</th>
                        <th className="text-left p-4 font-bold text-sm">Major Dia (in)</th>
                        <th className="text-left p-4 font-bold text-sm">Minor Dia (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">#6-32</td>
                        <td className="p-4 font-mono text-sm">32</td>
                        <td className="p-4 font-mono text-sm">#36 (0.1065)</td>
                        <td className="p-4 font-mono text-sm">0.1380</td>
                        <td className="p-4 font-mono text-sm">0.0997</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">#8-32</td>
                        <td className="p-4 font-mono text-sm">32</td>
                        <td className="p-4 font-mono text-sm">#29 (0.1360)</td>
                        <td className="p-4 font-mono text-sm">0.1640</td>
                        <td className="p-4 font-mono text-sm">0.1257</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">#10-24</td>
                        <td className="p-4 font-mono text-sm">24</td>
                        <td className="p-4 font-mono text-sm">#25 (0.1495)</td>
                        <td className="p-4 font-mono text-sm">0.1900</td>
                        <td className="p-4 font-mono text-sm">0.1389</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">1/4-20</td>
                        <td className="p-4 font-mono text-sm">20</td>
                        <td className="p-4 font-mono text-sm">#7 (0.2010)</td>
                        <td className="p-4 font-mono text-sm">0.2500</td>
                        <td className="p-4 font-mono text-sm">0.1887</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">5/16-18</td>
                        <td className="p-4 font-mono text-sm">18</td>
                        <td className="p-4 font-mono text-sm">F (0.2570)</td>
                        <td className="p-4 font-mono text-sm">0.3125</td>
                        <td className="p-4 font-mono text-sm">0.2443</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">3/8-16</td>
                        <td className="p-4 font-mono text-sm">16</td>
                        <td className="p-4 font-mono text-sm">5/16 (0.3125)</td>
                        <td className="p-4 font-mono text-sm">0.3750</td>
                        <td className="p-4 font-mono text-sm">0.2983</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">1/2-13</td>
                        <td className="p-4 font-mono text-sm">13</td>
                        <td className="p-4 font-mono text-sm">27/64 (0.4219)</td>
                        <td className="p-4 font-mono text-sm">0.5000</td>
                        <td className="p-4 font-mono text-sm">0.4056</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">3/4-10</td>
                        <td className="p-4 font-mono text-sm">10</td>
                        <td className="p-4 font-mono text-sm">21/32 (0.6562)</td>
                        <td className="p-4 font-mono text-sm">0.7500</td>
                        <td className="p-4 font-mono text-sm">0.6273</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Fine Threads (UNF) - Inch</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">Size</th>
                        <th className="text-left p-4 font-bold text-sm">Threads/Inch</th>
                        <th className="text-left p-4 font-bold text-sm">Tap Drill (in)</th>
                        <th className="text-left p-4 font-bold text-sm">Major Dia (in)</th>
                        <th className="text-left p-4 font-bold text-sm">Minor Dia (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">#6-40</td>
                        <td className="p-4 font-mono text-sm">40</td>
                        <td className="p-4 font-mono text-sm">#33 (0.1130)</td>
                        <td className="p-4 font-mono text-sm">0.1380</td>
                        <td className="p-4 font-mono text-sm">0.1073</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">#8-36</td>
                        <td className="p-4 font-mono text-sm">36</td>
                        <td className="p-4 font-mono text-sm">#29 (0.1360)</td>
                        <td className="p-4 font-mono text-sm">0.1640</td>
                        <td className="p-4 font-mono text-sm">0.1299</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">#10-32</td>
                        <td className="p-4 font-mono text-sm">32</td>
                        <td className="p-4 font-mono text-sm">#21 (0.1590)</td>
                        <td className="p-4 font-mono text-sm">0.1900</td>
                        <td className="p-4 font-mono text-sm">0.1517</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">1/4-28</td>
                        <td className="p-4 font-mono text-sm">28</td>
                        <td className="p-4 font-mono text-sm">#3 (0.2130)</td>
                        <td className="p-4 font-mono text-sm">0.2500</td>
                        <td className="p-4 font-mono text-sm">0.2062</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">5/16-24</td>
                        <td className="p-4 font-mono text-sm">24</td>
                        <td className="p-4 font-mono text-sm">I (0.2720)</td>
                        <td className="p-4 font-mono text-sm">0.3125</td>
                        <td className="p-4 font-mono text-sm">0.2614</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">3/8-24</td>
                        <td className="p-4 font-mono text-sm">24</td>
                        <td className="p-4 font-mono text-sm">Q (0.3320)</td>
                        <td className="p-4 font-mono text-sm">0.3750</td>
                        <td className="p-4 font-mono text-sm">0.3239</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">1/2-20</td>
                        <td className="p-4 font-mono text-sm">20</td>
                        <td className="p-4 font-mono text-sm">29/64 (0.4531)</td>
                        <td className="p-4 font-mono text-sm">0.5000</td>
                        <td className="p-4 font-mono text-sm">0.4387</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Fasteners Tab */}
          {activeTab === "fasteners" && (
            <div className="space-y-12 animate-fade-in-up">
              {/* SHCS Dimensions - NEW */}
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                  Socket Head Cap Screws (ASME B18.3)
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Nominal Size</th>
                          <th className="px-6 py-4 font-semibold">Head Dia (Max)</th>
                          <th className="px-6 py-4 font-semibold">Head Height (Max)</th>
                          <th className="px-6 py-4 font-semibold">Hex Key Size</th>
                          <th className="px-6 py-4 font-semibold">Counterbore Dia (Normal)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                          { size: "#4", head: 0.183, height: 0.112, key: "3/32", cb: "13/64" },
                          { size: "#6", head: 0.226, height: 0.138, key: "7/64", cb: "1/4" },
                          { size: "#8", head: 0.270, height: 0.164, key: "9/64", cb: "19/64" },
                          { size: "#10", head: 0.312, height: 0.190, key: "5/32", cb: "11/32" },
                          { size: "1/4", head: 0.375, height: 0.250, key: "3/16", cb: "13/32" },
                          { size: "5/16", head: 0.469, height: 0.312, key: "1/4", cb: "17/32" },
                          { size: "3/8", head: 0.562, height: 0.375, key: "5/16", cb: "19/32" },
                          { size: "1/2", head: 0.750, height: 0.500, key: "3/8", cb: "25/32" },
                          { size: "5/8", head: 0.938, height: 0.625, key: "1/2", cb: "31/32" },
                          { size: "3/4", head: 1.125, height: 0.750, key: "5/8", cb: "1-5/32" },
                        ].map((row) => (
                          <tr key={row.size} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 font-medium">{row.size}</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.head.toFixed(3)}"</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.height.toFixed(3)}"</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.key}</td>
                            <td className="px-6 py-4 font-mono text-blue-600 dark:text-blue-400 font-medium">{row.cb}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Keyways - NEW */}
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                  Standard Keyways (Square)
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Shaft Diameter Range</th>
                          <th className="px-6 py-4 font-semibold">Key Width</th>
                          <th className="px-6 py-4 font-semibold">Key Height (Square)</th>
                          <th className="px-6 py-4 font-semibold">Keyway Depth (Shaft)</th>
                          <th className="px-6 py-4 font-semibold">Keyway Depth (Hub)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                          { shaft: "5/16 - 7/16", width: "3/32", height: "3/32", shaftDepth: "3/64", hubDepth: "3/64" },
                          { shaft: "1/2 - 9/16", width: "1/8", height: "1/8", shaftDepth: "1/16", hubDepth: "1/16" },
                          { shaft: "5/8 - 7/8", width: "3/16", height: "3/16", shaftDepth: "3/32", hubDepth: "3/32" },
                          { shaft: "15/16 - 1-1/4", width: "1/4", height: "1/4", shaftDepth: "1/8", hubDepth: "1/8" },
                          { shaft: "1-5/16 - 1-3/8", width: "5/16", height: "5/16", shaftDepth: "5/32", hubDepth: "5/32" },
                          { shaft: "1-7/16 - 1-3/4", width: "3/8", height: "3/8", shaftDepth: "3/16", hubDepth: "3/16" },
                          { shaft: "1-13/16 - 2-1/4", width: "1/2", height: "1/2", shaftDepth: "1/4", hubDepth: "1/4" },
                        ].map((row) => (
                          <tr key={row.shaft} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 font-medium">{row.shaft}"</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.width}"</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.height}"</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.shaftDepth}"</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{row.hubDepth}"</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Bolt Grade Specifications (SAE/ASTM)</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">Grade</th>
                        <th className="text-left p-4 font-bold text-sm">Head Marking</th>
                        <th className="text-left p-4 font-bold text-sm">Tensile Strength (psi)</th>
                        <th className="text-left p-4 font-bold text-sm">Proof Load (psi)</th>
                        <th className="text-left p-4 font-bold text-sm">Material</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">Grade 2</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">No marks</td>
                        <td className="p-4 font-mono text-sm">60,000</td>
                        <td className="p-4 font-mono text-sm">33,000</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Low carbon steel</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">Grade 5</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">3 radial lines</td>
                        <td className="p-4 font-mono text-sm">120,000</td>
                        <td className="p-4 font-mono text-sm">85,000</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Medium carbon steel</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">Grade 8</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">6 radial lines</td>
                        <td className="p-4 font-mono text-sm">150,000</td>
                        <td className="p-4 font-mono text-sm">120,000</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Medium carbon alloy</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">A325</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">A325 marking</td>
                        <td className="p-4 font-mono text-sm">120,000</td>
                        <td className="p-4 font-mono text-sm">85,000</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Structural bolts</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4">Metric Bolt Property Classes (ISO)</h3>
                <div className="border border-gray-200 dark:border-gray-800">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
                      <tr>
                        <th className="text-left p-4 font-bold text-sm">Property Class</th>
                        <th className="text-left p-4 font-bold text-sm">Head Marking</th>
                        <th className="text-left p-4 font-bold text-sm">Tensile Strength (MPa)</th>
                        <th className="text-left p-4 font-bold text-sm">Proof Load (MPa)</th>
                        <th className="text-left p-4 font-bold text-sm">Material</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">4.6</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">4.6</td>
                        <td className="p-4 font-mono text-sm">400</td>
                        <td className="p-4 font-mono text-sm">240</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Low carbon steel</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">8.8</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">8.8</td>
                        <td className="p-4 font-mono text-sm">800</td>
                        <td className="p-4 font-mono text-sm">640</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Medium carbon steel</td>
                      </tr>
                      <tr className="border-b border-gray-200 dark:border-gray-800">
                        <td className="p-4 font-mono text-sm">10.9</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">10.9</td>
                        <td className="p-4 font-mono text-sm">1000</td>
                        <td className="p-4 font-mono text-sm">900</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Alloy steel</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-sm">12.9</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">12.9</td>
                        <td className="p-4 font-mono text-sm">1200</td>
                        <td className="p-4 font-mono text-sm">1080</td>
                        <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Alloy steel</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Weld Symbols Tab */}
          {activeTab === "welds" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Weld Symbols (AWS A2.4)</h2>
              <div className="border border-gray-200 dark:border-gray-800">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="text-left p-4 font-bold text-sm">Symbol</th>
                      <th className="text-left p-4 font-bold text-sm">Weld Type</th>
                      <th className="text-left p-4 font-bold text-sm">Description</th>
                      <th className="text-left p-4 font-bold text-sm">Typical Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-2xl font-mono">△</td>
                      <td className="p-4 text-sm">Fillet Weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Triangular cross-section weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">T-joints, lap joints</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-2xl font-mono">⌵</td>
                      <td className="p-4 text-sm">Groove Weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">V-shaped joint preparation</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Butt joints, full penetration</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-2xl font-mono">○</td>
                      <td className="p-4 text-sm">Spot Weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Point weld through overlapping sheets</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Sheet metal, resistance welding</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-2xl font-mono">⊔</td>
                      <td className="p-4 text-sm">U-Groove Weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">U-shaped joint preparation</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Thick sections, deep penetration</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 text-2xl font-mono">▭</td>
                      <td className="p-4 text-sm">Plug/Slot Weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Weld through hole or slot</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Lap joints, joining plates</td>
                    </tr>
                    <tr>
                      <td className="p-4 text-2xl font-mono">⦿</td>
                      <td className="p-4 text-sm">Stud Weld</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Fastener welded to surface</td>
                      <td className="p-4 text-sm text-gray-600 dark:text-gray-400">Attaching studs, anchors</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Drawing Conventions Tab */}
          {activeTab === "drawing" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Drawing Conventions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Line Types (ASME Y14.2)</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">Visible Line (Thick):</span>
                      <p className="text-gray-600 dark:text-gray-400">Solid line for object outlines and edges</p>
                    </div>
                    <div>
                      <span className="font-bold">Hidden Line (Dashed):</span>
                      <p className="text-gray-600 dark:text-gray-400">Dashed line for features behind visible surfaces</p>
                    </div>
                    <div>
                      <span className="font-bold">Center Line:</span>
                      <p className="text-gray-600 dark:text-gray-400">Long-short-long pattern for axes and symmetry</p>
                    </div>
                    <div>
                      <span className="font-bold">Dimension Line:</span>
                      <p className="text-gray-600 dark:text-gray-400">Thin line with arrows showing measurement</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">View Projections</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">First Angle (ISO):</span>
                      <p className="text-gray-600 dark:text-gray-400">Object between observer and projection plane</p>
                    </div>
                    <div>
                      <span className="font-bold">Third Angle (ANSI):</span>
                      <p className="text-gray-600 dark:text-gray-400">Projection plane between observer and object</p>
                    </div>
                    <div>
                      <span className="font-bold">Isometric:</span>
                      <p className="text-gray-600 dark:text-gray-400">3D view with 30° axes, equal scale</p>
                    </div>
                    <div>
                      <span className="font-bold">Section View:</span>
                      <p className="text-gray-600 dark:text-gray-400">Cut-away showing internal features</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Title Block Information</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">Part Name/Number:</span>
                      <p className="text-gray-600 dark:text-gray-400">Unique identifier for the component</p>
                    </div>
                    <div>
                      <span className="font-bold">Scale:</span>
                      <p className="text-gray-600 dark:text-gray-400">Drawing size ratio (e.g., 1:1, 2:1, 1:2)</p>
                    </div>
                    <div>
                      <span className="font-bold">Material:</span>
                      <p className="text-gray-600 dark:text-gray-400">Material specification and grade</p>
                    </div>
                    <div>
                      <span className="font-bold">Revision:</span>
                      <p className="text-gray-600 dark:text-gray-400">Drawing version and change history</p>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Common Symbols</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-bold">⌀ (Diameter):</span>
                      <p className="text-gray-600 dark:text-gray-400">Indicates diameter dimension</p>
                    </div>
                    <div>
                      <span className="font-bold">R (Radius):</span>
                      <p className="text-gray-600 dark:text-gray-400">Indicates radius dimension</p>
                    </div>
                    <div>
                      <span className="font-bold">□ (Square):</span>
                      <p className="text-gray-600 dark:text-gray-400">Indicates square dimension</p>
                    </div>
                    <div>
                      <span className="font-bold">SR (Spherical Radius):</span>
                      <p className="text-gray-600 dark:text-gray-400">Indicates spherical surface radius</p>
                    </div>
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

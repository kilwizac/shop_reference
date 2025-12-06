"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";

export default function ToolingClient() {
  const [activeTab, setActiveTab] = useState("tapers");

  const tabs = [
    { id: "tapers", label: "Machine Tapers" },
    { id: "collets", label: "Collets" },
    { id: "inserts", label: "Insert Nomenclature" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Header />

      <section className="pt-12 pb-8 bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="font-mono text-xs text-red-600 dark:text-red-400 mb-2 tracking-wider font-semibold">
            TOOL-005 | REV A
          </div>
          <h1 className="text-4xl font-bold mb-3 tracking-tight">Tooling Reference</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Standard dimensions for machine tapers, collets, and cutting tool inserts.
          </p>
        </div>
      </section>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {activeTab === "tapers" && (
            <div className="space-y-12 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
                  Steep Tapers (CAT / BT / ISO)
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Taper Size</th>
                          <th className="px-6 py-4 font-semibold">Gauge Dia (d1)</th>
                          <th className="px-6 py-4 font-semibold">Length (l1)</th>
                          <th className="px-6 py-4 font-semibold">Taper</th>
                          <th className="px-6 py-4 font-semibold">Angle</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[30, 40, 45, 50, 60].map((size) => {
                          const d1 = size === 30 ? 1.25 : size === 40 ? 1.75 : size === 45 ? 2.25 : size === 50 ? 2.75 : 4.25;
                          return (
                            <tr key={size} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                              <td className="px-6 py-4 font-medium">ISO/CAT/BT {size}</td>
                              <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{d1.toFixed(3)}"</td>
                              <td className="px-6 py-4 text-gray-600 dark:text-gray-400">-</td>
                              <td className="px-6 py-4 text-gray-600 dark:text-gray-400">3.500 in/ft (7:24)</td>
                              <td className="px-6 py-4 text-gray-600 dark:text-gray-400">16 deg 35 min 39 sec</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                  Morse Tapers (MT)
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-semibold">#</th>
                          <th className="px-6 py-4 font-semibold">Gauge Dia</th>
                          <th className="px-6 py-4 font-semibold">Depth</th>
                          <th className="px-6 py-4 font-semibold">Taper/Ft</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-6 py-4 font-medium">MT0</td><td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">0.2520"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">2.00"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">0.62400</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-6 py-4 font-medium">MT1</td><td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">0.3690"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">2.125"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">0.59858</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-6 py-4 font-medium">MT2</td><td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">0.5720"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">2.5625"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">0.59941</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-6 py-4 font-medium">MT3</td><td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">0.7780"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">3.1875"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">0.60235</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-6 py-4 font-medium">MT4</td><td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">1.0200"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">4.0625"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">0.62326</td></tr>
                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50"><td className="px-6 py-4 font-medium">MT5</td><td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">1.4750"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">5.1875"</td><td className="px-6 py-4 text-gray-600 dark:text-gray-400">0.63001</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "collets" && (
            <div className="space-y-12 animate-fade-in-up">
              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-purple-600 rounded-full"></span>
                  ER Collet Dimensions (DIN 6499)
                </h2>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                        <tr>
                          <th className="px-6 py-4 font-semibold">Series</th>
                          <th className="px-6 py-4 font-semibold">Max Capacity</th>
                          <th className="px-6 py-4 font-semibold">Outer Dia (D)</th>
                          <th className="px-6 py-4 font-semibold">Length (L)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                        {[
                          { name: "ER8", max: "5mm", d: "8.5mm", l: "13.5mm" },
                          { name: "ER11", max: "7mm", d: "11.5mm", l: "18mm" },
                          { name: "ER16", max: "10mm", d: "17mm", l: "27mm" },
                          { name: "ER20", max: "13mm", d: "21mm", l: "31.5mm" },
                          { name: "ER25", max: "16mm", d: "26mm", l: "34mm" },
                          { name: "ER32", max: "20mm", d: "33mm", l: "40mm" },
                          { name: "ER40", max: "26mm", d: "41mm", l: "46mm" },
                          { name: "ER50", max: "34mm", d: "52mm", l: "60mm" },
                        ].map((collet) => (
                          <tr key={collet.name} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 font-medium text-purple-600 dark:text-purple-400">{collet.name}</td>
                            <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{collet.max}</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{collet.d}</td>
                            <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-400">{collet.l}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-orange-600 rounded-full"></span>
                  Other Common Collets
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="font-bold mb-4">5C Collet</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li><span className="font-semibold">Body Diameter:</span> 1.250"</li>
                      <li><span className="font-semibold">Length:</span> 3.281"</li>
                      <li><span className="font-semibold">Thread:</span> 1.238-20 RH (Internal) / 1.250-20 (External)</li>
                      <li><span className="font-semibold">Max Capacity:</span> 1-1/16" (Round)</li>
                    </ul>
                  </div>
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 className="font-bold mb-4">R8 Collet</h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <li><span className="font-semibold">Body Diameter:</span> 0.9495"</li>
                      <li><span className="font-semibold">Length:</span> 4.00"</li>
                      <li><span className="font-semibold">Thread:</span> 7/16-20 UNF</li>
                      <li><span className="font-semibold">Max Capacity:</span> 3/4" (typically)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "inserts" && (
            <div className="animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
                <h2 className="text-xl font-bold mb-8 text-center">Turning Insert Nomenclature (ISO/ANSI)</h2>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-2xl font-bold text-blue-700 dark:text-blue-300 border-2 border-blue-200 dark:border-blue-800">C</div><span className="text-xs mt-2 font-medium uppercase">Shape</span></div>
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700">N</div><span className="text-xs mt-2 font-medium uppercase">Clearance</span></div>
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700">M</div><span className="text-xs mt-2 font-medium uppercase">Tolerance</span></div>
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700">G</div><span className="text-xs mt-2 font-medium uppercase">Type</span></div>
                  <div className="w-4"></div>
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-2xl font-bold text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-800">4</div><span className="text-xs mt-2 font-medium uppercase">Size</span></div>
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-2xl font-bold text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-800">3</div><span className="text-xs mt-2 font-medium uppercase">Thickness</span></div>
                  <div className="flex flex-col items-center"><div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center text-2xl font-bold text-green-700 dark:text-green-300 border-2 border-green-200 dark:border-green-800">2</div><span className="text-xs mt-2 font-medium uppercase">Radius</span></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="font-bold border-b border-gray-200 dark:border-gray-800 pb-2">1. Shape</h3>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li><strong className="text-black dark:text-white">C</strong> - Diamond 80 deg</li>
                      <li><strong className="text-black dark:text-white">D</strong> - Diamond 55 deg</li>
                      <li><strong className="text-black dark:text-white">S</strong> - Square 90 deg</li>
                      <li><strong className="text-black dark:text-white">T</strong> - Triangle 60 deg</li>
                      <li><strong className="text-black dark:text-white">V</strong> - Diamond 35 deg</li>
                      <li><strong className="text-black dark:text-white">W</strong> - Trigon 80 deg</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold border-b border-gray-200 dark:border-gray-800 pb-2">2. Clearance Angle</h3>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li><strong className="text-black dark:text-white">N</strong> - 0 deg (Negative)</li>
                      <li><strong className="text-black dark:text-white">B</strong> - 5 deg</li>
                      <li><strong className="text-black dark:text-white">C</strong> - 7 deg</li>
                      <li><strong className="text-black dark:text-white">P</strong> - 11 deg</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold border-b border-gray-200 dark:border-gray-800 pb-2">Size / Thickness (ANSI)</h3>
                    <p className="text-sm text-gray-500 mb-2">In 1/8th increments (e.g., 4 = 4/8" = 1/2")</p>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li><strong className="text-black dark:text-white">3</strong> - 3/8" I.C.</li>
                      <li><strong className="text-black dark:text-white">4</strong> - 1/2" I.C.</li>
                      <li><strong className="text-black dark:text-white">3</strong> (Thickness) - 3/16" Thick</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-bold border-b border-gray-200 dark:border-gray-800 pb-2">Corner Radius (ANSI)</h3>
                    <p className="text-sm text-gray-500 mb-2">In 1/64th increments</p>
                    <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                      <li><strong className="text-black dark:text-white">0</strong> - Sharp</li>
                      <li><strong className="text-black dark:text-white">1</strong> - 1/64" (0.0156")</li>
                      <li><strong className="text-black dark:text-white">2</strong> - 1/32" (0.0312")</li>
                      <li><strong className="text-black dark:text-white">4</strong> - 1/16" (0.0625")</li>
                    </ul>
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

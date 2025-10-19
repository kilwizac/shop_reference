"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAppSettings } from "@/lib/contexts/AppSettingsContext";
import { SettingsPanel } from "@/components/SettingsPanel";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import { useNamespacedStorage } from "@/lib/hooks/useLocalStorage";
import { ShareButton } from "@/components/ShareButton";
import materialsData from "@/data/materials.json";

interface Material {
  name: string;
  density: number;
  expansion: number;
  tensileStrength?: number;
  yieldStrength?: number;
  hardness?: number;
  category?: string;
}

export default function MaterialCompareClient() {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [selectedCategory1, setSelectedCategory1] = useState("All");
  const [selectedCategory2, setSelectedCategory2] = useState("All");
  const { formatValue, settings } = useAppSettings();

  // Persistent preferences
  const { state: prefs, updateState: updatePrefs, isHydrated } = useNamespacedStorage(
    "materialCompare_prefs",
    {
      material1: "steel_1018",
      material2: "aluminum_6061",
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

  const materials = materialsData as Record<string, Material>;
  const material1Data = materials[prefs.material1] || materials["steel_1018"];
  const material2Data = materials[prefs.material2] || materials["aluminum_6061"];

  // Get unique categories
  const categories = Array.from(new Set(Object.values(materials).map(m => m.category).filter(Boolean))).sort();

  // Filter materials based on search and category
  const getFilteredMaterials = (searchTerm: string, category: string) => {
    return Object.entries(materials).filter(([key, material]) => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           key.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === "All" || material.category === category;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredMaterials1 = getFilteredMaterials("", selectedCategory1);
  const filteredMaterials2 = getFilteredMaterials("", selectedCategory2);

  const getComparisonValue = (value1: number | undefined, value2: number | undefined) => {
    if (value1 === undefined || value2 === undefined) return "neutral";
    if (value1 > value2) return "better";
    if (value1 < value2) return "worse";
    return "equal";
  };

  const formatPropertyValue = (value: number | undefined, unit: string) => {
    if (value === undefined) return "N/A";
    return `${value.toFixed(3)} ${unit}`;
  };

  const hasValue = (value: number | null | undefined): value is number =>
    value !== null && value !== undefined;

  const material1Advantages: string[] = [];
  const material2Advantages: string[] = [];

  const density1 = material1Data?.density;
  const density2 = material2Data?.density;
  if (hasValue(density1) && hasValue(density2)) {
    if (density1 < density2) {
      material1Advantages.push("Lower density (lighter)");
    } else if (density2 < density1) {
      material2Advantages.push("Lower density (lighter)");
    }
  }

  const expansion1 = material1Data?.expansion;
  const expansion2 = material2Data?.expansion;
  if (hasValue(expansion1) && hasValue(expansion2)) {
    if (expansion1 < expansion2) {
      material1Advantages.push("Lower thermal expansion");
    } else if (expansion2 < expansion1) {
      material2Advantages.push("Lower thermal expansion");
    }
  }

  const tensile1 = material1Data?.tensileStrength;
  const tensile2 = material2Data?.tensileStrength;
  if (hasValue(tensile1) && hasValue(tensile2)) {
    if (tensile1 > tensile2) {
      material1Advantages.push("Higher tensile strength");
    } else if (tensile2 > tensile1) {
      material2Advantages.push("Higher tensile strength");
    }
  }

  const yield1 = material1Data?.yieldStrength;
  const yield2 = material2Data?.yieldStrength;
  if (hasValue(yield1) && hasValue(yield2)) {
    if (yield1 > yield2) {
      material1Advantages.push("Higher yield strength");
    } else if (yield2 > yield1) {
      material2Advantages.push("Higher yield strength");
    }
  }

  const hardness1 = material1Data?.hardness;
  const hardness2 = material2Data?.hardness;
  if (hasValue(hardness1) && hasValue(hardness2)) {
    if (hardness1 > hardness2) {
      material1Advantages.push("Higher hardness");
    } else if (hardness2 > hardness1) {
      material2Advantages.push("Higher hardness");
    }
  }

  const renderAdvantages = (advantages: string[]) => (
    <ul className="space-y-1.5 text-xs">
      {advantages.map((advantage) => (
        <li key={advantage} className="flex items-center gap-2">
          <svg
            className="w-3.5 h-3.5 text-green-600 dark:text-green-400"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M13.333 4.667 6.5 11.5 2.667 7.667"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{advantage}</span>
        </li>
      ))}
      {advantages.length === 0 && (
        <li className="text-gray-500 dark:text-gray-500 italic">No advantages</li>
      )}
    </ul>
  );

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
      <section className="border-b border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-1 tracking-wider">
                MAT-COMP-001 | REV A | MATERIAL COMPARISON
              </div>
              <h1 className="text-3xl font-bold mb-2">Material Compare</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Compare material properties side-by-side • {Object.keys(materials).length} materials across {categories.length} categories
              </p>
            </div>
            <ShareButton 
              getShareUrl={() => typeof window !== 'undefined' ? window.location.href : ''}
            />
          </div>
        </div>
      </section>

      {/* Material Selection & Comparison */}
      <section className="py-8">
        <div className="max-w-[1600px] mx-auto px-6">
          {/* Material Selection and Advantages Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Material Selection Panel */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold tracking-tight">Material Selection</h2>
                  <button
                    onClick={() => updatePrefs({ material1: prefs.material2, material2: prefs.material1 })}
                    className="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-200 text-xs font-medium shadow-sm"
                    title="Swap materials"
                  >
                    <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                    Swap
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Material 1 */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500">Material 1</h3>
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="space-y-2.5">
                    <select
                      value={selectedCategory1}
                      onChange={(e) => setSelectedCategory1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="relative">
                      <select
                        value={prefs.material1}
                        onChange={(e) => updatePrefs({ material1: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow text-sm font-medium cursor-pointer"
                      >
                        {filteredMaterials1.map(([key, material]) => (
                          <option key={key} value={key}>
                            {material.name} {material.category && `(${material.category})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {material1Data?.name || "Select a material"}
                    </div>
                  </div>
                </div>

                {/* Material 2 */}
                <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-500">Material 2</h3>
                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                  </div>
                  <div className="space-y-2.5">
                    <select
                      value={selectedCategory2}
                      onChange={(e) => setSelectedCategory2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow text-sm cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                    <div className="relative">
                      <select
                        value={prefs.material2}
                        onChange={(e) => updatePrefs({ material2: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-black dark:text-white rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow text-sm font-medium cursor-pointer"
                      >
                        {filteredMaterials2.map(([key, material]) => (
                          <option key={key} value={key}>
                            {material.name} {material.category && `(${material.category})`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {material2Data?.name || "Select a material"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Material Advantages Panel */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm h-full">
                <h2 className="text-lg font-bold tracking-tight mb-6">Material Advantages</h2>
                <div className="space-y-4">
                  {/* Material 1 Advantages */}
                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <h3 className="font-bold text-sm">{material1Data?.name || "Material 1"}</h3>
                    </div>
                    {renderAdvantages(material1Advantages)}
                  </div>

                  {/* Material 2 Advantages */}
                  <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <h3 className="font-bold text-sm">{material2Data?.name || "Material 2"}</h3>
                    </div>
                    {renderAdvantages(material2Advantages)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Panel */}
          <div>
            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-bold tracking-tight">Property Comparison</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
                      <th className="text-left px-6 py-4 font-bold text-sm text-gray-700 dark:text-gray-300 w-[30%]">Property</th>
                      <th className="text-right px-6 py-4 font-bold text-sm text-blue-600 dark:text-blue-400 w-[23%]">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          <span className="truncate">{material1Data?.name || "Material 1"}</span>
                        </div>
                      </th>
                      <th className="text-right px-6 py-4 font-bold text-sm text-purple-600 dark:text-purple-400 w-[23%]">
                        <div className="flex items-center justify-end gap-2">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span className="truncate">{material2Data?.name || "Material 2"}</span>
                        </div>
                      </th>
                      <th className="text-center px-6 py-4 font-bold text-sm text-gray-700 dark:text-gray-300 w-[24%]">Comparison</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Density</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">lb/in³</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-sm font-medium">{material1Data?.density?.toFixed(3) || "N/A"}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-sm font-medium">{material2Data?.density?.toFixed(3) || "N/A"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                            getComparisonValue(material1Data?.density, material2Data?.density) === "better"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                              : getComparisonValue(material1Data?.density, material2Data?.density) === "worse"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                          }`}>
                            {getComparisonValue(material1Data?.density, material2Data?.density) === "better" && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            )}
                            {getComparisonValue(material1Data?.density, material2Data?.density) === "better"
                              ? "Lower (Better)"
                              : getComparisonValue(material1Data?.density, material2Data?.density) === "worse"
                              ? "Higher"
                              : "Equal"}
                          </span>
                        </div>
                      </td>
                    </tr>
                    
                    <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Thermal Expansion</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">×10⁻⁶ in/in/°F</div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-sm font-medium">{material1Data?.expansion?.toFixed(1) || "N/A"}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="font-mono text-sm font-medium">{material2Data?.expansion?.toFixed(1) || "N/A"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                            getComparisonValue(material1Data?.expansion, material2Data?.expansion) === "better"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                              : getComparisonValue(material1Data?.expansion, material2Data?.expansion) === "worse"
                              ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                          }`}>
                            {getComparisonValue(material1Data?.expansion, material2Data?.expansion) === "better" && (
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                            )}
                            {getComparisonValue(material1Data?.expansion, material2Data?.expansion) === "better"
                              ? "Lower (Better)"
                              : getComparisonValue(material1Data?.expansion, material2Data?.expansion) === "worse"
                              ? "Higher"
                              : "Equal"}
                          </span>
                        </div>
                      </td>
                    </tr>

                    {(material1Data?.tensileStrength !== undefined && material2Data?.tensileStrength !== undefined) && (
                      <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Tensile Strength</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">ksi</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-sm font-medium">{material1Data.tensileStrength.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-sm font-medium">{material2Data.tensileStrength.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              getComparisonValue(material1Data.tensileStrength, material2Data.tensileStrength) === "better"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                : getComparisonValue(material1Data.tensileStrength, material2Data.tensileStrength) === "worse"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                            }`}>
                              {getComparisonValue(material1Data.tensileStrength, material2Data.tensileStrength) === "better" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              )}
                              {getComparisonValue(material1Data.tensileStrength, material2Data.tensileStrength) === "better"
                                ? "Higher (Better)"
                                : getComparisonValue(material1Data.tensileStrength, material2Data.tensileStrength) === "worse"
                                ? "Lower"
                                : "Equal"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}

                    {(material1Data?.yieldStrength !== undefined && material2Data?.yieldStrength !== undefined) && (
                      <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Yield Strength</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">ksi</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-sm font-medium">{material1Data.yieldStrength.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-sm font-medium">{material2Data.yieldStrength.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              getComparisonValue(material1Data.yieldStrength, material2Data.yieldStrength) === "better"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                : getComparisonValue(material1Data.yieldStrength, material2Data.yieldStrength) === "worse"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                            }`}>
                              {getComparisonValue(material1Data.yieldStrength, material2Data.yieldStrength) === "better" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              )}
                              {getComparisonValue(material1Data.yieldStrength, material2Data.yieldStrength) === "better"
                                ? "Higher (Better)"
                                : getComparisonValue(material1Data.yieldStrength, material2Data.yieldStrength) === "worse"
                                ? "Lower"
                                : "Equal"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}

                    {(material1Data?.hardness !== undefined && material2Data?.hardness !== undefined) && (
                      <tr className="group hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-sm text-gray-900 dark:text-gray-100">Hardness</div>
                          <div className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">HB</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-sm font-medium">{material1Data.hardness.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="font-mono text-sm font-medium">{material2Data.hardness.toFixed(0)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                              getComparisonValue(material1Data.hardness, material2Data.hardness) === "better"
                                ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                                : getComparisonValue(material1Data.hardness, material2Data.hardness) === "worse"
                                ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                            }`}>
                              {getComparisonValue(material1Data.hardness, material2Data.hardness) === "better" && (
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                              )}
                              {getComparisonValue(material1Data.hardness, material2Data.hardness) === "better"
                                ? "Higher (Better)"
                                : getComparisonValue(material1Data.hardness, material2Data.hardness) === "worse"
                                ? "Lower"
                                : "Equal"}
                            </span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Database Overview */}
      <section className="py-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Database Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {categories.slice(0, 6).map(category => {
                const categoryMaterials = Object.values(materials).filter(m => m.category === category);
                return (
                  <div key={category} className="p-3 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-md">
                    <h3 className="font-bold text-xs mb-1">{category}</h3>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {categoryMaterials.length} materials
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {Object.keys(materials).length} total materials across {categories.length} categories
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>&copy; 2024 SpecFoundry. Built for engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

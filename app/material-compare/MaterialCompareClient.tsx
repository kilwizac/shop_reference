"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useNamespacedStorage } from "@/lib/hooks/useLocalStorage";
import { useUrlParams } from "@/lib/hooks/useUrlParams";
import materialsData from "@/data/materials.json";
import { EnhancedMaterial } from "@/lib/types/material";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ShareButton } from "@/components/ShareButton";
import { VisualAnalysis } from "@/components/VisualAnalysis";

export default function MaterialCompareClient() {
  const [selectedCategory1, setSelectedCategory1] = useState("All");
  const [selectedCategory2, setSelectedCategory2] = useState("All");

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

  const materials = materialsData as Record<string, EnhancedMaterial>;
  const material1Data = materials[prefs.material1] || materials["steel_1018"];
  const material2Data = materials[prefs.material2] || materials["aluminum_6061"];

  // Get unique categories
  const categories = Array.from(new Set(Object.values(materials).map(m => m.category).filter(Boolean))).sort();

  // Filter materials based on search and category
  const getFilteredMaterials = (searchTerm: string, category: string) => {
    return Object.entries(materials).filter(([key, material]) => {
      const matchesCategory = category === "All" || material.category === category;
      return matchesCategory;
    });
  };

  const filteredMaterials1 = getFilteredMaterials("", selectedCategory1);
  const filteredMaterials2 = getFilteredMaterials("", selectedCategory2);

  const getComparisonValue = (value1: number | undefined, value2: number | undefined, higherIsBetter = true) => {
    if (value1 === undefined || value2 === undefined) return "neutral";
    if (value1 === value2) return "equal";
    
    // For density, lower is usually better (lighter)
    // For strength/hardness, higher is better
    const v1Better = higherIsBetter ? value1 > value2 : value1 < value2;
    
    return v1Better ? "better" : "worse";
  };

  const material1Advantages: string[] = [];
  const material2Advantages: string[] = [];

  const compareProperty = (
    val1: number | undefined, 
    val2: number | undefined, 
    label: string, 
    higherIsBetter = true
  ) => {
    if (val1 !== undefined && val2 !== undefined && val1 !== val2) {
      const v1Better = higherIsBetter ? val1 > val2 : val1 < val2;
      if (v1Better) material1Advantages.push(label);
      else material2Advantages.push(label);
    }
  };

  compareProperty(material1Data?.density, material2Data?.density, "Lower Density (Lighter)", false);
  compareProperty(material1Data?.expansion, material2Data?.expansion, "Lower Thermal Expansion", false);
  compareProperty(material1Data?.tensileStrength, material2Data?.tensileStrength, "Higher Tensile Strength", true);
  compareProperty(material1Data?.yieldStrength, material2Data?.yieldStrength, "Higher Yield Strength", true);
  compareProperty(material1Data?.hardness, material2Data?.hardness, "Higher Hardness", true);

  const renderAdvantages = (advantages: string[], colorClass: string) => (
    <ul className="space-y-2 text-sm">
      {advantages.map((advantage) => (
        <li key={advantage} className="flex items-start gap-2">
          <svg className={`w-5 h-5 ${colorClass} shrink-0 mt-0.5`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-gray-700 dark:text-gray-300">{advantage}</span>
        </li>
      ))}
      {advantages.length === 0 && (
        <li className="text-gray-400 italic text-xs">No specific advantages</li>
      )}
    </ul>
  );

  const ComparisonRow = ({ 
    label, 
    unit, 
    val1, 
    val2, 
    higherIsBetter = true,
    digits = 3
  }: { 
    label: string, 
    unit: string, 
    val1: number | undefined, 
    val2: number | undefined, 
    higherIsBetter?: boolean,
    digits?: number
  }) => {
    const status = getComparisonValue(val1, val2, higherIsBetter);
    const maxVal = Math.max(val1 || 0, val2 || 0);
    const bar1 = val1 ? (val1 / maxVal) * 100 : 0;
    const bar2 = val2 ? (val2 / maxVal) * 100 : 0;

    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors px-4 rounded-lg">
        {/* Label */}
        <div className="md:col-span-4 flex flex-col justify-center">
          <div className="font-medium text-gray-900 dark:text-white">{label}</div>
          <div className="text-xs text-gray-500">{unit}</div>
        </div>

        {/* Material 1 Value */}
        <div className="md:col-span-4 flex flex-col justify-center">
           <div className="flex justify-between items-baseline mb-1">
             <span className={`font-mono font-medium ${status === "better" ? "text-teal-600 dark:text-teal-400" : "text-gray-900 dark:text-gray-300"}`}>
               {val1 !== undefined ? val1.toFixed(digits) : "---"}
             </span>
             {status === "better" && <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/30 px-1.5 py-0.5 rounded uppercase">Better</span>}
           </div>
           {val1 !== undefined && (
             <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${bar1}%` }}></div>
             </div>
           )}
        </div>

        {/* Material 2 Value */}
        <div className="md:col-span-4 flex flex-col justify-center">
           <div className="flex justify-between items-baseline mb-1">
             <span className={`font-mono font-medium ${status === "worse" ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-gray-300"}`}>
               {val2 !== undefined ? val2.toFixed(digits) : "---"}
             </span>
             {status === "worse" && <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/30 px-1.5 py-0.5 rounded uppercase">Better</span>}
           </div>
           {val2 !== undefined && (
             <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${bar2}%` }}></div>
             </div>
           )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-12 pb-8 bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-teal-600 dark:text-teal-400 mb-2 tracking-wider font-semibold">
                COMP-001 | REV C
              </div>
              <h1 className="text-4xl font-bold mb-3 tracking-tight">Material Compare</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Side-by-side comparison of material properties and performance.
              </p>
            </div>
            <ShareButton 
              getShareUrl={() => typeof window !== 'undefined' ? window.location.href : ''}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Selectors Area */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 mb-12 animate-fade-in-up">
             <div className="grid grid-cols-1 lg:grid-cols-9 gap-6 items-center">
                
                {/* Material 1 Selector */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-teal-500 shadow-sm"></div>
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Material A</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <select
                        value={selectedCategory1}
                        onChange={(e) => setSelectedCategory1(e.target.value)}
                        className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="All">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <select
                        value={prefs.material1}
                        onChange={(e) => updatePrefs({ material1: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white dark:bg-black border border-teal-200 dark:border-teal-900/50 rounded-lg text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all shadow-sm"
                      >
                        {filteredMaterials1.map(([key, material]) => (
                          <option key={key} value={key}>
                            {material.name}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div className="p-4 bg-teal-50/50 dark:bg-teal-900/10 rounded-xl border border-teal-100 dark:border-teal-900/30">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {material1Data?.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {material1Data?.description || "No description available."}
                    </p>
                  </div>
                </div>

                {/* VS / Swap */}
                <div className="lg:col-span-1 flex flex-col items-center justify-center py-4 lg:py-0">
                   <button 
                     onClick={() => updatePrefs({ material1: prefs.material2, material2: prefs.material1 })}
                     className="group p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all active:scale-95"
                     title="Swap Materials"
                   >
                     <svg className="w-5 h-5 text-gray-500 group-hover:text-gray-800 dark:group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                     </svg>
                   </button>
                </div>

                {/* Material 2 Selector */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Material B</span>
                    <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-sm"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                     <select
                        value={selectedCategory2}
                        onChange={(e) => setSelectedCategory2(e.target.value)}
                        className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="All">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <select
                        value={prefs.material2}
                        onChange={(e) => updatePrefs({ material2: e.target.value })}
                        className="w-full px-3 py-2.5 bg-white dark:bg-black border border-indigo-200 dark:border-indigo-900/50 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all shadow-sm"
                      >
                        {filteredMaterials2.map(([key, material]) => (
                          <option key={key} value={key}>
                            {material.name}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div className="p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30 text-right">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {material2Data?.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {material2Data?.description || "No description available."}
                    </p>
                  </div>
                </div>

             </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up delay-100">
             
             <div className="lg:col-span-2 space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
                   <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                     <h3 className="font-bold text-gray-900 dark:text-white">Property Comparison</h3>
                     <span className="text-xs text-gray-500">Bar lengths are relative</span>
                   </div>
                   
                   <div className="p-2">
                      <ComparisonRow 
                        label="Density" 
                        unit="lb/in³" 
                        val1={material1Data?.density} 
                        val2={material2Data?.density} 
                        higherIsBetter={false}
                      />
                      <ComparisonRow 
                        label="Thermal Expansion" 
                        unit="×10⁻⁶ in/in/°F" 
                        val1={material1Data?.expansion} 
                        val2={material2Data?.expansion} 
                        higherIsBetter={false}
                        digits={1}
                      />
                      <ComparisonRow 
                        label="Tensile Strength" 
                        unit="ksi" 
                        val1={material1Data?.tensileStrength} 
                        val2={material2Data?.tensileStrength} 
                        higherIsBetter={true}
                        digits={0}
                      />
                      <ComparisonRow 
                        label="Yield Strength" 
                        unit="ksi" 
                        val1={material1Data?.yieldStrength} 
                        val2={material2Data?.yieldStrength} 
                        higherIsBetter={true}
                        digits={0}
                      />
                      <ComparisonRow 
                        label="Hardness" 
                        unit="HB" 
                        val1={material1Data?.hardness} 
                        val2={material2Data?.hardness} 
                        higherIsBetter={true}
                        digits={0}
                      />
                   </div>
                </div>

                {/* Visual Analysis Area (Replaced) */}
                <VisualAnalysis 
                  material1={material1Data}
                  material2={material2Data}
                />
             </div>

             {/* Sidebar: Advantages */}
             <div className="lg:col-span-1 space-y-6">
               <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sticky top-24">
                 <h3 className="font-bold text-gray-900 dark:text-white mb-6">Key Advantages</h3>
                 
                 <div className="space-y-8">
                   <div className="relative pl-4 border-l-2 border-teal-500">
                     <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-teal-500 ring-4 ring-white dark:ring-gray-900"></div>
                     <h4 className="font-bold text-teal-600 dark:text-teal-400 mb-3">{material1Data?.name}</h4>
                     {renderAdvantages(material1Advantages, "text-teal-500")}
                   </div>

                   <div className="relative pl-4 border-l-2 border-indigo-500">
                     <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-white dark:ring-gray-900"></div>
                     <h4 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3">{material2Data?.name}</h4>
                     {renderAdvantages(material2Advantages, "text-indigo-500")}
                   </div>
                 </div>
               </div>
             </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/Tabs";
import { MaterialFilters } from "@/components/MaterialFilters";
import { MaterialCard } from "@/components/MaterialCard";
import { PropertyComparisonChart } from "@/components/MiniChart";
import { MaterialFilter, MaterialCategory, EnhancedMaterial } from "@/lib/types/material";
import materialsData from "@/data/materials.json";

// Define material categories
const categories: MaterialCategory[] = [
  { name: "Steel", subcategories: ["Carbon Steel", "Alloy Steel", "Tool Steel"], description: "Iron-based alloys", color: "blue" },
  { name: "Stainless Steel", subcategories: ["Austenitic", "Martensitic", "Ferritic"], description: "Corrosion-resistant steels", color: "gray" },
  { name: "Aluminum", subcategories: ["1xxx", "2xxx", "6xxx", "7xxx"], description: "Lightweight alloys", color: "green" },
  { name: "Titanium", subcategories: ["Commercially Pure", "Grade 5", "Grade 23"], description: "High-strength lightweight", color: "purple" },
  { name: "Copper Alloys", subcategories: ["Brass", "Bronze", "Copper"], description: "Conductive alloys", color: "orange" },
  { name: "Nickel Alloys", subcategories: ["Inconel", "Monel", "Hastelloy"], description: "High-temperature alloys", color: "yellow" },
  { name: "Plastics", subcategories: ["Thermoplastics", "Thermosets"], description: "Polymer materials", color: "pink" },
  { name: "Composites", subcategories: ["Carbon Fiber", "Fiberglass", "Kevlar"], description: "Reinforced materials", color: "indigo" },
  { name: "Ceramics", subcategories: ["Alumina", "Zirconia", "Silicon Carbide"], description: "High-temperature materials", color: "red" },
  { name: "Refractory Metals", subcategories: ["Tungsten", "Molybdenum", "Tantalum"], description: "Extreme temperature materials", color: "teal" },
  { name: "Magnesium", subcategories: ["AZ31", "AZ91"], description: "Lightweight structural", color: "cyan" },
  { name: "Wood", subcategories: ["Hardwood", "Softwood", "Engineered"], description: "Natural materials", color: "amber" },
  { name: "Elastomers", subcategories: ["Natural Rubber", "Silicone"], description: "Flexible materials", color: "lime" },
  { name: "Foams", subcategories: ["Polyurethane", "Polystyrene"], description: "Low-density materials", color: "slate" },
  { name: "Cast Iron", subcategories: ["Gray", "Ductile"], description: "Iron-based castings", color: "zinc" }
];

const hardnessData = [
  { hrc: "65", hrb: "-", hb: "739", hv: "865", ts: "327" },
  { hrc: "60", hrb: "-", hb: "595", hv: "697", ts: "270" },
  { hrc: "55", hrb: "-", hb: "513", hv: "595", ts: "233" },
  { hrc: "50", hrb: "-", hb: "469", hv: "544", ts: "213" },
  { hrc: "40", hrb: "-", hb: "371", hv: "430", ts: "168" },
  { hrc: "30", hrb: "-", hb: "286", hv: "332", ts: "130" },
  { hrc: "20", hrb: "-", hb: "226", hv: "262", ts: "103" },
  { hrc: "-", hrb: "100", hb: "241", hv: "278", ts: "110" },
];

const gaugeData = [
  { gauge: 30, steel: 0.0120, galvanized: 0.0157, aluminum: 0.0100, ss: 0.0125 },
  { gauge: 28, steel: 0.0149, galvanized: 0.0187, aluminum: 0.0126, ss: 0.0156 },
  { gauge: 26, steel: 0.0179, galvanized: 0.0217, aluminum: 0.0159, ss: 0.0187 },
  { gauge: 24, steel: 0.0239, galvanized: 0.0276, aluminum: 0.0201, ss: 0.0250 },
  { gauge: 22, steel: 0.0299, galvanized: 0.0336, aluminum: 0.0253, ss: 0.0312 },
  { gauge: 20, steel: 0.0359, galvanized: 0.0396, aluminum: 0.0320, ss: 0.0375 },
  { gauge: 18, steel: 0.0478, galvanized: 0.0516, aluminum: 0.0403, ss: 0.0500 },
  { gauge: 16, steel: 0.0598, galvanized: 0.0635, aluminum: 0.0508, ss: 0.0625 },
  { gauge: 14, steel: 0.0747, galvanized: 0.0785, aluminum: 0.0641, ss: 0.0781 },
  { gauge: 12, steel: 0.1046, galvanized: 0.1084, aluminum: 0.0808, ss: 0.1094 },
  { gauge: 11, steel: 0.1196, galvanized: 0.1233, aluminum: 0.0907, ss: 0.1250 },
  { gauge: 10, steel: 0.1345, galvanized: 0.1382, aluminum: 0.1019, ss: 0.1406 },
  { gauge: 8, steel: 0.1644, galvanized: 0.1681, aluminum: 0.1285, ss: 0.1719 },
  { gauge: 7, steel: 0.1793, galvanized: 0.1830, aluminum: 0.1443, ss: 0.1875 },
];

const selectionData = [
  { 
    title: "Machinability", 
    items: [
      { label: "Excellent (100%+)", value: "1018, 1215, 12L14" },
      { label: "Good (70-100%)", value: "1045, 4140, 6061-T6" },
      { label: "Fair (50-70%)", value: "304 SS, 4340" },
      { label: "Poor (<50%)", value: "316 SS, Titanium" },
    ]
  },
  {
    title: "Weldability",
    items: [
      { label: "Excellent", value: "1018, A36, 304 SS" },
      { label: "Good", value: "1045, 316 SS, 6061" },
      { label: "Fair", value: "4140, 4340" },
      { label: "Poor", value: "7075, 2024" },
    ]
  },
  {
    title: "Corrosion Resistance",
    items: [
      { label: "Excellent", value: "316 SS, Titanium" },
      { label: "Good", value: "304 SS, 5052, 6061" },
      { label: "Fair", value: "7075, 2024" },
      { label: "Poor", value: "1018, 1045, 4140" },
    ]
  },
  {
    title: "Cost (Relative)",
    items: [
      { label: "Low ($)", value: "A36, 1018, 1045" },
      { label: "Medium ($$)", value: "6061, 304 SS, 4140" },
      { label: "High ($$$)", value: "316 SS, 7075, 2024" },
      { label: "Very High ($$$$)", value: "Titanium, Inconel" },
    ]
  }
];

export default function MaterialsClient() {
  const [activeTab, setActiveTab] = useState("database");
  const [filters, setFilters] = useState<MaterialFilter>({});
  const [selectedMaterial, setSelectedMaterial] = useState<EnhancedMaterial | null>(null);
  const [showCharts, setShowCharts] = useState(false);
  const [showCitations, setShowCitations] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "density" | "strength">("name");

  // Export functionality
  const exportToCSV = () => {
    const headers = ['Name', 'Category', 'Subcategory', 'Density (lb/in³)', 'Expansion (×10⁻⁶)', 'Tensile Strength (ksi)', 'Yield Strength (ksi)', 'Hardness (HB)', 'Description', 'Applications'];
    const csvContent = [
      headers.join(','),
      ...filteredMaterials.map(material => [
        `"${material.name}"`,
        `"${material.category}"`,
        `"${material.subcategory || ''}"`,
        material.density,
        material.expansion,
        material.tensileStrength || '',
        material.yieldStrength || '',
        material.hardness || '',
        `"${material.description || ''}"`,
        `"${material.applications ? material.applications.join('; ') : ''}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'materials_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  const tabs = [
    { id: "database", label: "Database" },
    { id: "hardness", label: "Hardness Chart" },
    { id: "gauges", label: "Sheet & Wire Gauges" },
    { id: "selection", label: "Selection Guide" },
  ];

  // Filter and sort materials based on current filters and search
  const filteredMaterials = useMemo(() => {
    let materials = Object.values(materialsData) as EnhancedMaterial[];
    
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      materials = materials.filter(m => 
        m.name.toLowerCase().includes(query) ||
        m.category.toLowerCase().includes(query) ||
        (m.subcategory && m.subcategory.toLowerCase().includes(query)) ||
        (m.description && m.description.toLowerCase().includes(query)) ||
        (m.applications && m.applications.some(app => app.toLowerCase().includes(query)))
      );
    }
    
    if (filters.category) {
      materials = materials.filter(m => m.category === filters.category);
    }
    
    if (filters.subcategory) {
      materials = materials.filter(m => m.subcategory === filters.subcategory);
    }
    
    if (filters.densityRange) {
      materials = materials.filter(m => 
        m.density >= filters.densityRange![0] && m.density <= filters.densityRange![1]
      );
    }
    
    if (filters.expansionRange) {
      materials = materials.filter(m => 
        m.expansion >= filters.expansionRange![0] && m.expansion <= filters.expansionRange![1]
      );
    }
    
    if (filters.tensileStrengthRange) {
      materials = materials.filter(m => 
        m.tensileStrength && 
        m.tensileStrength >= filters.tensileStrengthRange![0] && 
        m.tensileStrength <= filters.tensileStrengthRange![1]
      );
    }
    
    if (filters.yieldStrengthRange) {
      materials = materials.filter(m => 
        m.yieldStrength && 
        m.yieldStrength >= filters.yieldStrengthRange![0] && 
        m.yieldStrength <= filters.yieldStrengthRange![1]
      );
    }
    
    if (filters.hardnessRange) {
      materials = materials.filter(m => 
        m.hardness && 
        m.hardness >= filters.hardnessRange![0] && 
        m.hardness <= filters.hardnessRange![1]
      );
    }
    
    // Sort materials
    materials.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "density":
          return b.density - a.density;
        case "strength":
          return (b.tensileStrength || 0) - (a.tensileStrength || 0);
        default:
          return 0;
      }
    });
    
    return materials;
  }, [filters, searchQuery, sortBy]);

  // Get material count by category
  const materialCountByCategory = useMemo(() => {
    const materials = Object.values(materialsData) as EnhancedMaterial[];
    const counts: Record<string, number> = {};
    materials.forEach(m => {
      counts[m.category] = (counts[m.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 pb-8 bg-gray-50 dark:bg-gray-900/20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 mb-2 tracking-wider font-semibold">
                MAT-002 | REV B
              </div>
              <h1 className="text-4xl font-bold mb-3 tracking-tight">Material Database</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Technical specifications, grades, and properties for engineering materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-6">
          {activeTab === "database" && (
            <div className="space-y-6">
              {/* Sticky Controls Bar - Same as before */}
              <div className="sticky top-0 z-10 -mx-6 px-6 py-4 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 transition-all">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                  {/* Search */}
                  <div className="relative w-full lg:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name, grade, or property..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
                    {/* View Toggle */}
                    <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
                        title="Grid View"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400" : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`}
                        title="List View"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "name" | "density" | "strength")}
                      className="text-sm bg-transparent font-medium text-gray-700 dark:text-gray-300 border-none focus:ring-0 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      <option value="name">Sort: Name</option>
                      <option value="density">Sort: Density</option>
                      <option value="strength">Sort: Strength</option>
                    </select>

                    <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>

                    {/* Feature Toggles */}
                    <div className="flex items-center gap-2">
                       <button
                         onClick={() => setShowCharts(!showCharts)}
                         className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${showCharts ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                       >
                         Charts
                       </button>
                       <button
                         onClick={() => setShowCitations(!showCitations)}
                         className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${showCitations ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}
                       >
                         Citations
                       </button>
                    </div>

                    {/* Export */}
                    <button
                      onClick={exportToCSV}
                      className="ml-auto px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition-opacity text-sm font-medium flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Export</span>
                    </button>
                  </div>
                </div>

                {/* Active Filters Summary */}
                {(filters.category || searchQuery || Object.values(filters).some(v => v !== undefined && typeof v !== 'string')) && (
                  <div className="flex items-center gap-2 flex-wrap mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 animate-fade-in-up">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Active:</span>
                    {filters.category && (
                      <button
                        onClick={() => setFilters({...filters, category: undefined, subcategory: undefined})}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs border border-blue-100 dark:border-blue-800 hover:bg-blue-100 transition-colors"
                      >
                        {filters.category}
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-200 dark:border-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        Search: "{searchQuery}"
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setFilters({});
                        setSearchQuery("");
                      }}
                      className="text-xs text-red-600 dark:text-red-400 hover:underline ml-auto"
                    >
                      Clear all
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filters Sidebar */}
                <aside className="lg:col-span-1">
                  <div className="sticky top-32">
                    <MaterialFilters
                      onFilterChange={setFilters}
                      categories={categories}
                      currentFilters={filters}
                    />
                  </div>
                </aside>

                {/* Materials Grid/List */}
                <div className="lg:col-span-3">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredMaterials.length}</span> materials
                    </div>
                  </div>

                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {filteredMaterials.map((material, index) => (
                        <div 
                          key={index}
                          style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
                          className="animate-fade-in-up opacity-0 fill-mode-forwards"
                        >
                          <MaterialCard
                            material={material}
                            showCharts={showCharts}
                            showCitations={showCitations}
                            onSelect={setSelectedMaterial}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredMaterials.map((material, index) => (
                        <div
                          key={index}
                          style={{ animationDelay: `${Math.min(index * 30, 500)}ms` }}
                          className="animate-fade-in-up opacity-0 fill-mode-forwards"
                        >
                          <MaterialCard
                            material={material}
                            showCharts={showCharts}
                            showCitations={showCitations}
                            onSelect={setSelectedMaterial}
                            viewMode="list"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {filteredMaterials.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        No materials found
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                      <button 
                        onClick={() => { setFilters({}); setSearchQuery(""); }}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Comparison Charts */}
              {showCharts && filteredMaterials.length > 1 && (
                <div className="mt-12 animate-fade-in-up">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Comparative Analysis
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <PropertyComparisonChart
                        materials={filteredMaterials}
                        property="density"
                        unit="lb/in³"
                      />
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <PropertyComparisonChart
                        materials={filteredMaterials}
                        property="expansion"
                        unit="×10⁻⁶ in/in/°F"
                      />
                    </div>
                    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
                      <PropertyComparisonChart
                        materials={filteredMaterials.filter(m => m.tensileStrength)}
                        property="tensileStrength"
                        unit="ksi"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hardness Conversion Tab */}
          {activeTab === "hardness" && (
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <h2 className="text-xl font-bold">Hardness Conversion Table</h2>
                  <p className="text-sm text-gray-500 mt-1">Approximate equivalent hardness numbers for steel</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <th className="px-6 py-4 font-semibold">Rockwell C (HRC)</th>
                        <th className="px-6 py-4 font-semibold">Rockwell B (HRB)</th>
                        <th className="px-6 py-4 font-semibold">Brinell (HB)</th>
                        <th className="px-6 py-4 font-semibold">Vickers (HV)</th>
                        <th className="px-6 py-4 font-semibold">Tensile (ksi)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {hardnessData.map((row, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm font-medium">{row.hrc}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.hrb}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.hb}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.hv}</td>
                          <td className="px-6 py-4 font-mono text-sm text-blue-600 dark:text-blue-400">{row.ts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Gauges Tab - NEW */}
          {activeTab === "gauges" && (
            <div className="max-w-4xl mx-auto animate-fade-in-up">
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                  <h2 className="text-xl font-bold">Standard Sheet Metal Gauges</h2>
                  <p className="text-sm text-gray-500 mt-1">Thickness in inches</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        <th className="px-6 py-4 font-semibold">Gauge No.</th>
                        <th className="px-6 py-4 font-semibold">Standard Steel</th>
                        <th className="px-6 py-4 font-semibold">Galvanized</th>
                        <th className="px-6 py-4 font-semibold">Aluminum (B&S)</th>
                        <th className="px-6 py-4 font-semibold">Stainless</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {gaugeData.map((row) => (
                        <tr key={row.gauge} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <td className="px-6 py-4 font-mono text-sm font-bold">{row.gauge}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.steel.toFixed(4)}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.galvanized.toFixed(4)}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.aluminum.toFixed(4)}</td>
                          <td className="px-6 py-4 font-mono text-sm text-gray-600 dark:text-gray-400">{row.ss.toFixed(4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Material Selection Guide Tab */}
          {activeTab === "selection" && (
            <div className="animate-fade-in-up">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Selection Guide</h2>
                <p className="text-gray-600 dark:text-gray-400">Compare materials by key performance characteristics.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectionData.map((section, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                      {section.title}
                    </h3>
                    <div className="space-y-3">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-start text-sm group">
                          <span className="font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                            {item.label}
                          </span>
                          <span className="font-mono text-right text-gray-700 dark:text-gray-300 ml-4">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

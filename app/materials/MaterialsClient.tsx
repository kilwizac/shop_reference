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
    { id: "database", label: "Material Database" },
    { id: "hardness", label: "Hardness Conversion" },
    { id: "selection", label: "Material Selection" },
  ];

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
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />

      {/* Header */}
      <section className="border-b border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2 tracking-wider">
            MAT-002 | REV B | MATERIAL SPECIFICATIONS
          </div>
          <h1 className="text-4xl font-bold mb-3">Materials</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Material properties, grades, hardness values, and selection guides
            for machining and fabrication
          </p>
        </div>
      </section>

      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Enhanced Material Database Tab */}
          {activeTab === "database" && (
            <div className="space-y-8">
              {/* Header Section */}
              <div>
                <h2 className="text-2xl font-bold mb-2">Material Database</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive material properties with filtering, charts, and citations
                </p>
              </div>

              {/* Quick Category Navigation */}
              {!filters.category && !searchQuery && (
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-4">Browse by Category</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setFilters({...filters, category: category.name})}
                        className="group relative border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-md"
                      >
                        <div className="text-left">
                          <div className="text-sm font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            {category.description}
                          </div>
                          <div className="text-xs font-mono text-gray-400">
                            {materialCountByCategory[category.name] || 0} materials
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search and Controls Bar */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search Bar */}
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search materials by name, category, or application..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                          <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-2">
                    {/* Sort */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "name" | "density" | "strength")}
                      className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                    >
                      <option value="name">Sort: Name</option>
                      <option value="density">Sort: Density</option>
                      <option value="strength">Sort: Strength</option>
                    </select>

                    {/* View Mode */}
                    <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`px-3 py-2 text-sm ${viewMode === "grid" ? "bg-gray-200 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}`}
                        title="Grid view"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`px-3 py-2 text-sm border-l border-gray-300 dark:border-gray-600 ${viewMode === "list" ? "bg-gray-200 dark:bg-gray-700" : "bg-white dark:bg-gray-800"}`}
                        title="List view"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Export */}
                    <button
                      onClick={exportToCSV}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      title="Export to CSV"
                    >
                      Export
                    </button>
                  </div>
                </div>

                {/* Display Options */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCharts}
                      onChange={(e) => setShowCharts(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Show Charts</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showCitations}
                      onChange={(e) => setShowCitations(e.target.checked)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Show Citations</span>
                  </label>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.category || searchQuery) && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                  {filters.category && (
                    <button
                      onClick={() => setFilters({...filters, category: undefined, subcategory: undefined})}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {filters.category}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                    >
                      Search: "{searchQuery}"
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setFilters({});
                      setSearchQuery("");
                    }}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Clear all
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <MaterialFilters
                    onFilterChange={setFilters}
                    categories={categories}
                    currentFilters={filters}
                  />
                </div>

                {/* Materials Grid/List */}
                <div className="lg:col-span-3">
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Showing <span className="font-semibold">{filteredMaterials.length}</span> materials
                    </div>
                  </div>

                  {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {filteredMaterials.map((material, index) => (
                        <MaterialCard
                          key={index}
                          material={material}
                          showCharts={showCharts}
                          showCitations={showCitations}
                          onSelect={setSelectedMaterial}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredMaterials.map((material, index) => (
                        <MaterialCard
                          key={index}
                          material={material}
                          showCharts={showCharts}
                          showCitations={showCitations}
                          onSelect={setSelectedMaterial}
                          viewMode="list"
                        />
                      ))}
                    </div>
                  )}

                  {filteredMaterials.length === 0 && (
                    <div className="text-center py-16 border border-gray-200 dark:border-gray-800 rounded-lg">
                      <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                        No materials found
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-500">
                        Try adjusting your search or filters
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Property Comparison Charts */}
              {showCharts && filteredMaterials.length > 1 && (
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Property Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <PropertyComparisonChart
                      materials={filteredMaterials}
                      property="density"
                      unit="lb/in³"
                    />
                    <PropertyComparisonChart
                      materials={filteredMaterials}
                      property="expansion"
                      unit="×10⁻⁶ in/in/°F"
                    />
                    <PropertyComparisonChart
                      materials={filteredMaterials.filter(m => m.tensileStrength)}
                      property="tensileStrength"
                      unit="ksi"
                    />
                  </div>
                </div>
              )}
            </div>
          )}



          {/* Hardness Conversion Tab */}
          {activeTab === "hardness" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Hardness Conversion Chart
              </h2>

              <div className="border border-gray-200 dark:border-gray-800">
                <table className="w-full">
                  <thead className="border-b border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="text-left p-4 font-bold text-sm">
                        Rockwell C (HRC)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Rockwell B (HRB)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Brinell (HB)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Vickers (HV)
                      </th>
                      <th className="text-left p-4 font-bold text-sm">
                        Tensile Strength (ksi)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">65</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">739</td>
                      <td className="p-4 font-mono text-sm">865</td>
                      <td className="p-4 font-mono text-sm">327</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">60</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">595</td>
                      <td className="p-4 font-mono text-sm">697</td>
                      <td className="p-4 font-mono text-sm">270</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">55</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">513</td>
                      <td className="p-4 font-mono text-sm">595</td>
                      <td className="p-4 font-mono text-sm">233</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">50</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">469</td>
                      <td className="p-4 font-mono text-sm">544</td>
                      <td className="p-4 font-mono text-sm">213</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">40</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">371</td>
                      <td className="p-4 font-mono text-sm">430</td>
                      <td className="p-4 font-mono text-sm">168</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">30</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">286</td>
                      <td className="p-4 font-mono text-sm">332</td>
                      <td className="p-4 font-mono text-sm">130</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="p-4 font-mono text-sm">20</td>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">226</td>
                      <td className="p-4 font-mono text-sm">262</td>
                      <td className="p-4 font-mono text-sm">103</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-sm">-</td>
                      <td className="p-4 font-mono text-sm">100</td>
                      <td className="p-4 font-mono text-sm">241</td>
                      <td className="p-4 font-mono text-sm">278</td>
                      <td className="p-4 font-mono text-sm">110</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {/* Material Selection Guide Tab */}
          {activeTab === "selection" && (
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Material Selection Guide
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Machinability</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Excellent (100%+):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        1018, 1215, 12L14
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Good (70-100%):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        1045, 4140, 6061-T6
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fair (50-70%):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        304 SS, 4340
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Poor (&lt;50%):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        316 SS, Titanium
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Weldability</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Excellent:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        1018, A36, 304 SS
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Good:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        1045, 316 SS, 6061
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fair:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        4140, 4340
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Poor:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        7075, 2024
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">
                    Corrosion Resistance
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Excellent:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        316 SS, Titanium
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Good:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        304 SS, 5052, 6061
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fair:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        7075, 2024
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Poor:</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        1018, 1045, 4140
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-bold mb-3">Cost (Relative)</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Low ($):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        A36, 1018, 1045
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium ($$):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        6061, 304 SS, 4140
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>High ($$$):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        316 SS, 7075, 2024
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Very High ($$$$):</span>
                      <span className="font-mono text-gray-600 dark:text-gray-400">
                        Titanium, Inconel
                      </span>
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

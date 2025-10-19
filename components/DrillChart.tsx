'use client';

import React, { useState, useMemo } from 'react';
import { Tabs } from './Tabs';
import { Table } from './Table';
import { SectionCard } from './SectionCard';
import { ResultCard } from './ResultCard';

interface DrillSize {
  size: string;
  diameter: number;
  decimal: string;
  fraction: string;
  tolerance: string;
}

interface DrillData {
  letterSizes: DrillSize[];
  numberSizes: DrillSize[];
  metricSizes: DrillSize[];
  bestPractices: {
    drillSelection: string[];
    holeQuality: string[];
    safety: string[];
  };
}

interface DrillChartProps {
  data: DrillData;
  className?: string;
}

export function DrillChart({ data, className = '' }: DrillChartProps) {
  const [activeTab, setActiveTab] = useState<'letter' | 'number' | 'metric'>('letter');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSize, setSelectedSize] = useState<DrillSize | null>(null);

  // Get current data based on active tab
  const currentData = useMemo(() => {
    switch (activeTab) {
      case 'letter':
        return data.letterSizes;
      case 'number':
        return data.numberSizes;
      case 'metric':
        return data.metricSizes;
      default:
        return data.letterSizes;
    }
  }, [activeTab, data]);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return currentData;
    
    const query = searchQuery.toLowerCase();
    return currentData.filter(item => 
      item.size.toLowerCase().includes(query) ||
      item.decimal.includes(query) ||
      item.fraction.toLowerCase().includes(query)
    );
  }, [currentData, searchQuery]);

  // Table columns configuration
  const columns = [
    { key: 'size', label: 'Size', width: 'w-20' },
    { key: 'decimal', label: 'Decimal (in)', width: 'w-32' },
    { key: 'fraction', label: 'Fraction', width: 'w-32' },
    { key: 'tolerance', label: 'Tolerance', width: 'w-24' },
    { key: 'actions', label: 'Actions', width: 'w-24' }
  ];

  // Handle size selection for detailed view
  const handleSizeSelect = (size: DrillSize) => {
    setSelectedSize(size);
  };

  // Handle copy to clipboard
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  // Render table row
  const renderRow = (item: DrillSize, index: number) => (
    <tr 
      key={`${activeTab}-${item.size}`}
      className="hover:bg-gray-50 cursor-pointer"
      onClick={() => handleSizeSelect(item)}
    >
      <td className="px-4 py-3 font-medium text-gray-900">{item.size}</td>
      <td className="px-4 py-3 text-gray-700">{item.decimal}</td>
      <td className="px-4 py-3 text-gray-700">{item.fraction}</td>
      <td className="px-4 py-3 text-gray-500 text-sm">{item.tolerance}</td>
      <td className="px-4 py-3">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCopy(`${item.size}: ${item.decimal}" (${item.fraction})`);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Copy
        </button>
      </td>
    </tr>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Drill Size Chart</h1>
        <p className="text-gray-600">Complete reference for letter, number, and metric drill sizes</p>
      </div>

      {/* Search and Tabs */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search drill sizes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            { id: 'letter', label: `Letter Sizes (A-Z) - ${data.letterSizes.length}` },
            { id: 'number', label: `Number Sizes (1-80) - ${data.numberSizes.length}` },
            { id: 'metric', label: `Metric Sizes (mm) - ${data.metricSizes.length}` }
          ]}
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab as 'letter' | 'number' | 'metric')}
        />
      </div>

      {/* Drill Size Table */}
      <SectionCard title={`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Drill Sizes`}>
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} className={`px-4 py-3 text-left text-sm font-medium text-gray-900 ${column.width}`}>
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                    No {activeTab} drill sizes found matching your search.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => renderRow(item, index))
              )}
            </tbody>
          </table>
        </div>
      </SectionCard>

      {/* Selected Size Details Modal */}
      {selectedSize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setSelectedSize(null)} />
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                Drill Size {selectedSize.size} Details
              </h3>
              <button
                onClick={() => setSelectedSize(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{selectedSize.size}</div>
                <div className="text-sm text-gray-600">Size</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{selectedSize.decimal}"</div>
                <div className="text-sm text-gray-600">Decimal</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{selectedSize.fraction}"</div>
                <div className="text-sm text-gray-600">Fraction</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{selectedSize.tolerance}</div>
                <div className="text-sm text-gray-600">Tolerance</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(`${selectedSize.size}: ${selectedSize.decimal}"`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy Decimal
              </button>
              <button
                onClick={() => handleCopy(`${selectedSize.size}: ${selectedSize.fraction}"`)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Copy Fraction
              </button>
              <button
                onClick={() => handleCopy(`${selectedSize.size}: ${selectedSize.decimal}" (${selectedSize.fraction})`)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Copy All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SectionCard title="Drill Selection Best Practices">
          <ul className="space-y-2">
            {data.bestPractices.drillSelection.map((practice, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
        </SectionCard>


        <SectionCard title="Hole Quality">
          <ul className="space-y-2">
            {data.bestPractices.holeQuality.map((practice, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-600 mr-2">•</span>
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Safety Guidelines">
          <ul className="space-y-2">
            {data.bestPractices.safety.map((practice, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-600 mr-2">•</span>
                <span className="text-gray-700">{practice}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}

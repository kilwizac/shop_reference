import { Metadata } from 'next';
import { DrillChart } from '@/components/DrillChart';
import drillData from '@/data/drill-sizes.json';

export const metadata: Metadata = {
  title: 'Drill Size Chart - Letter, Number & Metric | SpecFoundry',
  description: 'Complete drill size reference with letter (A-Z), number (1-80), and metric drill sizes. Includes decimals, fractions, tolerances, and best practices for drill selection.',
  keywords: [
    'drill size chart',
    'letter drill sizes',
    'number drill sizes', 
    'metric drill sizes',
    'drill bit sizes',
    'hole chart',
    'drill index',
    'decimal drill sizes',
    'fraction drill sizes',
    'drill tolerances'
  ],
  openGraph: {
    title: 'Drill Size Chart - Complete Reference',
    description: 'Comprehensive drill size chart with letter, number, and metric sizes including decimals, fractions, and best practices.',
    type: 'website',
  },
};

export default function DrillChartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <DrillChart data={drillData} />
      </div>
    </div>
  );
}

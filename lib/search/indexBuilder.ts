/**
 * Search index builder for SpecFoundry
 * Processes all data sources into searchable format
 */

import materialsData from '../../data/materials.json';
import threadsMetricData from '../../data/threads-metric.json';
import threadsUncData from '../../data/threads-unc.json';
import iso286FitsData from '../../data/iso286-fits.json';
import drillData from '../../data/drill-sizes.json';
import { SearchableItem, SearchCategory } from '../types/search';

// Calculator pages and their metadata
const CALCULATOR_PAGES = [
  {
    id: 'material-calculator',
    title: 'Material Calculator',
    description: 'Calculate weight, volume, and thermal expansion for various materials and shapes',
    url: '/material-calculator',
    keywords: ['weight', 'volume', 'thermal', 'expansion', 'density', 'shapes', 'materials']
  },
  {
    id: 'thread-calculator',
    title: 'Thread Calculator',
    description: 'Calculate tap drill sizes, thread engagement, and torque for UNC, UNF, UNEF, and NPT threads',
    url: '/thread-calculator',
    keywords: ['thread', 'tap', 'drill', 'torque', 'engagement', 'unc', 'unf', 'unef', 'npt', 'metric']
  },
  {
    id: 'tolerance-calculator',
    title: 'Tolerance Calculator',
    description: 'Calculate ISO 286 fits, tolerances, and dimensional specifications',
    url: '/tolerance-calculator',
    keywords: ['tolerance', 'fit', 'iso286', 'clearance', 'interference', 'transition', 'dimensions']
  },
  {
    id: 'material-compare',
    title: 'Material Compare',
    description: 'Compare material properties side by side',
    url: '/material-compare',
    keywords: ['compare', 'materials', 'properties', 'side by side']
  },
  {
    id: 'drill-chart',
    title: 'Drill Size Chart',
    description: 'Complete drill size reference with letter, number, and metric sizes',
    url: '/drill-chart',
    keywords: ['drill', 'size', 'chart', 'letter', 'number', 'metric', 'hole', 'decimal', 'fraction']
  }
];

// Reference pages
type ReferencePage = {
  id: string;
  title: string;
  description: string;
  url: string;
  category: SearchCategory;
  keywords: string[];
};

const REFERENCE_PAGES: ReferencePage[] = [
  {
    id: 'materials',
    title: 'Materials Reference',
    description: 'Comprehensive material properties database',
    url: '/materials',
    category: 'materials',
    keywords: ['materials', 'properties', 'database', 'reference']
  },
  {
    id: 'tolerances',
    title: 'Tolerances Reference',
    description: 'ISO 286 tolerance standards and specifications',
    url: '/tolerances',
    category: 'fits',
    keywords: ['tolerances', 'standards', 'iso286', 'specifications']
  },
  {
    id: 'standards',
    title: 'Standards Reference',
    description: 'Manufacturing and machining standards',
    url: '/standards',
    category: 'standards',
    keywords: ['standards', 'manufacturing', 'machining', 'reference']
  },
  {
    id: 'processes',
    title: 'Processes Reference',
    description: 'Manufacturing processes and procedures',
    url: '/processes',
    category: 'processes',
    keywords: ['processes', 'manufacturing', 'procedures', 'reference']
  }
];

export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];

  // Add calculator pages
  CALCULATOR_PAGES.forEach(page => {
    items.push({
      id: page.id,
      title: page.title,
      description: page.description,
      category: 'calculators',
      keywords: page.keywords,
      action: {
        type: 'navigate',
        payload: { url: page.url }
      },
      priority: 10
    });
  });

  // Add reference pages
  REFERENCE_PAGES.forEach(page => {
    items.push({
      id: page.id,
      title: page.title,
      description: page.description,
      category: page.category,
      keywords: page.keywords,
      action: {
        type: 'navigate',
        payload: { url: page.url }
      },
      priority: 8
    });
  });

  // Add materials
  Object.entries(materialsData).forEach(([key, material]) => {
    items.push({
      id: `material-${key}`,
      title: material.name,
      description: `Density: ${material.density} lb/in^3, Expansion: ${material.expansion} x10^-6 in/in/degF`,
      category: 'materials',
      keywords: [
        material.name.toLowerCase(),
        key,
        'density',
        'expansion',
        'tensile',
        'yield',
        'hardness',
        'steel',
        'aluminum',
        'brass',
        'copper',
        'titanium',
        'bronze',
        'cast iron'
      ],
      action: {
        type: 'navigate',
        payload: { 
          url: '/materials',
          data: { material: key }
        }
      },
      priority: 7
    });

    // Add copy actions for material properties
    if (material.density) {
      items.push({
        id: `material-${key}-density`,
        title: `${material.name} Density`,
        description: `${material.density} lb/in^3`,
        category: 'materials',
        keywords: [material.name.toLowerCase(), 'density', key],
        action: {
          type: 'copy',
          payload: { data: `${material.density} lb/in^3` }
        },
        priority: 5
      });
    }
  });

  // Add metric threads
  threadsMetricData.forEach(thread => {
    items.push({
      id: `thread-metric-${thread.size}`,
      title: `Metric Thread ${thread.size}`,
      description: `Diameter: ${thread.diameter}mm, Pitch: ${thread.pitch}mm, Tap Drill: ${thread.tapDrill}mm`,
      category: 'threads',
      keywords: [
        thread.size.toLowerCase(),
        'metric',
        'thread',
        'm' + thread.diameter,
        'diameter',
        'pitch',
        'tap',
        'drill'
      ],
      action: {
        type: 'navigate',
        payload: { 
          url: '/thread-calculator',
          data: { thread: thread.size, system: 'metric' }
        }
      },
      priority: 6
    });
  });

  // Add UNC threads
  threadsUncData.forEach(thread => {
    items.push({
      id: `thread-unc-${thread.size}`,
      title: `UNC Thread ${thread.size}`,
      description: `Major: ${thread.major}", TPI: ${thread.tpi}, Tap Drill: ${thread.tapDrill}`,
      category: 'threads',
      keywords: [
        thread.size.toLowerCase(),
        'unc',
        'thread',
        'tpi',
        'major',
        'tap',
        'drill',
        'imperial'
      ],
      action: {
        type: 'navigate',
        payload: { 
          url: '/thread-calculator',
          data: { thread: thread.size, system: 'imperial' }
        }
      },
      priority: 6
    });
  });

  // Add ISO 286 fits
  iso286FitsData.forEach(fit => {
    items.push({
      id: `fit-${fit.designation}`,
      title: `ISO 286 Fit ${fit.designation}`,
      description: `${fit.type} - ${fit.description}`,
      category: 'fits',
      keywords: [
        fit.designation.toLowerCase(),
        'fit',
        'iso286',
        fit.type.toLowerCase(),
        fit.description.toLowerCase(),
        'clearance',
        'interference',
        'transition'
      ],
      action: {
        type: 'navigate',
        payload: { 
          url: '/tolerance-calculator',
          data: { fit: fit.designation }
        }
      },
      priority: 5
    });
  });


  // Add drill sizes - Letter sizes
  drillData.letterSizes.forEach(drill => {
    items.push({
      id: `drill-letter-${drill.size}`,
      title: `Letter Drill ${drill.size}`,
      description: `${drill.decimal}" (${drill.fraction}) - ${drill.tolerance}`,
      category: 'drill',
      keywords: [
        `drill ${drill.size}`,
        'letter drill',
        drill.size.toLowerCase(),
        drill.decimal,
        drill.fraction,
        'hole size',
        'drill bit'
      ],
      action: {
        type: 'copy',
        payload: { data: `${drill.size}: ${drill.decimal}" (${drill.fraction})` }
      },
      priority: 6
    });
  });

  // Add drill sizes - Number sizes
  drillData.numberSizes.forEach(drill => {
    items.push({
      id: `drill-number-${drill.size}`,
      title: `Number Drill ${drill.size}`,
      description: `${drill.decimal}" (${drill.fraction}) - ${drill.tolerance}`,
      category: 'drill',
      keywords: [
        `drill ${drill.size}`,
        'number drill',
        drill.size,
        drill.decimal,
        drill.fraction,
        'hole size',
        'drill bit'
      ],
      action: {
        type: 'copy',
        payload: { data: `${drill.size}: ${drill.decimal}" (${drill.fraction})` }
      },
      priority: 6
    });
  });

  // Add drill sizes - Metric sizes
  drillData.metricSizes.forEach(drill => {
    items.push({
      id: `drill-metric-${drill.size}`,
      title: `Metric Drill ${drill.size}mm`,
      description: `${drill.decimal}mm (${drill.fraction}) - ${drill.tolerance}`,
      category: 'drill',
      keywords: [
        `drill ${drill.size}mm`,
        'metric drill',
        drill.size,
        drill.decimal,
        drill.fraction,
        'hole size',
        'drill bit',
        'mm'
      ],
      action: {
        type: 'copy',
        payload: { data: `${drill.size}mm: ${drill.decimal}mm (${drill.fraction})` }
      },
      priority: 6
    });
  });

  return items;
}

export function getSearchIndex(): SearchableItem[] {
  // In a real app, you might want to cache this or load it asynchronously
  return buildSearchIndex();
}






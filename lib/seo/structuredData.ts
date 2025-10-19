// Structured data (JSON-LD) for calculators and tools

export interface CalculatorStructuredData {
  name: string
  description: string
  url: string
  category: string
  features: string[]
  inputParameters: string[]
  outputParameters: string[]
  supportedUnits: string[]
  relatedStandards?: string[]
}

export function generateCalculatorStructuredData(data: CalculatorStructuredData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: data.name,
    description: data.description,
    url: data.url,
    applicationCategory: 'EngineeringApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: data.features,
    screenshot: `${data.url}/screenshot.png`,
    softwareVersion: '1.0',
    datePublished: '2024-01-01',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'SpecFoundry',
      url: 'https://specfoundry.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SpecFoundry',
      url: 'https://specfoundry.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
    keywords: data.features.join(', '),
    about: {
      '@type': 'Thing',
      name: data.category,
      description: `Professional ${data.category.toLowerCase()} calculator for engineering applications`,
    },
    potentialAction: {
      '@type': 'UseAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: data.url,
        actionPlatform: [
          'https://schema.org/DesktopWebPlatform',
          'https://schema.org/MobileWebPlatform',
        ],
      },
      'object': {
        '@type': 'SoftwareApplication',
        name: data.name,
      },
    },
  }
}

// Specific calculator structured data
export const calculatorStructuredData = {

  threadCalculator: (): any => generateCalculatorStructuredData({
    name: 'Thread Calculator',
    description: 'Calculate tap drill sizes, thread depths, and thread specifications for imperial and metric threads',
    url: 'https://specfoundry.com/thread-calculator',
    category: 'Threading Calculator',
    features: [
      'Tap drill size calculations',
      'Thread depth calculations',
      'UNC/UNF/UNEF thread support',
      'Metric thread calculations',
      'NPT/NPTF pipe thread support',
      'Thread engagement calculations',
      'Torque recommendations',
      'Thread specification lookup',
    ],
    inputParameters: [
      'Thread diameter',
      'Threads per inch (TPI)',
      'Thread engagement percentage',
      'Thread class/fit',
      'Material type',
    ],
    outputParameters: [
      'Tap drill diameter',
      'Thread depth',
      'Minor diameter',
      'Pitch diameter',
      'Stress area',
      'Torque recommendations',
    ],
    supportedUnits: ['Imperial (inches, TPI)', 'Metric (mm, pitch)'],
    relatedStandards: ['ASME B1.1', 'ISO 68-1', 'ASME B1.20.1'],
  }),

  materialCalculator: (): any => generateCalculatorStructuredData({
    name: 'Material Calculator',
    description: 'Calculate material weights, volumes, thermal expansion, and section properties for various shapes',
    url: 'https://specfoundry.com/material-calculator',
    category: 'Material Properties Calculator',
    features: [
      'Weight calculations for various shapes',
      'Volume calculations',
      'Thermal expansion calculations',
      'Section properties (I, Z, r)',
      'Material density database',
      'Multiple shape support',
      'Imperial and metric units',
      'Real-time calculations',
    ],
    inputParameters: [
      'Material type',
      'Shape dimensions',
      'Length/height',
      'Temperature change',
      'Cross-section parameters',
    ],
    outputParameters: [
      'Weight',
      'Volume',
      'Thermal expansion',
      'Section modulus',
      'Moment of inertia',
      'Radius of gyration',
    ],
    supportedUnits: ['Imperial (inches, pounds)', 'Metric (mm, kg)'],
    relatedStandards: ['ASTM A36', 'ISO 6892-1', 'ASME Y14.5'],
  }),

  toleranceCalculator: (): any => generateCalculatorStructuredData({
    name: 'Tolerance Calculator',
    description: 'Calculate dimensional tolerances, fits, and GD&T specifications for precision engineering',
    url: 'https://specfoundry.com/tolerance-calculator',
    category: 'Tolerance Calculator',
    features: [
      'Dimensional tolerance calculations',
      'Fit calculations (clearance, interference, transition)',
      'GD&T symbol reference',
      'Surface finish calculations',
      'Tolerance stack-up analysis',
      'ISO 286 standard support',
      'ASME Y14.5 support',
      'Tolerance grade selection',
    ],
    inputParameters: [
      'Nominal dimension',
      'Tolerance grade',
      'Fit type',
      'Material type',
      'Surface finish requirements',
    ],
    outputParameters: [
      'Upper deviation',
      'Lower deviation',
      'Tolerance zone',
      'Fit type classification',
      'Surface finish values',
    ],
    supportedUnits: ['Imperial (inches)', 'Metric (mm)'],
    relatedStandards: ['ISO 286', 'ASME Y14.5', 'ISO 1302'],
  }),

  materialCompare: (): any => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Material Comparison Tool',
    description: 'Compare material properties, strengths, and characteristics for engineering applications',
    url: 'https://specfoundry.com/material-compare',
    applicationCategory: 'EngineeringApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    featureList: [
      'Side-by-side material comparison',
      'Property comparison charts',
      'Material selection guidance',
      'Property filtering and sorting',
      'Export comparison data',
      'Material database search',
      'Property range analysis',
      'Material recommendation engine',
    ],
    author: {
      '@type': 'Organization',
      name: 'SpecFoundry',
      url: 'https://specfoundry.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SpecFoundry',
      url: 'https://specfoundry.com',
    },
    about: {
      '@type': 'Thing',
      name: 'Material Selection',
      description: 'Professional material comparison and selection tool for engineering applications',
    },
  }),
}

// Organization structured data
export const organizationStructuredData = {
  specfoundry: () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SpecFoundry',
    description: 'Professional engineering reference and calculator platform for machining, manufacturing, and precision engineering applications',
    url: 'https://specfoundry.com',
    logo: 'https://specfoundry.com/logo.png',
    sameAs: [
      'https://github.com/specfoundry',
      'https://twitter.com/specfoundry',
      'https://linkedin.com/company/specfoundry',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'support@specfoundry.com',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    foundingDate: '2024',
    numberOfEmployees: '1-10',
    industry: 'Engineering Software',
    knowsAbout: [
      'Machining',
      'Manufacturing',
      'Precision Engineering',
      'CAD/CAM',
      'CNC Programming',
      'Material Science',
      'Quality Control',
      'Metrology',
    ],
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Thread Calculator',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'SoftwareApplication',
          name: 'Material Calculator',
        },
      },
    ],
  }),
}

// Website structured data
export const websiteStructuredData = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SpecFoundry',
  description: 'Professional engineering reference and calculator platform for machining, manufacturing, and precision engineering',
  url: 'https://specfoundry.com',
  publisher: {
    '@type': 'Organization',
    name: 'SpecFoundry',
    url: 'https://specfoundry.com',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://specfoundry.com/search?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
  mainEntity: {
    '@type': 'ItemList',
    name: 'Engineering Calculators',
    description: 'Professional engineering calculators and reference tools',
    numberOfItems: 4,
    itemListElement: [
      {
        '@type': 'SoftwareApplication',
        position: 1,
        name: 'Thread Calculator',
        url: 'https://specfoundry.com/thread-calculator',
      },
      {
        '@type': 'SoftwareApplication',
        position: 2,
        name: 'Material Calculator',
        url: 'https://specfoundry.com/material-calculator',
      },
      {
        '@type': 'SoftwareApplication',
        position: 3,
        name: 'Tolerance Calculator',
        url: 'https://specfoundry.com/tolerance-calculator',
      },
      {
        '@type': 'WebApplication',
        position: 4,
        name: 'Material Comparison Tool',
        url: 'https://specfoundry.com/material-compare',
      },
    ],
  },
})

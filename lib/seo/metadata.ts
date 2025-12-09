import { Metadata } from 'next'

interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  openGraph?: {
    title?: string
    description?: string
    type?: 'website' | 'article'
    url?: string
    image?: string
    siteName?: string
  }
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player'
    title?: string
    description?: string
    image?: string
    creator?: string
    site?: string
  }
  structuredData?: StructuredData
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    openGraph,
    twitter,
  } = config

  const baseUrl = 'https://specfoundry.com'
  const fullTitle = title.includes('SpecFoundry') ? title : `${title} | SpecFoundry`
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : undefined

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: 'SpecFoundry Team' }],
    creator: 'SpecFoundry',
    publisher: 'SpecFoundry',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: openGraph?.title || fullTitle,
      description: openGraph?.description || description,
      type: openGraph?.type || 'website',
      url: openGraph?.url || canonicalUrl,
      siteName: openGraph?.siteName || 'SpecFoundry',
      images: openGraph?.image ? [
        {
          url: openGraph.image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ] : [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ],
    },
    twitter: {
      card: twitter?.card || 'summary_large_image',
      title: twitter?.title || fullTitle,
      description: twitter?.description || description,
      images: twitter?.image ? [twitter.image] : [`${baseUrl}/og-image.png`],
      creator: twitter?.creator || '@specfoundry',
      site: twitter?.site || '@specfoundry',
    },
    other: {
      'application-name': 'SpecFoundry',
      'apple-mobile-web-app-title': 'SpecFoundry',
      'msapplication-TileColor': '#000000',
      'theme-color': '#000000',
    },
  }
}

export const calculatorMetadata = {
  threadCalculator: (): SEOConfig => ({
    title: 'Thread Calculator',
    description: 'Calculate tap drill sizes, thread depths, and thread specifications for imperial and metric threads. Includes UNC, UNF, UNEF, and NPT thread calculations.',
    keywords: [
      'thread calculator',
      'tap drill calculator',
      'thread depth calculator',
      'thread specifications',
      'UNC calculator',
      'UNF calculator',
      'metric thread calculator',
      'NPT calculator',
      'thread engagement',
      'thread pitch calculator',
      'threading calculator',
      'machining threads',
      'thread standards',
      'thread dimensions',
    ],
    canonical: '/thread-calculator',
    openGraph: {
      title: 'Thread Calculator - Tap Drill & Thread Specifications',
      description: 'Professional thread calculator for tap drill sizes, thread depths, and specifications. Supports imperial and metric threads.',
      type: 'website',
      url: 'https://specfoundry.com/thread-calculator',
    },
    twitter: {
      title: 'Thread Calculator - Tap Drill & Specifications',
      description: 'Calculate tap drill sizes, thread depths, and thread specifications for imperial and metric threads.',
    },
  }),

  materialCalculator: (): SEOConfig => ({
    title: 'Material Calculator',
    description: 'Calculate material weights, volumes, thermal expansion, and section properties for various shapes and materials. Supports imperial and metric units.',
    keywords: [
      'material calculator',
      'weight calculator',
      'volume calculator',
      'thermal expansion calculator',
      'section properties calculator',
      'material weight',
      'material density',
      'structural calculator',
      'engineering calculator',
      'material properties',
      'weight calculation',
      'volume calculation',
      'thermal expansion',
      'section modulus',
      'moment of inertia',
    ],
    canonical: '/material-calculator',
    openGraph: {
      title: 'Material Calculator - Weight, Volume & Properties',
      description: 'Calculate material weights, volumes, thermal expansion, and section properties for engineering applications.',
      type: 'website',
      url: 'https://specfoundry.com/material-calculator',
    },
    twitter: {
      title: 'Material Calculator - Weight & Properties',
      description: 'Calculate material weights, volumes, thermal expansion, and section properties for various shapes.',
    },
  }),

  toleranceCalculator: (): SEOConfig => ({
    title: 'Tolerance Calculator',
    description: 'Calculate dimensional tolerances, fits, and GD&T specifications for precision engineering applications. Includes ISO 286 and ASME Y14.5 standards.',
    keywords: [
      'tolerance calculator',
      'dimensional tolerances',
      'fits calculator',
      'GD&T calculator',
      'precision calculator',
      'ISO 286 calculator',
      'ASME Y14.5',
      'tolerance analysis',
      'dimensional analysis',
      'engineering tolerances',
      'manufacturing tolerances',
      'tolerance stack up',
      'precision engineering',
      'tolerance standards',
    ],
    canonical: '/tolerance-calculator',
    openGraph: {
      title: 'Tolerance Calculator - Dimensional Tolerances & Fits',
      description: 'Calculate dimensional tolerances, fits, and GD&T specifications for precision engineering applications.',
      type: 'website',
      url: 'https://specfoundry.com/tolerance-calculator',
    },
    twitter: {
      title: 'Tolerance Calculator - Dimensional Tolerances',
      description: 'Calculate dimensional tolerances, fits, and GD&T specifications for precision engineering.',
    },
  }),

  materialCompare: (): SEOConfig => ({
    title: 'Material Comparison Tool',
    description: 'Compare material properties, strengths, and characteristics side-by-side. Make informed decisions for material selection in engineering applications.',
    keywords: [
      'material comparison',
      'material properties',
      'material selection',
      'engineering materials',
      'material database',
      'material comparison tool',
      'material properties comparison',
      'material selection guide',
      'engineering materials',
      'material characteristics',
      'material strength comparison',
      'material properties database',
      'material selection tool',
      'engineering material comparison',
    ],
    canonical: '/material-compare',
    openGraph: {
      title: 'Material Comparison Tool - Engineering Materials',
      description: 'Compare material properties, strengths, and characteristics for informed material selection.',
      type: 'website',
      url: 'https://specfoundry.com/material-compare',
    },
    twitter: {
      title: 'Material Comparison Tool',
      description: 'Compare material properties, strengths, and characteristics for engineering applications.',
    },
  }),
}

export const referenceMetadata = {
  tolerances: (): SEOConfig => ({
    title: 'Tolerance Reference',
    description: 'Comprehensive tolerance reference including standard fits, GD&T symbols, surface finish standards, and dimensional tolerances for precision engineering.',
    keywords: [
      'tolerance reference',
      'dimensional tolerances',
      'standard fits',
      'GD&T reference',
      'surface finish standards',
      'precision engineering',
      'tolerance tables',
      'engineering tolerances',
      'manufacturing tolerances',
      'tolerance standards',
      'ISO tolerances',
      'ASME tolerances',
      'tolerance charts',
      'precision reference',
    ],
    canonical: '/tolerances',
  }),

  materials: (): SEOConfig => ({
    title: 'Material Properties Reference',
    description: 'Comprehensive material properties database including steel, aluminum, titanium, and other engineering materials with mechanical properties and characteristics.',
    keywords: [
      'material properties',
      'material database',
      'engineering materials',
      'steel properties',
      'aluminum properties',
      'titanium properties',
      'material characteristics',
      'mechanical properties',
      'material specifications',
      'engineering material database',
      'material properties reference',
      'material data',
      'material specifications',
      'engineering material properties',
    ],
    canonical: '/materials',
  }),

  processes: (): SEOConfig => ({
    title: 'Manufacturing Processes Reference',
    description: 'Comprehensive reference for manufacturing processes including machining, fabrication, and assembly operations with process parameters and guidelines.',
    keywords: [
      'manufacturing processes',
      'machining processes',
      'fabrication processes',
      'manufacturing reference',
      'process parameters',
      'manufacturing guidelines',
      'production processes',
      'manufacturing operations',
      'process engineering',
      'manufacturing methods',
      'production methods',
      'manufacturing techniques',
      'process optimization',
      'manufacturing standards',
    ],
    canonical: '/processes',
  }),

  standards: (): SEOConfig => ({
    title: 'Engineering Standards Reference',
    description: 'Comprehensive reference for engineering standards including ISO, ANSI, ASME, and other international standards for manufacturing and engineering.',
    keywords: [
      'engineering standards',
      'ISO standards',
      'ANSI standards',
      'ASME standards',
      'manufacturing standards',
      'engineering specifications',
      'standards reference',
      'international standards',
      'engineering codes',
      'manufacturing codes',
      'standards database',
      'engineering regulations',
      'manufacturing regulations',
      'standards compliance',
    ],
    canonical: '/standards',
  }),
}

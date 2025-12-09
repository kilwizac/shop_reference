# SpecFoundry

**Professional Engineering Tools & Reference Platform**

SpecFoundry is a comprehensive web application providing professional-grade calculators, material databases, and reference tools for machining, manufacturing, and precision applications.

## Features

### Calculators
- **Thread Calculator** - Tap drill sizes, thread depths, and specifications for imperial and metric threads
- **Tolerance Calculator** - Dimensional tolerances, fits, and GD&T specifications
- **Material Calculator** - Weight, volume, thermal expansion, and section properties
- **Material Comparison Tool** - Side-by-side material property comparisons

### Reference Database
- **Material Properties** - Engineering materials with mechanical properties
- **Tolerance Reference** - Standard fits, GD&T symbols, and dimensional tolerances
- **Process Guides** - Manufacturing processes and operational parameters
- **Standards Reference** - ISO, ANSI, ASME, and international standards

## Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **Testing**: Vitest
- **Linting**: Biome
- **Deployment**: Vercel

## Quick Start

```bash
# Clone the repository
git clone https://github.com/kilwizac/shop_reference.git
cd shop_reference

# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:3000
```

### Environment Setup

Create a `.env.local` file:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=your_ga_id

# Google Search Console (optional)
NEXT_PUBLIC_GSC_VERIFICATION=your_verification_code
```

## Project Structure

```
shop_reference/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   ├── privacy/                  # Privacy policy
│   ├── drill-chart/              # Drill chart reference
│   ├── thread-calculator/        # Thread calculator
│   ├── tolerance-calculator/     # Tolerance calculator
│   ├── material-calculator/      # Material calculator
│   ├── material-compare/         # Material comparison tool
│   ├── materials/                # Materials reference
│   ├── tolerances/               # Tolerances reference
│   ├── processes/                # Processes reference
│   └── standards/                # Standards reference
├── components/                   # Reusable UI components
├── lib/                          # Utility functions and logic
│   ├── contexts/                 # React contexts
│   ├── hooks/                    # Custom React hooks
│   ├── search/                   # Search functionality
│   ├── seo/                      # SEO utilities
│   ├── types/                    # TypeScript types
│   └── utils/                    # Helper functions
├── data/                         # Static data files (materials.json)
└── public/                       # Static assets
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
npm run test         # Run tests with Vitest
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

**Built for the engineering community**

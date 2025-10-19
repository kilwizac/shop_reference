# SpecFoundry

**Professional Engineering Tools & Reference Platform**

SpecFoundry is a comprehensive web application providing professional-grade calculators, material databases, and reference tools for machining, manufacturing, and precision applications. Built with modern web technologies and optimized for performance, accessibility, and user experience.

## 🚀 Features

### **Advanced Calculators**
- **Thread Calculator** - Tap drill sizes, thread depths, and specifications for imperial and metric threads
- **Tolerance Calculator** - Dimensional tolerances, fits, and GD&T specifications
- **Material Calculator** - Weight, volume, thermal expansion, and section properties
- **Material Comparison Tool** - Side-by-side material property comparisons

### **Comprehensive Reference Database**
- **Material Properties** - Extensive database of engineering materials with mechanical properties
- **Tolerance Reference** - Standard fits, GD&T symbols, and dimensional tolerances
- **Process Guides** - Manufacturing processes and operational parameters
- **Standards Reference** - ISO, ANSI, ASME, and international standards

### **Professional Features**
- **Global Search** - Quick access to all tools and reference materials
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode** - User preference support with system detection
- **SEO Optimized** - Comprehensive metadata and structured data
- **Analytics Integration** - Google Analytics for usage insights

## 🛠️ Technology Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS 4.0 with custom design system
- **Testing**: Vitest for unit testing
- **Linting**: Biome for code quality and formatting
- **Deployment**: Vercel-ready with optimized build process

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun package manager
- Modern web browser with JavaScript enabled

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/kilwizac/shop_reference.git
cd shop_reference

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev

# Open http://localhost:3000 in your browser
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Google Analytics (optional)
NEXT_PUBLIC_GA_ID=G-4G1TTCZS6F

# Google Search Console (optional)
NEXT_PUBLIC_GSC_VERIFICATION=your_verification_code
```

## 📁 Project Structure

```
specfoundry/
├── app/                          # Next.js App Router pages
│   ├── about/                    # About page
│   ├── privacy/                  # Privacy policy
│   ├── calculators/              # Calculator pages
│   │   ├── thread-calculator/
│   │   ├── tolerance-calculator/
│   │   └── material-calculator/
│   └── references/               # Reference pages
│       ├── materials/
│       ├── tolerances/
│       ├── processes/
│       └── standards/
├── components/                   # Reusable UI components
├── lib/                         # Utility functions and logic
│   ├── contexts/                # React contexts
│   ├── hooks/                   # Custom React hooks
│   ├── search/                  # Search functionality
│   ├── seo/                     # SEO utilities
│   └── utils/                   # Helper functions
├── data/                        # Static data files
└── public/                      # Static assets
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run Biome linter
npm run format       # Format code with Biome

# Testing
npm run test         # Run tests with Vitest
npm run test:ui      # Run tests with UI
npm run test:run     # Run tests once
```

## 🎨 Design System

SpecFoundry uses a custom design system built on Tailwind CSS with:

- **Color Palette**: Professional engineering aesthetic
- **Typography**: Geist font family for optimal readability
- **Components**: Consistent, accessible UI components
- **Responsive**: Mobile-first design approach
- **Accessibility**: WCAG 2.1 AA compliant

## 📊 Performance

- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting
- **Caching**: Optimized caching strategies
- **Bundle Size**: Minimized JavaScript bundles

## 🔒 Security

- **Content Security Policy**: Comprehensive CSP headers
- **HTTPS**: Enforced secure connections
- **Data Protection**: Privacy-first data handling
- **Input Validation**: Client and server-side validation

## 📈 Analytics & SEO

- **Google Analytics**: User behavior tracking
- **Structured Data**: Rich snippets for search engines
- **Meta Tags**: Comprehensive SEO metadata
- **Sitemap**: Automatic sitemap generation
- **Robots.txt**: Search engine optimization

## 🤝 Contributing

We welcome contributions to SpecFoundry! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check our comprehensive documentation
- **Issues**: Report bugs via GitHub Issues
- **Contact**: privacy@specfoundry.com
- **Website**: [SpecFoundry.com](https://specfoundry.com)

## 🙏 Acknowledgments

- Engineering standards from ISO, ANSI, and ASME
- Material property data from industry sources
- Open source community contributions
- Modern web development best practices

---

**Built with ❤️ for the engineering community**

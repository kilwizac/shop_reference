"use client";

import Link from "next/link";
import { SearchButton } from "@/components/SearchButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getKeyboardShortcuts } from "@/lib/utils/platform";

// Custom SVG Icons for categories
const ToleranceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
  </svg>
);

const MaterialIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ProcessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
  </svg>
);

const StandardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <path d="M14 2v6h6" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
  </svg>
);

const ThreadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 3v18" />
    <path d="M6 7l12 2M6 11l12 2M6 15l12 2" />
  </svg>
);

const CalculatorIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <circle cx="8" cy="11" r="1" fill="currentColor" />
    <circle cx="12" cy="11" r="1" fill="currentColor" />
    <circle cx="16" cy="11" r="1" fill="currentColor" />
    <circle cx="8" cy="15" r="1" fill="currentColor" />
    <circle cx="12" cy="15" r="1" fill="currentColor" />
    <circle cx="16" cy="15" r="1" fill="currentColor" />
    <circle cx="8" cy="19" r="1" fill="currentColor" />
    <circle cx="12" cy="19" r="1" fill="currentColor" />
    <circle cx="16" cy="19" r="1" fill="currentColor" />
  </svg>
);

const CompareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <rect x="3" y="3" width="7" height="18" rx="1" />
    <rect x="14" y="3" width="7" height="18" rx="1" />
    <path d="M10 8h4M10 12h4M10 16h4" strokeDasharray="1 1" />
  </svg>
);

const DrillIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
    <path d="M12 2l-2 8h4l-2 8" />
    <circle cx="12" cy="20" r="2" />
  </svg>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 border border-gray-300 dark:border-gray-800 hover:border-gray-500 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-gray-50/50 dark:bg-transparent">
      <div className="w-12 h-12 mb-4 flex items-center justify-center text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export default function HomeContent() {
  const shortcuts = getKeyboardShortcuts();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.15] dark:opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-black" />
        </div>

        {/* Technical Corner Accents */}
        <div className="hidden sm:block absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-gray-400 dark:border-gray-700 opacity-70 dark:opacity-50 pointer-events-none" />
        <div className="hidden sm:block absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-gray-400 dark:border-gray-700 opacity-70 dark:opacity-50 pointer-events-none" />
        <div className="hidden sm:block absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-gray-400 dark:border-gray-700 opacity-70 dark:opacity-50 pointer-events-none" />
        <div className="hidden sm:block absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-gray-400 dark:border-gray-700 opacity-70 dark:opacity-50 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center">
            {/* Technical Badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-800">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-mono text-xs tracking-wider text-gray-600 dark:text-gray-400">
                ENGINEERING REFERENCE v2.0
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="block">Precision</span>
              <span className="block text-gray-600 dark:text-gray-400">
                Engineering Tools
              </span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              Professional calculators and reference data for machining, manufacturing, and precision engineering.
            </p>

            {/* Search CTA */}
            <div className="max-w-lg mx-auto mb-8">
              <SearchButton className="w-full shadow-lg hover:shadow-xl transition-shadow" />
            </div>

            {/* Standard References */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs font-mono text-gray-600 dark:text-gray-500">
              <span className="px-3 py-1 border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-transparent">ISO 286</span>
              <span className="px-3 py-1 border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-transparent">ASME Y14.5</span>
              <span className="px-3 py-1 border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-transparent">ANSI B4.1</span>
              <span className="px-3 py-1 border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-transparent">ISO 68-1</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Categories */}
      <section id="references" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-2xl font-bold">Reference Library</h2>
          <div className="flex-1 h-px bg-gray-300 dark:bg-gray-800" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              href: "/tolerances",
              icon: <ToleranceIcon />,
              title: "Tolerances",
              subtitle: "Fits & GD&T",
              items: ["Hole/shaft tolerances", "ISO fit classes", "Surface finish", "GD&T symbols"],
              code: "TOL"
            },
            {
              href: "/materials",
              icon: <MaterialIcon />,
              title: "Materials",
              subtitle: "Properties & Grades",
              items: ["Steel alloys", "Aluminum grades", "Hardness charts", "Thermal properties"],
              code: "MAT"
            },
            {
              href: "/processes",
              icon: <ProcessIcon />,
              title: "Processes",
              subtitle: "Machining & Fab",
              items: ["Cutting speeds", "Tool selection", "Operation guides", "Process standards"],
              code: "PRC"
            },
            {
              href: "/standards",
              icon: <StandardIcon />,
              title: "Standards",
              subtitle: "ISO, ANSI, ASME",
              items: ["Thread specs", "Fastener standards", "Weld symbols", "Drawing conventions"],
              code: "STD"
            }
          ].map((category, index) => (
            <Link key={category.href} href={category.href} className="group">
              <div className="h-full bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-800 p-6 hover:border-gray-500 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 group-hover:border-gray-500 dark:group-hover:border-gray-500 group-hover:text-black dark:group-hover:text-white transition-all">
                    {category.icon}
                  </div>
                  <span className="font-mono text-xs text-gray-400 dark:text-gray-600">
                    {category.code}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{category.subtitle}</p>

                {/* Items */}
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6">
                  {category.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                  <span>Browse references</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Calculators Section */}
      <section className="bg-gray-100 dark:bg-gray-900/30 border-y border-gray-300 dark:border-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-bold">Engineering Calculators</h2>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: "/thread-calculator",
                icon: <ThreadIcon />,
                title: "Thread Calculator",
                description: "Calculate thread dimensions, tap drill sizes, and thread engagement"
              },
              {
                href: "/tolerance-calculator",
                icon: <ToleranceIcon />,
                title: "Tolerance Calculator",
                description: "ISO 286 hole/shaft tolerance analysis and fit calculations"
              },
              {
                href: "/material-calculator",
                icon: <CalculatorIcon />,
                title: "Material Calculator",
                description: "Weight, volume, and material cost calculations"
              },
              {
                href: "/material-compare",
                icon: <CompareIcon />,
                title: "Material Compare",
                description: "Side-by-side comparison of material properties"
              }
            ].map((calc) => (
              <Link key={calc.href} href={calc.href} className="group">
                <div className="h-full bg-white dark:bg-black border border-gray-300 dark:border-gray-800 p-5 hover:border-gray-500 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {calc.icon}
                    </div>
                    <h3 className="font-semibold">{calc.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">{calc.description}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Tools Row */}
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <Link
              href="/drill-chart"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 bg-white dark:bg-transparent transition-colors"
            >
              <DrillIcon />
              <span>Drill Size Chart</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl font-bold">Why SpecFoundry</h2>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              }
              title="Instant Search"
              description={`Press ${shortcuts.mac} to find any material, thread, or fit instantly. No more flipping through handbooks.`}
            />
            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <path d="M9 12l2 2 4-4" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Verified Data"
              description="All specifications verified against official ISO, ANSI, and ASME standards."
            />
            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <path d="M4 4v16h16" />
                  <path d="M4 16l4-4 4 4 8-8" />
                </svg>
              }
              title="Always Current"
              description="Continuously updated with the latest specifications and manufacturing standards."
            />
            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="2" />
                </svg>
              }
              title="Works Everywhere"
              description="Access your references anywhere, on any device. Responsive design for shop floor or office."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-gray-300 dark:border-gray-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "350+", label: "Reference Entries" },
              { value: "56", label: "Materials" },
              { value: "6", label: "Calculators" },
              { value: "∞", label: "Calculations" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold mb-2 tabular-nums">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            All tools are free to use. No account required.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/materials"
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium hover:opacity-80 transition-opacity"
            >
              Browse Materials
            </Link>
            <Link
              href="/thread-calculator"
              className="px-6 py-3 border border-gray-400 dark:border-gray-700 font-medium hover:border-black dark:hover:border-white transition-colors"
            >
              Try Thread Calculator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

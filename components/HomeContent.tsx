"use client";

import Link from "next/link";
import { SearchButton } from "@/components/SearchButton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SectionCard } from "@/components/SectionCard";
import { getKeyboardShortcuts } from "@/lib/utils/platform";

export default function HomeContent() {
  const shortcuts = getKeyboardShortcuts();
  
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Header />

      {/* Hero Section - Industrial Design */}
      <section className="relative py-20 overflow-hidden">
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          {/* Technical Frame with Corner Brackets */}
          <div className="relative border border-gray-300 dark:border-gray-700 p-12 md:p-16">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-black dark:border-white -translate-x-2 -translate-y-2"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-black dark:border-white translate-x-2 -translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-black dark:border-white -translate-x-2 translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-black dark:border-white translate-x-2 translate-y-2"></div>

            {/* Technical Measurement Lines */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <div className="w-3 h-px bg-gray-400 dark:bg-gray-600"></div>
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600"></div>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600"></div>
              <div className="w-3 h-px bg-gray-400 dark:bg-gray-600"></div>
            </div>

            {/* Content */}
            <div className="text-center">
              <div className="inline-block mb-6">
                <div className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-2 tracking-wider">
                  REV A | DWG-001 | REFERENCE LIBRARY
                </div>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
                MACHINING & FABRICATION
                <br />
                <span className="text-gray-600 dark:text-gray-400">
                  REFERENCES
                </span>
              </h1>

              <div className="max-w-2xl mx-auto">
                <p className="text-base text-gray-600 dark:text-gray-400 mb-6">
                  Professional engineering calculators and reference tools for machining, manufacturing, and precision engineering. 
                  Access thread specifications, material properties, and tolerance analysis tools.
                </p>
                
                {/* Search CTA */}
                <div className="mb-6">
                  <SearchButton className="w-full max-w-md mx-auto" />
                </div>
                
                <div className="font-mono text-xs text-gray-500 dark:text-gray-500 tracking-wider">
                  ISO 286 | ASME Y14.5 | ANSI B4.1
                </div>
              </div>
            </div>
          </div>

          {/* Dimension Line */}
          <div className="flex items-center justify-center mt-4 gap-2">
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="font-mono text-xs text-gray-400 dark:text-gray-600">
              1200.00
            </span>
            <div className="w-8 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>
        </div>
      </section>

      {/* Reference Categories - Industrial Design */}
      <section id="references" className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/tolerances">
            <SectionCard
              partNumber="TOL-001"
              icon="⊕"
              title="Tolerances"
              subtitle="Standard fits and GD&T"
              hover
            >
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 flex-grow">
                <li>• Hole and shaft tolerances</li>
                <li>• Geometric dimensioning</li>
                <li>• Surface finish standards</li>
                <li>• Class fit specifications</li>
              </ul>
              <span className="text-sm font-medium hover:opacity-60 transition-opacity">
                View tolerance references →
              </span>
            </SectionCard>
          </Link>

          <Link href="/materials">
            <SectionCard
              partNumber="MAT-002"
              icon="◆"
              title="Materials"
              subtitle="Properties and grades"
              hover
            >
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 flex-grow">
                <li>• Steel and aluminum alloys</li>
                <li>• Material hardness charts</li>
                <li>• Thermal properties</li>
                <li>• Material selection guides</li>
              </ul>
              <span className="text-sm font-medium hover:opacity-60 transition-opacity">
                View material references →
              </span>
            </SectionCard>
          </Link>

          <Link href="/processes">
            <SectionCard
              partNumber="PRC-003"
              icon="⚙"
              title="Processes"
              subtitle="Machining and fabrication"
              hover
            >
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 flex-grow">
                <li>• Tool selection guides</li>
                <li>• Cutting parameters</li>
                <li>• Operation sequences</li>
                <li>• Process standards</li>
              </ul>
              <span className="text-sm font-medium hover:opacity-60 transition-opacity">
                View process references →
              </span>
            </SectionCard>
          </Link>

          <Link href="/standards">
            <SectionCard
              partNumber="STD-004"
              icon="≡"
              title="Standards"
              subtitle="ISO, ANSI, and ASME"
              hover
            >
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-6 flex-grow">
                <li>• Thread specifications</li>
                <li>• Fastener standards</li>
                <li>• Weld symbols reference</li>
                <li>• Drawing conventions</li>
              </ul>
              <span className="text-sm font-medium hover:opacity-60 transition-opacity">
                View standards references →
              </span>
            </SectionCard>
          </Link>
        </div>
      </section>

      {/* Features - Two Column Layout */}
      <section className="border-y border-gray-200 dark:border-gray-800 py-12" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto px-6">
          <h2 id="features-heading" className="sr-only">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            <article>
              <h3 className="text-xl font-bold mb-2">Global Search</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Press <kbd className="px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded font-medium text-gray-700">{shortcuts.mac}</kbd> or <kbd className="px-2 py-1 text-xs bg-gray-200 border border-gray-400 rounded font-medium text-gray-700">{shortcuts.windows}</kbd> to search materials, threads, fits, and calculators instantly. No more digging through handbooks.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-2">Verified Data</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All references verified against official engineering standards
                and industry best practices.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-2">Always Updated</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Regular updates ensure you have the latest specifications and
                manufacturing standards.
              </p>
            </article>

            <article>
              <h3 className="text-xl font-bold mb-2">Always Accessible</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your references anywhere, anytime. Works on all devices
                with a clean, responsive design.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Stats - Horizontal Layout */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center text-center">
            <div>
              <div className="text-4xl font-bold mb-1">350+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Reference Entries
              </div>
            </div>
            <div className="h-12 w-px bg-gray-200 dark:bg-gray-800"></div>
            <div>
              <div className="text-4xl font-bold mb-1">56</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Materials
              </div>
            </div>
            <div className="h-12 w-px bg-gray-200 dark:bg-gray-800"></div>
            <div>
              <div className="text-4xl font-bold mb-1">6</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Calculators
              </div>
            </div>
            <div className="h-12 w-px bg-gray-200 dark:bg-gray-800"></div>
            <div>
              <div className="text-4xl font-bold mb-1">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Access
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

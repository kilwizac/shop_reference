"use client";

import Link from "next/link";
import { useState } from "react";
import { SettingsPanel } from "@/components/SettingsPanel";
import { SearchButton } from "@/components/SearchButton";

interface HeaderProps {
  variant?: "default" | "minimal";
}

export function Header({ variant = "default" }: HeaderProps) {
  const [isReferencesOpen, setIsReferencesOpen] = useState(false);
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold hover:opacity-60 transition-opacity"
          >
            SpecFoundry
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center">
            <div className="relative">
              <button
                onClick={() => {
                  const newState = !isReferencesOpen;
                  setIsReferencesOpen(newState);
                  if (newState) {
                    setIsCalculatorsOpen(false);
                  }
                }}
                className="hover:opacity-60 transition-opacity text-sm flex items-center gap-1"
              >
                References
                <span className="text-xs">
                  {isReferencesOpen ? "▲" : "▼"}
                </span>
              </button>
              {isReferencesOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-[var(--z-dropdown)]">
                  <Link
                    href="/tolerances"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Tolerances
                  </Link>
                  <Link
                    href="/materials"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Materials
                  </Link>
                  <Link
                    href="/tooling"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Tooling
                  </Link>
                  <Link
                    href="/processes"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Processes
                  </Link>
                  <Link
                    href="/standards"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Standards
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => {
                  const newState = !isCalculatorsOpen;
                  setIsCalculatorsOpen(newState);
                  if (newState) {
                    setIsReferencesOpen(false);
                  }
                }}
                className="hover:opacity-60 transition-opacity text-sm flex items-center gap-1"
              >
                Calculators
                <span className="text-xs">
                  {isCalculatorsOpen ? "▲" : "▼"}
                </span>
              </button>
              {isCalculatorsOpen && (
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-[var(--z-dropdown)]">
                  <Link
                    href="/thread-calculator"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsCalculatorsOpen(false)}
                  >
                    Thread Calculator
                  </Link>
                  <Link
                    href="/tolerance-calculator"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsCalculatorsOpen(false)}
                  >
                    Tolerance Calculator
                  </Link>
                  <Link
                    href="/shop-math"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800 transition-colors"
                    onClick={() => setIsCalculatorsOpen(false)}
                  >
                    Shop Math
                  </Link>
                  <Link
                    href="/material-calculator"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                    onClick={() => setIsCalculatorsOpen(false)}
                  >
                    Material Calculator
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className="hover:opacity-60 transition-opacity text-sm"
            >
              About
            </Link>
            <Link
              href="/material-compare"
              className="hover:opacity-60 transition-opacity text-sm"
            >
              Material Compare
            </Link>
            <SearchButton variant="minimal" />
            <SettingsPanel />
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-2">
            <SearchButton variant="icon" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-800">
            <div className="pt-4 space-y-1">
              {/* References Section */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 px-2">References</h3>
                <div className="space-y-1">
                  <Link
                    href="/tolerances"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tolerances
                  </Link>
                  <Link
                    href="/materials"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Materials
                  </Link>
                  <Link
                    href="/tooling"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tooling
                  </Link>
                  <Link
                    href="/processes"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Processes
                  </Link>
                  <Link
                    href="/standards"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Standards
                  </Link>
                </div>
              </div>

              {/* Calculators Section */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 px-2">Calculators</h3>
                <div className="space-y-1">
                  <Link
                    href="/thread-calculator"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Thread Calculator
                  </Link>
                  <Link
                    href="/tolerance-calculator"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Tolerance Calculator
                  </Link>
                  <Link
                    href="/shop-math"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Shop Math
                  </Link>
                  <Link
                    href="/material-calculator"
                    className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Material Calculator
                  </Link>
                </div>
              </div>

              {/* Other Links */}
              <div className="space-y-1">
                <Link
                  href="/about"
                  className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/material-compare"
                  className="block px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Material Compare
                </Link>
              </div>

              {/* Mobile Settings */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <div className="px-4 py-2">
                  <SettingsPanel />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

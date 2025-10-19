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

  return (
    <nav className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold hover:opacity-60 transition-opacity"
          >
            SpecFoundry
          </Link>
          <div className="flex gap-8 items-center">
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
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-50">
                  <Link
                    href="/tolerances"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Tolerances
                  </Link>
                  <Link
                    href="/materials"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Materials
                  </Link>
                  <Link
                    href="/processes"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                    onClick={() => setIsReferencesOpen(false)}
                  >
                    Processes
                  </Link>
                  <Link
                    href="/standards"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
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
                <div className="absolute top-full mt-2 left-0 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 min-w-[200px] shadow-lg z-50">
                  <Link
                    href="/thread-calculator"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                    onClick={() => setIsCalculatorsOpen(false)}
                  >
                    Thread Calculator
                  </Link>
                  <Link
                    href="/tolerance-calculator"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                    onClick={() => setIsCalculatorsOpen(false)}
                  >
                    Tolerance Calculator
                  </Link>
                  <Link
                    href="/material-calculator"
                    className="block px-4 py-3 text-sm hover:bg-gray-100 dark:hover:bg-gray-900"
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
        </div>
      </div>
    </nav>
  );
}

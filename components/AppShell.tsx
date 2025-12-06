"use client";

import { ErrorBoundary } from "./ErrorBoundary";
import { AppSettingsProvider } from "@/lib/contexts/AppSettingsContext";
import { SearchProvider } from "@/lib/contexts/SearchContext";
import { CommandPalette } from "@/components/CommandPalette";
import { MobileFAB } from "@/components/MobileFAB";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <AppSettingsProvider>
        <SearchProvider>
          {children}
          <CommandPalette />
          <MobileFAB />
        </SearchProvider>
      </AppSettingsProvider>
    </ErrorBoundary>
  );
}

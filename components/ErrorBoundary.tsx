"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, info: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (this.props.onError) {
      this.props.onError(error, info);
    } else {
      // In production we still want some signal while keeping user-facing UI safe
      console.error("ErrorBoundary caught an error", { error, info });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-6">
            <div className="max-w-lg text-center space-y-3">
              <h2 className="text-2xl font-bold">Something went wrong</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please refresh the page. If the issue persists, try clearing saved calculator inputs.
              </p>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

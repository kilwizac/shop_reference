"use client";

import { useState } from 'react';

interface ShareButtonProps {
  getShareUrl: () => string;
  className?: string;
}

export function ShareButton({ getShareUrl, className = "" }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = getShareUrl();
    
    // Try native share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'SpecFoundry Calculator',
          url: url
        });
        return;
      } catch (error) {
        // User cancelled or share failed, fall back to copy
      }
    }
    
    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      title="Share this calculation"
    >
      {copied ? '✓ Link Copied!' : '🔗 Share'}
    </button>
  );
}


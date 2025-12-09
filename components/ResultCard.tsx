"use client";

import { useState } from 'react';
import { useAppSettings, type FormattedValue } from '@/lib/contexts/AppSettingsContext';

interface ResultItem {
  label: string;
  value: string | number;
  unit?: string;
  altValue?: string;
  altUnit?: string;
}

interface ResultCardProps {
  title: string;
  calculatorName: string;
  inputs: ResultItem[];
  outputs: ResultItem[];
  timestamp?: Date;
  className?: string;
}

export function ResultCard({
  title,
  calculatorName,
  inputs,
  outputs,
  timestamp = new Date(),
  className = ""
}: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const { settings } = useAppSettings();

  // Format results as text
  const formatAsText = () => {
    let text = `═══════════════════════════════════════\n`;
    text += `  SPECFOUNDRY - ${calculatorName.toUpperCase()}\n`;
    text += `═══════════════════════════════════════\n\n`;
    text += `${title}\n`;
    text += `Generated: ${timestamp.toLocaleString()}\n\n`;
    
    text += `INPUT PARAMETERS:\n`;
    text += `─────────────────────────────────────\n`;
    for (const item of inputs) {
      let valueStr = item.unit ? `${item.value} ${item.unit}` : item.value;
      if (item.altValue && item.altUnit) {
        valueStr += ` (${item.altValue} ${item.altUnit})`;
      }
      text += `  ${item.label}: ${valueStr}\n`;
    }
    
    text += `\nRESULTS:\n`;
    text += `─────────────────────────────────────\n`;
    for (const item of outputs) {
      let valueStr = item.unit ? `${item.value} ${item.unit}` : item.value;
      if (item.altValue && item.altUnit) {
        valueStr += ` (${item.altValue} ${item.altUnit})`;
      }
      text += `  ${item.label}: ${valueStr}\n`;
    }
    
    text += `\n═══════════════════════════════════════\n`;
    text += `  ${typeof window !== 'undefined' ? window.location.href : ''}\n`;
    text += `═══════════════════════════════════════\n`;
    
    return text;
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatAsText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Print results
  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${calculatorName} - ${title}</title>
          <style>
            @media print {
              @page { margin: 1in; }
            }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              line-height: 1.6;
            }
            .header {
              text-align: center;
              border-bottom: 3px solid #000;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .logo {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .calc-name {
              font-size: 14px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 2px;
            }
            .title {
              font-size: 20px;
              font-weight: bold;
              margin: 20px 0 10px 0;
            }
            .timestamp {
              font-size: 12px;
              color: #666;
              margin-bottom: 30px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-size: 14px;
              font-weight: bold;
              text-transform: uppercase;
              color: #666;
              margin-bottom: 15px;
              padding-bottom: 5px;
              border-bottom: 2px solid #ddd;
            }
            .item {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #eee;
            }
            .item-label {
              font-weight: 500;
            }
            .item-value {
              font-family: 'Courier New', monospace;
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #ddd;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">SpecFoundry</div>
            <div class="calc-name">${calculatorName}</div>
          </div>
          
          <div class="title">${title}</div>
          <div class="timestamp">Generated: ${timestamp.toLocaleString()}</div>
          
          <div class="section">
            <div class="section-title">Input Parameters</div>
            ${inputs.map(item => `
              <div class="item">
                <span class="item-label">${item.label}</span>
                <span class="item-value">${item.value}${item.unit ? ' ' + item.unit : ''}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="section">
            <div class="section-title">Results</div>
            ${outputs.map(item => `
              <div class="item">
                <span class="item-label">${item.label}</span>
                <span class="item-value">${item.value}${item.unit ? ' ' + item.unit : ''}</span>
              </div>
            `).join('')}
          </div>
          
          <div class="footer">
            <div>© ${new Date().getFullYear()} SpecFoundry - Built for engineers</div>
            <div>${typeof window !== 'undefined' ? window.location.href : ''}</div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    
    // Small delay to ensure content is loaded before printing
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className={`border border-gray-300 dark:border-gray-700 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-bold text-gray-600 dark:text-gray-400">
          RESULTS
        </h3>
        
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Copy results to clipboard"
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Print results"
          >
            🖨 Print
          </button>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        {timestamp.toLocaleString()}
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        {/* Inputs */}
        <div>
          <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
            INPUT PARAMETERS
          </div>
          <div className="space-y-2">
            {inputs.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                <div className="text-sm font-mono text-right">
                  <div className="text-black dark:text-white">
                    {item.value}{item.unit ? ` ${item.unit}` : ''}
                  </div>
                  {item.altValue && item.altUnit && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.altValue} {item.altUnit}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div>
          <div className="text-xs font-bold text-gray-600 dark:text-gray-400 mb-2">
            RESULTS
          </div>
          <div className="space-y-2">
            {outputs.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
                <div className="text-sm font-mono text-right">
                  <div className="text-black dark:text-white font-bold">
                    {item.value}{item.unit ? ` ${item.unit}` : ''}
                  </div>
                  {item.altValue && item.altUnit && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.altValue} {item.altUnit}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


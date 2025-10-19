/**
 * Search engine with fuzzy matching for SpecFoundry
 */

import { SearchableItem, SearchResult } from '../types/search';

/**
 * Simple fuzzy matching algorithm
 * Returns a score between 0 and 1, where 1 is a perfect match
 */
function fuzzyMatch(query: string, text: string): number {
  if (!query || !text) return 0;
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact match gets highest score
  if (textLower === queryLower) return 1;
  
  // Starts with query gets high score
  if (textLower.startsWith(queryLower)) return 0.9;
  
  // Contains query gets medium score
  if (textLower.includes(queryLower)) return 0.7;
  
  // Fuzzy matching - check if all query characters appear in order
  let queryIndex = 0;
  let score = 0;
  
  for (let i = 0; i < textLower.length && queryIndex < queryLower.length; i++) {
    if (textLower[i] === queryLower[queryIndex]) {
      queryIndex++;
      score += 1;
    }
  }
  
  // If all query characters were found, return proportional score
  if (queryIndex === queryLower.length) {
    return Math.min(0.6, score / queryLower.length);
  }
  
  return 0;
}

/**
 * Calculate search score for an item
 */
function calculateScore(query: string, item: SearchableItem): { score: number; matchedFields: string[] } {
  const matchedFields: string[] = [];
  let totalScore = 0;
  let fieldCount = 0;
  
  // Check title
  const titleScore = fuzzyMatch(query, item.title);
  if (titleScore > 0) {
    totalScore += titleScore * 3; // Title gets 3x weight
    fieldCount += 3;
    matchedFields.push('title');
  }
  
  // Check description
  if (item.description) {
    const descScore = fuzzyMatch(query, item.description);
    if (descScore > 0) {
      totalScore += descScore * 2; // Description gets 2x weight
      fieldCount += 2;
      matchedFields.push('description');
    }
  }
  
  // Check keywords
  const keywordMatches = item.keywords.filter(keyword => 
    fuzzyMatch(query, keyword) > 0
  );
  
  if (keywordMatches.length > 0) {
    const keywordScore = keywordMatches.reduce((sum, keyword) => 
      sum + fuzzyMatch(query, keyword), 0
    ) / keywordMatches.length;
    
    totalScore += keywordScore;
    fieldCount += 1;
    matchedFields.push('keywords');
  }
  
  // Apply priority multiplier
  const priorityMultiplier = item.priority ? item.priority / 10 : 1;
  const finalScore = fieldCount > 0 ? (totalScore / fieldCount) * priorityMultiplier : 0;
  
  return { score: finalScore, matchedFields };
}

/**
 * Search through items with fuzzy matching
 */
export function searchItems(query: string, items: SearchableItem[]): SearchResult[] {
  if (!query.trim()) {
    return items
      .filter(item => item.priority && item.priority >= 8)
      .map(item => ({
        ...item,
        score: item.priority ? item.priority / 10 : 0,
        matchedFields: ['priority']
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }
  
  const results: SearchResult[] = [];
  
  for (const item of items) {
    const { score, matchedFields } = calculateScore(query, item);
    
    if (score > 0.1) { // Minimum threshold
      results.push({
        ...item,
        score,
        matchedFields
      });
    }
  }
  
  // Sort by score (highest first)
  results.sort((a, b) => b.score - a.score);
  
  return results.slice(0, 20); // Limit to top 20 results
}

/**
 * Get search suggestions based on query
 */
export function getSuggestions(query: string, items: SearchableItem[]): string[] {
  if (!query.trim()) return [];
  
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();
  
  for (const item of items) {
    // Add title suggestions
    if (item.title.toLowerCase().includes(queryLower)) {
      suggestions.add(item.title);
    }
    
    // Add keyword suggestions
    for (const keyword of item.keywords) {
      if (keyword.toLowerCase().includes(queryLower)) {
        suggestions.add(keyword);
      }
    }
  }
  
  return Array.from(suggestions).slice(0, 5);
}

/**
 * Highlight matching text in search results
 */
export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

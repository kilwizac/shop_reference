/**
 * Utility functions for sanitizing user input to prevent XSS attacks
 */

/**
 * Escapes HTML special characters to prevent XSS
 * Converts <, >, &, ", ' to their HTML entity equivalents
 */
export function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char);
}

/**
 * Highlight matching text in search results with proper HTML escaping
 * This is a secure alternative to the original highlightMatch function
 */
export function highlightMatchSecure(text: string, query: string): string {
  if (!query.trim()) return escapeHtml(text);
  
  // Escape both text and query to prevent XSS
  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query);
  
  // Escape regex special characters in the query
  const regexSafeQuery = escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create regex and replace with highlighted version
  const regex = new RegExp(`(${regexSafeQuery})`, 'gi');
  return escapedText.replace(regex, '<mark>$1</mark>');
}

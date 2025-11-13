import { describe, it, expect } from 'vitest';
import { escapeHtml, highlightMatchSecure } from './sanitize';

describe('sanitize utilities', () => {
  describe('escapeHtml', () => {
    it('should escape HTML special characters', () => {
      expect(escapeHtml('<script>alert("xss")</script>')).toBe(
        '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;'
      );
    });

    it('should escape ampersands', () => {
      expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('should escape single quotes', () => {
      expect(escapeHtml("It's a test")).toBe('It&#x27;s a test');
    });

    it('should handle empty strings', () => {
      expect(escapeHtml('')).toBe('');
    });

    it('should handle strings with no special characters', () => {
      expect(escapeHtml('Hello World')).toBe('Hello World');
    });

    it('should escape all special characters at once', () => {
      const input = '<>&"\'/';
      const expected = '&lt;&gt;&amp;&quot;&#x27;&#x2F;';
      expect(escapeHtml(input)).toBe(expected);
    });
  });

  describe('highlightMatchSecure', () => {
    it('should highlight matching text without XSS vulnerability', () => {
      const result = highlightMatchSecure('Hello World', 'World');
      expect(result).toBe('Hello <mark>World</mark>');
    });

    it('should escape HTML in text before highlighting', () => {
      const result = highlightMatchSecure('<script>alert("xss")</script>', 'alert');
      expect(result).toContain('&lt;script&gt;');
      expect(result).toContain('<mark>alert</mark>');
      expect(result).not.toContain('<script>');
    });

    it('should escape HTML in query to prevent XSS', () => {
      const result = highlightMatchSecure('Test content', '<script>');
      // Query should not match because it's escaped
      expect(result).toBe('Test content');
      expect(result).not.toContain('<script>');
    });

    it('should handle case-insensitive matching', () => {
      const result = highlightMatchSecure('Hello World', 'world');
      expect(result).toBe('Hello <mark>World</mark>');
    });

    it('should highlight multiple occurrences', () => {
      const result = highlightMatchSecure('test TEST tEsT', 'test');
      expect(result).toBe('<mark>test</mark> <mark>TEST</mark> <mark>tEsT</mark>');
    });

    it('should handle empty query', () => {
      const result = highlightMatchSecure('Hello World', '');
      expect(result).toBe('Hello World');
    });

    it('should handle empty text', () => {
      const result = highlightMatchSecure('', 'query');
      expect(result).toBe('');
    });

    it('should handle regex special characters in query', () => {
      const result = highlightMatchSecure('Price: $100', '$100');
      expect(result).toBe('Price: <mark>$100</mark>');
    });

    it('should prevent XSS through highlight injection', () => {
      const maliciousQuery = '"><script>alert("xss")</script><span class="';
      const result = highlightMatchSecure('Some text', maliciousQuery);
      // Query won't match since it's escaped, and text is also escaped
      expect(result).toBe('Some text');
      expect(result).not.toContain('<script>');
    });

    it('should handle text with HTML entities correctly', () => {
      const result = highlightMatchSecure('Tom & Jerry', 'Jerry');
      expect(result).toBe('Tom &amp; <mark>Jerry</mark>');
    });
  });
});

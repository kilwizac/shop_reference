/**
 * Platform detection utilities
 */

/**
 * Detects if the user is on a Mac
 */
export function isMac(): boolean {
  if (typeof window === 'undefined') return false;
  return /Mac|iPod|iPhone|iPad/.test(navigator.platform);
}

/**
 * Detects if the user is on Windows
 */
export function isWindows(): boolean {
  if (typeof window === 'undefined') return false;
  return /Win/.test(navigator.platform);
}

/**
 * Gets the appropriate keyboard shortcut for the current platform
 */
export function getKeyboardShortcut(): string {
  if (isMac()) {
    return '⌘K';
  }
  return 'Ctrl+K';
}

/**
 * Gets both keyboard shortcuts for display purposes
 */
export function getKeyboardShortcuts(): { mac: string; windows: string } {
  return {
    mac: '⌘K',
    windows: 'Ctrl+K'
  };
}

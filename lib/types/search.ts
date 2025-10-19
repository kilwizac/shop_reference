/**
 * Search types and interfaces for global search functionality
 */

export interface SearchableItem {
  id: string;
  title: string;
  description?: string;
  category: SearchCategory;
  keywords: string[];
  action: SearchAction;
  priority?: number;
}

export type SearchCategory = 
  | 'materials'
  | 'threads'
  | 'fits'
  | 'calculators'
  | 'standards'
  | 'processes'
  | 'drill';

export interface SearchAction {
  type: 'navigate' | 'copy' | 'calculate';
  payload: {
    url?: string;
    data?: any;
    calculation?: string;
  };
}

export interface SearchResult extends SearchableItem {
  score: number;
  matchedFields: string[];
}

export interface SearchIndex {
  items: SearchableItem[];
  lastUpdated: number;
}

export interface SearchState {
  isOpen: boolean;
  query: string;
  results: SearchResult[];
  selectedIndex: number;
  isLoading: boolean;
}

export interface SearchProviderValue {
  state: SearchState;
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  selectResult: (index: number) => void;
  executeAction: (action: SearchAction) => void;
}

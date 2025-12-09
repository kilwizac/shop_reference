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

export interface SearchActionPayload {
  url?: string;
  data?: string | Record<string, string | number | boolean>;
  calculation?: string;
}

export interface SearchAction {
  type: 'navigate' | 'copy' | 'calculate';
  payload: SearchActionPayload;
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

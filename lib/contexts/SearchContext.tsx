'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SearchState, SearchProviderValue, SearchResult, SearchableItem } from '../types/search';
import { getSearchIndex } from '../search/indexBuilder';
import { searchItems } from '../search/searchEngine';

// Search actions
type SearchAction = 
  | { type: 'OPEN_SEARCH' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_RESULTS'; payload: SearchResult[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SELECTED_INDEX'; payload: number }
  | { type: 'RESET' };

// Initial state
const initialState: SearchState = {
  isOpen: false,
  query: '',
  results: [],
  selectedIndex: 0,
  isLoading: false
};

// Search reducer
function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'OPEN_SEARCH':
      return { ...state, isOpen: true, selectedIndex: 0 };
    
    case 'CLOSE_SEARCH':
      return { ...state, isOpen: false, query: '', results: [], selectedIndex: 0 };
    
    case 'SET_QUERY':
      return { ...state, query: action.payload, selectedIndex: 0 };
    
    case 'SET_RESULTS':
      return { ...state, results: action.payload, selectedIndex: 0 };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_SELECTED_INDEX':
      return { ...state, selectedIndex: action.payload };
    
    case 'RESET':
      return initialState;
    
    default:
      return state;
  }
}

// Create context
const SearchContext = createContext<SearchProviderValue | undefined>(undefined);

// Search provider component
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const router = useRouter();
  const searchTimeoutRef = useRef<number | null>(null);
  
  // Get search index (memoized)
  const searchIndex = React.useMemo(() => getSearchIndex(), []);

  const clearSearchTimeout = useCallback(() => {
    if (searchTimeoutRef.current !== null) {
      window.clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = null;
    }
  }, []);
  
  // Open search
  const openSearch = useCallback(() => {
    dispatch({ type: 'OPEN_SEARCH' });
  }, []);
  
  // Close search
  const closeSearch = useCallback(() => {
    dispatch({ type: 'CLOSE_SEARCH' });
  }, []);
  
  // Set query and search
  const setQuery = useCallback((query: string) => {
    dispatch({ type: 'SET_QUERY', payload: query });
    clearSearchTimeout();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      dispatch({ type: 'SET_LOADING', payload: false });
      const results = searchItems('', searchIndex);
      dispatch({ type: 'SET_RESULTS', payload: results });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    searchTimeoutRef.current = window.setTimeout(() => {
      const results = searchItems(trimmedQuery, searchIndex);
      dispatch({ type: 'SET_RESULTS', payload: results });
      dispatch({ type: 'SET_LOADING', payload: false });
      searchTimeoutRef.current = null;
    }, 150);
  }, [clearSearchTimeout, searchIndex]);
  
  // Select result
  const selectResult = useCallback((index: number) => {
    dispatch({ type: 'SET_SELECTED_INDEX', payload: index });
  }, []);
  
  // Execute action
  const executeAction = useCallback((action: SearchResult['action']) => {
    switch (action.type) {
      case 'navigate':
        if (action.payload.url) {
          router.push(action.payload.url);
          closeSearch();
        }
        break;
      
      case 'copy':
        if (action.payload.data) {
          if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
            void navigator.clipboard.writeText(action.payload.data).catch(console.error);
          }
          closeSearch();
        }
        break;
      
      case 'calculate':
        // Handle calculation actions
        console.log('Calculate action:', action.payload);
        break;
    }
  }, [router, closeSearch]);
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (state.isOpen) {
          closeSearch();
        } else {
          openSearch();
        }
        return;
      }
      
      // Handle search navigation when open
      if (state.isOpen) {
        switch (event.key) {
          case 'Escape':
            event.preventDefault();
            closeSearch();
            break;
          
          case 'ArrowDown':
            event.preventDefault();
            selectResult(Math.min(state.selectedIndex + 1, state.results.length - 1));
            break;
          
          case 'ArrowUp':
            event.preventDefault();
            selectResult(Math.max(state.selectedIndex - 1, 0));
            break;
          
          case 'Enter':
            event.preventDefault();
            if (state.results[state.selectedIndex]) {
              executeAction(state.results[state.selectedIndex].action);
            }
            break;
        }
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, state.selectedIndex, state.results, openSearch, closeSearch, selectResult, executeAction]);
  
  useEffect(() => clearSearchTimeout, [clearSearchTimeout]);
  
  const value: SearchProviderValue = {
    state,
    openSearch,
    closeSearch,
    setQuery,
    selectResult,
    executeAction
  };
  
  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook to use search context
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

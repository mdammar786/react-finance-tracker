import React, { createContext, useContext, ReactNode } from 'react';
import { TransactionFilter } from '../types';
import { useFilter } from '../hooks/useFilter';

interface FilterContextValue {
  filter: TransactionFilter;
  debouncedSearch: string;
  updateFilter: (updates: Partial<TransactionFilter>) => void;
  updateSearch: (search: string) => void;
  resetFilter: () => void;
}

const FilterContext = createContext<FilterContextValue | null>(null);

export function FilterProvider({ children }: { children: ReactNode }) {
  const filter = useFilter();
  return <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>;
}

export function useFilterContext() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error('useFilterContext must be inside FilterProvider');
  return ctx;
}


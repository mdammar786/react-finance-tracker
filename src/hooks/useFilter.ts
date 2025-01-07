import { useState, useCallback, useRef } from 'react';
import { TransactionFilter } from '../types';
import { DEBOUNCE_DELAY } from '../utils/constants';

export function useFilter(initialFilter: TransactionFilter = {}) {
  const [filter, setFilter] = useState<TransactionFilter>(initialFilter);
  const [debouncedSearch, setDebouncedSearch] = useState(initialFilter.search || '');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateFilter = useCallback((updates: Partial<TransactionFilter>) => {
    setFilter((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateSearch = useCallback((search: string) => {
    setFilter((prev) => ({ ...prev, search }));
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, DEBOUNCE_DELAY);
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(initialFilter);
    setDebouncedSearch(initialFilter.search || '');
  }, [initialFilter]);

  return { filter, debouncedSearch, updateFilter, updateSearch, resetFilter };
}


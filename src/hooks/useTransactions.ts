import { useState, useEffect, useCallback } from 'react';
import { Transaction, TransactionFilter, TransactionSort } from '../types';
import { fetchTransactions } from '../services/api';
import { getItem, setItem } from '../services/storage';

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TransactionFilter>({});
  const [sort, setSort] = useState<TransactionSort>({ field: 'date', direction: 'desc' });
  const [page, setPage] = useState(1);

  const loadTransactions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTransactions();
      setTransactions(data);
      setItem('transactions_cache', data);
    } catch (e) {
      const cached = getItem<Transaction[]>('transactions_cache', []);
      if (cached.length > 0) {
        setTransactions(cached);
      }
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const filteredTransactions = transactions.filter((t) => {
    if (filter.type && t.type !== filter.type) return false;
    if (filter.category && t.category !== filter.category) return false;
    if (filter.minAmount !== undefined && t.amount < filter.minAmount) return false;
    if (filter.maxAmount !== undefined && t.amount > filter.maxAmount) return false;
    if (filter.search) {
      const q = filter.search.toLowerCase();
      if (!t.description.toLowerCase().includes(q) && !t.category.toLowerCase().includes(q)) return false;
    }
    if (filter.dateFrom && t.date < filter.dateFrom) return false;
    if (filter.dateTo && t.date > filter.dateTo) return false;
    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const aVal = a[sort.field];
    const bVal = b[sort.field];
    const direction = sort.direction === 'asc' ? 1 : -1;
    if (aVal < bVal) return -1 * direction;
    if (aVal > bVal) return 1 * direction;
    return 0;
  });

  const totalCount = sortedTransactions.length;
  const paged = sortedTransactions.slice(0, page * 20);

  const addTransaction = useCallback((t: Transaction) => {
    setTransactions((prev) => [t, ...prev]);
  }, []);

  const removeTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const updateTransactionInList = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const refresh = useCallback(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions: paged,
    totalCount,
    isLoading,
    error,
    filter,
    sort,
    page,
    setFilter,
    setSort,
    setPage,
    addTransaction,
    removeTransaction,
    updateTransactionInList,
    refresh,
  };
}

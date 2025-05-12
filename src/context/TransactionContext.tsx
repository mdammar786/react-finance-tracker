import React, { createContext, useContext, ReactNode } from 'react';
import { Transaction, TransactionFilter, TransactionSort } from '../types';
import { useTransactions } from '../hooks/useTransactions';

interface TransactionContextValue {
  transactions: Transaction[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  filter: TransactionFilter;
  sort: TransactionSort;
  page: number;
  setFilter: (filter: TransactionFilter) => void;
  setSort: (sort: TransactionSort) => void;
  setPage: (page: number) => void;
  addTransaction: (t: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransactionInList: (id: string, updates: Partial<Transaction>) => void;
  refresh: () => void;
}

const TransactionContext = createContext<TransactionContextValue | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const tx = useTransactions();
  return <TransactionContext.Provider value={tx}>{children}</TransactionContext.Provider>;
}

export function useTransactionContext() {
  const ctx = useContext(TransactionContext);
  if (!ctx) throw new Error('useTransactionContext must be inside TransactionProvider');
  return ctx;
}

export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string;
  accountId: string;
  tags: string[];
  recurring: boolean;
}

export interface TransactionFilter {
  type?: TransactionType;
  category?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionSort {
  field: keyof Transaction;
  direction: 'asc' | 'desc';
}

export const TRANSACTION_CATEGORIES = {
  income: ['salary', 'freelance', 'investment', 'gift', 'other'],
  expense: ['food', 'transport', 'housing', 'utilities', 'entertainment', 'healthcare', 'education', 'shopping', 'other'],
  transfer: ['savings', 'investment', 'checking', 'other'],
} as const;

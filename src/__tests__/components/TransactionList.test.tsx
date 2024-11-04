import React from 'react';
import { render, screen } from '@testing-library/react';
import { TransactionList } from '../../components/TransactionList';
import { Transaction } from '../../types';

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 50,
    type: 'expense',
    category: 'food',
    description: 'Grocery shopping',
    date: '2024-06-15',
    accountId: 'default',
    tags: [],
    recurring: false,
  },
  {
    id: '2',
    amount: 2000,
    type: 'income',
    category: 'salary',
    description: 'Monthly salary',
    date: '2024-06-01',
    accountId: 'default',
    tags: [],
    recurring: true,
  },
];

describe('TransactionList', () => {
  test('shows empty message when no transactions', () => {
    render(<TransactionList transactions={[]} />);
    expect(screen.getByText('No transactions found')).toBeInTheDocument();
  });

  test('renders transaction descriptions', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('Grocery shopping')).toBeInTheDocument();
    expect(screen.getByText('Monthly salary')).toBeInTheDocument();
  });

  test('renders transaction type badges', () => {
    render(<TransactionList transactions={mockTransactions} />);
    expect(screen.getByText('expense')).toBeInTheDocument();
    expect(screen.getByText('income')).toBeInTheDocument();
  });
});


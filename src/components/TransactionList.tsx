import React from 'react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { Card } from './ui/Card';
import { Badge } from './ui/Badge';

interface TransactionListProps {
  transactions: Transaction[];
  currency?: string;
  onSelect?: (id: string) => void;
}

const typeBadgeVariant: Record<string, 'success' | 'danger' | 'info'> = {
  income: 'success',
  expense: 'danger',
  transfer: 'info',
};

export function TransactionList({ transactions, currency = 'USD', onSelect }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
        No transactions found
      </div>
    );
  }

  return (
    <div>
      {transactions.map((transaction, index) => (
        <Card key={index} hoverable onClick={onSelect ? () => onSelect(transaction.id) : undefined}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 500 }}>{transaction.description}</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>
                {transaction.category} · {formatDate(transaction.date)}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 600, color: transaction.type === 'expense' ? '#dc2626' : '#16a34a' }}>
                {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount, currency)}
              </div>
              <Badge variant={typeBadgeVariant[transaction.type]}>{transaction.type}</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

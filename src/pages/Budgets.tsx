import React from 'react';
import { useTransactionContext } from '../context/TransactionContext';
import { BudgetCard } from '../components/BudgetCard';
import { SummaryCard } from '../components/SummaryCard';
import { formatCurrency } from '../utils/formatters';
import { useBudget } from '../hooks/useBudget';

export function Budgets() {
  const { transactions } = useTransactionContext();
  const { budgets, summary, isLoading } = useBudget(transactions);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Budgets</h1>
        <p style={{ color: '#64748b' }}>Track your spending limits</p>
      </div>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading...</div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <SummaryCard title="Total Budget" value={formatCurrency(summary.totalBudget)} />
            <SummaryCard title="Total Spent" value={formatCurrency(summary.totalSpent)} />
            <SummaryCard title="Remaining" value={formatCurrency(summary.remaining)} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {budgets.map((budget) => (
              <BudgetCard key={budget.id} budget={budget} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

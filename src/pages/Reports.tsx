import React, { useMemo } from 'react';
import { useTransactionContext } from '../context/TransactionContext';
import { ChartContainer } from '../components/ChartContainer';
import { groupByCategory, sumTransactions } from '../utils/calculations';

export function Reports() {
  const { transactions, isLoading } = useTransactionContext();

  const monthlyData = useMemo(() => {
    const byMonth: Record<string, { income: number; expense: number }> = {};
    transactions.forEach((t) => {
      const month = t.date.slice(0, 7);
      if (!byMonth[month]) byMonth[month] = { income: 0, expense: 0 };
      if (t.type === 'income') byMonth[month].income += t.amount;
      if (t.type === 'expense') byMonth[month].expense += t.amount;
    });
    return Object.entries(byMonth).map(([month, data]) => ({
      label: month,
      value: data.expense,
    }));
  }, [transactions]);

  const topCategories = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const grouped = groupByCategory(expenses);
    return Object.entries(grouped)
      .map(([category, items]) => ({ label: category, value: sumTransactions(items) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [transactions]);

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px' }}>Reports</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <ChartContainer title="Monthly Expenses" data={monthlyData} loading={isLoading} />
        <ChartContainer title="Top Categories" data={topCategories} loading={isLoading} />
      </div>
    </div>
  );
}

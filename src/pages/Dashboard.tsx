import React, { useMemo } from 'react';
import { useTransactionContext } from '../context/TransactionContext';
import { useAuthContext } from '../context/AuthContext';
import { SummaryCard } from '../components/SummaryCard';
import { TransactionList } from '../components/TransactionList';
import { ChartContainer } from '../components/ChartContainer';
import { formatCurrency } from '../utils/formatters';
import { sumTransactions, groupByCategory } from '../utils/calculations';

export function Dashboard() {
  const { transactions, isLoading } = useTransactionContext();
  const { authState } = useAuthContext();

  const stats = useMemo(() => {
    const income = transactions.filter((t) => t.type === 'income');
    const expenses = transactions.filter((t) => t.type === 'expense');
    const totalIncome = sumTransactions(income);
    const totalExpenses = sumTransactions(expenses);
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance };
  }, [transactions]);

  const categoryData = useMemo(() => {
    const expenses = transactions.filter((t) => t.type === 'expense');
    const grouped = groupByCategory(expenses);
    return Object.entries(grouped).map(([category, items]) => ({
      label: category,
      value: sumTransactions(items),
    }));
  }, [transactions]);

  const recentTransactions = transactions.slice(0, 5);
  const currency = authState.user?.currency || 'USD';

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Dashboard</h1>
        <p style={{ color: '#64748b' }}>Overview of your finances</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <SummaryCard title="Total Balance" value={formatCurrency(stats.balance, currency)} />
        <SummaryCard title="Income" value={formatCurrency(stats.totalIncome, currency)} />
        <SummaryCard title="Expenses" value={formatCurrency(stats.totalExpenses, currency)} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>
        <ChartContainer title="Spending by Category" data={categoryData} loading={isLoading} />
        <div>
          <h3 style={{ fontWeight: 600, marginBottom: '12px' }}>Recent Transactions</h3>
          <TransactionList transactions={recentTransactions} currency={currency} />
        </div>
      </div>
    </div>
  );
}

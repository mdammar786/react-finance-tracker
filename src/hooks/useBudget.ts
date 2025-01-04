import { useState, useEffect, useCallback } from 'react';
import { Budget, BudgetSummary } from '../types';
import { fetchBudgets, updateBudget as updateBudgetApi } from '../services/api';
import { calculateBudgetUtilization } from '../utils/calculations';

export function useBudget(transactions: { amount: number; category: string; type: string }[]) {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBudgets = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchBudgets();
      setBudgets(data);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBudgets();
  }, [loadBudgets]);

  useEffect(() => {
    const expenseMap: Record<string, number> = {};
    transactions.forEach((t) => {
      if (t.type === 'expense') {
        expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
      }
    });
    setBudgets((prev) =>
      prev.map((b) => ({
        ...b,
        spent: expenseMap[b.category] || 0,
      }))
    );
  }, [transactions]);

  const summary: BudgetSummary = {
    totalBudget: budgets.reduce((s, b) => s + b.limit, 0),
    totalSpent: budgets.reduce((s, b) => s + b.spent, 0),
    remaining: budgets.reduce((s, b) => s + (b.limit - b.spent), 0),
    overBudget: budgets.filter((b) => calculateBudgetUtilization(b.spent, b.limit) >= 1),
    onTrack: budgets.filter((b) => calculateBudgetUtilization(b.spent, b.limit) < 1),
  };

  const updateBudget = useCallback(async (id: string, data: Partial<Budget>) => {
    try {
      await updateBudgetApi(id, data);
      setBudgets((prev) => prev.map((b) => (b.id === id ? { ...b, ...data } : b)));
    } catch {}
  }, []);

  return { budgets, summary, isLoading, updateBudget, refresh: loadBudgets };
}


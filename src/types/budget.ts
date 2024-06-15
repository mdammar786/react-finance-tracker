export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: BudgetPeriod;
  startDate: string;
  alerts: BudgetAlert[];
}

export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly';

export interface BudgetAlert {
  threshold: number;
  triggered: boolean;
  notifiedAt?: string;
}

export interface BudgetSummary {
  totalBudget: number;
  totalSpent: number;
  remaining: number;
  overBudget: Budget[];
  onTrack: Budget[];
}

export function getBudgetStatus(budget: Budget): BudgetStatus {
  const ratio = budget.spent / budget.limit;
  if (ratio >= 1) return 'exceeded';
  if (ratio >= 0.8) return 'warning';
  return 'healthy';
}

export type BudgetStatus = 'healthy' | 'warning' | 'exceeded';

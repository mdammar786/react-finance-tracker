export function sumTransactions(transactions: { amount: number }[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}

export function calculateBudgetUtilization(spent: number, limit: number): number {
  if (limit === 0) return 0;
  return spent / limit;
}

export function groupByCategory<T extends { category: string }>(items: T[]): Record<string, T[]> {
  return items.reduce((groups, item) => {
    const key = item.category;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

export function calculateMovingAverage(values: number[], windowSize: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = values.slice(start, i + 1);
    const avg = window.reduce((s, v) => s + v, 0) / window.length;
    result.push(avg);
  }
  return result;
}

export function calculateNetWorth(assets: number[], liabilities: number[]): number {
  const totalAssets = assets.reduce((s, v) => s + v, 0);
  const totalLiabilities = liabilities.reduce((s, v) => s + v, 0);
  return totalAssets - totalLiabilities;
}

export function percentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return 0;
  return (newValue - oldValue) / oldValue;
}

export function roundToDecimals(value: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

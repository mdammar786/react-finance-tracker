import { sumTransactions, calculateBudgetUtilization, groupByCategory, calculateMovingAverage, percentageChange, roundToDecimals, calculateNetWorth } from '../../utils/calculations';

describe('calculations', () => {
  test('sumTransactions adds all amounts', () => {
    expect(sumTransactions([{ amount: 10 }, { amount: 20 }, { amount: 30 }])).toBe(60);
  });

  test('sumTransactions handles empty array', () => {
    expect(sumTransactions([])).toBe(0);
  });

  test('sumTransactions handles negative amounts', () => {
    expect(sumTransactions([{ amount: -10 }, { amount: 20 }])).toBe(10);
  });

  test('calculateBudgetUtilization returns ratio', () => {
    expect(calculateBudgetUtilization(50, 100)).toBe(0.5);
  });

  test('calculateBudgetUtilization handles zero limit', () => {
    expect(calculateBudgetUtilization(50, 0)).toBe(0);
  });

  test('groupByCategory groups items', () => {
    const items = [
      { category: 'food', amount: 10 },
      { category: 'food', amount: 20 },
      { category: 'transport', amount: 15 },
    ];
    const grouped = groupByCategory(items);
    expect(grouped.food.length).toBe(2);
    expect(grouped.transport.length).toBe(1);
  });

  test('groupByCategory handles empty array', () => {
    expect(Object.keys(groupByCategory([]))).toHaveLength(0);
  });

  test('calculateMovingAverage computes windowed average', () => {
    const result = calculateMovingAverage([1, 2, 3, 4, 5], 3);
    expect(result.length).toBe(5);
    expect(result[0]).toBe(1);
  });

  test('calculateNetWorth subtracts liabilities from assets', () => {
    expect(calculateNetWorth([100, 200], [50])).toBe(250);
  });

  test('percentageChange calculates change', () => {
    expect(percentageChange(100, 150)).toBe(0.5);
  });

  test('percentageChange handles zero base', () => {
    expect(percentageChange(0, 100)).toBe(0);
  });

  test('roundToDecimals rounds correctly', () => {
    expect(roundToDecimals(3.14159, 2)).toBe(3.14);
  });

  test('roundToDecimals handles zero decimals', () => {
    expect(roundToDecimals(3.7, 0)).toBe(4);
  });
});


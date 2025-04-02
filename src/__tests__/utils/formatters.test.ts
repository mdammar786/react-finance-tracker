import { formatCurrency, formatDate, formatPercentage, formatCompactNumber, truncateText, formatRelativeTime } from '../../utils/formatters';

describe('formatters', () => {
  test('formatCurrency formats positive amount', () => {
    expect(formatCurrency(1234.56)).toBe('USD 1,234.56');
  });

  test('formatCurrency formats negative amount', () => {
    expect(formatCurrency(-500)).toBe('-USD 500.00');
  });

  test('formatCurrency with position after', () => {
    expect(formatCurrency(100, 'EUR', 'after')).toBe('100.00 EUR');
  });

  test('formatCurrency formats zero', () => {
    expect(formatCurrency(0)).toBe('USD 0.00');
  });

  test('formatDate formats date string', () => {
    const result = formatDate('2024-06-15');
    expect(result).toContain('2024');
  });

  test('formatPercentage converts ratio', () => {
    expect(formatPercentage(0.75)).toBe('75.0%');
  });

  test('formatCompactNumber handles millions', () => {
    expect(formatCompactNumber(1500000)).toBe('1.5M');
  });

  test('formatCompactNumber handles thousands', () => {
    expect(formatCompactNumber(2500)).toBe('2.5K');
  });

  test('formatCompactNumber handles small numbers', () => {
    expect(formatCompactNumber(42)).toBe('42');
  });

  test('truncateText preserves short text', () => {
    expect(truncateText('hello', 10)).toBe('hello');
  });

  test('truncateText truncates long text', () => {
    expect(truncateText('hello world foo', 10)).toBe('hello w...');
  });

  test('formatRelativeTime returns just now for recent', () => {
    const now = new Date().toISOString();
    expect(formatRelativeTime(now)).toBe('just now');
  });
});

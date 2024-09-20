import { isValidEmail, isValidAmount, isValidDateString, isValidPassword, validateTransaction, sanitizeInput } from '../../utils/validators';

describe('validators', () => {
  test('isValidEmail accepts valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  test('isValidEmail rejects invalid email', () => {
    expect(isValidEmail('notanemail')).toBe(false);
  });

  test('isValidEmail rejects empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  test('isValidAmount accepts positive number', () => {
    expect(isValidAmount(42)).toBe(true);
  });

  test('isValidAmount rejects zero', () => {
    expect(isValidAmount(0)).toBe(false);
  });

  test('isValidAmount rejects NaN', () => {
    expect(isValidAmount(NaN)).toBe(false);
  });

  test('isValidDateString accepts valid date', () => {
    expect(isValidDateString('2024-06-15')).toBe(true);
  });

  test('isValidDateString rejects invalid date', () => {
    expect(isValidDateString('not-a-date')).toBe(false);
  });

  test('isValidPassword requires 8 chars', () => {
    expect(isValidPassword('short')).toBe(false);
    expect(isValidPassword('longenough')).toBe(true);
  });

  test('validateTransaction returns null for valid data', () => {
    expect(validateTransaction({ amount: 50, description: 'test', date: '2024-06-15', category: 'food' })).toBeNull();
  });

  test('validateTransaction returns error for invalid amount', () => {
    expect(validateTransaction({ amount: -5, description: 'test', date: '2024-06-15', category: 'food' })).toBeTruthy();
  });

  test('validateTransaction returns error for empty description', () => {
    expect(validateTransaction({ amount: 50, description: '  ', date: '2024-06-15', category: 'food' })).toBeTruthy();
  });

  test('validateTransaction returns error for empty category', () => {
    expect(validateTransaction({ amount: 50, description: 'test', date: '2024-06-15', category: '' })).toBeTruthy();
  });

  test('sanitizeInput removes angle brackets', () => {
    expect(sanitizeInput('<script>alert("x")</script>')).toBe('scriptalert("x")/script');
  });

  test('sanitizeInput preserves normal text', () => {
    expect(sanitizeInput('hello world')).toBe('hello world');
  });
});

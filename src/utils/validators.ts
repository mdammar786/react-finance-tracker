export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidAmount(amount: number): boolean {
  return !isNaN(amount) && amount > 0 && isFinite(amount);
}

export function isValidDateString(dateStr: string): boolean {
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
}

export function isValidPassword(password: string): boolean {
  return password.length >= 8;
}

export function validateTransaction(data: {
  amount: number;
  description: string;
  date: string;
  category: string;
}): string | null {
  if (!isValidAmount(data.amount)) return 'Invalid amount';
  if (!data.description.trim()) return 'Description required';
  if (!isValidDateString(data.date)) return 'Invalid date';
  if (!data.category) return 'Category required';
  return null;
}

export function sanitizeInput(input: string): string {
  return input.replace(/[<>]/g, '');
}


export function formatCurrency(amount: number, currency: string = 'USD', position: 'before' | 'after' = 'before'): string {
  const formatted = Math.abs(amount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const sign = amount < 0 ? '-' : '';
  if (position === 'before') {
    return sign + currency + ' ' + formatted;
  }
  return sign + formatted + ' ' + currency;
}

export function formatDate(dateStr: string, locale: string = 'en-US'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatPercentage(value: number, decimals: number = 1): string {
  return (value * 100).toFixed(decimals) + '%';
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

export function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 30) return formatDate(dateStr);
  if (days > 0) return days + 'd ago';
  if (hours > 0) return hours + 'h ago';
  if (minutes > 0) return minutes + 'm ago';
  return 'just now';
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

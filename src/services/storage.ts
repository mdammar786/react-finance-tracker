const STORAGE_PREFIX = 'ft_';

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {}
}

export function removeItem(key: string): void {
  localStorage.removeItem(STORAGE_PREFIX + key);
}

export function clearAll(): void {
  const keys = Object.keys(localStorage);
  keys.forEach(k => {
    if (k.startsWith(STORAGE_PREFIX)) localStorage.removeItem(k);
  });
}

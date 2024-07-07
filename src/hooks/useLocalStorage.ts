import { useState, useCallback } from 'react';
import { getItem, setItem } from '../services/storage';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => getItem(key, initialValue));

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setItem(key, valueToStore);
  }, [key, storedValue]);

  return [storedValue, setValue];
}

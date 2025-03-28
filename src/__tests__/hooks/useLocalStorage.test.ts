import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns initial value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  test('updates value', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    act(() => {
      result.current[1]('updated');
    });
    expect(result.current[0]).toBe('updated');
  });

  test('stores value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));
    act(() => {
      result.current[1](42);
    });
    expect(localStorage.getItem('ft_test-key')).toBe('42');
  });

  test('accepts functional update', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 10));
    act(() => {
      result.current[1]((prev) => prev + 5);
    });
    expect(result.current[0]).toBe(15);
  });
});

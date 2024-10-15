import { renderHook, act } from '@testing-library/react';
import { useFilter } from '../../hooks/useFilter';

describe('useFilter', () => {
  test('returns initial filter', () => {
    const { result } = renderHook(() => useFilter());
    expect(result.current.filter).toEqual({});
  });

  test('updates filter fields', () => {
    const { result } = renderHook(() => useFilter());
    act(() => {
      result.current.updateFilter({ category: 'food' });
    });
    expect(result.current.filter.category).toBe('food');
  });

  test('updates search', () => {
    const { result } = renderHook(() => useFilter());
    act(() => {
      result.current.updateSearch('grocery');
    });
    expect(result.current.filter.search).toBe('grocery');
  });

  test('resets filter', () => {
    const { result } = renderHook(() => useFilter({ category: 'food' }));
    act(() => {
      result.current.updateFilter({ type: 'expense' });
    });
    act(() => {
      result.current.resetFilter();
    });
    expect(result.current.filter).toEqual({ category: 'food' });
  });
});

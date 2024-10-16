import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('starts unauthenticated', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.authState.isAuthenticated).toBe(false);
    expect(result.current.authState.user).toBeNull();
  });

  test('starts with no error', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.authState.error).toBeNull();
  });

  test('starts not loading', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.authState.isLoading).toBe(false);
  });

  test('logout clears auth state', () => {
    const { result } = renderHook(() => useAuth());
    act(() => {
      result.current.logout();
    });
    expect(result.current.authState.isAuthenticated).toBe(false);
    expect(result.current.authState.user).toBeNull();
  });
});

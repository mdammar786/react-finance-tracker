import { useState, useCallback, useEffect } from 'react';
import { AuthState, LoginCredentials, User, UserPreferences } from '../types';
import { loginRequest } from '../services/api';
import { getItem, setItem, removeItem } from '../services/storage';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const token = getItem<string | null>('auth_token', null);
    const savedUser = getItem<User | null>('auth_user', null);
    if (token && savedUser) {
      setAuthState({
        user: savedUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await loginRequest(credentials);
      setItem('auth_token', result.token);
      setItem('auth_user', result.user);
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (e) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: e instanceof Error ? e.message : 'Login failed',
      }));
    }
  }, []);

  const logout = useCallback(() => {
    removeItem('auth_token');
    removeItem('auth_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  const updatePreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setAuthState((prev) => {
      if (!prev.user) return prev;
      const updatedUser = {
        ...prev.user,
        preferences: { ...prev.user.preferences, ...prefs },
      };
      setItem('auth_user', updatedUser);
      return { ...prev, user: updatedUser };
    });
  }, []);

  return { authState, login, logout, updatePreferences };
}

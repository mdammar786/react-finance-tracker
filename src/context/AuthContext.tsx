import React, { createContext, useContext, ReactNode } from 'react';
import { AuthState, LoginCredentials, UserPreferences } from '../types';
import { useAuth } from '../hooks/useAuth';

interface AuthContextValue {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be inside AuthProvider');
  return ctx;
}

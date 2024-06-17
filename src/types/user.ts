export interface User {
  id: string;
  email: string;
  displayName: string;
  currency: string;
  locale: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  darkMode: boolean;
  compactView: boolean;
  defaultAccountId: string;
  weeklyReport: boolean;
  currencyPosition: 'before' | 'after';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
}

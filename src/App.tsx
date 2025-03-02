import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import { FilterProvider } from './context/FilterContext';
import { Dashboard } from './pages/Dashboard';

export function App() {
  return (
    <AuthProvider>
      <TransactionProvider>
        <FilterProvider>
          <Dashboard />
        </FilterProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

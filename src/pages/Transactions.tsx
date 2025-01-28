import React, { useState, useCallback } from 'react';
import { useTransactionContext } from '../context/TransactionContext';
import { TransactionList } from '../components/TransactionList';
import { FilterBar } from '../components/FilterBar';
import { AddTransactionForm } from '../components/AddTransactionForm';
import { Modal } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';
import { Transaction } from '../types';

export function Transactions() {
  const { transactions, filter, setFilter, addTransaction, totalCount, isLoading } = useTransactionContext();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddTransaction = useCallback(
    (data: Omit<Transaction, 'id'>) => {
      const newTransaction: Transaction = {
        ...data,
        id: Date.now().toString(),
      };
      addTransaction(newTransaction);
      setShowAddModal(false);
    },
    [addTransaction]
  );

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700 }}>Transactions</h1>
          <p style={{ color: '#64748b' }}>{totalCount} total transactions</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>Add Transaction</Button>
      </div>
      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        onReset={() => setFilter({})}
      />
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading...</div>
      ) : (
        <TransactionList transactions={transactions} />
      )}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Transaction">
        <AddTransactionForm onSubmit={handleAddTransaction} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
}


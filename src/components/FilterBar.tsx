import React, { useState, useEffect, useCallback } from 'react';
import { TransactionFilter, TRANSACTION_CATEGORIES } from '../types';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

interface FilterBarProps {
  filter: TransactionFilter;
  onFilterChange: (filter: TransactionFilter) => void;
  onReset: () => void;
}

export function FilterBar({ filter, onFilterChange, onReset }: FilterBarProps) {
  const [localFilter, setLocalFilter] = useState<TransactionFilter>(filter);
  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    let count = 0;
    if (localFilter.type) count++;
    if (localFilter.category) count++;
    if (localFilter.search) count++;
    if (localFilter.dateFrom) count++;
    if (localFilter.dateTo) count++;
    if (localFilter.minAmount !== undefined) count++;
    if (localFilter.maxAmount !== undefined) count++;
    setActiveCount(count);
  }, [localFilter]);

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'income', label: 'Income' },
    { value: 'expense', label: 'Expense' },
    { value: 'transfer', label: 'Transfer' },
  ];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...TRANSACTION_CATEGORIES.expense.map((c) => ({ value: c, label: c })),
  ];

  const handleApply = useCallback(() => {
    onFilterChange(localFilter);
  }, [localFilter, onFilterChange]);

  return (
    <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ fontWeight: 600 }}>Filters</div>
        {activeCount > 0 && (
          <span style={{ fontSize: '14px', color: '#64748b' }}>{activeCount} active</span>
        )}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <Input
          placeholder="Search..."
          value={localFilter.search || ''}
          onChange={(v) => setLocalFilter((prev) => ({ ...prev, search: v }))}
        />
        <Select
          options={typeOptions}
          value={localFilter.type || ''}
          onChange={(v) => setLocalFilter((prev) => ({ ...prev, type: v as any || undefined }))}
        />
        <Select
          options={categoryOptions}
          value={localFilter.category || ''}
          onChange={(v) => setLocalFilter((prev) => ({ ...prev, category: v || undefined }))}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <Button size="sm" onClick={handleApply}>Apply</Button>
        <Button size="sm" variant="ghost" onClick={onReset}>Reset</Button>
      </div>
    </div>
  );
}

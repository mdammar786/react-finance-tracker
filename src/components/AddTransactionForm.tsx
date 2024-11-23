import React, { useState, useCallback } from 'react';
import { Transaction, TRANSACTION_CATEGORIES } from '../types';
import { validateTransaction } from '../utils/validators';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Button } from './ui/Button';

interface AddTransactionFormProps {
  onSubmit: (transaction: Omit<Transaction, 'id'>) => void;
  onCancel?: () => void;
}

export function AddTransactionForm({ onSubmit, onCancel }: AddTransactionFormProps) {
  const [type, setType] = useState<'income' | 'expense' | 'transfer'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [tags, setTags] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = TRANSACTION_CATEGORIES[type] || [];

  const handleSubmit = useCallback(() => {
    const numAmount = parseFloat(amount);
    const validationError = validateTransaction({
      amount: numAmount,
      description,
      date,
      category,
    });

    if (validationError) {
      setErrors({ form: validationError });
      return;
    }

    onSubmit({
      amount: numAmount,
      type,
      description,
      category,
      date,
      accountId: 'default',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      recurring: false,
    });
  }, [amount, type, description, category, date, tags, onSubmit]);

  return (
    <div>
      {errors.form && (
        <div style={{ padding: '8px 12px', backgroundColor: '#fee2e2', borderRadius: '6px', marginBottom: '16px', color: '#dc2626' }}>
          {errors.form}
        </div>
      )}
      <div style={{ display: 'grid', gap: '12px' }}>
        <Select
          label="Type"
          options={[
            { value: 'expense', label: 'Expense' },
            { value: 'income', label: 'Income' },
            { value: 'transfer', label: 'Transfer' },
          ]}
          value={type}
          onChange={(v) => {
            setType(v as any);
            setCategory('');
          }}
        />
        <Input
          label="Amount"
          type="number"
          value={amount}
          onChange={setAmount}
          error={errors.amount}
        />
        <Input
          label="Description"
          value={description}
          onChange={setDescription}
          error={errors.description}
        />
        <Select
          label="Category"
          options={categories.map((c) => ({ value: c, label: c }))}
          value={category}
          onChange={setCategory}
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={setDate}
        />
        <Input
          label="Tags (comma separated)"
          value={tags}
          onChange={setTags}
        />
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button onClick={handleSubmit}>Add Transaction</Button>
          {onCancel && <Button variant="ghost" onClick={onCancel}>Cancel</Button>}
        </div>
      </div>
    </div>
  );
}


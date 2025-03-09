import React from 'react';
import { render, screen } from '@testing-library/react';
import { BudgetCard } from '../../components/BudgetCard';
import { Budget } from '../../types';

const mockBudget: Budget = {
  id: '1',
  category: 'food',
  limit: 500,
  spent: 300,
  period: 'monthly',
  startDate: '2024-06-01',
  alerts: [{ threshold: 0.8, triggered: false }],
};

describe('BudgetCard', () => {
  test('renders budget category', () => {
    render(<BudgetCard budget={mockBudget} />);
    expect(screen.getByText('food')).toBeInTheDocument();
  });

  test('renders utilization percentage', () => {
    render(<BudgetCard budget={mockBudget} />);
    expect(screen.getByText('60.0%')).toBeInTheDocument();
  });

  test('renders spent and remaining labels', () => {
    render(<BudgetCard budget={mockBudget} />);
    expect(screen.getByText(/spent/)).toBeInTheDocument();
    expect(screen.getByText(/remaining/)).toBeInTheDocument();
  });

  test('renders exceeded status when over budget', () => {
    const overBudget: Budget = { ...mockBudget, spent: 600 };
    render(<BudgetCard budget={overBudget} />);
    expect(screen.getByText('120.0%')).toBeInTheDocument();
  });
});

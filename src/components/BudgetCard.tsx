import React, { useState, useCallback } from 'react';
import { Budget, BudgetStatus, getBudgetStatus } from '../types';
import { formatCurrency, formatPercentage } from '../utils/formatters';
import { Card } from './ui/Card';

interface BudgetCardProps {
  budget: Budget;
  onEdit?: (id: string) => void;
}

const statusColors: Record<BudgetStatus, string> = {
  healthy: '#16a34a',
  warning: '#d97706',
  exceeded: '#dc2626',
};

export function BudgetCard({ budget, onEdit }: BudgetCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const status = getBudgetStatus(budget);
  const utilization = budget.spent / budget.limit;
  const remaining = budget.limit - budget.spent;

  const toggleExpand = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  return (
    <Card hoverable onClick={onEdit ? () => onEdit(budget.id) : undefined}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <div style={{ fontWeight: 600 }}>{budget.category}</div>
          <div style={{ color: statusColors[status], fontWeight: 500 }}>
            {formatPercentage(utilization)}
          </div>
        </div>
        <div
          style={{
            height: '8px',
            backgroundColor: '#f1f5f9',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '8px',
          }}
        >
          <div
            style={{
              height: '100%',
              width: Math.min(utilization * 100, 100) + '%',
              backgroundColor: statusColors[status],
              borderRadius: '4px',
              transition: 'width 0.3s',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
          <span>{formatCurrency(budget.spent)} spent</span>
          <span>{formatCurrency(remaining)} remaining</span>
        </div>
        {isExpanded && budget.alerts.length > 0 && (
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
            {budget.alerts.map((alert, i) => (
              <div key={i} style={{ fontSize: '14px', color: alert.triggered ? '#d97706' : '#64748b' }}>
                Alert at {alert.threshold * 100}%: {alert.triggered ? 'Triggered' : 'Not triggered'}
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

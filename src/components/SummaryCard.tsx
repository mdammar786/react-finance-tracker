import React from 'react';
import { Card } from './ui/Card';

interface SummaryCardProps {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
}

export function SummaryCard({ title, value, change, icon }: SummaryCardProps) {
  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>{title}</div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{value}</div>
          {change !== undefined && (
            <div
              style={{
                fontSize: '14px',
                color: change >= 0 ? '#16a34a' : '#dc2626',
                marginTop: '4px',
              }}
            >
              {change >= 0 ? '+' : ''}{(change * 100).toFixed(1)}%
            </div>
          )}
        </div>
        {icon && <div style={{ color: '#64748b' }}>{icon}</div>}
      </div>
    </Card>
  );
}

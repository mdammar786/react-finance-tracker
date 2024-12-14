import React from 'react';

interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  onClick?: () => void;
}

const paddingMap: Record<string, string> = {
  none: '0',
  sm: '12px',
  md: '16px',
  lg: '24px',
};

export function Card({ children, padding = 'md', hoverable = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        padding: paddingMap[padding],
        cursor: hoverable || onClick ? 'pointer' : undefined,
        transition: hoverable ? 'box-shadow 0.2s' : undefined,
      }}
    >
      {children}
    </div>
  );
}


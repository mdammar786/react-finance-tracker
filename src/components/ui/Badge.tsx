import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
}

const variantColors: Record<string, { bg: string; text: string }> = {
  success: { bg: '#dcfce7', text: '#16a34a' },
  warning: { bg: '#fef3c7', text: '#d97706' },
  danger: { bg: '#fee2e2', text: '#dc2626' },
  info: { bg: '#cffafe', text: '#0891b2' },
  neutral: { bg: '#f1f5f9', text: '#64748b' },
};

export function Badge({ variant = 'neutral', children }: BadgeProps) {
  const colors = variantColors[variant];
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 500,
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {children}
    </span>
  );
}


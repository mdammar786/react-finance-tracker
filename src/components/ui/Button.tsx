import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: { backgroundColor: '#2563eb', color: '#fff', border: 'none' },
  secondary: { backgroundColor: '#64748b', color: '#fff', border: 'none' },
  danger: { backgroundColor: '#dc2626', color: '#fff', border: 'none' },
  ghost: { backgroundColor: 'transparent', color: '#0f172a', border: '1px solid #e2e8f0' },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { padding: '4px 12px', fontSize: '14px' },
  md: { padding: '8px 16px', fontSize: '16px' },
  lg: { padding: '12px 24px', fontSize: '18px' },
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled || loading}
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        width: fullWidth ? '100%' : undefined,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        borderRadius: '6px',
        fontWeight: 500,
        opacity: disabled || loading ? 0.6 : 1,
      }}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}


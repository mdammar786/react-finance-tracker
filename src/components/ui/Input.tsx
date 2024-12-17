import React, { useState, useRef, useCallback } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: string;
  error?: string;
  onChange?: (value: string) => void;
  icon?: React.ReactNode;
}

export function Input({ label, error, onChange, icon, ...rest }: InputProps) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div style={{ marginBottom: '8px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500, color: '#0f172a' }}>
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid ' + (error ? '#dc2626' : focused ? '#2563eb' : '#e2e8f0'),
          borderRadius: '6px',
          padding: '0 12px',
          backgroundColor: '#fff',
        }}
      >
        {icon && <span style={{ marginRight: '8px', color: '#64748b' }}>{icon}</span>}
        <input
          ref={inputRef}
          {...rest}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            border: 'none',
            outline: 'none',
            padding: '8px 0',
            fontSize: '16px',
            width: '100%',
            color: '#0f172a',
            background: 'transparent',
          }}
        />
      </div>
      {error && <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px' }}>{error}</span>}
    </div>
  );
}


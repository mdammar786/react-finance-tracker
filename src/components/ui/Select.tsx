import React, { useState, useCallback, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export function Select({ options, value, onChange, placeholder = 'Select...', label }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (onChange) onChange(optionValue);
      setIsOpen(false);
    },
    [onChange]
  );

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: 'relative', marginBottom: '8px' }}>
      {label && <div style={{ marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>{label}</div>}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
        }}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <span>▾</span>
      </div>
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            backgroundColor: '#fff',
            maxHeight: '200px',
            overflow: 'auto',
            zIndex: 100,
            marginTop: '4px',
          }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                backgroundColor: option.value === value ? '#f1f5f9' : '#fff',
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


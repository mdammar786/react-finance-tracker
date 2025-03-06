import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../../components/ui/Badge';

describe('Badge', () => {
  test('renders children text', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  test('renders with variant', () => {
    render(<Badge variant="success">Done</Badge>);
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  test('renders with danger variant', () => {
    render(<Badge variant="danger">Failed</Badge>);
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });
});

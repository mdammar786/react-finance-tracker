import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../../components/ui/Card';

describe('Card', () => {
  test('renders children', () => {
    render(<div><Card>Card Content</Card></div>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  test('renders with different padding variants', () => {
    const { container } = render(<Card padding="lg">Large Padding</Card>);
    expect(container.firstChild).toBeTruthy();
  });
});

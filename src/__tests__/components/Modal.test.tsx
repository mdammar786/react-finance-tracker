import React from 'react';
import { render, screen } from '@testing-library/react';
import { Modal } from '../../components/ui/Modal';

describe('Modal', () => {
  test('renders nothing when closed', () => {
    const { container } = render(<Modal isOpen={false} onClose={() => {}}>Content</Modal>);
    expect(container.innerHTML).toBe('');
  });

  test('renders title when open', () => {
    render(<Modal isOpen={true} onClose={() => {}} title="Test Modal">Content</Modal>);
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
  });

  test('renders children when open', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Modal Body</Modal>);
    expect(screen.getByText('Modal Body')).toBeInTheDocument();
  });

  test('has dialog role when open', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('dialog has aria-modal true', () => {
    render(<Modal isOpen={true} onClose={() => {}}>Content</Modal>);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});

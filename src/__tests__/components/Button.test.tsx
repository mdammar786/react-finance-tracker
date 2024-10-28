import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../../components/ui/Button';

describe('Button', () => {
  test('renders children text', () => {
    render(<button>Click me</button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('shows loading text when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('is disabled when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByText('Loading...').closest('button')).toBeDisabled();
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByText('Submit').closest('button')).toBeDisabled();
  });

  test('renders non-loading text normally', () => {
    render(<Button>Save</Button>);
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});


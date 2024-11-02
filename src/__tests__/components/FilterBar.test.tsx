import React from 'react';
import { render, screen } from '@testing-library/react';
import { FilterBar } from '../../components/FilterBar';

describe('FilterBar', () => {
  test('renders Filters header', () => {
    render(<FilterBar filter={{}} onFilterChange={() => {}} onReset={() => {}} />);
    expect(screen.getByText('Filters')).toBeInTheDocument();
  });

  test('renders Apply and Reset buttons', () => {
    render(<FilterBar filter={{}} onFilterChange={() => {}} onReset={() => {}} />);
    expect(screen.getByText('Apply')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  test('renders search input', () => {
    render(<FilterBar filter={{}} onFilterChange={() => {}} onReset={() => {}} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });
});


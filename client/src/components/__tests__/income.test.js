import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Income from '../Transactions/Income';
import '@testing-library/jest-dom';

describe('Income component', () => {
  test('renders with total income and add income button', () => {
    const openModalMock = jest.fn();
    const totalIncome = 500;

    render(<Income openModal={openModalMock} totalIncome={totalIncome} />);

    // Check if the component renders with the correct title
    expect(screen.getByText('Income')).toBeInTheDocument();

    // Check if the total income is displayed
    expect(screen.getByText('Total Income:')).toBeInTheDocument();
    expect(screen.getByText('$ 500')).toBeInTheDocument();

    // Check if the add income button is rendered and clickable
    const addButton = screen.getByRole('button', { name: 'Add Income' });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  test('renders with default total income and add income button', () => {
    const openModalMock = jest.fn();

    render(<Income openModal={openModalMock} />);

    // Check if the component renders with the default total income
    expect(screen.getByText('Total Income:')).toBeInTheDocument();
    expect(screen.getByText('$ 0')).toBeInTheDocument();

    // Check if the add income button is rendered and clickable
    const addButton = screen.getByRole('button', { name: 'Add Income' });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });
});

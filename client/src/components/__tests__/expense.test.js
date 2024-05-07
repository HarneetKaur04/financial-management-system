import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Expense from '../Transactions/Expense';
import '@testing-library/jest-dom';

describe('Expense component', () => {
  test('renders with total expense and add expense button', () => {
    const openModalMock = jest.fn();
    const totalExpense = 500;

    render(<Expense openModal={openModalMock} totalExpense={totalExpense} />);

    // Check if the component renders with the correct title
    expect(screen.getByText('Expense')).toBeInTheDocument();

    // Check if the total expense is displayed
    expect(screen.getByText('Total Expense:')).toBeInTheDocument();
    expect(screen.getByText('$ 500')).toBeInTheDocument();

    // Check if the add expense button is rendered and clickable
    const addButton = screen.getByRole('button', { name: 'Add Expense' });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });

  test('renders with default total expense and add expense button', () => {
    const openModalMock = jest.fn();

    render(<Expense openModal={openModalMock} />);

    // Check if the component renders with the default total expense
    expect(screen.getByText('Total Expense:')).toBeInTheDocument();
    expect(screen.getByText('$ 0')).toBeInTheDocument();

    // Check if the add expense button is rendered and clickable
    const addButton = screen.getByRole('button', { name: 'Add Expense' });
    expect(addButton).toBeInTheDocument();
    fireEvent.click(addButton);
    expect(openModalMock).toHaveBeenCalledTimes(1);
  });
});

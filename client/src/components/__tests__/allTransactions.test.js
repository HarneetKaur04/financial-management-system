import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AllTransactions from '../Transactions/AllTransactions';

describe('AllTransactions component', () => {
  const mockTransactions = [
    {
      transaction_id: 1,
      date: '2024-05-07',
      name: 'Transaction 1',
      type: 'expense',
      category: 'Food',
      amount: '20'
    },
    {
      transaction_id: 2,
      date: '2024-05-06',
      name: 'Transaction 2',
      type: 'income',
      category: 'Salary',
      amount: '1000'
    },
  ];

  test('renders all transactions', () => {
    render(<AllTransactions allTransactions={mockTransactions} />);
    const transactionRows = screen.getAllByRole('row');
    expect(transactionRows.length).toBe(mockTransactions.length + 1); // Add 1 for table header row
  });

  test('renders transactions and filters by search term', () => {
    render(<AllTransactions allTransactions={mockTransactions} />);
    const searchInput = screen.getByLabelText('Search:');
    fireEvent.change(searchInput, { target: { value: 'Transaction 1' } });

    const filteredTransactionRows = screen.queryAllByRole('row').filter(row => {
      // Check if the row contains the transaction name
      return row.textContent.includes('Transaction 1');
    });

    expect(filteredTransactionRows.length).toBe(1); // Expecting only one row with the transaction
  });

  test('sorts transactions based on selected sort option', () => {
    render(<AllTransactions allTransactions={mockTransactions} />);
    const sortSelect = screen.getByLabelText('Sort By:');

    // Select 'Amount (Highest)' from the dropdown
    fireEvent.change(sortSelect, { target: { value: 'amount_highest' } });

    // Get the rows of the sorted transactions
    const sortedTransactionRows = screen.getAllByRole('row').slice(1); // Skip the header row

    // Check if the transactions are sorted in descending order based on the amount
    expect(sortedTransactionRows).toHaveLength(mockTransactions.length);
    for (let i = 0; i < sortedTransactionRows.length - 1; i++) {
      const currentAmount = parseFloat(sortedTransactionRows[i].querySelectorAll('td')[4].textContent.slice(1));
      const nextAmount = parseFloat(sortedTransactionRows[i + 1].querySelectorAll('td')[4].textContent.slice(1));
      expect(currentAmount).toBeGreaterThanOrEqual(nextAmount);
    }
  });
});

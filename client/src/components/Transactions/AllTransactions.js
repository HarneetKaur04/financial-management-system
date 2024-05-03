import React, { useState } from 'react';
import './AllTransactions.css'; // Import CSS file for custom styles

const AllTransactions = ({ allTransactions, onDelete, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleEditClick = (transaction) => {
    onEdit(transaction);
  };

  const handleDeleteClick = (transactionId) => {
    // Call parent component function to handle deletion
    onDelete(transactionId);
  };

  const filteredTransactions = allTransactions.filter(transaction =>
    transaction.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        // Sort by date in descending order (most recent first)
        return new Date(b.date) - new Date(a.date);
      case 'type':
        // Sort by type
        return a.type.localeCompare(b.type);
      case 'amount_highest':
        // Sort by highest amount
        return b.amount - a.amount;
      case 'amount_lowest':
        // Sort by lowest amount
        return a.amount - b.amount;
      default:
        return 0;
    }
  });

  return (
    <div className='all-transactions-container'>
      <h2>All Transactions</h2>
      <div className="search-sort">
        <label className='searchbar'>Search:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Select</option>
          <option value="date">Date (Most Recent)</option>
          <option value="type">Transaction Type</option>
          <option value="amount_highest">Amount (Highest)</option>
          <option value="amount_lowest">Amount (Lowest)</option>
        </select>
      </div>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction.transaction_id}>
              <td>{new Date(transaction.date).toLocaleDateString()}</td>
              <td>{transaction.name}</td>
              <td>{transaction.type}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(transaction)}>Edit</button>
              </td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteClick(transaction.transaction_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTransactions;

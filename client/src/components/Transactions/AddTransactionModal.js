import React, { useState, useContext } from 'react';
import AuthContext from '../../AuthContext';

const AddTransactionModal = ({ type, onClose }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleSave = async () => {
    try {
      // Check if any required field is empty
      if (!name || !date || !amount || !category) {
        throw new Error('Please fill in all fields');
      }

      const transactionData = {
        user_id: currentUser.uid,
        date,
        type,
        category,
        name,
        amount,
      };

      const route = type === 'income' ? 'income' : 'expense'; // Specify route for income or expense

      const response = await fetch(`http://localhost:7000/api/transactions/${route}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }

      setMessage('Transaction saved successfully');
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error saving transaction:', error);
      setMessage(error.message);
    }
  };

  return (
    <div className={`modal ${isModalOpen ? 'open' : ''}`}>
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <h2>{type === 'income' ? 'Add Income' : 'Add Expense'}</h2>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required // Make the input field mandatory
      />
      <label>Date:</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required // Make the input field mandatory
      />
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required // Make the input field mandatory
      />
      <label>Category:</label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required // Make the select dropdown mandatory
      >
        <option value="">Select Category</option>
        {type === 'income' ? (
          <>
            <option value="salary">Salary</option>
            <option value="investment">Investment</option>
            <option value="freelance">Freelance</option>
            <option value="rental">Rental</option>
            <option value="others">Others</option>
          </>
        ) : (
          <>
            <option value="food">Food</option>
            <option value="education">Education</option>
            <option value="rent">Rent</option>
            <option value="car">Car</option>
            <option value="grooming">Grooming</option>
            <option value="miscellaneous">Miscellaneous</option>
            <option value="shopping">Shopping</option>
            <option value="entertainment">Entertainment</option>
          </>
        )}
      </select>
      {message && <p>{message}</p>}
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default AddTransactionModal;

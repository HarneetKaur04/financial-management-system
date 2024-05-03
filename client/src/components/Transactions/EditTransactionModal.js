import React, { useState } from 'react';

const EditTransactionModal = ({ transaction, onUpdate, onDelete, onClose }) => {
  const [editedTransaction, setEditedTransaction] = useState({ ...transaction });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction({ ...editedTransaction, [name]: value });
  };

  const handleSave = async () => {
    try {
      // Call onUpdate function passed from parent component with the edited transaction
      await onUpdate(editedTransaction);
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Call onDelete function passed from parent component to delete the transaction
      await onDelete(editedTransaction.transaction_id);
      // Close the modal
      onClose();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Edit Transaction</h2>
        <form>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={editedTransaction.date ? editedTransaction.date.substring(0, 10) : ''}
            onChange={handleInputChange}
          />
          <label>Name:</label>
          <input type="text" name="name" value={editedTransaction.name} onChange={handleInputChange} />
          <label>Type:</label>
          <select
            name="type"
            value={editedTransaction.type}
            onChange={handleInputChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label>Category:</label>
          <select
            name="category"
            value={editedTransaction.category}
            onChange={handleInputChange}
          >
            {editedTransaction.type === 'income' ? (
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
          <label>Amount:</label>
          <input type="number" name="amount" value={editedTransaction.amount} onChange={handleInputChange} />
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={handleDelete}>Delete</button>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;

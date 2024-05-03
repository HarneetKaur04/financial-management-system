import React from 'react';

const Expense = ({ openModal, totalExpense }) => {

  return (
    <div className='stats'>
      <h2>Expense</h2>
      <img src='/assets/expenses-image.gif' alt="expense" />
      <p>Total Expense: {totalExpense ? `$ ${totalExpense}` : '$ 0'}</p>
      <button onClick={() => openModal()}>Add Expense</button>
    </div>
  );
};

export default Expense;

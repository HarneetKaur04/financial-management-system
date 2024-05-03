import React from 'react';

const Expense = ({ openModal, totalExpense }) => {

  return (
    <div className='stats'>
      <h2>Expense</h2>
      <img src='/assets/expenses-image.gif' alt="expense" />
      <p>
        Total Expense: 
        <span style={{ color: '#3b24d4' }}>
          {totalExpense ? `$ ${totalExpense}` : '$ 0'}
        </span>
      </p>
      <button onClick={() => openModal()}>Add Expense</button>
    </div>
  );
};

export default Expense;

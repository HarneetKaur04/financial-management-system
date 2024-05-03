import React from 'react';

const Income = ({ openModal, totalIncome }) => {
  return (
    <div className='stats'>
      <h2>Income</h2>
      <img src='/assets/income-image.gif' alt="income" />
      <p>
        Total Income: 
        <span style={{ color: '#3b24d4' }}>
          {totalIncome ? `$ ${totalIncome}` : '$ 0'}
        </span>
      </p>
      <button onClick={() => openModal()}>Add Income</button>
    </div>
  );
};

export default Income;

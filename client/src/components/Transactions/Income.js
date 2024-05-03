import React from 'react';

const Income = ({ openModal, totalIncome }) => {
  return (
    <div className='stats'>
      <h2>Income</h2>
      <img src='/assets/income-image.gif' alt="income" />
      <p>Total Income: {totalIncome ? `$ ${totalIncome}` : 'N/A'}</p>
      <button onClick={() => openModal()}>Add Income</button>
    </div>
  );
};

export default Income;

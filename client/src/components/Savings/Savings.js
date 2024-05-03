import React from 'react';

const Savings = ({ totalSavings }) => {
  return (
    <div className='stats'>
      <h2>Savings</h2>
      <img src='/assets/savings-image.gif' alt="savings" />
      <p>Total Savings: ${totalSavings}</p>
    </div>
  );
};

export default Savings;

import React from 'react';

const Savings = ({ openSavingsModal, totalSavings, allocatedSavings }) => {

  const totalAllocatedSavings = allocatedSavings?.reduce((total, goal) => {
    const savedAmount = parseFloat(goal.current_amount_saved || 0);
    return total + savedAmount;
  }, 0);

  return (
    <div className='stats'>
      <h2>Savings</h2>
      <img src='/assets/savings-image.gif' alt="savings" />
      <p>
        Total Savings: 
        <span style={{ color: '#3b24d4' }}>
          {totalSavings ? `$ ${totalSavings}` : '$ 0'}
        </span>
      </p>
      <p style={{ fontSize: "small" }}>Allocated towards Goals: $ {totalAllocatedSavings}</p>
      <p style={{ fontSize: "small" }}>Unallocated Savings: $ {totalSavings - totalAllocatedSavings}</p>
      <button
        onClick={() => openSavingsModal()}
        disabled={(totalSavings - totalAllocatedSavings) <= 0}
        style={{ cursor: (totalSavings - totalAllocatedSavings) <= 0 ? 'not-allowed' : 'pointer' }}
      >
        Allocate Savings to Goals
      </button>
    </div>
  );
};

export default Savings;

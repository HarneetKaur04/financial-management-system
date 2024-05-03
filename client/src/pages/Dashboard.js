import React, { useState, useContext, useEffect } from 'react';
import Expense from '../components/Transactions/Expense';
import Income from '../components/Transactions/Income';
import AddTransactionModal from '../components/Transactions/AddTransactionModal';
import Savings from '../components/Savings/Savings';
import SavingsRate from '../components/Savings/SavingsRate';
import IncomeExpenseSource from '../components/Transactions/IncomeExpenseSource';
import AuthContext from '../AuthContext';
import AllTransactions from '../components/Transactions/AllTransactions';
import EditTransactionModal from '../components/Transactions/EditTransactionModal';
import './Dashboard.css'; // Import CSS file for custom styles

function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [incomeSources, setIncomeSources] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [expenseSources, setExpenseSources] = useState([]);
  const [totalSavings, setTotalSavings] = useState(null);
  const [savingsRateData, setSavingsRateData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
    }
  }, [currentUser, isModalOpen]);

  const fetchTransactions = async () => {
    fetch(`http://localhost:7000/api/transactions/${currentUser.uid}`)
      .then((response) => response.json())
      .then((data) => {
        setAllTransactions(data.allTransactions);
        setTotalIncome(data.totalIncome);
        setTotalExpense(data.totalExpense);
        setIncomeSources(data.incomeSources);
        setExpenseSources(data.expenseSources);
        setTotalSavings(data.totalSavings);
        setSavingsRateData(data.savingsRates);
      })
      .catch((error) => console.error('Error fetching income data:', error));
  };

  const handleUpdateTransaction = async (updatedTransaction) => {
    try {
      // Send a PUT request to update the transaction
      const response = await fetch(`http://localhost:7000/api/transactions/${currentUser.uid}/${updatedTransaction.transaction_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTransaction)
      });

      if (response.ok) {
        // Transaction updated successfully, fetch all transactions again
        fetchTransactions();
        setSelectedTransaction(null); // Close the modal
      } else {
        console.error('Failed to update transaction');
      }
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    try {
      // Send a DELETE request to delete the transaction
      const response = await fetch(`http://localhost:7000/api/transactions/${currentUser.uid}/${transactionId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Transaction deleted successfully, fetch all transactions again
        fetchTransactions();
        setSelectedTransaction(null); // Close the modal
      } else {
        console.error('Failed to delete transaction');
      }
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const openModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
  };

  return (
    <div className={`top-container-dashboard ${isModalOpen ? 'modal-open' : ''}`}>
      <div className="card">
        <Savings totalSavings={totalSavings} />
      </div>
      <div className="card">
        <Income openModal={() => openModal('income')} totalIncome={totalIncome} />
      </div>
      <div className="card">
        <Expense openModal={() => openModal('expense')} totalExpense={totalExpense} />
      </div>
      {isModalOpen && <AddTransactionModal type={modalType} onClose={closeModal} />}
      <div className="card">
        <SavingsRate savingsRateData={savingsRateData} />
      </div>
      <div className="card">
        <IncomeExpenseSource type={'income'} categories={incomeSources} />
        <IncomeExpenseSource type={'expense'} categories={expenseSources} />
      </div>
      <div className="transaction-container">
        <AllTransactions
          allTransactions={allTransactions}
          onEdit={setSelectedTransaction}
          onDelete={handleDeleteTransaction}
        />
        {selectedTransaction && (
          <EditTransactionModal
            transaction={selectedTransaction}
            onUpdate={handleUpdateTransaction}
            onDelete={handleDeleteTransaction}
            onClose={() => setSelectedTransaction(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import AchievedGoal from '../components/Goals/AchievedGoal';
import ActiveGoal from '../components/Goals/ActiveGoal';
import SavingsPerGoal from "../components/Savings/SavingsPerGoal"

function Dashboard() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingsModalOpen, setIsSavingsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [totalIncome, setTotalIncome] = useState(null);
  const [allTransactions, setAllTransactions] = useState([]);
  const [incomeSources, setIncomeSources] = useState([]);
  const [totalExpense, setTotalExpense] = useState(null);
  const [expenseSources, setExpenseSources] = useState([]);
  const [totalSavings, setTotalSavings] = useState(null);
  const [allocatedSavings, setAllocatedSavings] = useState(null);
  const [savingsToGoalsResult, setSavingsToGoalsResult] = useState([])
  const [savingsToGoalsReportModal, setSavingsToGoalsReportModal] = useState(false)
  const [savingsRateData, setSavingsRateData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [activeGoals, setActiveGoals] = useState([]);
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [allocationAmount, setAllocationAmount] = useState("");
  const [message, setMessage] = useState("")
  const [isFullReportOpen, setIsFullReportOpen] = useState(false);
  const [isSourcesFullReportOpen, setIsSourcesFullReportOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      fetchTransactions();
      fetchGoals();
    }
  }, [currentUser, isModalOpen, isSavingsModalOpen]);

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
        setSavingsToGoalsResult(data.savingsToGoalsResult);
        setAllocatedSavings(data.allocatedSavings);
        setSavingsRateData(data.savingsRates);
      })
      .catch((error) => console.error('Error fetching income data:', error));
  };

  const fetchGoals = async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/financial-goals/${currentUser.uid}`);
      const data = await response.json();
      setActiveGoals(data.filter(item => !item.completion_status));
      setAchievedGoals(data.filter(item => item.completion_status));
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
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

  const openSavingsModal = () => {
    setIsSavingsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setIsFullReportOpen(false);
    setIsSourcesFullReportOpen(false);
    setSavingsToGoalsReportModal(false);
  };

  const closeSavingModal = () => {
    setIsSavingsModalOpen(false);
    setSelectedGoal();
    setMessage("");
  }

  const handleViewFullReport = () => {
    setIsFullReportOpen(true); // Open the full report modal
  };

  const handleSourcesReport = (buttonType) => {
    setIsSourcesFullReportOpen(true); // Open the full report modal
    setModalType(buttonType);
  };

  const handleGoalSelection = (event) => {
    const selectedGoalId = event.target.value;
    const goal = activeGoals.find((goal) => goal.goal_id === parseInt(selectedGoalId));
    setSelectedGoal(goal);
  };

  const handleAllocation = async () => {
    if (!selectedGoal || !allocationAmount) {
      // Either no goal selected or allocation amount is empty
      return;
    }
  
    const remainingAmount = selectedGoal.target_amount - selectedGoal.current_amount_saved;
  
    if (parseInt(allocationAmount) > parseInt(remainingAmount)) {
      // Entered amount exceeds remaining amount, show error message
      setMessage("Entered amount exceeds remaining amount!");
      return;
    }

    const totalAllocatedSavings = allocatedSavings?.reduce((total, goal) => {
      const savedAmount = parseFloat(goal.current_amount_saved || 0);
      return total + savedAmount;
    }, 0);

    if (parseInt(allocationAmount) > parseInt(totalSavings- totalAllocatedSavings)) {
      // Entered amount exceeds total savings amount, show error message
      setMessage("You do not have that much savings to allocate!");
      return;
    }
  
    try {
      // Send a PUT request to update the goal's current amount saved
      const response = await fetch(`http://localhost:7000/api/financial-goals/${currentUser.uid}/${selectedGoal.goal_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentAmountSaved: parseInt(selectedGoal.current_amount_saved) + parseInt(allocationAmount),
          completionStatus: parseInt(selectedGoal.current_amount_saved) + parseInt(allocationAmount) >= parseInt(selectedGoal.target_amount)
        })
      });
  
      if (response.ok) {
        fetchGoals();
        setIsSavingsModalOpen(false);
        setSelectedGoal();
        setMessage("");
      } else {
        setMessage('Failed to update goal');
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const updatedSavingsToGoalsResult = savingsToGoalsResult?.map((item, index, array) => {
    if (index === 0 || item.goal_id !== array[index - 1].goal_id) {
      return {
        ...item,
        amount_allocated: parseFloat(item.amount_allocated)
      };
    } else {
      const previousAmountAllocated = parseFloat(array[index - 1].amount_allocated);
      const currentAmountAllocated = parseFloat(item.amount_allocated);
      const individualAmount = currentAmountAllocated - previousAmountAllocated;
      return {
        ...item,
        amount_allocated: individualAmount
      };
    }
  });

  return (
    <div className={`top-container-dashboard ${isModalOpen ? 'modal-open' : ''}`}>
      <div className="card">
        <Savings openSavingsModal={() => openSavingsModal()} totalSavings={totalSavings} allocatedSavings= {allocatedSavings}/>
      </div>
      <div className="card">
        <Income openModal={() => openModal('income')} totalIncome={totalIncome} />
      </div>
      <div className="card">
        <Expense openModal={() => openModal('expense')} totalExpense={totalExpense} />
      </div>
      <div className="card">
        <SavingsRate savingsRateData={savingsRateData} handleViewFullReport={handleViewFullReport}/>
      </div>
      {isFullReportOpen && (
        <div className={`modal ${isFullReportOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Detailed Transactions Report</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {savingsRateData[savingsRateData.length-1]?.transaction_report.map(transaction => (
                  <tr key={transaction.transaction_id}>
                    <td>{transaction.name}</td>
                    <td>{transaction.date.split("T")[0]}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="card">
        <SavingsPerGoal totalSavings={totalSavings} allocatedSavings= {allocatedSavings} handleSavingsToGoalsReport={() => setSavingsToGoalsReportModal(true)}/>
      </div>
      {savingsToGoalsReportModal &&
        <div className={`modal ${savingsToGoalsReportModal ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Savings Allocation Towards Goals Report</h2>
            <table>
              <thead>
                <tr>
                  <th>Goal Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
              {updatedSavingsToGoalsResult?.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.goal_name}</td>
                    <td>{transaction.date_allocated.split("T")[0]}</td>
                    <td>${transaction.amount_allocated}</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      }
      {isSavingsModalOpen && (
        <div className={`modal ${isSavingsModalOpen ? 'open' : ''}`}>
          <span className="close" onClick={closeSavingModal}>&times;</span>
          <button className='add-goal' onClick={() => navigate("/financial-goals")}>ADD NEW GOALS</button>
          <h3>Allocate $ towards Goals</h3>
          <label htmlFor="goal-dropdown">Category:</label>
          <select id="goal-dropdown" onChange={handleGoalSelection}>
            <option value="">Select a Goal</option>
            {activeGoals.map((goal, index) => (
              <option key={index} value={goal.goal_id}>
                {goal.goal_name}
              </option>
            ))}
          </select>
          {selectedGoal && (
            <div className="">
              <div id="goal-details">
                <p><strong>Targeted Amount:</strong> {`$${selectedGoal.target_amount}`}</p>
                <p><strong>Currently Saved Amount:</strong>{`$${selectedGoal.current_amount_saved}`}</p>
                <p><strong>Remaining Amount:</strong> {`$${selectedGoal.target_amount - selectedGoal.current_amount_saved}`}</p>
              </div>
              <label htmlFor="allocation-amount">Enter amount:</label>
              <input
                type="number"
                id="allocation-amount"
                value={allocationAmount}
                onChange={(e) => setAllocationAmount(e.target.value)} />
            </div>
          )
          }
          <button onClick={handleAllocation} disabled={!selectedGoal || !allocationAmount}>Allocate</button>
          <button onClick={closeSavingModal}>Close</button>
          {message && <p>{message}</p>}
        </div>
      )}
      {isModalOpen && <AddTransactionModal type={modalType} onClose={closeModal} />}
      <div className="card">
        <IncomeExpenseSource type={'income'} categories={incomeSources} handleSourcesReport={(buttonType) => handleSourcesReport(buttonType)} onButtonClick={() => handleSourcesReport('income')}/>
      </div>
      <div className="card">
        <IncomeExpenseSource type={'expense'} categories={expenseSources} handleSourcesReport={(buttonType) => handleSourcesReport(buttonType)} onButtonClick={() => handleSourcesReport('expense')}/>
      </div>
      {isSourcesFullReportOpen && (
        <div className={`modal ${isSourcesFullReportOpen ? 'open' : ''}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{modalType === 'income' ? 'Income Sources Report' : 'Expense Sources Report'}</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions
                  .filter(transaction => transaction.type === modalType)
                  .map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.name}</td>
                      <td>{new Date(transaction.date).toLocaleDateString()}</td>
                      <td>${parseFloat(transaction.amount).toFixed(2)}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.category}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <div className="financial-goals-container">
        <div className="active-goals-container">
          <h2>Active Goals
            <br/>
            <button className="add-goal-btn-card" onClick={() => navigate("/financial-goals")}>ADD NEW GOALS</button>
          </h2>
          
          {activeGoals.length <=0 && <p>No active goals!</p>}
          <div className="active-goal-card-container">
            {activeGoals.map((goal, index) => (
              <ActiveGoal
                key={index}
                title={goal.goal_name}
                goal_id={goal.goal_id}
                currentAmountSaved={goal.current_amount_saved}
                budget={goal.target_amount}
              />
            ))}
          </div>
        </div>
        <AchievedGoal achievedGoals={achievedGoals}/>
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

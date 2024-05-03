import React, { useState } from "react";

function FinancialGoalCard({ title, budget, onBudgetAssign }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState("");

  const handleAssignBudget = () => {
    onBudgetAssign(title, newBudget);
    setIsModalOpen(false);
  };

  const handleGoalAchieved = () => {
    // Logic to mark goal as achieved and reset budget
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="financial-goal-card">
      <h3 onClick={() => setIsModalOpen(true)}>{title}</h3>
      <p>{budget ? `Budget: $${budget}` : "No budget assigned"}</p>
      {budget && (
        <button onClick={handleGoalAchieved}>Mark as goal achieved</button>
      )}
      {isModalOpen && (
        <div className="modal">
          <h3>Assign Target</h3>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
          <button onClick={handleAssignBudget}>Assign Budget</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default FinancialGoalCard;

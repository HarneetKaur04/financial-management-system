import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FinancialGoalCard({ goal_id, title, currentAmountSaved, budget, onBudgetAssign, onGoalAchieved, onDeleteGoal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const [progress, setProgress] = useState((currentAmountSaved/budget)*100); // Progress towards goal
  const navigate = useNavigate();

  const handleAssignBudget = () => {
    onBudgetAssign(title, newBudget);
    setIsModalOpen(false);
  };

  const handleGoalAchieved = () => {
    // Reset budget and progress
    setNewBudget("");
    setProgress(0);
    // Call the callback to mark goal as achieved
    onGoalAchieved(goal_id, currentAmountSaved);
  };

  const handleDelete = () => {
    // Call the callback to delete the goal
    onDeleteGoal(goal_id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="financial-goal-card">
      <h3 onClick={() => setIsModalOpen(true)}>{title}</h3>
      {!onGoalAchieved && <button onClick={() => navigate("/financial-goals")}>Details</button>}
      {onGoalAchieved &&
        <><p>{budget ? `Target: $${budget}` : "No target assigned"}</p><p>{budget && `Saved: $${currentAmountSaved}`}</p><p>{budget && `Remaining: $${budget - currentAmountSaved}`}</p></>
      }
      {budget && (
        <>
          <div>Progress: {progress.toFixed(2)}%</div>
          <progress value={progress} max="100"></progress>
          {onGoalAchieved && <button onClick={handleGoalAchieved}>Mark as goal achieved</button>}
        </>
      )}
      {onDeleteGoal && <button onClick={handleDelete}>Delete Goal</button>}
      {isModalOpen && (
        <div className="modal">
          <h3>Assign Target</h3>
          <input
            type="number"
            value={newBudget}
            onChange={(e) => setNewBudget(e.target.value)}
          />
          <button onClick={handleAssignBudget}>Assign Target</button>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
}

export default FinancialGoalCard;

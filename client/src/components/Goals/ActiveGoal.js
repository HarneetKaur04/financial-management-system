import React, { useState } from 'react';
import FinancialGoalCard from './FinancialGoalCard'; // Import FinancialGoalCard component

function ActiveGoal({ goal_id, title, currentAmountSaved, budget, onBudgetAssign, onGoalAchieved, onDeleteGoal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const [progress, setProgress] = useState(0); // Progress towards goal

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
    <FinancialGoalCard
      title={title}
      budget={budget}
      onBudgetAssign={onBudgetAssign}
      onGoalAchieved={onGoalAchieved}
      onDeleteGoal={onDeleteGoal}
      goal_id={goal_id}
      currentAmountSaved={currentAmountSaved}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      newBudget={newBudget}
      setNewBudget={setNewBudget}
      progress={progress}
      setProgress={setProgress}
      handleAssignBudget={handleAssignBudget}
      handleGoalAchieved={handleGoalAchieved}
      handleDelete={handleDelete}
      handleCloseModal={handleCloseModal}
    />
  );
}

export default ActiveGoal;

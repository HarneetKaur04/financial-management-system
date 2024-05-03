import React, { useState } from "react";
import FinancialGoalCard from "../components/Goals/FinancialGoalCard";
import "./FinancialGoals.css";

function FinancialGoals() {
  const [goals, setGoals] = useState([
    { title: "Buy a House", budget: null },
    { title: "Pay off Mortgage", budget: null },
    { title: "Take a Vacation", budget: null },
    { title: "Save for Retirement", budget: null },
    { title: "Buy a Car", budget: null },
    { title: "Others", budget: null },
  ]);

  const handleBudgetAssign = (title, newBudget) => {
    const updatedGoals = goals.map((goal) =>
      goal.title === title ? { ...goal, budget: newBudget } : goal
    );
    setGoals(updatedGoals);
  };

  return (
    <div className="top-container-financial-goals">
      <h2 className="add-goals-heading">Add Goals</h2>
      <div className="goal-cards">
        {goals.map((goal, index) => (
          <FinancialGoalCard
            key={index}
            title={goal.title}
            budget={goal.budget}
            onBudgetAssign={handleBudgetAssign}
          />
        ))}
      </div>
    </div>
  );
}

export default FinancialGoals;

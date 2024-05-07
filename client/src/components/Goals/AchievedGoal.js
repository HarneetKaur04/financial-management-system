import React from "react";

function AchievedGoal({ achievedGoals }) {
  return (
    <div className="achieved-goals-container">
      <h2>Achieved Goals</h2>
      {achievedGoals.length > 0 ? 
      <div className="achieved-goal-list">
      {achievedGoals.map((goal, index) => (
        <div className="achieved-goal-item" key={index}>
          <img src="/assets/goal-achieved.png" alt="Goal success" />
          <div>
            <div>{goal.goal_name}</div>
            <div>Saved $ {goal.current_amount_saved}</div>
          </div>
        </div>
      ))}
    </div> : <p>No Goals Achieved Yet!</p>
      }
    </div>
  );
}

export default AchievedGoal;

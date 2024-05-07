import React, { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../AuthContext";
import "./FinancialGoals.css"; // Import CSS file
import { useNavigate } from "react-router-dom";
import AchievedGoal from "../components/Goals/AchievedGoal";
import ActiveGoal from "../components/Goals/ActiveGoal";

function FinancialGoals() {
  const goals = [
    {goal_name: "TAKE A VACATION", img: "/assets/vacation.gif"},
    {goal_name: "SAVE FOR RETIREMENT", img: "/assets/retirement.jpg"},
    {goal_name: "PAY OFF DEBT", img: "/assets/debt.webp"},
    {goal_name: "BUY A HOUSE", img: "/assets/house.avif"},
    {goal_name: "SAVE FOR EDUCATION", img: "/assets/education.webp"},
    {goal_name: "BUY A CAR", img: "/assets/car.avif"}
  ]
  const [activeGoals, setActiveGoals] = useState([]);
  const [achievedGoals, setAchievedGoals] = useState([]);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalAmount, setNewGoalAmount] = useState("");
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const resetOptions = () => {
    setNewGoalName("");
    setNewGoalAmount("");
  };

  const handleAddGoal = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/financial-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          goalName: newGoalName.toUpperCase(),
          targetAmount: newGoalAmount,
        }),
      });
      if (response.ok) {
        setIsNewGoalModalOpen(false);
        fetchGoals();
        resetOptions();
      } else {
        console.error("Failed to add goal");
      }
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const fetchGoals = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:7000/api/financial-goals/${currentUser.uid}`);
      const data = await response.json();
      setActiveGoals(data.filter(item => !item.completion_status));
      setAchievedGoals(data.filter(item => item.completion_status));
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }, [currentUser]);

  const handleSelectGoal = (goal) => {
    setSelectedGoal(goal);
    setIsModalOpen(true);
  };

  const handleNewGoal = () => {
    setIsNewGoalModalOpen(true);
  };

  const handleBudgetAssign = async (title, budget) => {
    try {
      const response = await fetch("http://localhost:7000/api/financial-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          goalName: title,
          targetAmount: budget,
        }),
      });
      if (response.ok) {
        fetchGoals();
      } else {
        console.error("Failed to assign budget to goal");
      }
    } catch (error) {
      console.error("Error assigning budget to goal:", error);
    }
  };

  const handleGoalAchieved = async (goal_id, currentAmountSaved) => {
    try {
      const response = await fetch(`http://localhost:7000/api/financial-goals/${currentUser.uid}/${goal_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentAmountSaved: currentAmountSaved,
          completionStatus: true,
        }),
      });
      if (response.ok) {
        fetchGoals();
      } else {
        console.error("Failed to mark goal as achieved");
      }
    } catch (error) {
      console.error("Error marking goal as achieved:", error);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedGoal(null);
  };

  const handleSetTargetAmount = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/financial-goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          goalName: selectedGoal.goal_name,
          targetAmount: newGoalAmount,
        }),
      });
      if (response.ok) {
        fetchGoals();
        resetOptions();
        handleModalClose();
      } else {
        console.error("Failed to set target amount for goal");
      }
    } catch (error) {
      console.error("Error setting target amount for goal:", error);
    }
  };

  const handleDeleteGoal = async (goal_id) => {
    try {
      const response = await fetch(`http://localhost:7000/api/financial-goals/${currentUser.uid}/${goal_id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchGoals();
      } else {
        console.error("Failed to delete goal");
      }
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [currentUser, fetchGoals]);

  if (!currentUser) {
    navigate("/")
  }

  return (
    <div className="financial-goals-container">
      <div className="select-goals-container">
        <div className={`overlay ${isNewGoalModalOpen || isModalOpen ? 'active' : ''}`} />
        <div className="modal-financial" style={{ display: isNewGoalModalOpen ? "block" : "none" }}>
          <span className="close" onClick={() => setIsNewGoalModalOpen(false)}>&times;</span>
          <h2>ADD A NEW GOAL</h2>
          <input
            type="text"
            placeholder="Enter Goal Name"
            value={newGoalName}
            onChange={(e) => setNewGoalName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Target Amount"
            value={newGoalAmount}
            onChange={(e) => setNewGoalAmount(e.target.value)}
          />
          <button onClick={handleAddGoal}>Add Goal</button>
        </div>
        <h2>Empower your financial future by selecting your savings goals today. Your choices pave the way for a prosperous tomorrow.</h2>
        <div className="goals-container">
          {goals.map((goal, index) => (
            <div className="goal-card" key={index} onClick={() => handleSelectGoal(goal)}>
              <p>{goal.goal_name}</p>
              <img className="goals-img" src={goal.img} alt="goals"/>
            </div>
          ))}
          <div
            className="goal-card"
            key={"add-new"}
            onClick={() => handleNewGoal()}
            style={{
              backgroundImage: "url('/assets/add-image.gif')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p>ADD NEW GOAL</p>
          </div>
        </div>
        {selectedGoal && (
          <><div className={`overlay ${isModalOpen ? 'active' : ''}`} /><div className="modal-financial" style={{ display: isModalOpen ? "block" : "none" }}>
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>ASSIGN TARGET $</h2>
            <p>Goal: {selectedGoal.goal_name}</p>
            <p>Input Amount $</p>
            <input
              type="number"
              value={newGoalAmount}
              onChange={(e) => setNewGoalAmount(e.target.value)}/>
            <button onClick={handleSetTargetAmount}>Add Goal</button>
          </div></>
        )}
      </div>
      <div className="active-goals-container">
        <h2>Active Goals</h2>
        {activeGoals.length <=0 && <p>No active goals!</p>}
        <div className="active-goal-card-container">
          {activeGoals.map((goal, index) => (
            <ActiveGoal
              key={index}
              title={goal.goal_name}
              goal_id={goal.goal_id}
              currentAmountSaved={goal.current_amount_saved}
              budget={goal.target_amount}
              onBudgetAssign={handleBudgetAssign}
              onGoalAchieved={(goalId, currentAmountSaved) => handleGoalAchieved(goalId, currentAmountSaved)}
              onDeleteGoal={() => handleDeleteGoal(goal.goal_id)}
            />
          ))}
        </div>
      </div>
      <AchievedGoal achievedGoals={achievedGoals} />
    </div>
  );
}

export default FinancialGoals;

const db = require("../config/db-connection.js");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// GET request to fetch all goal data for a specific user
router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await db.query("SELECT * FROM financial_goals WHERE user_id = $1", [userId]);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching financial goals:", error);
        res.status(500).json({ error: "Error fetching financial goals" });
    }
});

// POST request to add a new goal for a specific user
router.post("/", async (req, res) => {
    const { userId, goalName, targetAmount } = req.body;
    const currentAmountSaved = 0;
    const completionStatus = false;
    try {
        const result = await db.query(
            "INSERT INTO financial_goals (user_id, goal_name, target_amount, current_amount_saved, completion_status) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [userId, goalName, targetAmount, currentAmountSaved, completionStatus]
        );

        // Extract the newly generated goal_id
        const goalId = result[0].goal_id;

        await db.query(
            "INSERT INTO savings_allocation (user_id, goal_id, amount_allocated) VALUES ($1, $2, $3) RETURNING *",
            [userId, goalId, currentAmountSaved]
        );
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding financial goal:", error);
        res.status(500).json({ error: "Error adding financial goal" });
    }
});

// PUT request to update current amount saved and completion status for a specific goal
router.put("/:userId/:goalId", async (req, res) => {
    const { userId, goalId } = req.params
    const { currentAmountSaved, completionStatus } = req.body;
    try {
        const result = await db.query(
            "UPDATE financial_goals SET current_amount_saved = $1, completion_status = $2 WHERE user_id = $3 and goal_id = $4 RETURNING *",
            [currentAmountSaved, completionStatus, userId, goalId]
        );
        await db.query("INSERT INTO savings_allocation (user_id, goal_id, amount_allocated) VALUES ($1, $2, $3) RETURNING *",
        [userId, goalId, currentAmountSaved])
        
        res.status(200).json(result);
    } catch (error) {
        console.error("Error updating financial goal:", error);
        res.status(500).json({ error: "Error updating financial goal" });
    }
});

router.delete("/:userId/:goalId", async (req, res) => {
    const { userId, goalId } = req.params;
    try {
      // Perform the delete operation on the database
      await db.query("DELETE FROM savings_allocation WHERE user_id = $1 AND goal_id = $2", [userId, goalId]);
      await db.query("DELETE FROM financial_goals WHERE user_id = $1 AND goal_id = $2", [userId, goalId]);
      
      res.status(200).json({ message: "Goal deleted successfully" });
    } catch (error) {
      console.error("Error deleting financial goal:", error);
      res.status(500).json({ error: "Error deleting financial goal" });
    }
  });

module.exports = router;
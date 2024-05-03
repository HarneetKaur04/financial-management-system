const db = require("../config/db-connection.js");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// Route for getting transaction details
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Query to get total income and total expense
    const totalIncomeQuery = 'SELECT COALESCE(SUM(amount), 0) AS total_income FROM transactions WHERE user_id = $1 AND type = $2';
    const totalIncomeResult = await db.query(totalIncomeQuery, [userId, 'income']);

    const totalExpenseQuery = 'SELECT COALESCE(SUM(amount), 0) AS total_expense FROM transactions WHERE user_id = $1 AND type = $2';
    const totalExpenseResult = await db.query(totalExpenseQuery, [userId, 'expense']);

    const totalIncome = totalIncomeResult[0].total_income;
    const totalExpense = totalExpenseResult[0].total_expense;

    // Query to get income sources
    const incomeSourcesQuery = 'SELECT category, SUM(amount) AS total FROM transactions WHERE user_id = $1 AND type = $2 GROUP BY category';
    const incomeSourcesResult = await db.query(incomeSourcesQuery, [userId, 'income']);
    const incomeSources = incomeSourcesResult;

    // Query to get expense sources
    const expenseSourcesQuery = 'SELECT category, SUM(amount) AS total FROM transactions WHERE user_id = $1 AND type = $2 GROUP BY category';
    const expenseSourcesResult = await db.query(expenseSourcesQuery, [userId, 'expense']);
    const expenseSources = expenseSourcesResult;

    // Calculate total savings
    const totalSavings = totalIncome - totalExpense;

    // Query to get all transactions
    const allTransactionsQuery = 'SELECT transaction_id, name, date, amount, type, category FROM transactions WHERE user_id = $1 ORDER BY date';
    const allTransactionsResult = await db.query(allTransactionsQuery, [userId]);
    const allTransactions = allTransactionsResult;

    // Calculate savings rate for each transaction
    const savingsRates = [];
    let runningTotalIncome = 0;
    let runningTotalExpense = 0;

    for (const transaction of allTransactions) {
      if (transaction.type === 'income') {
        runningTotalIncome += parseInt(transaction.amount);
      } else {
        runningTotalExpense += parseInt(transaction.amount);
      }

      const netSavings = runningTotalIncome - runningTotalExpense;
      const savingsRate = (netSavings / runningTotalIncome) * 100;

      savingsRates.push({ date: transaction.date, savings_rate: savingsRate });
    }

    // Return the results
    res.json({
      totalIncome,
      totalExpense,
      incomeSources,
      expenseSources,
      totalSavings,
      allTransactions,
      savingsRates
    });
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ error: 'Failed to fetch transaction details' });
  }
});

// Route for adding income or expense transactions
router.post('/:type', async (req, res) => {
  try {
    const { user_id, date, type, category, name, amount } = req.body;

    // Insert the transaction into the database
    const result = await db.query(
      'INSERT INTO transactions (user_id, date, type, category, name, amount) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user_id, date, type, category, name, amount]
    );

    res.status(201).json(result[0]);
  } catch (error) {
      console.error('Error adding transaction:', error);
      res.status(500).json({ error: 'Failed to add transaction' });
  }
});


// Route to Update a transaction by ID
router.put('/:userId/:transactionId', async (req, res) => {
  const { userId, transactionId } = req.params;
  const { date, type, category, name, amount } = req.body;

  try {
    const updatedTransaction = await db.query(
      'UPDATE transactions SET user_id = $1, date = $2, type = $3, category = $4, name = $5, amount = $6 WHERE transaction_id = $7 RETURNING *',
      [userId, date, type, category, name, amount, transactionId]
    );
    res.json({ message: "Transaction updated successfully" });
  } catch (error) {
    console.error(`Error updating transaction with ID ${transactionId}:`, error);
    res.status(500).json({ error: `Failed to update transaction with ID ${transactionId}` });
  }
});

// Delete a transaction by ID
router.delete('/:userId/:transactionId', async (req, res) => {
  const { userId, transactionId } = req.params;

  try {
    await db.query('DELETE FROM transactions WHERE user_id = $1 and transaction_id = $2', [userId, transactionId]);
    res.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(`Error deleting transaction with ID ${transactionId}:`, error);
    res.status(500).json({ error: `Failed to delete transaction with ID ${transactionId}` });
  }
});


module.exports = router;


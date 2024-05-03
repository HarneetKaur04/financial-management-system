const db = require("../config/db-connection.js");
const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

router.post('/signup', async (req, res) => {
  try {
    // Extract email and uid from request body
    const { email, uid } = req.body;

    // Check if the user already exists in the database
    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [uid]);
    if (existingUser) {
      // If user already exists, send a response indicating that
      return res.status(201).json({ message: 'User already exists' });
    }

    // Insert user data into the database
    await db.none('INSERT INTO users (email, id) VALUES ($1, $2)', [email, uid]);

    // Send a success response
    res.status(201).json({ message: 'User entry created successfully' });
  } catch (error) {
    console.error('Error creating user entry:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
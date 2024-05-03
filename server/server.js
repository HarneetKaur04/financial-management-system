const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const path = require('path');
require('./config/db-connection.js');

const REACT_BUILD_DIR = path.join(__dirname, '..', 'client', 'build');

const app = express();

app.use(express.static(REACT_BUILD_DIR));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(REACT_BUILD_DIR, 'index.html'));
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

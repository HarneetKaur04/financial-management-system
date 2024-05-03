-- Create the table for users
CREATE TABLE users (
    user_id VARCHAR(100) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the table for transactions
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) REFERENCES users(id),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
    category VARCHAR(255),
    name VARCHAR(255),
    amount DECIMAL(15, 2)
);

-- Create the table for financial goals
CREATE TABLE financial_goals (
    goal_id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) REFERENCES users(id),
    goal_name VARCHAR(255),
    target_amount DECIMAL(15, 2),
    current_amount_saved DECIMAL(15, 2),
    completion_status BOOLEAN
);

-- Create the table for savings allocation
CREATE TABLE savings_allocation (
    allocation_id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) REFERENCES users(id),
    goal_id INTEGER REFERENCES financial_goals(goal_id),
    amount_allocated DECIMAL(15, 2),
    date_allocated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

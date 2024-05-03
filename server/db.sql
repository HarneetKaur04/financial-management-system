-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;

SET default_tablespace = '';
--

-- Users Table
CREATE TABLE IF NOT EXISTS public.users (
  user_id VARCHAR(100) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -- Data for users table
COPY public.users (user_id, email) FROM stdin with delimiter ',';
qQcrFEVOyBh5CABK7DflvvwpXpn1,user1@finance.com
03m12UHc8bRIb5OF52H69lnSPzi2,harneet@finance.com
\.

-- Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions (
  transaction_id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES public.users(user_id),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(255),
  name VARCHAR(255),
  amount DECIMAL(15, 2)
);

-- Financial Goals Table
CREATE TABLE IF NOT EXISTS public.financial_goals (
  goal_id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES public.users(user_id),
  goal_name VARCHAR(255),
  target_amount DECIMAL(15, 2),
  current_amount_saved DECIMAL(15, 2),
  completion_status BOOLEAN
);

-- Savings Allocation Table
CREATE TABLE IF NOT EXISTS public.savings_allocation (
  allocation_id SERIAL PRIMARY KEY,
  user_id VARCHAR(100) REFERENCES public.users(user_id),
  goal_id INTEGER REFERENCES public.financial_goals(goal_id),
  amount_allocated DECIMAL(15, 2),
  date_allocated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--
-- PostgreSQL database dump complete
--```

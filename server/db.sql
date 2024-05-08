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
KaT3Euuc5xaoSZZwgtWMZhEcxG63,test@finance.com
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,test2@finance.com
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

COPY public.transactions (user_id, date, type, category, name, amount) FROM stdin WITH DELIMITER ',';
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-01 00:00:00,income,salary,May Salary,2300.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-07 00:00:00,income,investment,Dividend received,23.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-15 00:00:00,income,freelance,website design work,540.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-06-01 00:00:00,income,salary,June Salary,2300.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-06-03 00:00:00,income,others,side hustle,50.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-15 00:00:00,income,rental,rent from apartment,1200.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-09 00:00:00,expense,food,groceries,130.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-16 00:00:00,expense,entertainment,Dinner in a restaurant,65.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-20 00:00:00,expense,food,milk and eggs,23.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-29 00:00:00,expense,shopping,shopping,80.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-10 00:00:00,expense,car,Petrol,70.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-06-03 00:00:00,expense,car,petrol,75.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-17 00:00:00,expense,education,tuition fees,250.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-06-14 00:00:00,expense,education,tuition june,250.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-05-17 00:00:00,expense,rent,Rent paid May,1700.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-06-14 00:00:00,expense,rent,Rent paid June,1700.00
KaT3Euuc5xaoSZZwgtWMZhEcxG63,2024-06-13 00:00:00,income,rental,rent from apartment,1200.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-01 00:00:00,income,salary,June Salary,1200.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-15 00:00:00,income,salary,June salary,1200.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-13 00:00:00,income,others,Side work,250.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-14 00:00:00,income,rental,rental income,1250.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-14 00:00:00,expense,food,groceries,250.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-27 00:00:00,expense,food,groceries,125.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-14 00:00:00,expense,grooming,nail art,50.00
9p5IKUPw7iOyfAzqJgVvaYwqV6y1,2024-06-15 00:00:00,expense,rent,rent June,900.00
\.

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

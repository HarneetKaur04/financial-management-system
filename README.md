<p align="center">FINANCIAL MANAGEMENT SYSTEM<p/>
<p align="center">
  <img src="/client/public/assets/" alt="Finance Management System">
</p>
<br/>
Full Demo Video Link: <a href="">Live Webpage Recording</a>

Test user you can use:   password: 


## Contents
- [Overview](#overview)
- [Installation and Set Up](#installation-and-set-up)
- [Dependencies](#dependencies)
- [Database Set Up](#database-set-up)
- [Routes](#routes)
- [Tests](#tests)
- [Future Development](#future-development)

## Overview
The application facilitates user registration, login, user authentication, and session management, transaction management (income, expense, saving), financial goal setting and management, and provides insights and reports on financial activities.

### Key Components:
#### User Registration, Login, Authentication and Sessions Management:
Users can sign in or sign up for a new account which creates a new user entry in the database. Used Firebase to handle the user authentication process for login/signup. For new sign up or sign in using google, we create a new user entry into our users database to keep track of all the user activities. We only store uid and email in our database, hence making sure users private details (password) are secured and managed by Firebase.
User Session: Firebase Authentication use JSON Web Tokens (JWTs) for authentication. When a user signs in to a Firebase app, Firebase Authentication generates a JWT token containing claims about the user, such as their unique identifier (UID), email. This token is then used to authenticate the user for subsequent requests to Firebase services. I have created an AuthProvider Component which wraps the entire application with authentication context. It initializes the authentication provider and manages user sessions. Firebase authentication also helps to manage user sessions. 
#### Transaction Management:
User has a dashboard which is categorized and provides insights and reports of Income, Expenses, Savings, Income Sources, Spending Habits, Savings Rate, All Transactions, Financial Goals etc. 
Users can manage these transactions. User can view/add income or expense transaction/edit these transactions/delete these transactions. Savings are calculated automatically.
Transaction details such as total income, total expense, income sources, expense sources, total savings, and allocated savings are calculated and returned to the user and displayed on dashboard. See full report button will show all the related transactions to provide details to the user.
### Sorting and Retriving:
User can see all the transactions at the end of the page. User has a search bar which retrieves transactions as per user input for type, category, date, amount. 
User also has an option to sort the transactions by Date, Amount (Highest to Lowest), Amount (lowest to highest), transaction type (default is expense) which provides convenience to the user.
#### Financial Goals:
Users can add/set and track financial goals under "Active Goals" and "Achieved Goals". Users are able to allocate savings towards the goal they like conditional on whether savings $ are available and as well as mark the goal as achieved or delete a goal. If savings are not there, users wont be able to click on button to allocate savings towards goals. User gets error message when amount input to allocate exceeds the remaining goal amount or savings are insufficient.
The system updates current savings and completion status for each goal, allowing users to monitor their progress.
#### Insights and Reports:
Insights and reports on spending habits, income sources, savings rate, and progress towards financial goals are provided to users, offering valuable insights into their financial activities and helping them make informed decisions. Users can see full reports by clicking on "See full reports" buttons corresponding to the card selected.


## Installation and Set Up
- Go to your source directory in your terminal and run the command `git clone https://github.com/HarneetKaur04/financial-management-system.git NAMENEWDIRECTORY`
- To clean your folder from the owner git, run the command `rm -rf .git`
- Run the command `git init` to start your git repository 

### To install, set up and work in the server side
- Go to the server folder in the project (`cd server`) and run the command `npm install`
- Inside your server folder, create an .env file with `touch .env`
- Inside your server folder, open the file `.env.example` and copy the file to .env with your own credentials and keys. 
- BACK TO THE TERMINAL - To restore the DB dump file that the project already contain, just run the command `psql -U postgres -f db.sql`. Make sure that you have your Postgres password on hand. The psql console will ask you for your password.  If you had configured your postgres without password just run the command `psql -f db.sql`
- At this point you can run the command `node server.js` to run your server

### Now, back to the terminal to work on your frontend
- Go to the cliente folder (`cd .. and cd client`) and run the command `npm install`
- Run frontend with `npm start`

### To run test, use cmd:
- `npm test` under client

## Dependencies
### Server Dependencies:
- body-parser: Parses incoming request bodies in a middleware before handlers, and makes the parsed data available in req.body
- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- dotenv: Used for loading environment variables from a .env file into process.env, facilitating configuration management and enhancing security by keeping sensitive data out of version control.
- express: Web framework for Node.js used for building APIs and web applications.
- pg: PostgreSQL client for Node.js, utilized for interacting with the PostgreSQL database, enabling data storage and retrieval.
- pg-promise: Promise-based PostgreSQL client for Node.js, offering an alternative to the callback-based approach for interacting with PostgreSQL, enhancing code readability and maintainability.

### Client Dependencies:
- chart.js: Library for creating interactive charts and graphs on web pages.
- chartjs-adapter-date-fns: Adapter for using date-fns with Chart.js.
- chartjs-plugin-datalabels: Plugin for displaying data labels on charts.
- firebase: Development platform for building web and mobile applications.
- react: Library for building user interfaces. Used for Firebase service: authentication.
- react-chartjs-2: React wrapper for Chart.js.
- react-dom: React package for working with the DOM.
- react-router-dom: React library for routing in web applications.
- react-scripts: Collection of scripts and configuration for building React applications.
- @babel/plugin-proposal-private-property-in-object: Babel plugin for supporting private properties in JavaScript objects.
- @testing-library/jest-dom: Jest extension for enhancing testing with DOM queries and assertions.
- @testing-library/react: Library for testing React components.
- @testing-library/user-event: For simulating user events in testing scenarios.
- jest: JavaScript testing framework for writing and running unit tests.

## Database Set Up
### Tables:
#### Users Table:
Purpose: Stores information about users registered in the system.
Columns:
- user_id: Unique identifier for each user.
- email: Email address of the user, which must be unique.
- created_at: Timestamp indicating when the user account was created.
One-to-Many relationship with:
- Transactions Table: One user can have many transactions.
- Financial Goals Table: One user can have many financial goals.
- Savings Allocation Table: One user can have many savings allocations.
#### Transactions Table:
Purpose: Stores records of financial transactions made by users.
Columns:
- transaction_id: Unique identifier for each transaction, automatically generated.
- user_id: Foreign key referencing the user_id in the Users table, indicating which user made the transaction.
- date: Timestamp indicating when the transaction occurred.
- type: Indicates whether the transaction is an income or expense.
- category: Category of the transaction.
- name: Name or description of the transaction.
- amount: Amount of the transaction.
Many-to-One relationship with:
- Users Table: Many transactions can belong to one user.
#### Financial Goals Table:
Purpose: Stores information about financial goals set by users.
Columns:
- goal_id: Unique identifier for each financial goal, automatically generated.
- user_id: Foreign key referencing the user_id in the Users table, indicating which user set the goal.
- goal_name: Name or description of the financial goal.
- target_amount: The total amount targeted to be saved for the goal.
- current_amount_saved: The current amount saved towards achieving the goal.
- completion_status: Indicates whether the goal has been completed or not.
Many-to-One relationship with:
- Users Table: Many financial goals can belong to one user.
#### Savings Allocation Table:
Purpose: Tracks the allocation of savings towards specific financial goals.
Columns:
- allocation_id: Unique identifier for each allocation, automatically generated.
- user_id: Foreign key referencing the user_id in the Users table, indicating which user made the allocation.
- goal_id: Foreign key referencing the goal_id in the Financial Goals table, indicating the goal for which the allocation is made.
- amount_allocated: Amount allocated towards the specified financial goal.
- date_allocated: Timestamp indicating when the allocation was made.
Many-to-One relationship with:
- Users Table: Many allocations can belong to one user.
- Financial Goals Table: Many allocations can be made towards one financial goal.

### Data:

## Routes
This Express application features routes for managing users, transactions, and financial goals. Users can sign up, income/expense transactions can be viewed, added, updated, or deleted, and financial goals can be viewed, created, updated, or removed, providing comprehensive financial management functionality to help manage financial and keep track of your financial health.
### Users Routes:
- POST /api/users/signup: Creates a new user entry in the database using the provided email and UID. We are using `Firebase` for user authentication. Everytime there is a new sign up/sign in using google, we keep record of the user_id in our users table. This inserts user data into the database if the user does not already exist.
Firebase offers secure authentication mechanisms, including built-in OAuth providers like Google, which ensures the security of user data.
### Transactions Routes:
- GET /api/transactions/:userId: Retrieves transaction details for a specific user from the database. Calculates and returns transaction details including total income, total expense, income sources, expense sources, total savings, allocated savings, all transactions, savings to goals allocation, and savings rates.
- POST /api/transactions/:type: Adds a new income or expense transaction for a specific user.
- PUT /api/transactions/:userId/:transactionId: Updates a specific transaction for a user by its ID.
- DELETE /api/transactions/:userId/:transactionId: Deletes a specific transaction for a user by its ID.
### Financial Goals Routes:
- GET /api/financial-goals/:userId: Retrieves all financial goals for a specific user from the database.
- POST /api/financial-goals/: Adds a new financial goal for a specific user.
- PUT /api/financial-goals/:userId/:goalId: Updates current amount saved and completion status for a specific goal. This is used for savings towards a goal. When a goal is completed or user marks it as complete, we change the completions status to `true` to show it under achieved goals and remove from active goals.
- DELETE /api/financial-goals/:userId/:goalId: Deletes a specific financial goal for a user.

## Tests
The test suite includes tests for multiple components. There are currently 4 test suites and 9 tests. These tests cover various aspects of the application, including rendering, and user interaction.
### AllTransactions component Test:
- Verifies that the number of rendered transaction rows matches the length of the mock transactions array plus one for the table header row.
- Simulates a change in the search input field to filter transactions by a specific term. Verifies that only the transactions matching the search term are displayed.
- Verifies that the transactions are sorted correctly based on the selected sorting option e.g. sort by amount (highest).
### Expense component Test:
- Verifies that the total expense is displayed correctly.
- Checks the presence and clickability of the "Add Expense" button.
### Income component Test:
- Verifies that the total income is displayed correctly.
- Checks the presence and clickability of the "Add Income" button.
### Footer Component Test:
- Checks if the footer component renders social media links correctly.
- Verifies that the copyright text is displayed accurately.

## Future Development
- More unit and integration testing
import React from "react";
import SignUp from "../components/LoginRegister/SignUp";
import SignIn from "../components/LoginRegister/SignIn";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="landing-intro">
          <h2>Take Control of Your Finances</h2>
          <p>You can now keep track of your expenses, income, and savings.</p>
          <p>What's more? With our app, you can set your financial goals and track goal progress.</p>
          <img src="/assets/finance-gif.gif" alt="finance-gif" />
        </div>
        <div className="landing-register-top-container">
          <div className="landing-signin">
            <i className="fas fa-sign-in-alt"><SignIn /></i>
          </div>
          <div className="landing-signup">
            <i className="fas fa-user-plus"><SignUp /></i>
          </div>
      </div>
      </div>
    </div>
  );
}

export default LandingPage;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../AuthContext";
import SignOut from "../LoginRegister/SignOut";
import "./NavBar.css";

function NavBar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <Link to={currentUser ? "/dashboard" : "/"} className="logo">
        <i className="fas fa-chart-line"></i> Finance Tracker
      </Link>
      <ul className="nav-links">
        <li>
          <Link to={currentUser ? "/dashboard" : "/"}> Home</Link>
        </li>
        <li>
          <Link to="/financial-goals">Financial Goals</Link>
        </li>
        <li>
          <Link to="/how-it-works">How it works</Link>
        </li>
      </ul>
      <div className="navbar-right">
        {currentUser && (
          <>
            <p>Hello {currentUser.email}</p>
            <SignOut />
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;

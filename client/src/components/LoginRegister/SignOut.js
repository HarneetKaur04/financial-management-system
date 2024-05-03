import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import "./SignInSignOutSignUp.css";

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="btn-sign-out" onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default SignOut;

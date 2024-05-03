import React, { useState } from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup, createUserWithEmailAndPassword, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import "./SignInSignOutSignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      
      // Get user information
      const user = result.user;
      const email = user.email;
      const uid = user.uid;
  
      // Send a post request to your backend with user information
      const response = await fetch('http://localhost:7000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token if needed
        },
        body: JSON.stringify({ email, uid }),
      });
  
      // Check if the request was successful
      if (response.ok) {
        navigate("/dashboard");
      } else {
        throw new Error('Failed to create user entry on backend');
      }
    } catch (error) {
      console.error(error);
    }
  };  

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Create user account with Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Retrieve user UID from Firebase user credential
      const uid = userCredential.user.uid
      
      // Once user is signed up, send a post request to your backend
      const response = await fetch('http://localhost:7000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, uid }),
      });
      // Check if the request was successful
      if (response.ok) {
        navigate("/dashboard");
      } else {
        throw new Error('Failed to create user entry on backend');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="form-container">
      <div>
        <h2>Sign In with Google</h2>
        <button className="btn-sign-in-up" onClick={handleGoogleSignIn}>Google Sign In</button>
      </div>
      <br/>
      Or
      <div>
        <h2>Sign Up with Email</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn-sign-in-up" type="submit">Sign Up</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;

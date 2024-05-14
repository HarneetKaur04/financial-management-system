import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import NavBar from './components/NavBar/NavBar';
import { AuthProvider } from './AuthContext'; // Import AuthProvider: used to check if user is signed in
import HowItWorks from './pages/HowItWorks';
import FinancialGoals from './pages/FinancialGoals';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/how-it-works' element={<HowItWorks />} />
            <Route path='/financial-goals' element={<FinancialGoals />} />
          </Routes>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/> } />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/home" element={<HomePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

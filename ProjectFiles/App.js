import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ComplaintForm from './pages/ComplaintForm';
import MyComplaints from './pages/MyComplaints';
import AgentDashboard from './pages/AgentDashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/raise-complaint" element={<ComplaintForm />} />
          <Route path="/my-complaints" element={<MyComplaints />} />
          <Route path="/agent-dashboard" element={<AgentDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
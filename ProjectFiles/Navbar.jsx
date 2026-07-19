import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  // Simulated authentication states for development. 
  // Swap these values out once your backend token workflow is ready.
  const isLoggedIn = true; 
  const userRole = 'user'; // Options: 'user' | 'agent' | 'admin'

  const handleLogout = () => {
    // Clear storage/auth tokens here
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand}>Care</div>
      <div style={styles.linksContainer}>
        <Link to="/" style={styles.link}>Home</Link>
        
        {isLoggedIn && userRole === 'user' && (
          <>
            <Link to="/raise-complaint" style={styles.link}>Complaints</Link>
            <Link to="/my-complaints" style={styles.link}>My Complaints</Link>
          </>
        )}

        {isLoggedIn && (userRole === 'agent' || userRole === 'admin') && (
          <>
            <Link to="/customers" style={styles.link}>Customers</Link>
            <Link to="/agents" style={styles.link}>Agents</Link>
            <Link to="/agent-dashboard" style={styles.link}>Dashboard</Link>
          </>
        )}

        {!isLoggedIn ? (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
        )}
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef4f8',
    padding: '10px 40px',
    borderBottom: '1px solid #d0dae5',
    fontFamily: 'sans-serif'
  },
  brand: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#0066cc'
  },
  linksContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500'
  },
  logoutBtn: {
    background: 'none',
    border: 'none',
    color: '#333',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0
  }
};

export default Navbar;
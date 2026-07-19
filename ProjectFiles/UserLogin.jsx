import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('role', res.data.user.role);
      
      if (res.data.user.role === 'agent' || res.data.user.role === 'admin') {
        navigate('/agent-dashboard');
      } else {
        navigate('/complaints');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ background: 'white', padding: '20px 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#0d6efd' }}>CUSTOMER REGISTRY</h1>
      </div>

      <div style={{ padding: '40px' }}>
        <h3 style={{ marginBottom: '30px' }}>Login Page : This is the Login Page where users need to login to the application.</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '400px'
          }}>
            <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>
            
            {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '20px', textAlign: 'center', borderRadius: '4px' }}>{error}</div>}

            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                Login
              </button>
              <p style={{ textAlign: 'center', marginTop: '15px' }}>
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
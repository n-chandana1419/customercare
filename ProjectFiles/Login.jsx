import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(false);

    try {
      setLoading(true);
      // Connects directly to your Express server running on port 8000
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Extract token from response payload and save it in client memory
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        
        // Redirect directly to your complaint form once logged in successfully
        navigate('/raise-complaint');
      } else {
        setError('Login successful, but no authorization token was received.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid credentials or server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            marginBottom: '15px', 
            borderRadius: '4px', 
            fontSize: '13px',
            textAlign: 'center' 
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email / Username</label>
            <input 
              type="text" // Changed to text to bypass restrictive browser validation hooks
              name="email"
              placeholder="Enter email or username" 
              value={formData.email} 
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input 
              type="password" 
              name="password"
              placeholder="Enter password" 
              value={formData.password} 
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button 
            type="submit" 
            style={{ 
              ...styles.button, 
              backgroundColor: loading ? '#b3d7ff' : '#0084ff',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={styles.redirectText}>
          Don't have an account? <Link to="/register" style={styles.link}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    fontFamily: 'sans-serif'
  },
  card: {
    width: '350px',
    padding: '30px',
    border: '1px solid #d0dae5',
    borderRadius: '6px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    textAlign: 'center'
  },
  title: {
    fontSize: '22px',
    marginBottom: '25px',
    color: '#333',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left'
  },
  inputGroup: {
    marginBottom: '18px'
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  button: {
    color: 'white',
    border: 'none',
    padding: '11px',
    fontSize: '14px',
    borderRadius: '4px',
    fontWeight: '500',
    marginTop: '5px',
    transition: 'background-color 0.2s ease'
  },
  redirectText: {
    fontSize: '13px',
    marginTop: '20px',
    color: '#666'
  },
  link: {
    color: '#0084ff',
    textDecoration: 'none',
    fontWeight: '500'
  }
};

export default Login;
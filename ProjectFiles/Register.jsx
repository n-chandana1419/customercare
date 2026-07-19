import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    type: 'user' // Default to user matching your image
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Sends all the fields to your extended backend registration endpoint
      await axios.post('http://localhost:8000/api/auth/register-extended', formData);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => { 
        navigate('/login'); 
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Something went wrong during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>

        {error && <div style={styles.errorBanner}>{error}</div>}
        {success && <div style={styles.successBanner}>{success}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>First Name</label>
            <input 
              type="text" 
              name="firstName" 
              placeholder="Enter first name" 
              value={formData.firstName} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              placeholder="Enter last name" 
              value={formData.lastName} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>User Name</label>
            <input 
              type="text" 
              name="userName" 
              placeholder="Enter user name" 
              value={formData.userName} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter email" 
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
              placeholder="••••••" 
              value={formData.password} 
              onChange={handleChange} 
              style={styles.input} 
              required 
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Type (admin, user, agent)</label>
            <input 
              type="text" 
              name="type" 
              placeholder="user" 
              value={formData.type} 
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
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        <p style={styles.redirectText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 20px', fontFamily: 'sans-serif', backgroundColor: '#f4f7f9', minHeight: '90vh' },
  card: { width: '420px', padding: '30px', border: '1px solid #d0dae5', borderRadius: '6px', backgroundColor: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' },
  title: { fontSize: '24px', marginBottom: '25px', color: '#333', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', textAlign: 'left' },
  inputGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '6px', color: '#333' },
  input: { width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' },
  button: { color: 'white', border: 'none', padding: '12px', fontSize: '14px', borderRadius: '4px', fontWeight: '500', marginTop: '10px' },
  errorBanner: { background: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '15px', borderRadius: '4px', fontSize: '13px' },
  successBanner: { background: '#e8f5e9', color: '#2e7d32', padding: '10px', marginBottom: '15px', borderRadius: '4px', fontSize: '13px' },
  redirectText: { fontSize: '13px', marginTop: '20px', color: '#666' },
  link: { color: '#0084ff', textDecoration: 'none', fontWeight: '500' }
};

export default Register;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RaiseComplaint = () => {
  const [details, setDetails] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // LOGIN CHECK - Token lekapothe login ki pampu
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Fixed: Port changed from 5000 to 8000 to match backend .env setting
      await axios.post('http://localhost:8000/api/complaints', 
        { details },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Complaint lodged successfully!');
      setDetails('');
      setError('');
      setTimeout(() => navigate('/my-complaints'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to raise complaint');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <div style={{ background: 'white', padding: '20px 40px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#0d6efd', cursor: 'pointer' }} onClick={() => navigate('/')}>CUSTOMER REGISTRY</h1>
        <button onClick={handleLogout} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      <div style={{ padding: '40px' }}>
        <h3 style={{ marginBottom: '30px' }}>Complaints Page : This is the complaints Page where users need to Lodge a complaint</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '600px'
          }}>
            <h2 style={{ marginBottom: '30px' }}>Write Your Complaint</h2>
            
            {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '20px', textAlign: 'center', borderRadius: '4px' }}>{error}</div>}
            {success && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px', marginBottom: '20px', textAlign: 'center', borderRadius: '4px' }}>{success}</div>}

            <form onSubmit={handleSubmit}>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                rows="8"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  boxSizing: 'border-box',
                  fontSize: '14px',
                  fontFamily: 'Arial'
                }}
                placeholder="Describe your issue here..."
              />
              <button type="submit" style={{ width: '100%', padding: '12px', background: '#0d6efd', color: 'white', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', marginTop: '20px' }}>
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaiseComplaint;
import React, { useState } from 'react'; // Rectified: Changed capital 'Import' to lowercase 'import'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Utility function to decode the userId from the JWT payload
const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);
    return parsed.id || parsed._id || parsed.userId;
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
};

function ComplaintForm() {
  const [ticket, setTicket] = useState({
    name: '',
    phone: '',
    email: '',
    details: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setSuccess('');
      const token = localStorage.getItem('token');
      const userId = getUserIdFromToken();

      if (!userId) {
        setError('Your login session has expired. Please log in again.');
        return;
      }
      
      // Verified: Confirmed target backend runs on port 8000
      await axios.post('http://localhost:8000/api/complaints', 
        { 
          userId: userId,
          name: ticket.name,
          phone: ticket.phone,
          email: ticket.email,
          complaint: ticket.details 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setSuccess('Complaint lodged successfully!');
      setTicket({ name: '', phone: '', email: '', details: '' });
      
      setTimeout(() => navigate('/my-complaints'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit complaint. Make sure you are logged in.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.layoutRow}>
        <div style={styles.mediaColumn}>
          <div style={styles.imagePlaceholder}>
            <span style={styles.bannerText}>COMPLAINTS</span>
          </div>
        </div>
        
        <div style={styles.formColumn}>
          <h2 style={styles.title}>Write Your Complaint</h2>
          
          {error && <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', marginBottom: '20px', textAlign: 'center', borderRadius: '4px', fontSize: '14px' }}>{error}</div>}
          {success && <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px', marginBottom: '20px', textAlign: 'center', borderRadius: '4px', fontSize: '14px' }}>{success}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Name</label>
              <input 
                type="text" name="name" placeholder="Enter name"
                value={ticket.name} onChange={handleChange} style={styles.input} required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone</label>
              <input 
                type="text" name="phone" placeholder="Enter phone"
                value={ticket.phone} onChange={handleChange} style={styles.input} required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input 
                type="email" name="email" placeholder="Enter email"
                value={ticket.email} onChange={handleChange} style={styles.input} required
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Complaint Details</label>
              <textarea 
                name="details" placeholder="Describe your complaint here..."
                value={ticket.details} onChange={handleChange} style={styles.textarea} required
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', padding: '40px 20px', fontFamily: 'sans-serif' },
  layoutRow: { display: 'flex', maxWidth: '900px', width: '100%', border: '1px solid #d0dae5', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' },
  mediaColumn: { flex: 1, backgroundColor: '#f4f7f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  imagePlaceholder: { width: '100%', height: '250px', backgroundColor: '#0052cc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px' },
  bannerText: { color: '#fff', fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' },
  formColumn: { flex: 1.2, padding: '40px', backgroundColor: '#fff' },
  title: { fontSize: '20px', color: '#333', marginBottom: '25px', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column' },
  inputGroup: { marginBottom: '15px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '5px', color: '#555' },
  input: { width: '100%', padding: '10px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box' },
  textarea: { width: '100%', height: '100px', padding: '10px', fontSize: '14px', border: '1px solid #cccccc', borderRadius: '4px', boxSizing: 'border-box', resize: 'vertical' },
  button: { backgroundColor: '#0052cc', color: 'white', border: 'none', padding: '12px', fontSize: '14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '500', marginTop: '10px', alignSelf: 'flex-end', width: '100px' }
};

export default ComplaintForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper function to decode JWT token safely
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

function MyComplaints() {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = getUserIdFromToken();

                if (!userId) {
                    setError('User session invalid or expired. Please log in again.');
                    setLoading(false);
                    return;
                }

                // Explicit port 8000 validation
                const response = await axios.get(`http://localhost:8000/api/complaints/my/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setComplaints(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch complaints.');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    // Layout Wrapper wrapper to prevent text clipping during loading states
    if (loading) {
        return (
            <div style={{ padding: '80px 40px', fontFamily: 'sans-serif', margin: '0 auto', maxWidth: '1200px' }}>
                <h3>Loading complaints...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '80px 40px', fontFamily: 'sans-serif', color: '#c62828', margin: '0 auto', maxWidth: '1200px' }}>
                <h3>{error}</h3>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Complaints</h2>
            
            {complaints.length === 0 ? (
                <p style={{ color: '#666' }}>You have not submitted any complaints yet.</p>
            ) : (
                <div style={styles.gridContainer}>
                    {complaints.map((item) => {
                        if (!item) return null;

                        return (
                            <div key={item._id || Math.random().toString()} style={styles.card}>
                                <div style={styles.cardRow}>
                                    <span style={styles.boldLabel}>ID:</span> {item._id || 'N/A'}
                                </div>
                                <div style={styles.cardRow}>
                                    <span style={styles.boldLabel}>Complaint:</span> {item.complaint || item.details || item.message || 'No details provided'}
                                </div>
                                <div style={styles.cardRow}>
                                    <span style={styles.boldLabel}>Date:</span> {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                                <div style={styles.cardRow}>
                                    <span style={styles.boldLabel}>Status:</span>{' '}
                                    <span style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                                        verified
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: { padding: '80px 40px', fontFamily: 'sans-serif', margin: '0 auto', maxWidth: '1200px' },
    heading: { marginBottom: '25px', color: '#333' },
    gridContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
    card: { border: '1px solid #d0dae5', padding: '20px', borderRadius: '8px', backgroundColor: '#f9fbfd', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
    cardRow: { marginBottom: '10px', fontSize: '15px' },
    boldLabel: { fontWeight: 'bold', color: '#444' }
};

export default MyComplaints;
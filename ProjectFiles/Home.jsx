import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div style={styles.leftColumn}>
          <h1 style={styles.heading}>Welcome to Customer Care Registry</h1>
          <p style={styles.subtext}>
            Click the "Raise Complaint" button to resolve your doubts or seek assistance from our support team.
          </p>
          <button 
            style={styles.ctaButton} 
            onClick={() => navigate('/raise-complaint')}
          >
            Raise Complaint
          </button>
        </div>
        
        <div style={styles.rightColumn}>
          {/* SVG Vector Graphic matching the provided design layout */}
          <svg viewBox="0 0 500 400" style={styles.illustration}>
            <circle cx="250" cy="200" r="150" fill="#e1f0ff" />
            <rect x="180" y="220" width="140" height="100" rx="10" fill="#2b5a8f" />
            <rect x="160" y="310" width="180" height="15" rx="5" fill="#a0b2c6" />
            <circle cx="250" cy="160" r="45" fill="#fcd3b0" />
            <path d="M 210 160 A 40 40 0 0 1 290 160" fill="none" stroke="#1d3557" strokeWidth="12" strokeLinecap="round" />
            <rect x="200" y="240" width="100" height="80" fill="#ffffff" rx="4" />
            <rect x="290" y="155" width="10" height="20" rx="4" fill="#1d3557" />
            <path d="M 295 170 Q 275 195 255 190" fill="none" stroke="#1d3557" strokeWidth="3" />
            {/* Callout Graphics */}
            <rect x="320" y="75" width="120" height="50" rx="8" fill="#0084ff" />
            <line x1="340" y1="95" x2="420" y2="95" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <line x1="340" y1="108" x2="390" y2="108" stroke="white" strokeWidth="4" strokeLinecap="round" />
            <rect x="60" y="110" width="60" height="35" rx="8" fill="#e1f0ff" stroke="#cccccc" strokeWidth="2" />
            <circle cx="80" cy="127" r="3" fill="#999" /><circle cx="90" cy="127" r="3" fill="#999" /><circle cx="100" cy="127" r="3" fill="#999" />
          </svg>
        </div>
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
    fontFamily: 'sans-serif',
    padding: '20px'
  },
  heroSection: {
    display: 'flex',
    maxWidth: '1000px',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px'
  },
  leftColumn: {
    flex: 1,
    textAlign: 'left'
  },
  rightColumn: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  heading: {
    fontSize: '28px',
    color: '#1d3557',
    marginBottom: '15px',
    fontWeight: 'bold'
  },
  subtext: {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
    marginBottom: '25px'
  },
  ctaButton: {
    backgroundColor: '#0084ff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    fontSize: '14px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500'
  },
  illustration: {
    width: '100%',
    maxHeight: '350px'
  }
};

export default Home;
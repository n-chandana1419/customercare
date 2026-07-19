import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AgentDashboard() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'what is the issue', time: '10 May 2023, 11:15 pm' },
    { id: 2, text: 'what is the issue', time: '10 May 2023, 11:17 pm' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Dummy data matching the structure in your reference image
  const complaintStats = {
    userName: 'Rohan',
    total: 1,
    solved: 0,
    pending: 1
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const timestamp = new Date().toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    setMessages([...messages, {
      id: Date.now(),
      text: newMessage,
      time: timestamp
    }]);
    setNewMessage('');
  };

  return (
    <div style={styles.dashboardContainer}>
      {/* Top Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navBrand}>CRM</div>
        <div style={styles.navLinks}>
          <span style={styles.navLink}>Home</span>
          <span style={styles.navLink}>Logout</span>
          <span style={styles.navLink}>Dropdown ▾</span>
        </div>
      </div>

      {/* Main Split-Screen Workspace */}
      <div style={styles.workspace}>
        
        {/* Left Sidebar: Complaint Info */}
        <div style={styles.sidebar}>
          <div style={styles.statsCard}>
            <h3 style={styles.clientName}>{complaintStats.userName}</h3>
            <p style={styles.cardTitle}>Complaint Details</p>
            
            <div style={styles.statsRowLabels}>
              <span>Total</span>
              <span>Solved</span>
              <span>Pending</span>
            </div>
            
            <div style={styles.statsRowValues}>
              <span>{complaintStats.total}</span>
              <span>{complaintStats.solved}</span>
              <span>{complaintStats.pending}</span>
            </div>
          </div>
        </div>

        {/* Right Area: Active Chat Interface */}
        <div style={styles.chatArea}>
          {/* Header showing active chat user */}
          <div style={styles.chatHeader}>
            {complaintStats.userName}
          </div>

          {/* Messages Stream Pane */}
          <div style={styles.messageStream}>
            {messages.map((msg) => (
              <div key={msg.id} style={styles.messageBubbleContainer}>
                <div style={styles.messageBubble}>
                  {msg.text}
                </div>
                <div style={styles.messageTime}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Input Footer Form */}
          <form onSubmit={handleSendMessage} style={styles.inputArea}>
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={styles.chatInput}
            />
            <button type="submit" style={styles.sendButton}>
              ➔
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

// Inline CSS layout to match the design blueprint precisely
const styles = {
  dashboardContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '80vh',
    width: '100%',
    maxWidth: '1100px',
    margin: '20px auto',
    border: '1px solid #1a2536',
    borderRadius: '6px',
    overflow: 'hidden',
    fontFamily: 'sans-serif'
  },
  navbar: {
    backgroundColor: '#1a2536',
    color: '#fff',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 20px',
    fontSize: '14px',
    alignItems: 'center'
  },
  navBrand: { fontWeight: 'bold' },
  navLinks: { display: 'flex', gap: '15px' },
  navLink: { cursor: 'pointer', opacity: 0.9 },
  
  workspace: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#0c1524', // Deep dark backdrop layout
    overflow: 'hidden'
  },
  
  // Left side metrics container
  sidebar: {
    width: '280px',
    backgroundColor: '#0f1b2d',
    padding: '20px',
    borderRight: '1px solid #1e2d42',
    display: 'flex',
    flexDirection: 'column'
  },
  statsCard: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    color: '#333',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  clientName: { margin: '0 0 5px 0', fontSize: '18px', color: '#111' },
  cardTitle: { margin: '0 0 20px 0', fontSize: '14px', color: '#666' },
  statsRowLabels: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '11px',
    color: '#777',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  statsRowValues: {
    display: 'flex',
    justifyContent: 'space-around',
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '5px',
    color: '#111'
  },

  // Right side chat workspace 
  chatArea: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(to bottom, #7baec2, #a5cad6)' // Sky blue textured background
  },
  chatHeader: {
    backgroundColor: '#101d30',
    color: '#fff',
    padding: '12px 20px',
    fontSize: '15px',
    fontWeight: '500'
  },
  messageStream: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-end' // Aligning chat messages to the right side like the graphic
  },
  messageBubbleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    maxWidth: '70%'
  },
  messageBubble: {
    backgroundColor: '#ffffff',
    color: '#222',
    padding: '10px 14px',
    borderRadius: '6px',
    fontSize: '13px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  messageTime: {
    fontSize: '10px',
    color: '#444',
    marginTop: '4px',
    paddingRight: '2px'
  },
  inputArea: {
    display: 'flex',
    padding: '15px',
    backgroundColor: 'rgba(16, 29, 48, 0.2)',
    borderTop: '1px solid rgba(255,255,255,0.1)'
  },
  chatInput: {
    flex: 1,
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    outline: 'none'
  },
  sendButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#101d30',
    fontSize: '20px',
    marginLeft: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default AgentDashboard;
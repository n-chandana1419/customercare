import React, { useState } from 'react';

function ChatWithAgent() {
  const [messages, setMessages] = useState([
    { id: 1, text: "what is the issue", timestamp: "11:51 AM", isUser: false },
    { id: 2, text: "what is the issue", timestamp: "12:11 PM", isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
  };

  return (
    <div style={styles.chatWrapper}>
      {/* Left Sidebar Info View */}
      <div style={styles.sidebar}>
        <div style={styles.infoCard}>
          <h4 style={styles.clientName}>Rohan</h4>
          <p style={styles.cardHeader}>Complaint Details</p>
          <div style={styles.miniStats}>
            <div>
              <span style={styles.statLabel}>Total</span>
              <div style={styles.statValue}>1</div>
            </div>
            <div>
              <span style={styles.statLabel}>Solved</span>
              <div style={styles.statValue}>0</div>
            </div>
            <div>
              <span style={styles.statLabel}>Pending</span>
              <div style={{ ...styles.statValue, color: '#c62828' }}>1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Flow Frame Container */}
      <div style={styles.chatArea}>
        <div style={styles.activeHeader}>
          <h3>Active Session: Rohan</h3>
        </div>

        <div style={styles.messageStream}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{
                ...styles.bubbleRow,
                justifyContent: msg.isUser ? 'flex-end' : 'flex-start'
              }}
            >
              <div style={{
                ...styles.msgBubble,
                backgroundColor: msg.isUser ? '#0084ff' : '#ffffff',
                color: msg.isUser ? '#ffffff' : '#333333',
                border: msg.isUser ? 'none' : '1px solid #e0e0e0'
              }}>
                <div>{msg.text}</div>
                <div style={{ 
                  ...styles.timeLabel, 
                  color: msg.isUser ? 'rgba(255,255,255,0.7)' : '#888' 
                }}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form Submission Action Row */}
        <form onSubmit={handleSendMessage} style={styles.inputDock}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            style={styles.textField}
          />
          <button type="submit" style={styles.sendBtn}>➔</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  chatWrapper: { display: 'flex', height: '80vh', border: '1px solid #d0dae5', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#eef5f9', fontFamily: 'sans-serif' },
  sidebar: { width: '280px', backgroundColor: '#1e293b', padding: '20px', color: '#fff' },
  infoCard: { backgroundColor: '#ffffff', borderRadius: '6px', padding: '15px', color: '#333', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  clientName: { margin: '0 0 5px 0', fontSize: '16px', color: '#666' },
  cardHeader: { fontSize: '18px', fontWeight: 'bold', margin: '5px 0 15px 0' },
  miniStats: { display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #eee', paddingTop: '10px' },
  statLabel: { fontSize: '11px', color: '#888', display: 'block' },
  statValue: { fontSize: '18px', fontWeight: 'bold', marginTop: '4px' },
  chatArea: { flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#b2d7e7' }, // Matches light blue atmospheric image tone
  activeHeader: { backgroundColor: '#ffffff', padding: '15px 20px', borderBottom: '1px solid #d0dae5' },
  messageStream: { flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' },
  bubbleRow: { display: 'flex', width: '100%' },
  msgBubble: { padding: '10px 14px', borderRadius: '8px', maxWidth: '60%', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
  timeLabel: { fontSize: '10px', marginTop: '4px', textAlign: 'right' },
  inputDock: { display: 'flex', padding: '15px', backgroundColor: '#ffffff', borderTop: '1px solid #d0dae5' },
  textField: { flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', outline: 'none' },
  sendBtn: { marginLeft: '10px', backgroundColor: '#0084ff', color: 'white', border: 'none', padding: '0 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }
};

export default ChatWithAgent;
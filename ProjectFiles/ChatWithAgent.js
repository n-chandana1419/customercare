import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const ChatWithAgent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [agentId, setAgentId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const scrollRef = useRef();

  useEffect(() => {
    setSocket(io('http://localhost:8000'));
  }, []);

  // Get first agent ID from DB
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/auth/agents', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        if (data.length > 0) setAgentId(data[0]._id);
      } catch (error) {
        console.log('No agent found');
      }
    };
    if (user) fetchAgent();
  }, );

  useEffect(() => {
    socket?.emit('addUser', user._id);
    socket?.on('getMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });
  }, [socket, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() ||!agentId) return;

    const messageData = {
      senderId: user._id,
      receiverId: agentId,
      text: newMessage
    };

    socket.emit('sendMessage', messageData);
    setMessages([...messages, {...messageData, createdAt: new Date() }]);
    setNewMessage('');
  };

  if (!user) return <div className="container mt-5 text-center">Please login first</div>;

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: '800px', height: '70vh' }}>
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Chat with Support Agent</h5>
        </div>
        
        <div className="card-body overflow-auto" style={{ backgroundColor: '#e5ddd5' }}>
          {messages.length === 0? (
            <div className="text-center text-muted mt-5">Start conversation with agent</div>
          ) : (
            messages.map((m, i) => (
              <div key={i} ref={scrollRef} className={`d-flex mb-3 ${m.senderId === user._id? 'justify-content-end' : 'justify-content-start'}`}>
                <div className={`p-2 px-3 rounded shadow-sm ${m.senderId === user._id? 'bg-primary text-white' : 'bg-white'}`}
                  style={{ maxWidth: '60%' }}>
                  <div>{m.text}</div>
                  <div className={`${m.senderId === user._id? 'text-white-50' : 'text-muted'}`} style={{ fontSize: '11px', textAlign: 'right' }}>
                    {new Date(m.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="card-footer bg-white">
          <form onSubmit={handleSend} className="d-flex">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatWithAgent;
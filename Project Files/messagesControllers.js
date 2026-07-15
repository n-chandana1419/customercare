const Message = require('../models/Message');

// Send a new message
exports.sendMessage = async (req, res) => {
  try {
    const { sender, receiver, text } = req.body;
    const newMessage = new Message({ sender, receiver, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages for a user
exports.getMessages = async (req, res) => {
  try {
    const { userName } = req.params;
    const messages = await Message.find({ 
      $or: [{ sender: userName }, { receiver: userName }] 
    });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
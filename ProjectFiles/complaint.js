const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Added this to connect complaints to users
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  complaint: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
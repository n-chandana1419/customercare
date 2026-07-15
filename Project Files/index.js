require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Route Imports
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const messageRoutes = require('./routes/Messages');

const app = express();

// Establish Database connection
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Base Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/messages', messageRoutes);

// Error Handling Fallback
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
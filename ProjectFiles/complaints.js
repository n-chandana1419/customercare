const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); // Adjust path to your Complaint model if needed
const auth = require('../middleware/auth'); // This imports the auth middleware we just fixed

// ==========================================================
// NEW ROUTE: Fetch complaints for a specific logged-in user
// ==========================================================
router.get('/my/:userId', auth, async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all complaints belonging to this user ID, sorted by newest first
    const userComplaints = await Complaint.find({ userId }).sort({ createdAt: -1 });
    
    // Send it back to the frontend array
    return res.status(200).json(userComplaints);
  } catch (err) {
    console.error("Error fetching user complaints:", err);
    return res.status(500).json({ message: 'Server error while retrieving complaints.' });
  }
});

// ==========================================================
// EXISTING ROUTE: Create a new complaint record
// ==========================================================
router.post('/', auth, async (req, res) => {
  try {
    const { name, phone, email, complaint } = req.body;

    // Fallback check: Extract user ID from either the decoded token (req.user) or the body payload
    const finalUserId = req.user?.id || req.user?._id || req.user?.userId || req.body.userId;

    if (!finalUserId) {
      return res.status(400).json({ message: 'User identification missing from token.' });
    }

    // Create and save the new complaint record
    const newComplaint = new Complaint({
      userId: finalUserId,
      name,
      phone,
      email,
      complaint, // Maps 'complaint' from frontend to your DB schema
      status: 'pending' // Note: UI will display "verified" as requested!
    });

    await newComplaint.save();
    return res.status(201).json(newComplaint);

  } catch (err) {
    console.error("Error creating complaint:", err);
    return res.status(500).json({ message: 'Server error while saving the complaint.' });
  }
});

module.exports = router;
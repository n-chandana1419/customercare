const Complaint = require('../models/Complaint');

exports.submitComplaint = async (req, res) => {
  try {
    const { name, phone, email, complaint } = req.body;
    console.log("Received complaint:", req.body); // will show in terminal
    
    const newComplaint = new Complaint({ name, phone, email, complaint });
    await newComplaint.save();
    
    res.status(201).json({ message: "Complaint submitted successfully", data: newComplaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
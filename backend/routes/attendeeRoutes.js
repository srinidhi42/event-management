const express = require("express");
const Attendee = require("../models/Attendee");
const router = express.Router();

// Add an Attendee
router.post("/", async (req, res) => {
  try {
    const newAttendee = new Attendee(req.body);
    await newAttendee.save();
    res.status(201).json(newAttendee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get All Attendees
router.get("/", async (req, res) => {
  try {
    const attendees = await Attendee.find();
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete an Attendee
router.delete("/:id", async (req, res) => {
  try {
    await Attendee.findByIdAndDelete(req.params.id);
    res.json({ message: "Attendee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

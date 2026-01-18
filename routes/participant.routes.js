import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

// GET all participants
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find();
    res.json(participants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new participant
router.post("/", async (req, res) => {
  try {
    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json({
      message: "Participation Saved",
      participant
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;


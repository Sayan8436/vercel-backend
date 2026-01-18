import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const participant = new Participant(req.body);
    await participant.save();
    res.json({ message: "Participation Saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

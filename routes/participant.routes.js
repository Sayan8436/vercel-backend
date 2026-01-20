// import express from "express";
// import Participant from "../models/Participant.js";

// const router = express.Router();

// // GET all participants
// router.get("/", async (req, res) => {
//   try {
//     const participants = await Participant.find();
//     res.json(participants);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST new participant
// router.post("/", async (req, res) => {
//   try {
//     const participant = new Participant(req.body);
//     await participant.save();
//     res.status(201).json({
//       message: "Participation Saved",
//       participant
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;

import express from "express";
import Participant from "../models/Participant.js";

const router = express.Router();

/**
 * GET: All participants
 */
router.get("/", async (req, res) => {
  try {
    const participants = await Participant.find().sort({ createdAt: -1 });
    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch participants",
      error: error.message,
    });
  }
});

/**
 * POST: New participant
 * Prevents duplicate submission for same
 * name + group + competitionName
 */
router.post("/", async (req, res) => {
  try {
    const { name, group, competitionName } = req.body;

    // Basic validation
    if (!name || !group || !competitionName) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const participant = new Participant({
      name,
      group,
      competitionName,
    });

    await participant.save();

    res.status(201).json({
      message: "Participation Saved Successfully",
      participant,
    });

  } catch (error) {
    // 🚫 Duplicate entry (MongoDB unique index)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "You already submitted for this competition",
      });
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

export default router;

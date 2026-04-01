import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/auth.js";
import { io } from "../server.js";

const router = express.Router();

// 🏆 Public (optional)
router.get("/", async (req, res) => {
  const users = await User.find()
    .sort({ score: -1 })
    .limit(10)
    .select("name score");

  res.json(users);
});

// 🔐 Protected → Update score
router.post("/update-score", authMiddleware, async (req, res) => {
  try {
    const { points } = req.body;
    const userId = req.user.id;

    await User.findByIdAndUpdate(userId, {
      $inc: { score: points }
    });

    // 🔥 Get updated leaderboard
    const users = await User.find()
      .sort({ score: -1 })
      .limit(10)
      .select("name score");

    // ⚡ Emit update
    io.emit("leaderboardUpdate", users);

    res.json({ msg: "Score updated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { createServer } from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.js";
import leaderboardRoutes from "./routes/leaderboard.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 🔌 Middlewares
app.use(cors({
  origin: "*", // later replace with your frontend URL
}));
app.use(express.json());

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// 🌐 Create HTTP server
const server = createServer(app);

// ⚡ Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// 🔥 Export io
export { io };

// 🧪 Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// 🧠 DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB error:", err);
  });
// server.js
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

// 🔌 Middlewares
app.use(cors());
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

// 🔥 Export io so routes can use it
export { io };

// 🧠 DB + Server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    server.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log(err));
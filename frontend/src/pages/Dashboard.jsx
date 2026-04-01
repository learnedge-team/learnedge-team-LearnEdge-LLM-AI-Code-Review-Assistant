import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Dashboard({ xp, level }) {
  const navigate = useNavigate();
  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

const [leaders, setLeaders] = useState([]);

  const domains = [
  { name: "DSA", route: "/code", color: "bg-blue-500" },
  { name: "Web Dev", route: "/modules", color: "bg-green-500" },
  { name: "Machine Learning", route: "/modules", color: "bg-purple-500" },
  { name: "Cloud", route: "/modules", color: "bg-orange-500" },
];

useEffect(() => {
  axios
    .get("http://localhost:5000/api/leaderboard")
    .then((res) => setLeaders(res.data))
    .catch((err) => console.error(err));
}, []);


useEffect(() => {
  const socket = io("http://localhost:5000");

  socket.on("leaderboardUpdate", (data) => {
    setLeaders(data);
  });

  return () => socket.disconnect();
}, []);


  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

  {/* Header */}
  <div className="flex justify-between items-center mb-8">

  {/* Title */}
  <h1 className="text-3xl font-bold">
    🚀 LearnEdge Dashboard
  </h1>

  {/* Right Section */}
  <div className="flex items-center gap-6">

    {/* XP + Level */}
    <div className="text-right">
      <p className="text-sm text-gray-400">Level {level}</p>
      <p className="text-lg font-semibold text-yellow-400">
        ⭐ {xp} XP
      </p>

      <div className="w-32 bg-gray-700 h-2 rounded mt-2">
        <div
          className="bg-yellow-400 h-2 rounded"
          style={{ width: `${xp % 100}%` }}
        ></div>
      </div>
    </div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition shadow-md"
    >
      Logout
    </button>

  </div>
</div>


  {/* Domains */}
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    {domains.map((domain, index) => (
      <div
        key={index}
        onClick={() => navigate(domain.route, { state: { domain: domain.name } })}
        className="bg-slate-800 p-6 rounded-xl cursor-pointer 
                   border border-slate-700
                   hover:bg-slate-700
                   hover:border-blue-400 
                   hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
                   hover:scale-[1.03]
                   transition-all duration-300"
      >
        <h2 className="text-xl font-semibold text-center">
          {domain.name}
        </h2>
      </div>
    ))}

  </div>

  {/* 🏆 Leaderboard */}
<div className="mt-10">
  <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2>

  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
    {leaders.map((user, i) => (
      <div
        key={i}
        className="flex justify-between py-2 border-b border-slate-700 last:border-none"
      >
        <span>
          {i + 1}. {user.name}
        </span>
        <span className="text-yellow-400 font-semibold">
          {user.score} pts
        </span>
      </div>
    ))}
  </div>
</div>
  

  {/* 🐧 PINGO DASHBOARD */}
<div className="fixed bottom-6 right-6 flex flex-col items-end z-50">

  {/* 💬 Thought Bubble */}
  <div className="mb-2 mr-2 bg-white text-black text-xs px-3 py-2 rounded-xl shadow-lg max-w-[160px] relative animate-fadeIn">
    <p>
      {xp === 0 && "👋 Start your journey!"}
      {xp > 0 && xp < 100 && "🔥 Keep going!"}
      {xp >= 100 && "🚀 You're doing great!"}
    </p>

    <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white rotate-45"></div>
  </div>

  
  <div className="relative">

  {/* 🌟 Outer Glow */}
  <div className="absolute inset-0 rounded-full bg-blue-500 blur-3xl opacity-40"></div>

  {/* ⚡ Neon Ring */}
  <div className="absolute inset-0 rounded-full border-2 border-blue-400 opacity-60 animate-pulse"></div>

  {/* 🐧 Mascot */}
  <img
    src="/src/assets/pingo-idle.png"
    alt="Pingo"
    className="relative w-16 md:w-20 animate-breathe drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]"
  />
</div>

</div>

</div>
  );
}
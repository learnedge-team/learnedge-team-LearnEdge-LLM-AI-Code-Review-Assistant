import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CodeReview from "./pages/CodeReview";
import Modules from "./pages/Modules";
import Topics from "./pages/Topics";
import Quiz from "./pages/Quiz";
import { useState, useEffect } from "react";

function App() {

  const [streak, setStreak] = useState(() => {
    return Number(localStorage.getItem("streak")) || 0;
  });

  const [xp, setXp] = useState(() => {
    return Number(localStorage.getItem("xp")) || 0;
  });

  const [level, setLevel] = useState(() => {
    return Number(localStorage.getItem("level")) || 1;
  });

  const calculateLevel = (xp) => {
    return Math.floor(xp / 100) + 1;
  };


  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
  }, [xp, level]);

  useEffect(() => {
    localStorage.setItem("streak", streak);
  }, [streak]);

  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Dashboard xp={xp} level={level} />}
        />
        <Route
          path="/code"
          element={
            <CodeReview
              xp={xp}
              level={level}
              setXp={setXp}
              setLevel={setLevel}
              calculateLevel={calculateLevel}
              setStreak={setStreak}
            />
          }
        />

        <Route path="/modules" element={<Modules />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/quiz" element={<Quiz setXp={setXp} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
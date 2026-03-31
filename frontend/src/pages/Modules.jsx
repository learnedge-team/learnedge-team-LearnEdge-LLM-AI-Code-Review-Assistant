import { useLocation } from "react-router-dom";
import {  useNavigate } from "react-router-dom";

export default function Modules() {
  const location = useLocation();
  const navigate = useNavigate();
  const domain = location.state?.domain || "Web Dev";

  const modules = [
    { level: "Easy", desc: "Basic concepts and introduction" },
    { level: "Medium", desc: "Intermediate understanding and practice" },
    { level: "Hard", desc: "Advanced concepts and deep dive" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">
        📚 {domain} Modules
      </h1>

      {/* Modules */}
      <div className="grid md:grid-cols-3 gap-6">

        {modules.map((mod, index) => (
          <div
            key={index}
            onClick={() =>
              navigate("/topics", {
                state: { domain, level: mod.level },
              })
            }
            className="bg-slate-800 p-5 rounded-xl border border-slate-700
             hover:bg-slate-700
             hover:border-green-400 
             hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]
             hover:scale-[1.03]
             transition-all duration-300 cursor-pointer"
          >

            <h2 className="text-xl font-semibold mb-2">
              {mod.level}
            </h2>

            <p className="text-gray-400 text-sm">
              {mod.desc}
            </p>

           
           
          </div>
        ))}

      </div>

      {/* Quiz Section */}
      <div className="mt-10 bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">

        <h2 className="text-2xl font-semibold mb-3">
          🧠 Ready to test yourself?
        </h2>

        <p className="text-gray-400 mb-4">
          Complete modules and attempt quiz to earn XP
        </p>

        <button
          onClick={() =>
            navigate("/quiz", {
              state: { domain },
            })
          }
          className="bg-purple-500 px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          Attempt Quiz
        </button>

      </div>

    </div>
  );
}
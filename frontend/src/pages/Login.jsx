import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (isSignup) {
        await axios.post("http://localhost:5000/api/auth/register", {
          name,
          email,
          password,
        });

        alert("Account created. Now log in.");
        setIsSignup(false);
        setPassword("");
        return;
      }

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.location.href = "/dashboard";
    } catch (err) {
  console.log(err); // 👈 ADD THIS
  alert(err.response?.data?.msg || err.message);
}
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">
          {isSignup ? "Create Account" : "Login"}
        </h2>

        {isSignup && (
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-2 w-full mb-4 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={handleSubmit}
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            className="text-blue-600 font-medium"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}
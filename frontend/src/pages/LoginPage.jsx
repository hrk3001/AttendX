import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Input from "../components/Input";

import { login } from "../api/authApi";
import { teacherLogin } from "../api/teacherApi";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      navigate("/dashboard");
    }

    if (localStorage.getItem("teacherLoggedIn")) {
      navigate("/teacher-dashboard");
    }
  }, [navigate]);

  async function handleLogin() {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      if (role === "admin") {
        const user = await login(email, password);

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("admin", JSON.stringify(user));

        navigate("/dashboard");
      } else {
        const teacher = await teacherLogin(email, password);

        localStorage.setItem("teacherLoggedIn", "true");
        localStorage.setItem("teacher", JSON.stringify(teacher));

        navigate("/teacher-dashboard");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950">

      <motion.div
        className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="w-[420px] rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.8, y: 80 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-4xl shadow-lg">
            🎓
          </div>
        </div>

        <h1 className="mb-2 text-center text-5xl font-extrabold text-white">
          Attend<span className="text-blue-500">X</span>
        </h1>

        <p className="mb-8 text-center text-gray-400">
          {role === "admin"
            ? "Administrator Login"
            : "Teacher Login"}
        </p>

        <div className="space-y-4">

          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin}>
            Sign In
          </Button>

          <div className="mt-6 flex justify-center gap-3">

            <button
              onClick={() => setRole("teacher")}
              className={`rounded-full px-5 py-2 ${
                role === "teacher"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              Teacher
            </button>

            <button
              onClick={() => setRole("admin")}
              className={`rounded-full px-5 py-2 ${
                role === "admin"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              Admin
            </button>

          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default LoginPage;
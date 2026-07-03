import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Input from "../components/Input";

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-blue-950">
      <motion.div
  className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl"
  animate={{
    x: [0, 40, 0],
    y: [0, 30, 0],
  }}
  transition={{
    duration: 8,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

<motion.div
  className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
  animate={{
    x: [0, -40, 0],
    y: [0, -30, 0],
  }}
  transition={{
    duration: 10,
    repeat: Infinity,
    ease: "easeInOut",
  }}
/>

      <motion.div
  className="w-[420px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl"
  initial={{ opacity: 0, scale: 0.8, y: 80 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  transition={{
    duration: 1.2,
    ease: "easeOut",
  }}
>
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-4xl shadow-lg shadow-blue-600/40">
            🎓
          </div>
        </div>

        <h1 className="mb-2 text-center text-5xl font-extrabold tracking-wide text-white">
          Attend<span className="text-blue-500">X</span>
        </h1>

        <p className="mb-8 text-center text-gray-400">
          Welcome back! Sign in to continue managing attendance.
        </p>

        <div className="space-y-4">
          <Input type="email" placeholder="Email" />

          <PasswordInput />

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-600"
              />
              Remember Me
            </label>

            <a
              href="#"
              className="transition-colors hover:text-blue-400"
            >
              Forgot Password?
            </a>
          </div>

          <Button onClick={() => navigate("/dashboard")}>
  🚀 Sign In
</Button>

          <div className="mt-6 flex justify-center gap-3">
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm text-white">
              Student
            </button>

            <button className="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
              Faculty
            </button>

            <button className="rounded-full bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
              Admin
            </button>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

export default LoginPage;
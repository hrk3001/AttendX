import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { teacherLogin } from "../api/teacherApi";

function TeacherLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const teacher = await teacherLogin(
        form.email,
        form.password
      );

      // Save teacher session
      localStorage.setItem("teacherLoggedIn", "true");
      localStorage.setItem(
        "teacher",
        JSON.stringify(teacher)
      );

      navigate("/teacher-dashboard");

    } catch (err) {
      console.error(err);
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">

      <form
        onSubmit={handleSubmit}
        className="w-[420px] rounded-3xl bg-slate-900 p-10 shadow-2xl"
      >

        <h1 className="mb-8 text-center text-4xl font-bold text-white">
          Teacher Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default TeacherLogin;
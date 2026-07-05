import { useState } from "react";

function StudentForm({ addStudent }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    attendance: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.name ||
      !form.department ||
      !form.attendance
    ) {
      alert("Please fill all fields");
      return;
    }

    addStudent({
      name: form.name,
      department: form.department,
      attendance: Number(form.attendance),
      status:
        Number(form.attendance) >= 90
          ? "Excellent"
          : Number(form.attendance) >= 75
          ? "Good"
          : "Low",
    });

    setForm({
      name: "",
      department: "",
      attendance: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 grid grid-cols-4 gap-4"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
        className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        name="attendance"
        type="number"
        value={form.attendance}
        onChange={handleChange}
        placeholder="Attendance %"
        className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <button
        type="submit"
        className="rounded-lg bg-blue-600 font-semibold text-white hover:bg-blue-500"
      >
        Add Student
      </button>
    </form>
  );
}

export default StudentForm;
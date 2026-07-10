import { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent }) {
  const [form, setForm] = useState({
    name: "",
    department: "CSE",
    year: "1",
    section: "A",
  });

  useEffect(() => {
    if (editingStudent) {
      setForm({
        name: editingStudent.name || "",
        department: editingStudent.department || "CSE",
        year: editingStudent.year || "1",
        section: editingStudent.section || "A",
      });
    } else {
      setForm({
        name: "",
        department: "CSE",
        year: "1",
        section: "A",
      });
    }
  }, [editingStudent]);

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
      !form.year ||
      !form.section
    ) {
      alert("Please fill all fields");
      return;
    }

    addStudent({
      name: form.name,
      department: form.department,
      year: Number(form.year),
      section: form.section,
    });

    if (!editingStudent) {
      setForm({
        name: "",
        department: "CSE",
        year: "1",
        section: "A",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 grid grid-cols-5 gap-4"
    >
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Student Name"
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
      />

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
      >
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="EEE">EEE</option>
        <option value="MECH">MECH</option>
        <option value="CIVIL">CIVIL</option>
        <option value="IT">IT</option>
        <option value="AIDS">AIDS</option>
      </select>

      <select
        name="year"
        value={form.year}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
      >
        <option value="1">I Year</option>
        <option value="2">II Year</option>
        <option value="3">III Year</option>
        <option value="4">IV Year</option>
      </select>

      <select
        name="section"
        value={form.section}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-blue-500"
      >
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
      </select>

      <button
        type="submit"
        className="rounded-xl bg-blue-600 font-semibold text-white transition hover:bg-blue-500"
      >
        {editingStudent ? "Update Student" : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
import { useState, useEffect } from "react";

function StudentForm({ addStudent, editingStudent }) {
  const currentYear = new Date().getFullYear();

  const [form, setForm] = useState({
    rollNo: "",
    name: "",
    department: "CSE",
    batch: currentYear,
    section: "A",
  });

  useEffect(() => {
    if (editingStudent) {
      setForm({
        rollNo: editingStudent.rollNo || "",
        name: editingStudent.name || "",
        department: editingStudent.department || "CSE",
        batch: editingStudent.batch || currentYear,
        section: editingStudent.section || "A",
      });
    } else {
      setForm({
        rollNo: "",
        name: "",
        department: "CSE",
        batch: currentYear,
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
      !form.batch ||
      !form.section
    ) {
      alert("Please fill all fields");
      return;
    }

    addStudent({
      rollNo: editingStudent ? form.rollNo : "",
      name: form.name,
      department: form.department,
      batch: Number(form.batch),
      section: form.section,
    });

    if (!editingStudent) {
      setForm({
        rollNo: "",
        name: "",
        department: "CSE",
        batch: currentYear,
        section: "A",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 grid grid-cols-6 gap-4"
    >
      {/* Roll Number Preview */}
      <div className="rounded-xl border border-dashed border-cyan-500 bg-slate-800 p-3">
        <p className="text-xs uppercase tracking-wider text-slate-400">
          Roll Number
        </p>

        <p className="mt-2 text-2xl font-bold tracking-widest text-cyan-400">
          {editingStudent
            ? form.rollNo
            : `${String(form.batch).slice(2)}${form.department}###`}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {editingStudent
            ? "Existing Roll Number"
            : "Will be generated automatically after saving"}
        </p>
      </div>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Student Name"
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <select
        name="department"
        value={form.department}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option>CSE</option>
        <option>IT</option>
        <option>AIDS</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>MECH</option>
        <option>CIVIL</option>
      </select>

      <select
        name="batch"
        value={form.batch}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option value={currentYear}>{currentYear}</option>
        <option value={currentYear - 1}>{currentYear - 1}</option>
        <option value={currentYear - 2}>{currentYear - 2}</option>
        <option value={currentYear - 3}>{currentYear - 3}</option>
      </select>

      <select
        name="section"
        value={form.section}
        onChange={handleChange}
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      >
        <option>A</option>
        <option>B</option>
        <option>C</option>
        <option>D</option>
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
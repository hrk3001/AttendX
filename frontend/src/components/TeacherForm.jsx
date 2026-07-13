import { useState, useEffect } from "react";

function TeacherForm({ addTeacher, editingTeacher }) {

  const currentYear = new Date().getFullYear();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "CSE",
    batch: currentYear,
    section: "A",
    subject: "",
  });

  useEffect(() => {

    if (editingTeacher) {

      setForm({
        name: editingTeacher.name || "",
        email: editingTeacher.email || "",
        password: editingTeacher.password || "",
        department: editingTeacher.department || "CSE",
        batch: editingTeacher.batch || currentYear,
        section: editingTeacher.section || "A",
        subject: editingTeacher.subject || "",
      });

    } else {

      setForm({
        name: "",
        email: "",
        password: "",
        department: "CSE",
        batch: currentYear,
        section: "A",
        subject: "",
      });

    }

  }, [editingTeacher]);

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
      !form.email ||
      !form.password ||
      !form.subject
    ) {

      alert("Please fill all fields");
      return;

    }

    addTeacher({
      name: form.name,
      email: form.email,
      password: form.password,
      department: form.department,
      batch: Number(form.batch),
      section: form.section,
      subject: form.subject,
      role: "TEACHER",
    });

    if (!editingTeacher) {

      setForm({
        name: "",
        email: "",
        password: "",
        department: "CSE",
        batch: currentYear,
        section: "A",
        subject: "",
      });

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="mb-8 grid grid-cols-8 gap-4"
    >

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Teacher Name"
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
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

      <input
        name="subject"
        value={form.subject}
        onChange={handleChange}
        placeholder="Subject"
        className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-500"
      >
        {editingTeacher ? "Update" : "Add"}
      </button>

    </form>

  );

}

export default TeacherForm;
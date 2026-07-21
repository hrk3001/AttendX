import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../api/classApi";

function Classes() {
  const [classes, setClasses] = useState([]);

  const [form, setForm] = useState({
    department: "",
    batch: "",
    section: "",
    classTeacher: "",
    strength: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    try {
      const data = await getClasses();
      setClasses(data);
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await updateClass(editingId, form);
      } else {
        await addClass(form);
      }

      setEditingId(null);

      setForm({
        department: "",
        batch: "",
        section: "",
        classTeacher: "",
        strength: "",
      });

      loadClasses();
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Something went wrong");
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);

    setForm({
      department: item.department,
      batch: item.batch,
      section: item.section,
      classTeacher: item.classTeacher,
      strength: item.strength,
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this class?")) return;

    await deleteClass(id);
    loadClasses();
  }

  return (
    <DashboardLayout>

      <h1 className="mb-8 text-4xl font-bold text-white">
        Class Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-2xl bg-slate-900 p-6 md:grid-cols-5"
      >

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          className="rounded-lg bg-slate-800 p-3 text-white"
          required
        />

        <input
          name="batch"
          placeholder="Batch"
          value={form.batch}
          onChange={handleChange}
          className="rounded-lg bg-slate-800 p-3 text-white"
          required
        />

        <input
          name="section"
          placeholder="Section"
          value={form.section}
          onChange={handleChange}
          className="rounded-lg bg-slate-800 p-3 text-white"
          required
        />

        <input
          name="classTeacher"
          placeholder="Class Teacher"
          value={form.classTeacher}
          onChange={handleChange}
          className="rounded-lg bg-slate-800 p-3 text-white"
          required
        />

        <input
          name="strength"
          placeholder="Strength"
          value={form.strength}
          onChange={handleChange}
          className="rounded-lg bg-slate-800 p-3 text-white"
          required
        />

        <button
          className="rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-500 md:col-span-5"
        >
          {editingId ? "Update Class" : "Add Class"}
        </button>

      </form>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {classes.map((item) => (

          <div
            key={item.id}
            className="rounded-2xl bg-slate-900 p-6 shadow-lg"
          >

            <h2 className="text-2xl font-bold text-blue-400">
              {item.department}
            </h2>

            <p className="mt-2 text-slate-300">
              Batch : {item.batch}
            </p>

            <p className="text-slate-300">
              Section : {item.section}
            </p>

            <p className="text-slate-300">
              Teacher : {item.classTeacher}
            </p>

            <p className="text-slate-300">
              Strength : {item.strength}
            </p>

            <div className="mt-6 flex gap-3">

              <button
                onClick={() => handleEdit(item)}
                className="rounded-lg bg-yellow-500 px-4 py-2 text-white"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </DashboardLayout>
  );
}

export default Classes;
import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../api/teacherApi";

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [editingTeacher, setEditingTeacher] = useState(null);

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    try {
      const data = await getTeachers();

      console.log("Teachers:", data);

      setTeachers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setTeachers([]);
    }
  }

  async function handleSaveTeacher(teacher) {
    try {
      if (editingTeacher) {
        await updateTeacher(editingTeacher.id, teacher);
        setEditingTeacher(null);
      } else {
        await addTeacher(teacher);
      }

      loadTeachers();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteTeacher(id) {
    try {
      await deleteTeacher(id);
      loadTeachers();
    } catch (err) {
      console.error(err);
    }
  }

  const departments = useMemo(() => {
    if (!Array.isArray(teachers)) return ["All"];

    return [
      "All",
      ...new Set(
        teachers
          .filter((teacher) => teacher?.department)
          .map((teacher) => teacher.department)
      ),
    ];
  }, [teachers]);

  const filteredTeachers = (teachers || []).filter((teacher) => {
    const matchesSearch =
      teacher.name?.toLowerCase().includes(search.toLowerCase()) ||
      teacher.department?.toLowerCase().includes(search.toLowerCase());

    const matchesDepartment =
      department === "All" || teacher.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Teachers
          </h1>

          <p className="mt-2 text-slate-400">
            Manage all teachers.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 px-5 py-3 shadow-lg">
          <p className="text-sm text-slate-400">
            Total Teachers
          </p>

          <h2 className="text-2xl font-bold text-blue-400">
            {filteredTeachers.length} / {(teachers || []).length}
          </h2>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="🔍 Search teacher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-3 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none focus:border-blue-500"
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* Form */}
      <TeacherForm
        addTeacher={handleSaveTeacher}
        editingTeacher={editingTeacher}
      />

      {/* Table */}
      <TeacherTable
        teachers={filteredTeachers}
        deleteTeacher={handleDeleteTeacher}
        setEditingTeacher={setEditingTeacher}
      />
    </DashboardLayout>
  );
}

export default Teachers;
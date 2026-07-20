import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { getTeacher } from "../utils/getTeacher";
import { importStudents } from "../api/importApi";

import {
  getStudents,
  getStudentsByClass,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const isTeacher =
    localStorage.getItem("teacherLoggedIn") === "true";

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      if (isTeacher) {
        const teacher = getTeacher();

        const data = await getStudentsByClass(
          teacher.department,
          teacher.batch,
          teacher.section
        );

        setStudents(data);
      } else {
        const data = await getStudents();
        setStudents(data);
      }
    } catch (err) {
      console.error(err);
      setStudents([]);
    }
  }

  async function handleSaveStudent(student) {
    try {
      if (editingStudent) {
        await updateStudent(editingStudent.id, student);
        setEditingStudent(null);
      } else {
        await addStudent(student);
      }

      loadStudents();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteStudent(id) {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleImportStudents() {
    if (!selectedFile) {
      alert("Please select an Excel file.");
      return;
    }

    try {
      const message = await importStudents(selectedFile);

      alert(message);

      setSelectedFile(null);

      loadStudents();
    } catch (error) {
      console.error(error);
      alert("Import failed.");
    }
  }

  const departments = useMemo(() => {
    if (isTeacher) {
      return ["All"];
    }

    return [
      "All",
      ...new Set(students.map((student) => student.department)),
    ];
  }, [students, isTeacher]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.rollNo
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      student.department
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesDepartment =
      isTeacher ||
      department === "All" ||
      student.department === department;

    return matchesSearch && matchesDepartment;
  });

  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Students
          </h1>

          <p className="mt-2 text-slate-400">
            Manage student records and attendance.
          </p>
        </div>

        <div className="rounded-xl bg-slate-900 px-5 py-3 shadow-lg">
          <p className="text-sm text-slate-400">
            Showing Students
          </p>

          <h2 className="text-2xl font-bold text-blue-400">
            {filteredStudents.length} / {students.length}
          </h2>
        </div>
      </div>

      {!isTeacher && (
        <div className="mb-6 flex items-center gap-4">
          <input
            type="file"
            accept=".xlsx"
            onChange={(e) =>
              setSelectedFile(e.target.files[0])
            }
            className="rounded-xl border border-slate-700 bg-slate-900 p-3 text-white"
          />

          <button
            onClick={handleImportStudents}
            className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500"
          >
            Import Excel
          </button>
          <a
  href="/templates/Student_Template.xlsx"
  download
  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
>
  Download Template
</a>
        </div>
      )}

      <div className="mb-6 grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="🔍 Search by Name, Roll No or Department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="col-span-3 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none focus:border-blue-500"
        />

        {!isTeacher && (
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
        )}
      </div>

      {!isTeacher && (
        <StudentForm
          addStudent={handleSaveStudent}
          editingStudent={editingStudent}
        />
      )}

      <StudentTable
        students={filteredStudents}
        deleteStudent={handleDeleteStudent}
        setEditingStudent={setEditingStudent}
        isTeacher={isTeacher}
      />
    </DashboardLayout>
  );
}

export default Students;
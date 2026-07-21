import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";
import { getTeacher } from "../utils/getTeacher";
import { importStudents } from "../api/importApi";

import {
  getStudents,
  getStudentsByClass,
  filterStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../api/studentApi";

function Students() {

  const isTeacher =
    localStorage.getItem("teacherLoggedIn") === "true";

  const [students, setStudents] = useState([]);

  const [editingStudent, setEditingStudent] = useState(null);

  const [selectedFile, setSelectedFile] = useState(null);

  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");

  const [batch, setBatch] = useState("All");

  const [section, setSection] = useState("All");

  useEffect(() => {

    loadStudents();

  }, []);

  useEffect(() => {

    if (isTeacher) return;

    loadFilteredStudents();

  }, [department, batch, section]);

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

  async function loadFilteredStudents() {

    try {

      const data = await filterStudents(

        department,

        batch === "All" ? null : Number(batch),

        section

      );

      setStudents(data);

    } catch (err) {

      console.error(err);

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

      if (isTeacher) {
        loadStudents();
      } else {
        loadFilteredStudents();
      }

    } catch (err) {

      console.error(err);

    }

  }

  async function handleDeleteStudent(id) {

    try {

      await deleteStudent(id);

      if (isTeacher) {
        loadStudents();
      } else {
        loadFilteredStudents();
      }

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

      if (isTeacher) {
        loadStudents();
      } else {
        loadFilteredStudents();
      }

    } catch (error) {

      console.error(error);

      alert("Import failed.");

    }

  }

  const departments = useMemo(() => {

    if (isTeacher) {

      const teacher = getTeacher();

      return [teacher.department];

    }

    return [
      "All",
      "CSE",
      "IT",
      "AIDS",
      "ECE",
      "EEE",
      "MECH",
      "CIVIL"
    ];

  }, [isTeacher]);

  const batches = useMemo(() => {

    const currentYear = new Date().getFullYear();

    return [
      "All",
      currentYear,
      currentYear - 1,
      currentYear - 2,
      currentYear - 3,
      currentYear - 4
    ];

  }, []);

  const sections = [
    "All",
    "A",
    "B",
    "C",
    "D",
    "E"
  ];

  const filteredStudents = students.filter((student) => {

    return (

      student.name
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      student.rollNo
        .toLowerCase()
        .includes(search.toLowerCase())

      ||

      student.department
        .toLowerCase()
        .includes(search.toLowerCase())

    );

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

        <div className="mb-6 flex flex-wrap items-center gap-4">

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

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-4">

        <input
          type="text"
          placeholder="🔍 Search Student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none focus:border-blue-500 lg:col-span-4"
        />

        {!isTeacher && (

          <>

            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              {departments.map((dept) => (
                <option
                  key={dept}
                  value={dept}
                >
                  {dept}
                </option>
              ))}
            </select>

            <select
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              {batches.map((year) => (
                <option
                  key={year}
                  value={year}
                >
                  {year}
                </option>
              ))}
            </select>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
            >
              {sections.map((sec) => (
                <option
                  key={sec}
                  value={sec}
                >
                  {sec}
                </option>
              ))}
            </select>

          </>

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
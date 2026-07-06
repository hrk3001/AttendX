import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

import {
  getStudents,
  addStudent,
  deleteStudent,
  updateStudent,
} from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteStudent(id) {
    try {
      await deleteStudent(id);
      loadStudents();
    } catch (error) {
      console.error(error);
    }
  }

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Students
        </h1>

        <p className="mt-2 text-slate-400">
          Manage student records and attendance.
        </p>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or department..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none focus:border-blue-500"
        />
      </div>

      <StudentForm
        addStudent={handleSaveStudent}
        editingStudent={editingStudent}
      />

      <StudentTable
        students={filteredStudents}
        deleteStudent={handleDeleteStudent}
        setEditingStudent={setEditingStudent}
      />
    </DashboardLayout>
  );
}

export default Students;
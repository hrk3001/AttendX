import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

import {
  getStudents,
  addStudent,
  deleteStudent,
} from "../api/studentApi";

function Students() {
  const [students, setStudents] = useState([]);

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

  async function handleAddStudent(student) {
    try {
      await addStudent(student);
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

      <StudentForm addStudent={handleAddStudent} />

      <StudentTable
        students={students}
        deleteStudent={handleDeleteStudent}
      />
    </DashboardLayout>
  );
}

export default Students;
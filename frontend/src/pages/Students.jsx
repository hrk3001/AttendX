import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import StudentForm from "../components/StudentForm";
import StudentTable from "../components/StudentTable";

function Students() {
  const [students, setStudents] = useState([
    {
      id: 101,
      name: "Harish",
      department: "CSE",
      attendance: 92,
      status: "Excellent",
    },
    {
      id: 102,
      name: "Rahul",
      department: "IT",
      attendance: 86,
      status: "Good",
    },
    {
      id: 103,
      name: "Kavin",
      department: "AIDS",
      attendance: 68,
      status: "Low",
    },
  ]);

  function addStudent(student) {
    setStudents((prev) => [...prev, student]);
  }
  function deleteStudent(id) {
  setStudents((prev) =>
    prev.filter((student) => student.id !== id)
  );
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

      <StudentForm addStudent={addStudent} />

      <StudentTable
  students={students}
  deleteStudent={deleteStudent}
/>
    </DashboardLayout>
  );
}

export default Students;
import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getStudents } from "../api/studentApi";
import {
  saveAttendance,
  getAttendance,
} from "../api/attendanceApi";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const studentsResponse = await getStudents();
      const attendanceResponse = await getAttendance(today);

      setStudents(studentsResponse.data);

      const attendanceMap = {};

      attendanceResponse.data.forEach((record) => {
        attendanceMap[record.studentId] = record.present;
      });

      setAttendance(attendanceMap);
    } catch (error) {
      console.error(error);
    }
  }

  function toggleAttendance(studentId) {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  }

  async function handleSave() {
    try {
      for (const student of students) {
        await saveAttendance({
          studentId: student.id,
          studentName: student.name,
          date: today,
          present: attendance[student.id] ?? false,
        });
      }

      alert("Attendance saved successfully!");
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance.");
    }
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Attendance
        </h1>

        <p className="mt-2 text-slate-400">
          Mark today's attendance.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-slate-300">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-center">Present</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.id}
                className="border-b border-slate-800"
              >
                <td className="p-4 text-white">
                  {student.name}
                </td>

                <td className="p-4 text-slate-300">
                  {student.department}
                </td>

                <td className="p-4 text-center">
                  <input
                    type="checkbox"
                    checked={attendance[student.id] ?? false}
                    onChange={() => toggleAttendance(student.id)}
                    className="h-5 w-5"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleSave}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Save Attendance
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Attendance;
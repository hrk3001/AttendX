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
  const [hour, setHour] = useState(1);

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    loadData();
  }, [hour]);

  async function loadData() {
    try {
      const studentsResponse = await getStudents();
      const attendanceResponse = await getAttendance(today, hour);

      setStudents(studentsResponse);

      const attendanceMap = {};

      attendanceResponse.forEach((record) => {
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
          hour: hour,
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

        <div className="mt-6">
          <label className="mr-3 font-semibold text-white">
            Select Hour:
          </label>

          <select
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          >
            <option value={1}>Hour 1</option>
            <option value={2}>Hour 2</option>
            <option value={3}>Hour 3</option>
            <option value={4}>Hour 4</option>
            <option value={5}>Hour 5</option>
            <option value={6}>Hour 6</option>
          </select>
        </div>
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
          className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-500"
        >
          Save Attendance
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Attendance;
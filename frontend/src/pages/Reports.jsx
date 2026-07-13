import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getStudents, getAttendanceByDate } from "../api/reportApi";

function Reports() {
  const today = new Date().toISOString().split("T")[0];

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    loadReport();
  }, []);


  async function loadReport() {
    try {
     const studentsData = await getStudents();
const attendanceData = await getAttendanceByDate(today);

setStudents(studentsData);
setAttendance(attendanceData);
    } catch (err) {
      console.error(err);
    }
  }

  const totalStudents = students.length;
  const present = attendance.filter((a) => a.present).length;
  const absent = totalStudents - present;

  const percentage =
    totalStudents === 0
      ? 0
      : ((present / totalStudents) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <h1 className="mb-8 text-4xl font-bold text-white">
        Reports
      </h1>

      <div className="grid grid-cols-4 gap-6">
        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Students</p>
          <h2 className="mt-2 text-4xl font-bold text-white">
            {totalStudents}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Present</p>
          <h2 className="mt-2 text-4xl font-bold text-green-400">
            {present}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Absent</p>
          <h2 className="mt-2 text-4xl font-bold text-red-400">
            {absent}
          </h2>
        </div>

        <div className="rounded-xl bg-slate-900 p-6">
          <p className="text-slate-400">Attendance %</p>
          <h2 className="mt-2 text-4xl font-bold text-blue-400">
            {percentage}%
          </h2>
        </div>
      </div>

      <div className="mt-10 rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">
          Today's Attendance
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="p-4 text-left text-slate-300">
                Student
              </th>
              <th className="p-4 text-center text-slate-300">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((student) => (
              <tr
                key={student.id}
                className="border-b border-slate-800"
              >
                <td className="p-4 text-white">
                  {student.studentName}
                </td>

                <td className="p-4 text-center">
                  {student.present ? (
                    <span className="rounded bg-green-600 px-3 py-1 text-white">
                      Present
                    </span>
                  ) : (
                    <span className="rounded bg-red-600 px-3 py-1 text-white">
                      Absent
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Reports;
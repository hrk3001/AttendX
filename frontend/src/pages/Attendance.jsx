import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  getStudents,
  getStudentsByClass,
} from "../api/studentApi";

import {
  saveAttendance,
  getAttendance,
} from "../api/attendanceApi";

import { getTeacher } from "../utils/getTeacher";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [hour, setHour] = useState(1);

  const isTeacher =
    localStorage.getItem("teacherLoggedIn") === "true";

  const teacher = isTeacher ? getTeacher() : null;

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    loadAttendance();
  }, [date, hour]);

  async function loadStudents() {
    try {
      if (isTeacher) {
        const studentsData = await getStudentsByClass(
          teacher.department,
          teacher.batch,
          teacher.section
        );

        setStudents(studentsData);
      } else {
        const studentsData = await getStudents();
        setStudents(studentsData);
      }
    } catch (err) {
      console.error(err);
      setStudents([]);
    }
  }

  async function loadAttendance() {
    try {
      const records = await getAttendance(date, hour);

      const attendanceMap = {};

      records.forEach((record) => {
        attendanceMap[record.studentId] = record.present;
      });

      setAttendance(attendanceMap);
    } catch (err) {
      console.error(err);
      setAttendance({});
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
          date,
          hour,
          present: attendance[student.id] ?? false,
        });
      }

      alert("Attendance Saved Successfully!");
      loadAttendance();
    } catch (err) {
      console.error(err);
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
          Mark attendance for each hour.
        </p>

        {isTeacher && (
          <div className="mt-4 rounded-xl bg-slate-900 p-4 text-slate-300">
            <p>
              <span className="font-semibold text-white">
                Department:
              </span>{" "}
              {teacher.department}
            </p>

            <p>
              <span className="font-semibold text-white">
                Batch:
              </span>{" "}
              {teacher.batch}
            </p>

            <p>
              <span className="font-semibold text-white">
                Section:
              </span>{" "}
              {teacher.section}
            </p>

            <p>
              <span className="font-semibold text-white">
                Subject:
              </span>{" "}
              {teacher.subject}
            </p>
          </div>
        )}

      </div>

      <div className="mb-6 flex gap-4">

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-xl bg-slate-900 p-3 text-white"
        />

        <select
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
          className="rounded-xl bg-slate-900 p-3 text-white"
        >
          {[1,2,3,4,5,6,7,8].map((h)=>(
            <option key={h} value={h}>
              Hour {h}
            </option>
          ))}
        </select>

      </div>

      <div className="rounded-2xl bg-slate-900 p-6">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4 text-left text-white">
                Roll No
              </th>

              <th className="p-4 text-left text-white">
                Name
              </th>

              <th className="p-4 text-left text-white">
                Department
              </th>

              <th className="p-4 text-left text-white">
                Section
              </th>

              <th className="p-4 text-center text-white">
                Present
              </th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="border-b border-slate-800"
              >

                <td className="p-4 text-slate-300">
                  {student.rollNo}
                </td>

                <td className="p-4 text-white">
                  {student.name}
                </td>

                <td className="p-4 text-slate-300">
                  {student.department}
                </td>

                <td className="p-4 text-slate-300">
                  {student.section}
                </td>

                <td className="p-4 text-center">

                  <input
                    type="checkbox"
                    checked={attendance[student.id] ?? false}
                    onChange={() =>
                      toggleAttendance(student.id)
                    }
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
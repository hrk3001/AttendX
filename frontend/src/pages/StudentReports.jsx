import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAttendanceReport } from "../api/reportApi";

function StudentReports() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      const data = await getAttendanceReport();
      setReports(data);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredReports = reports.filter((student) =>
    student.studentName
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function getStatus(percentage) {
    if (percentage >= 85)
      return {
        text: "Excellent",
        color: "bg-green-600",
      };

    if (percentage >= 75)
      return {
        text: "Average",
        color: "bg-yellow-500",
      };

    return {
      text: "Low",
      color: "bg-red-600",
    };
  }

  return (
    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Student Attendance Report
        </h1>

        <p className="mt-2 text-slate-400">
          Overall attendance statistics of every student.
        </p>

      </div>

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full rounded-xl bg-slate-900 p-4 text-white"
      />

      <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left text-white">
                Student
              </th>

              <th className="p-4 text-center text-white">
                Total Classes
              </th>

              <th className="p-4 text-center text-white">
                Present
              </th>

              <th className="p-4 text-center text-white">
                Attendance %
              </th>

              <th className="p-4 text-center text-white">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredReports.map((student) => {

              const status = getStatus(
                student.attendancePercentage
              );

              return (

                <tr
                  key={student.studentId}
                  className="border-t border-slate-800"
                >

                  <td className="p-4 text-white">
                    {student.studentName}
                  </td>

                  <td className="p-4 text-center text-white">
                    {student.totalClasses}
                  </td>

                  <td className="p-4 text-center text-green-400">
                    {student.presentClasses}
                  </td>

                  <td className="p-4 text-center font-bold text-cyan-400">
                    {student.attendancePercentage}%
                  </td>

                  <td className="p-4 text-center">

                    <span
                      className={`rounded-lg px-3 py-1 text-white ${status.color}`}
                    >
                      {status.text}
                    </span>

                  </td>

                </tr>

              );
            })}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
}

export default StudentReports;
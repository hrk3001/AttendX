function StudentTable({ students }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
      <table className="w-full">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-6 py-4 text-left">Roll No</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Attendance</th>
            <th className="px-6 py-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan="5"
                className="py-8 text-center text-slate-400"
              >
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr
                key={student.id}
                className="border-t border-slate-800 hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-white">
                  {student.id}
                </td>

                <td className="px-6 py-4 text-white">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {student.department}
                </td>

                <td className="px-6 py-4 font-semibold text-blue-400">
                  {student.attendance}%
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      student.status === "Excellent"
                        ? "bg-green-600 text-white"
                        : student.status === "Good"
                        ? "bg-blue-600 text-white"
                        : "bg-red-600 text-white"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
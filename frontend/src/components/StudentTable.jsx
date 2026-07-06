import { Trash2, Pencil } from "lucide-react";

function StudentTable({
  students,
  deleteStudent,
  setEditingStudent,
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-lg">
      <table className="w-full">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-6 py-4 text-left">ID</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Attendance</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="border-t border-slate-800 hover:bg-slate-800/50"
            >
              <td className="px-6 py-4 text-white">{student.id}</td>

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

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setEditingStudent(student)}
                    className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-400"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this student?"
                        )
                      ) {
                        deleteStudent(student.id);
                      }
                    }}
                    className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
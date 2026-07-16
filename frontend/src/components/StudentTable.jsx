import { Trash2, Pencil } from "lucide-react";

function StudentTable({
  students,
  deleteStudent,
  setEditingStudent,
  isTeacher,
}) {
  function getCurrentYear(batch) {
    const year = new Date().getFullYear() - batch + 1;

    switch (year) {
      case 1:
        return "I Year";
      case 2:
        return "II Year";
      case 3:
        return "III Year";
      case 4:
        return "IV Year";
      default:
        return "-";
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
      <table className="w-full">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-6 py-4 text-left">#</th>
            <th className="px-6 py-4 text-left">Roll No</th>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Batch</th>
            <th className="px-6 py-4 text-left">Current Year</th>
            <th className="px-6 py-4 text-left">Section</th>

            {!isTeacher && (
              <th className="px-6 py-4 text-center">
                Actions
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td
                colSpan={isTeacher ? 7 : 8}
                className="py-12 text-center text-slate-400"
              >
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student, index) => (
              <tr
                key={student.id}
                className="border-t border-slate-800 transition hover:bg-slate-800/50"
              >
                <td className="px-6 py-4 text-slate-300">
                  {index + 1}
                </td>

                <td className="px-6 py-4 font-semibold text-blue-400">
                  {student.rollNo}
                </td>

                <td className="px-6 py-4 text-white">
                  {student.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {student.department}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {student.batch}
                </td>

                <td className="px-6 py-4 font-medium text-cyan-400">
                  {getCurrentYear(student.batch)}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {student.section}
                </td>

                {!isTeacher && (
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          setEditingStudent(student)
                        }
                        className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-400"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              `Delete ${student.name}?`
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
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
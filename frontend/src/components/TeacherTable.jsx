import { Pencil, Trash2 } from "lucide-react";

function TeacherTable({
  teachers,
  deleteTeacher,
  setEditingTeacher,
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

            <th className="px-6 py-4 text-left">Name</th>

            <th className="px-6 py-4 text-left">Email</th>

            <th className="px-6 py-4 text-left">Subject</th>

            <th className="px-6 py-4 text-left">Department</th>

            <th className="px-6 py-4 text-left">Batch</th>

            <th className="px-6 py-4 text-left">Year</th>

            <th className="px-6 py-4 text-left">Section</th>

            <th className="px-6 py-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {teachers.length === 0 ? (

            <tr>

              <td
                colSpan="9"
                className="py-10 text-center text-slate-400"
              >
                No teachers found.
              </td>

            </tr>

          ) : (

            teachers.map((teacher, index) => (

              <tr
                key={teacher.id}
                className="border-t border-slate-800 hover:bg-slate-800/40 transition"
              >

                <td className="px-6 py-4 text-slate-300">
                  {index + 1}
                </td>

                <td className="px-6 py-4 font-semibold text-white">
                  {teacher.name}
                </td>

                <td className="px-6 py-4 text-blue-400">
                  {teacher.email}
                </td>

                <td className="px-6 py-4 text-green-400">
                  {teacher.subject}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {teacher.department}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {teacher.batch}
                </td>

                <td className="px-6 py-4 text-cyan-400">
                  {getCurrentYear(teacher.batch)}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {teacher.section}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={() => setEditingTeacher(teacher)}
                      className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-400"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete ${teacher.name}?`
                          )
                        ) {
                          deleteTeacher(teacher.id);
                        }
                      }}
                      className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-500"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}

export default TeacherTable;
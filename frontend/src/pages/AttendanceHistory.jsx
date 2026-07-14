import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAttendance } from "../api/attendanceApi";

function AttendanceHistory() {

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const [hour, setHour] = useState(1);

  const [records, setRecords] = useState([]);

  async function handleSearch() {

    try {

      const data = await getAttendance(date, hour);

      setRecords(data);

    } catch (error) {

      console.error(error);

      alert("Failed to load attendance.");

    }

  }

  return (

    <DashboardLayout>

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Attendance History
        </h1>

        <p className="mt-2 text-slate-400">
          View attendance by date and hour.
        </p>

      </div>

      <div className="mb-6 flex gap-4">

        <input
          type="date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        />

        <select
          value={hour}
          onChange={(e)=>setHour(Number(e.target.value))}
          className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white"
        >
          {[1,2,3,4,5,6,7,8].map((h)=>(
            <option key={h} value={h}>
              Hour {h}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-500"
        >
          Search
        </button>

      </div>

      <div className="rounded-xl overflow-hidden bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left text-slate-300">
                Student
              </th>

              <th className="p-4 text-center text-slate-300">
                Hour
              </th>

              <th className="p-4 text-center text-slate-300">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {records.map((record)=>(

              <tr
                key={record.id}
                className="border-t border-slate-800"
              >

                <td className="p-4 text-white">
                  {record.studentName}
                </td>

                <td className="p-4 text-center text-white">
                  {record.hour}
                </td>

                <td className="p-4 text-center">

                  {record.present ? (

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

        {records.length===0 && (

          <p className="p-6 text-center text-slate-400">
            No attendance found.
          </p>

        )}

      </div>

    </DashboardLayout>

  );
}

export default AttendanceHistory;
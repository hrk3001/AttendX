import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", attendance: 0 },
  { day: "Tue", attendance: 0 },
  { day: "Wed", attendance: 0 },
  { day: "Thu", attendance: 0 },
  { day: "Fri", attendance: 0 },
  { day: "Sat", attendance: 0 },
];

function AttendanceChart() {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Weekly Attendance Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>

          <CartesianGrid stroke="#334155" strokeDasharray="4 4" />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis
            domain={[0, 100]}
            stroke="#94a3b8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

        </LineChart>
      </ResponsiveContainer>

      <p className="mt-4 text-center text-slate-400">
        Attendance data will appear after attendance records are created.
      </p>

    </div>
  );
}

export default AttendanceChart;
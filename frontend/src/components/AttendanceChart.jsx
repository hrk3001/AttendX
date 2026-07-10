import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AttendanceChart({ data }) {

  return (

    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Weekly Attendance Trend
      </h2>

      <ResponsiveContainer width="100%" height={350}>

        <LineChart data={data}>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <YAxis
            domain={[0,100]}
            stroke="#94a3b8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{ r:5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default AttendanceChart;
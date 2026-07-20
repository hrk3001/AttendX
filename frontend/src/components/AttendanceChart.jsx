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
    <div
      className="
      rounded-3xl
      border
      border-slate-700/50
      bg-slate-900/80
      p-8
      shadow-xl
      backdrop-blur-xl
      "
    >
      <div className="mb-8">

        <h2 className="text-3xl font-bold text-white">
          📈 Weekly Attendance Trend
        </h2>

        <p className="mt-2 text-slate-400">
          Attendance percentage over the last 7 days.
        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={360}
      >
        <LineChart data={data}>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="5 5"
          />

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
            dot={{
              r: 6,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon", attendance: 82 },
  { day: "Tue", attendance: 91 },
  { day: "Wed", attendance: 88 },
  { day: "Thu", attendance: 94 },
  { day: "Fri", attendance: 96 },
  { day: "Sat", attendance: 90 },
];

function AttendanceChart() {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Attendance Analytics
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="attendance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#334155" strokeDasharray="4 4" />

          <XAxis
            dataKey="day"
            stroke="#94a3b8"
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            strokeWidth={4}
            fill="url(#attendance)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceChart;
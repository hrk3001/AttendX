import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

function AttendanceChart({ data }) {
  const chartData =
    data && data.length > 0
      ? data
      : [
          { day: "Mon", attendance: 0 },
          { day: "Tue", attendance: 0 },
          { day: "Wed", attendance: 0 },
          { day: "Thu", attendance: 0 },
          { day: "Fri", attendance: 0 },
          { day: "Sat", attendance: 0 },
        ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-8 shadow-2xl">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Weekly Attendance Trend
          </h2>

          <p className="mt-2 text-slate-400">
            Attendance percentage across the week
          </p>

        </div>

        <div className="rounded-2xl bg-emerald-500/20 px-5 py-3">

          <h3 className="text-sm text-slate-300">
            Status
          </h3>

          <p className="font-bold text-emerald-400">
            Healthy
          </p>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={380}
      >

        <AreaChart data={chartData}>

          <defs>

            <linearGradient
              id="attendanceGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#3b82f6"
                stopOpacity={0.6}
              />

              <stop
                offset="95%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

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

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
            }}
            labelStyle={{
              color: "#ffffff",
            }}
          />

          <Area
            type="monotone"
            dataKey="attendance"
            stroke="#3b82f6"
            fill="url(#attendanceGradient)"
            strokeWidth={4}
          />

          <Line
            type="monotone"
            dataKey="attendance"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{
              r: 6,
            }}
            activeDot={{
              r: 8,
            }}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AttendanceChart;
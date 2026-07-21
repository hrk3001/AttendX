import {
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

function AttendanceHealth({ attendance = 92 }) {
  let status = "Excellent";
  let color = "text-green-400";
  let bg = "bg-green-500/20";

  if (attendance < 90) {
    status = "Good";
    color = "text-yellow-400";
    bg = "bg-yellow-500/20";
  }

  if (attendance < 75) {
    status = "Needs Attention";
    color = "text-red-400";
    bg = "bg-red-500/20";
  }

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-xl bg-blue-600 p-3">
          <ShieldCheck className="text-white" size={24} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Attendance Health
          </h2>

          <p className="text-slate-400">
            Overall institute performance
          </p>

        </div>

      </div>

      <div className="flex justify-center">

        <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-blue-500">

          <div className="text-center">

            <h1 className="text-4xl font-bold text-white">
              {attendance}%
            </h1>

            <p className="text-sm text-slate-400">
              Overall
            </p>

          </div>

        </div>

      </div>

      <div
        className={`mt-8 rounded-2xl ${bg} p-4`}
      >
        <div className="flex items-center gap-3">

          <TrendingUp
            className={color}
            size={22}
          />

          <div>

            <h3 className={`font-bold ${color}`}>
              {status}
            </h3>

            <p className="text-sm text-slate-300">
              Attendance performance is stable.
            </p>

          </div>

        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-slate-800 p-4">

        <div className="flex items-center gap-2">

          <AlertTriangle
            className="text-yellow-400"
            size={20}
          />

          <span className="font-semibold text-white">
            Suggestion
          </span>

        </div>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Encourage students below 75% attendance
          to participate regularly and monitor
          absentee trends weekly.
        </p>

      </div>

    </div>
  );
}

export default AttendanceHealth;
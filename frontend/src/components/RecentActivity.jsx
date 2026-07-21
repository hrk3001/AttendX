import {
  CheckCircle2,
  UserPlus,
  FileText,
  Clock,
} from "lucide-react";

function RecentActivity() {
  const activities = [
    {
      icon: CheckCircle2,
      title: "Attendance marked successfully",
      subtitle: "CSE 2nd Year - Section A",
      color: "text-green-400",
      time: "5 mins ago",
    },
    {
      icon: UserPlus,
      title: "New student added",
      subtitle: "Rahul Kumar",
      color: "text-blue-400",
      time: "18 mins ago",
    },
    {
      icon: FileText,
      title: "Attendance report generated",
      subtitle: "Today's Report",
      color: "text-purple-400",
      time: "35 mins ago",
    },
    {
      icon: Clock,
      title: "Next class starts",
      subtitle: "10:30 AM",
      color: "text-yellow-400",
      time: "Today",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold text-white">
          Recent Activity
        </h2>

        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-400">
          Live
        </span>

      </div>

      <div className="space-y-5">

        {activities.map((activity, index) => {

          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl bg-slate-800/60 p-4 transition hover:bg-slate-800"
            >

              <div
                className={`mt-1 rounded-xl bg-slate-900 p-3 ${activity.color}`}
              >
                <Icon size={22} />
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-white">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {activity.subtitle}
                </p>

              </div>

              <span className="text-xs text-slate-500">
                {activity.time}
              </span>

            </div>
          );

        })}

      </div>

    </div>
  );
}

export default RecentActivity;
import { Link } from "react-router-dom";
import {
  Plus,
  ClipboardCheck,
  FileText,
} from "lucide-react";

function QuickActions() {
  const actions = [
    {
      title: "Add Student",
      subtitle: "Create new student",
      icon: Plus,
      color:
        "from-blue-600 to-cyan-500",
      link: "/students",
    },
    {
      title: "Attendance",
      subtitle: "Mark today's attendance",
      icon: ClipboardCheck,
      color:
        "from-emerald-600 to-green-500",
      link: "/attendance",
    },
    {
      title: "Reports",
      subtitle: "View analytics",
      icon: FileText,
      color:
        "from-purple-600 to-pink-500",
      link: "/reports",
    },
  ];

  return (
    <div>

      <h2 className="mb-5 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        {actions.map((action) => {

          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="group"
            >
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl">

                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${action.color}`}
                >
                  <Icon
                    className="text-white"
                    size={28}
                  />
                </div>

                <h3 className="text-xl font-bold text-white">
                  {action.title}
                </h3>

                <p className="mt-2 text-slate-400">
                  {action.subtitle}
                </p>

              </div>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

export default QuickActions;
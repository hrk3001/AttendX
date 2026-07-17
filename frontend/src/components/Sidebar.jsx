import {
  Home,
  Users,
  ClipboardCheck,
  FileText,
  Settings,
  History,
  LogOut,
  GraduationCap,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const isTeacher =
    localStorage.getItem("teacherLoggedIn") === "true";

  const teacher = JSON.parse(
    localStorage.getItem("teacher") || "{}"
  );

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const menuItems = isTeacher
    ? [
        {
          icon: Home,
          label: "Dashboard",
          path: "/teacher-dashboard",
        },
        {
          icon: ClipboardCheck,
          label: "Attendance",
          path: "/attendance",
        },
        {
          icon: History,
          label: "Attendance History",
          path: "/attendance-history",
        },
        {
          icon: Users,
          label: "Students",
          path: "/students",
        },
      ]
    : [
        {
          icon: Home,
          label: "Dashboard",
          path: "/dashboard",
        },
        {
          icon: ClipboardCheck,
          label: "Attendance",
          path: "/attendance",
        },
        {
          icon: History,
          label: "Attendance History",
          path: "/attendance-history",
        },
        {
          icon: Users,
          label: "Students",
          path: "/students",
        },
        {
          icon: GraduationCap,
          label: "Teachers",
          path: "/teachers",
        },
        {
          icon: FileText,
          label: "Reports",
          path: "/reports",
        },
        {
          icon: Settings,
          label: "Settings",
          path: "/settings",
        },
      ];

  const user = isTeacher ? teacher : admin;

  function handleLogout() {
    if (isTeacher) {
      localStorage.removeItem("teacher");
      localStorage.removeItem("teacherLoggedIn");
      navigate("/teacher-login", { replace: true });
    } else {
      localStorage.removeItem("admin");
      localStorage.removeItem("loggedIn");
      navigate("/", { replace: true });
    }
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-900 px-6 py-7 shadow-xl">

      <div>
        <h1 className="mb-1 text-3xl font-extrabold text-white">
          Attend<span className="text-blue-500">X</span>
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Attendance Management
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            end
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 border-t border-slate-800 pt-6">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}
          </div>

          <div>
            <h3 className="font-semibold text-white">
              {user?.name || "User"}
            </h3>

            <p className="text-sm text-slate-400">
              {isTeacher ? "Teacher" : "Administrator"}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 text-white transition hover:bg-red-500"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
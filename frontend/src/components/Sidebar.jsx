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
          label: "Daily Reports",
          path: "/reports",
        },
        {
          icon: FileText,
          label: "Student Reports",
          path: "/student-reports",
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
    <aside className="flex min-h-screen w-72 flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-r border-slate-800 shadow-2xl px-6 py-7">

      {/* Logo */}

      <div className="mb-10">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl font-bold text-white shadow-lg">
            A
          </div>

          <div>

            <h1 className="text-3xl font-extrabold tracking-wide text-white">
              Attend
              <span className="text-cyan-400">X</span>
            </h1>

            <p className="text-sm text-slate-400">
              Smart Attendance System
            </p>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1">

        <h2 className="mb-4 ml-2 text-xs font-bold uppercase tracking-widest text-slate-500">
          Navigation
        </h2>

        <div className="space-y-2">

          {menuItems.map(({ icon: Icon, label, path }) => (

            <NavLink
              key={label}
              to={path}
              end
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-5 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-xl"
                    : "text-slate-300 hover:bg-slate-800 hover:translate-x-2 hover:text-white"
                }`
              }
            >

              <Icon
                size={21}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="font-medium">
                {label}
              </span>

            </NavLink>

          ))}

        </div>

      </nav>

      {/* User Card */}

      <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur">

        <div className="mb-5 flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-lg font-bold text-white shadow-lg">

            {user?.name
              ? user.name.charAt(0).toUpperCase()
              : "A"}

          </div>

          <div>

            <h3 className="font-bold text-white">
              {user?.name || "Administrator"}
            </h3>

            <p className="text-sm text-slate-400">
              {isTeacher
                ? "Faculty Member"
                : "System Administrator"}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >

          <LogOut size={20} />

          Logout

        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
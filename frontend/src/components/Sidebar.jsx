import {
  Home,
  Users,
  ClipboardCheck,
  FileText,
  Settings,
  History,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

const menuItems = [
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

function Sidebar() {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("admin");

    navigate("/", { replace: true });
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-800 bg-slate-900 px-6 py-7 shadow-xl">

      {/* Logo */}
      <div>
        <h1 className="mb-1 text-3xl font-extrabold tracking-wide text-white">
          Attend<span className="text-blue-500">X</span>
        </h1>

        <p className="mb-8 text-sm text-slate-500">
          Attendance Management
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-xl px-4 py-3 font-medium transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <Icon
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />

            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom User Card */}
      <div className="mt-6 border-t border-slate-800 pt-6">

        <div className="mb-5 flex items-center gap-3">

          <div className="relative">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-lg font-bold text-white shadow-lg">
              {admin?.name?.charAt(0).toUpperCase() || "A"}
            </div>

            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500"></span>

          </div>

          <div>

            <h3 className="font-semibold text-white">
              {admin?.name || "Administrator"}
            </h3>

            <p className="text-sm text-slate-400">
              {admin?.role || "Administrator"}
            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-red-500/20 bg-slate-800 px-4 py-3 font-medium text-red-400 transition-all duration-300 hover:border-red-500 hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>

        <p className="mt-5 text-center text-xs text-slate-600">
          AttendX v1.0
        </p>

      </div>

    </aside>
  );
}

export default Sidebar;
import {
  Home,
  Users,
  ClipboardCheck,
  FileText,
  Settings,
  History,
} from "lucide-react";

import { NavLink } from "react-router-dom";

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
  return (
    <aside className="min-h-screen w-64 border-r border-slate-800 bg-slate-900 p-6">
      <h1 className="mb-10 text-3xl font-bold text-white">
        Attend<span className="text-blue-500">X</span>
      </h1>

      <nav className="space-y-3">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
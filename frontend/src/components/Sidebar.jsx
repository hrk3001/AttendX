import { Home, Users, ClipboardCheck, FileText, Settings } from "lucide-react";

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: ClipboardCheck, label: "Attendance" },
  { icon: Users, label: "Students" },
  { icon: FileText, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-white mb-10">
        Attend<span className="text-blue-500">X</span>
      </h1>

      <nav className="space-y-3">
        {menuItems.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="flex items-center gap-3 w-full rounded-xl px-4 py-3 text-slate-300 transition hover:bg-blue-600 hover:text-white"
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
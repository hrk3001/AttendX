import DashboardLayout from "../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function TeacherDashboard() {
  const navigate = useNavigate();

  const teacher = JSON.parse(
    localStorage.getItem("teacher") || "{}"
  );

  function handleLogout() {
    localStorage.removeItem("teacher");
    localStorage.removeItem("teacherLoggedIn");

    navigate("/teacher-login", { replace: true });
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome, {teacher.name}
            </h1>

            <p className="mt-2 text-slate-400">
              Teacher Dashboard
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
          >
            <LogOut size={20} />
            Logout
          </button>

        </div>

        <div className="grid grid-cols-2 gap-6">

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h2 className="text-slate-400">Department</h2>
            <p className="mt-2 text-2xl font-semibold text-white">
              {teacher.department}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h2 className="text-slate-400">Subject</h2>
            <p className="mt-2 text-2xl font-semibold text-white">
              {teacher.subject}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h2 className="text-slate-400">Batch</h2>
            <p className="mt-2 text-2xl font-semibold text-white">
              {teacher.batch}
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6 shadow-lg">
            <h2 className="text-slate-400">Section</h2>
            <p className="mt-2 text-2xl font-semibold text-white">
              {teacher.section}
            </p>
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default TeacherDashboard;
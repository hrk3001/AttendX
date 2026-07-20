import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Plus,
  ClipboardCheck,
  FileText,
  Users,
  UserCheck,
  UserX,
  BookOpen,
  Activity,
} from "lucide-react";

import AttendanceChart from "../components/AttendanceChart";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    classesToday: 0,
    averageAttendance: 0,
    weeklyTrend: [],
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const data = await getDashboardStats();

      setStats({
        totalStudents: data.totalStudents || 0,
        presentToday: data.presentToday || 0,
        absentToday: data.absentToday || 0,
        classesToday: data.classesToday || 0,
        averageAttendance: data.averageAttendance || 0,
        weeklyTrend: data.weeklyTrend || [],
      });
    } catch (error) {
      console.error(error);
    }
  }

  const teacher = JSON.parse(
    localStorage.getItem("teacher") || "{}"
  );

  const admin = JSON.parse(
    localStorage.getItem("admin") || "{}"
  );

  const user =
    localStorage.getItem("teacherLoggedIn") === "true"
      ? teacher
      : admin;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <DashboardLayout>
      {/* Greeting */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-extrabold text-white">
            {greeting},{" "}
            <span className="text-blue-400">
              {user?.name || "Administrator"}
            </span>{" "}
            👋
          </h1>

          <p className="mt-3 flex items-center gap-2 text-slate-400">
            <CalendarDays size={18} />
            {today}
          </p>

          <p className="mt-2 text-slate-500">
            Welcome back! Here's today's attendance overview.
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="mb-10 flex flex-wrap gap-4">

        <Link
          to="/students"
          className="rounded-2xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-blue-500"
        >
          <div className="flex items-center gap-2">
            <Plus size={18} />
            Add Student
          </div>
        </Link>

        <Link
          to="/attendance"
          className="rounded-2xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-emerald-500"
        >
          <div className="flex items-center gap-2">
            <ClipboardCheck size={18} />
            Mark Attendance
          </div>
        </Link>

        <Link
          to="/reports"
          className="rounded-2xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:bg-purple-500"
        >
          <div className="flex items-center gap-2">
            <FileText size={18} />
            Reports
          </div>
        </Link>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Overall Attendance"
          value={`${stats.averageAttendance}%`}
          color="text-green-400"
          icon={Activity}
        />

        <StatCard
          title="Students"
          value={stats.totalStudents}
          color="text-blue-400"
          icon={Users}
        />

        <StatCard
          title="Present Today"
          value={stats.presentToday}
          color="text-emerald-400"
          icon={UserCheck}
        />

        <StatCard
          title="Absent Today"
          value={stats.absentToday}
          color="text-red-400"
          icon={UserX}
        />

        <StatCard
          title="Classes Today"
          value={stats.classesToday}
          color="text-yellow-400"
          icon={BookOpen}
        />

      </div>

      {/* Chart */}

      <div className="mt-10">
        <AttendanceChart data={stats.weeklyTrend} />
      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
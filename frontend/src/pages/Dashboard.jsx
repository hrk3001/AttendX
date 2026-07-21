import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";

import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import AttendanceChart from "../components/AttendanceChart";
import QuickActions from "../components/QuickActions";
import RecentActivity from "../components/RecentActivity";
import AttendanceHealth from "../components/AttendanceHealth";

import {
  Users,
  UserCheck,
  UserX,
  BookOpen,
  Activity,
} from "lucide-react";

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
    } catch (err) {
      console.error(err);
    }
  }

  const teacher = JSON.parse(localStorage.getItem("teacher") || "{}");
  const admin = JSON.parse(localStorage.getItem("admin") || "{}");

  const user =
    localStorage.getItem("teacherLoggedIn") === "true"
      ? teacher
      : admin;

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <DashboardLayout>

      {/* Header */}

      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-5xl font-extrabold text-white">
            {greeting},{" "}
            <span className="text-cyan-400">
              {user?.name || "Administrator"}
            </span>
            👋
          </h1>

          <p className="mt-4 flex items-center gap-2 text-slate-400">
            <CalendarDays size={18} />
            {today}
          </p>

          <p className="mt-2 text-slate-500">
            Welcome back to AttendX Dashboard.
          </p>

        </div>

      </div>

      {/* Quick Actions */}

      <QuickActions />

      {/* Stats */}

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Attendance"
          value={`${stats.averageAttendance}%`}
          color="text-green-400"
          icon={Activity}
          subtitle="Overall performance"
        />

        <StatCard
          title="Students"
          value={stats.totalStudents}
          color="text-blue-400"
          icon={Users}
          subtitle="Registered students"
        />

        <StatCard
          title="Present"
          value={stats.presentToday}
          color="text-emerald-400"
          icon={UserCheck}
          subtitle="Today's attendance"
        />

        <StatCard
          title="Absent"
          value={stats.absentToday}
          color="text-red-400"
          icon={UserX}
          subtitle="Need follow-up"
        />

        <StatCard
          title="Classes"
          value={stats.classesToday}
          color="text-yellow-400"
          icon={BookOpen}
          subtitle="Scheduled today"
        />

      </div>

      {/* Analytics */}

      <div className="mt-10 grid gap-8 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <AttendanceChart
            data={stats.weeklyTrend}
          />
        </div>

        <AttendanceHealth
          attendance={stats.averageAttendance}
        />

      </div>

      {/* Recent Activity */}

      <div className="mt-10">

        <RecentActivity />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;
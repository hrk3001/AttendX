import { useEffect, useState } from "react";
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
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DashboardLayout>
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome back! Here's today's attendance overview.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-5">

        <StatCard
          title="Overall Attendance"
          value={`${stats.averageAttendance}%`}
          color="text-green-400"
        />

        <StatCard
          title="Students"
          value={stats.totalStudents}
          color="text-blue-400"
        />

        <StatCard
          title="Present Today"
          value={stats.presentToday}
          color="text-emerald-400"
        />

        <StatCard
          title="Absent Today"
          value={stats.absentToday}
          color="text-red-400"
        />

        <StatCard
          title="Classes Today"
          value={stats.classesToday}
          color="text-yellow-400"
        />

      </div>

      {/* Attendance Graph */}
      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">

        <h2 className="mb-6 text-3xl font-bold text-white">
          Attendance Trend
        </h2>

        <AttendanceChart />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
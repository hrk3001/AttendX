import { useEffect, useState } from "react";
import AttendanceChart from "../components/AttendanceChart";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";
import { getDashboardStats } from "../api/dashboardApi";

function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    excellent: 0,
    good: 0,
    low: 0,
    averageAttendance: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    const data = await getDashboardStats();
    setStats(data);
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-5 gap-6">
        <StatCard
          title="Attendance"
          value={`${stats.averageAttendance}%`}
          color="text-green-400"
        />

        <StatCard
          title="Students"
          value={stats.totalStudents}
          color="text-blue-400"
        />

        <StatCard
          title="Excellent"
          value={stats.excellent}
          color="text-emerald-400"
        />

        <StatCard
          title="Good"
          value={stats.good}
          color="text-yellow-400"
        />

        <StatCard
          title="Low"
          value={stats.low}
          color="text-red-400"
        />
      </div>

      <div className="mt-8">
        <AttendanceChart />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
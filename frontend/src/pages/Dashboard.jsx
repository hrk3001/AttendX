import AttendanceChart from "../components/AttendanceChart";
import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <DashboardLayout>
      {/* Statistics Cards */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard
          title="Attendance"
          value="92%"
          color="text-green-400"
        />

        <StatCard
          title="Students"
          value="1245"
          color="text-blue-400"
        />

        <StatCard
          title="Classes"
          value="8"
          color="text-yellow-400"
        />

        <StatCard
          title="Alerts"
          value="12"
          color="text-red-400"
        />
      </div>

      {/* Attendance Analytics Chart */}
      <div className="mt-8">
        <AttendanceChart />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
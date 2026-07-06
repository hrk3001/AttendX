import { getStudents } from "./studentApi";

export async function getDashboardStats() {
  const response = await getStudents();

  const students = response.data;

  return {
    totalStudents: students.length,
    excellent: students.filter(s => s.status === "Excellent").length,
    good: students.filter(s => s.status === "Good").length,
    low: students.filter(s => s.status === "Low").length,
    averageAttendance:
      students.length === 0
        ? 0
        : Math.round(
            students.reduce((sum, s) => sum + s.attendance, 0) /
              students.length
          ),
  };
}
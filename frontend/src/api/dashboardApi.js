import { getStudents } from "./studentApi";

export async function getDashboardStats() {
  const response = await getStudents();

  const students = response.data;

  return {
    totalStudents: students.length,

    // Temporary values until Attendance module is built
    presentToday: 0,
    absentToday: 0,
    classesToday: 0,

    averageAttendance: 0,
  };
}
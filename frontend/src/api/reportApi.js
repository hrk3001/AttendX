import axios from "axios";

const STUDENT_API = "http://localhost:8080/students";
const ATTENDANCE_API = "http://localhost:8080/attendance";

export async function getStudents() {
  const response = await axios.get(STUDENT_API);
  return response.data;
}

export async function getAttendanceByDate(date) {
  const response = await axios.get(`${ATTENDANCE_API}/${date}`);
  return response.data;
}
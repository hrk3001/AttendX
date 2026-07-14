import axios from "axios";

const API = "http://localhost:8080/attendance";

export async function saveAttendance(attendance) {
  const response = await axios.post(API, attendance);
  return response.data;
}

export async function getAttendance(date, hour) {
  const response = await axios.get(API, {
    params: {
      date,
      hour,
    },
  });

  return response.data;
}

// For Attendance History (old feature)
export async function getAttendanceByDate(date) {
  const response = await axios.get(`${API}/${date}`);
  return response.data;
}
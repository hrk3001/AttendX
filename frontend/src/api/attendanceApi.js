import axios from "axios";

const API = "http://localhost:8080/attendance";

export const saveAttendance = (attendance) =>
  axios.post(API, attendance);

export const getAttendanceByDate = (date) =>
  axios.get(`${API}/${date}`);
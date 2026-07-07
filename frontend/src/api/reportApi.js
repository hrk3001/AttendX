import axios from "axios";

const API = "http://localhost:8080";

export const getStudents = () => axios.get(`${API}/students`);

export const getAttendanceByDate = (date) =>
  axios.get(`${API}/attendance/${date}`);
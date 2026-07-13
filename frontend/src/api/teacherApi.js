import axios from "axios";

const API = "http://localhost:8080/teachers";

export async function teacherLogin(email, password) {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
}

export async function getTeachers() {
  const response = await axios.get(API);
  return response.data;
}

export async function addTeacher(teacher) {
  const response = await axios.post(API, teacher);
  return response.data;
}

export async function updateTeacher(id, teacher) {
  const response = await axios.put(`${API}/${id}`, teacher);
  return response.data;
}

export async function deleteTeacher(id) {
  await axios.delete(`${API}/${id}`);
}
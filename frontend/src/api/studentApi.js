import axios from "axios";

const API = "http://localhost:8080/students";

export async function getStudents() {
  const response = await axios.get(API);
  return response.data;
}

export async function getStudentsByClass(
  department,
  batch,
  section
) {
  const response = await axios.get(`${API}/class`, {
    params: {
      department,
      batch,
      section,
    },
  });

  return response.data;
}

export async function addStudent(student) {
  const response = await axios.post(API, student);
  return response.data;
}

export async function updateStudent(id, student) {
  const response = await axios.put(`${API}/${id}`, student);
  return response.data;
}

export async function deleteStudent(id) {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
}
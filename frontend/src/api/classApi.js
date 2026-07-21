import axios from "axios";

const API = "http://localhost:8080/classes";

export async function getClasses() {
  const response = await axios.get(API);
  return response.data;
}

export async function getClass(id) {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
}

export async function getDepartmentClasses(department) {
  const response = await axios.get(
    `${API}/department/${department}`
  );

  return response.data;
}

export async function addClass(classRoom) {
  const response = await axios.post(API, classRoom);
  return response.data;
}

export async function updateClass(id, classRoom) {
  const response = await axios.put(
    `${API}/${id}`,
    classRoom
  );

  return response.data;
}

export async function deleteClass(id) {
  await axios.delete(`${API}/${id}`);
}
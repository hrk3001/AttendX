import axios from "axios";

const API = "http://localhost:8080/students";

// =======================
// Get All Students
// =======================

export async function getStudents() {
  const response = await axios.get(API);
  return response.data;
}

// =======================
// Teacher Class Students
// =======================

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

// =======================
// NEW SMART FILTER
// =======================

export async function filterStudents(
  department,
  batch,
  section
) {
  const params = {};

  if (
    department &&
    department !== "All"
  ) {
    params.department = department;
  }

  if (
    batch &&
    batch !== "All"
  ) {
    params.batch = batch;
  }

  if (
    section &&
    section !== "All"
  ) {
    params.section = section;
  }

  const response = await axios.get(
    `${API}/filter`,
    {
      params,
    }
  );

  return response.data;
}

// =======================
// CRUD
// =======================

export async function addStudent(student) {
  const response = await axios.post(API, student);
  return response.data;
}

export async function updateStudent(id, student) {
  const response = await axios.put(
    `${API}/${id}`,
    student
  );

  return response.data;
}

export async function deleteStudent(id) {
  const response = await axios.delete(
    `${API}/${id}`
  );

  return response.data;
}
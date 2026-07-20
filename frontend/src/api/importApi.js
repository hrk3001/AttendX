import axios from "axios";

const API = "http://localhost:8080/import";

export async function importStudents(file) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await axios.post(
    `${API}/students`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}
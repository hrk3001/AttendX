import axios from "axios";

const API = "http://localhost:8080/auth";

export async function login(email, password) {
  const response = await axios.post(`${API}/login`, {
    email,
    password,
  });

  return response.data;
}
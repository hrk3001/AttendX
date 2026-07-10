import axios from "axios";

const API = "http://localhost:8080/dashboard";

export async function getDashboardStats() {
  const response = await axios.get(API);
  return response.data;
}
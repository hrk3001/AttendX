export function getTeacher() {
  return JSON.parse(localStorage.getItem("teacher") || "{}");
}
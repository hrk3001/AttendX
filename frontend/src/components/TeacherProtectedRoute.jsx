import { Navigate } from "react-router-dom";

function TeacherProtectedRoute({ children }) {
  const teacherLoggedIn =
    localStorage.getItem("teacherLoggedIn") === "true";

  if (!teacherLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default TeacherProtectedRoute;
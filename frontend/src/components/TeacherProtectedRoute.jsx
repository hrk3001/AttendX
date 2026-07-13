import { Navigate } from "react-router-dom";

function TeacherProtectedRoute({ children }) {
  const loggedIn = localStorage.getItem("teacherLoggedIn");

  if (!loggedIn) {
    return <Navigate to="/teacher-login" replace />;
  }

  return children;
}

export default TeacherProtectedRoute;
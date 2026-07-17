import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const adminLoggedIn =
    localStorage.getItem("loggedIn") === "true";

  const teacherLoggedIn =
    localStorage.getItem("teacherLoggedIn") === "true";

  if (!adminLoggedIn && !teacherLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AuthRoute;
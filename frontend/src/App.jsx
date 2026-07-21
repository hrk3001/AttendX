import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TeacherLogin from "./pages/TeacherLogin";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import AttendanceHistory from "./pages/AttendanceHistory";
import Teachers from "./pages/Teachers";
import Reports from "./pages/Reports";
import StudentReports from "./pages/StudentReports";
import Settings from "./pages/Settings";
import Classes from "./pages/Classes";

import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import TeacherProtectedRoute from "./components/TeacherProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/teacher-login"
          element={<TeacherLogin />}
        />

        {/* ADMIN */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student-reports"
          element={
            <ProtectedRoute>
              <StudentReports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* TEACHER */}

        <Route
          path="/teacher-dashboard"
          element={
            <TeacherProtectedRoute>
              <TeacherDashboard />
            </TeacherProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <AuthRoute>
              <Attendance />
            </AuthRoute>
          }
        />

        <Route
          path="/students"
          element={
            <AuthRoute>
              <Students />
            </AuthRoute>
          }
        />

        <Route
          path="/attendance-history"
          element={
            <AuthRoute>
              <AttendanceHistory />
            </AuthRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
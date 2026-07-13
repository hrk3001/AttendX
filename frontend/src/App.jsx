import { BrowserRouter, Routes, Route } from "react-router-dom";
import TeacherDashboard from "./pages/TeacherDashboard";
import TeacherProtectedRoute from "./components/TeacherProtectedRoute";
import LoginPage from "./pages/LoginPage";
import TeacherLogin from "./pages/TeacherLogin";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AttendanceHistory from "./pages/AttendanceHistory";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/teacher-login"
          element={<TeacherLogin />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
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
          path="/attendance-history"
          element={
            <ProtectedRoute>
              <AttendanceHistory />
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
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/teacher-dashboard"
  element={
    <TeacherProtectedRoute>
      <TeacherDashboard />
    </TeacherProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TeacherLogin from "./pages/TeacherLogin";
import StudentReports from "./pages/StudentReports";
import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AuthRoute from "./components/AuthRoute";
import Attendance from "./pages/Attendance";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AttendanceHistory from "./pages/AttendanceHistory";

import ProtectedRoute from "./components/ProtectedRoute";
import TeacherProtectedRoute from "./components/TeacherProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />

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
<Route
  path="/student-reports"
  element={
    <ProtectedRoute>
      <StudentReports />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
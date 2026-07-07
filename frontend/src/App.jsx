import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Students from "./pages/Students";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AttendanceHistory from "./pages/AttendanceHistory";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Route */}
        <Route path="/" element={<LoginPage />} />

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
          path="/attendance-history"
          element={
            <ProtectedRoute>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
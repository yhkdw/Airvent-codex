import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import JudgeDemo from "./pages/JudgeDemo";
import RequireAuth from "./components/RequireAuth";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="/judge" element={<JudgeDemo />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

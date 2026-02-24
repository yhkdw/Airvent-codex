import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import JudgeDemo from "./pages/JudgeDemo";
import RequireAuth from "./components/RequireAuth";

// Dashboard tabs
import OverviewTab from "./pages/dashboard/OverviewTab";
import AirQualityTab from "./pages/dashboard/AirQualityTab";
import RewardsTab from "./pages/dashboard/RewardsTab";
import WalletTab from "./pages/dashboard/WalletTab";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<OverviewTab />} />
          <Route path="air-quality" element={<AirQualityTab />} />
          <Route path="rewards" element={<RewardsTabWrapper />} />
          <Route path="wallet" element={<WalletTab />} />
        </Route>
      </Route>

      <Route path="/judge" element={<JudgeDemo />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Wrapper to pass context to RewardsTab
import { useOutletContext } from "react-router-dom";
function RewardsTabWrapper() {
  const { onReward } = useOutletContext<{ onReward: (amt: number) => void }>();
  return <RewardsTab onReward={onReward} />;
}

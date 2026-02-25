import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { logout } from "../auth";
import DashboardLayout from "../components/DashboardLayout";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export default function DashboardPage() {
  const nav = useNavigate();
  const { publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [balance, setBalance] = useState(12.34);

  const walletAddress = publicKey ? publicKey.toString() : null;

  const handleConnect = () => {
    setVisible(true);
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (err) {
      console.error("Failed to disconnect:", err);
    }
  };

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  const handleReward = (amt: number) => {
    setBalance((b: number) => Math.round((b + amt) * 100) / 100);
  };

  return (
    <DashboardLayout
      balance={balance}
      walletAddress={walletAddress}
      isConnecting={connecting}
      onConnect={handleConnect}
      onDisconnect={handleDisconnect}
      onLogout={handleLogout}
    >
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet context={{ onReward: handleReward }} />
      </div>
    </DashboardLayout>
  );
}

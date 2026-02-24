import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { logout } from "../auth";
import DashboardLayout from "../components/DashboardLayout";
import {
  connectPhantom,
  disconnectPhantom,
} from "../solana/provider";

export default function DashboardPage() {
  const nav = useNavigate();
  const [balance, setBalance] = useState(12.34);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // 초기 지갑 상태 확인 및 자동 연결
  useEffect(() => {
    const tryAutoConnect = async () => {
      try {
        const pubkey = await connectPhantom(true);
        if (pubkey) {
          setWalletAddress(pubkey.toString());
        }
      } catch (err) {
        console.error("Auto-connect failed:", err);
      }
    };
    tryAutoConnect();
  }, []);

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const pubkey = await connectPhantom();
      setWalletAddress(pubkey.toString());
    } catch (err: any) {
      alert(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    await disconnectPhantom();
    setWalletAddress(null);
  };

  const handleLogout = async () => {
    await logout();
    nav("/login");
  };

  const handleReward = (amt: number) => {
    setBalance((b) => Math.round((b + amt) * 100) / 100);
  };

  return (
    <DashboardLayout
      balance={balance}
      walletAddress={walletAddress}
      isConnecting={isConnecting}
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

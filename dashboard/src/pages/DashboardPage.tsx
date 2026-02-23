import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../components/Container";
import KpiCards from "../components/KpiCards";
import Alerts from "../components/Alerts";
import RawTable from "../components/RawTable";
import AiVerificationPanel from "../components/AiVerificationPanel";
import { GasChart, PmChart } from "../components/Charts";
import { getMockAirQualitySeries, downsampleByMinutes } from "../mock/airquality";
import { logout } from "../auth";
import MiningCard from "../components/MiningCard";
import SubscriptionCard from "../components/SubscriptionCard";
import {
  connectPhantom,
  disconnectPhantom,
  getWalletPublicKey,
  isPhantomInstalled
} from "../solana/provider";

export default function DashboardPage() {
  const nav = useNavigate();
  const series = useMemo(() => getMockAirQualitySeries(), []);
  const chartData = useMemo(() => downsampleByMinutes(series, 5), [series]);
  const latest = series[series.length - 1];
  const last60 = series.slice(-60);

  const [balance, setBalance] = useState(12.34);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // 초기 지갑 상태 확인
  useEffect(() => {
    const pubkey = getWalletPublicKey();
    if (pubkey) {
      setWalletAddress(pubkey.toString());
    }
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

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-10 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
        <Container>
          <div className="py-3 flex items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400">AirVent DePIN</div>
              <div className="text-lg font-semibold">Operations Dashboard</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden md:block text-right mr-2">
                <div className="text-xs text-slate-400">Balance</div>
                <div className="text-sm font-semibold">{balance.toFixed(2)} AiVT</div>
              </div>

              {walletAddress ? (
                <div className="flex items-center gap-2">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-slate-400">Wallet</div>
                    <div className="text-sm font-mono text-emerald-400">
                      {truncateAddress(walletAddress)}
                    </div>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm hover:bg-slate-800 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500 disabled:opacity-50 transition-colors"
                >
                  {isConnecting ? "Connecting..." : "Connect Wallet"}
                </button>
              )}

              <div className="h-8 w-[1px] bg-slate-800 mx-1"></div>
              <button
                onClick={() => {
                  logout();
                  nav("/login");
                }}
                className="rounded-xl border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm hover:bg-slate-900"
              >
                Logout
              </button>
            </div>
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className="py-6 space-y-4">
            <KpiCards latest={latest} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-4">
                <PmChart data={chartData} />
                <GasChart data={chartData} />
              </div>

              <div className="lg:col-span-1 space-y-4">
                <MiningCard />
                <SubscriptionCard />

                <AiVerificationPanel
                  onReward={(amt) => setBalance((b) => Math.round((b + amt) * 100) / 100)}
                />

                <Alerts recent={last60} />
              </div>
            </div>

            <RawTable recent={last60} />
          </div>
        </Container>
      </main>
    </div>
  );
}

import { useMemo } from "react";
import SubscriptionCard from "../../components/SubscriptionCard";
import { Newspaper, Bell, ExternalLink, Shield, ArrowUpRight, ArrowDownLeft, RefreshCw, Send, History } from "lucide-react";

export default function WalletTab() {
    const news = useMemo(() => [
        {
            id: 1,
            tag: "Forecast",
            title: "서울 PM2.5, 이번 주 '나쁨' 지속 전망",
            desc: "기상청은 중국발 미세먼지와 대기 정체로 수도권 PM2.5가 75µg/m³ 이상 유지될 것으로 예보했습니다.",
            date: "2026.02.24",
            highlight: true
        },
        {
            id: 2,
            tag: "Policy",
            title: "WHO, 실내 공기질 가이드라인 2026 업데이트 발표",
            desc: "세계보건기구가 실내 CO2 농도 기준을 1,000ppm에서 800ppm으로 강화하는 권고안을 발표했습니다.",
            date: "2026.02.22",
            highlight: false
        },
        {
            id: 3,
            tag: "Network",
            title: "에어벤트, Solana Foundation Grant 수령 확정",
            desc: "AirVent 프로젝트가 솔라나 재단의 DePIN 인프라 그랜트 프로그램에 선정되어 개발 가속화에 박차를 가합니다.",
            date: "2026.02.20",
            highlight: false
        }
    ], []);

    const transactions = useMemo(() => [
        {
            id: 1,
            type: "reward",
            amount: "+14.50",
            target: "Mining Reward",
            time: "2h ago",
            tx: "5gYm...9qZ1",
            color: "text-emerald-400"
        },
        {
            id: 2,
            type: "reward",
            amount: "+12.80",
            target: "Mining Reward",
            time: "26h ago",
            tx: "4kPZ...xR2w",
            color: "text-emerald-400"
        },
        {
            id: 3,
            type: "withdraw",
            amount: "-50.00",
            target: "Withdraw",
            time: "3d ago",
            tx: "7nBx...2mL4",
            color: "text-rose-400"
        }
    ], []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Wallet & Transactions */}
            <div className="lg:col-span-2 space-y-6">

                {/* Main Wallet Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">SPL Token Account</span>
                            </div>
                            <div>
                                <div className="text-4xl md:text-5xl font-extrabold tracking-tight text-white flex items-baseline gap-3">
                                    1,240.50 <span className="text-xl md:text-2xl text-slate-400 font-medium">AIVT</span>
                                </div>
                                <div className="text-lg text-slate-500 font-medium mt-1">≈ $62.03 USD</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-slate-950 px-6 py-3 rounded-2xl font-bold hover:bg-slate-200 transition-all shadow-lg hover:scale-105 active:scale-95">
                                <Send size={18} />
                                Send
                            </button>
                            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-2xl font-bold hover:bg-slate-700 transition-all hover:scale-105 active:scale-95">
                                <RefreshCw size={18} />
                                Swap
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transaction History Section */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-800 rounded-xl text-slate-400">
                                <History size={20} />
                            </div>
                            <h3 className="font-bold text-lg">Recent Transactions</h3>
                        </div>
                        <button className="text-xs font-bold text-emerald-400 hover:underline px-2 py-1">View All</button>
                    </div>

                    <div className="divide-y divide-slate-800/50">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-800/20 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl ${tx.type === 'reward' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                        {tx.type === 'reward' ? <ArrowDownLeft size={22} /> : <ArrowUpRight size={22} />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-200">{tx.target}</div>
                                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                                            <span className="font-mono text-[10px]">{tx.tx}</span>
                                            <span>•</span>
                                            <span>{tx.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={`text-lg font-bold ${tx.color}`}>{tx.amount} AIVT</div>
                                    <div className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter mt-0.5 group-hover:text-emerald-500/50 transition-colors">Confirmed on Solana</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <SubscriptionCard />

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Shield size={20} className="text-emerald-400" />
                            Wallet Security
                        </h3>
                        <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full font-bold">PROTECTED</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase mb-1">Backup Phrase</div>
                            <div className="text-sm font-medium">Secured by Phantom</div>
                        </div>
                        <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800">
                            <div className="text-xs text-slate-500 uppercase mb-1">Network</div>
                            <div className="text-sm font-medium">Solana Devnet</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Network News */}
            <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-full shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Newspaper size={20} className="text-emerald-400" />
                            Network News
                        </h3>
                        <Bell size={18} className="text-slate-500" />
                    </div>

                    <div className="space-y-7">
                        {news.map((item) => (
                            <div key={item.id} className={`group cursor-pointer ${item.highlight ? 'border-l-2 border-emerald-500 pl-4' : ''}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-[10px] font-bold uppercase tracking-tighter bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                                        {item.tag}
                                    </span>
                                    <span className="text-[10px] text-slate-600">{item.date}</span>
                                </div>
                                <h4 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                    {item.title}
                                </h4>
                                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                                    {item.desc}
                                </p>
                                <div className="mt-3 flex items-center gap-1 text-[10px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    READ MORE <ExternalLink size={10} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-10 py-3.5 rounded-2xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                        VIEW ALL ANNOUNCEMENTS
                    </button>
                </div>
            </div>
        </div>
    );
}

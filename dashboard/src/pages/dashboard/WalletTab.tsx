import { useMemo } from "react";
import SubscriptionCard from "../../components/SubscriptionCard";
import { Newspaper, Bell, ExternalLink, Shield } from "lucide-react";

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

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Wallet & Subscription */}
            <div className="lg:col-span-2 space-y-6">
                <SubscriptionCard />

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
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
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-full">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Newspaper size={20} className="text-emerald-400" />
                            Network News
                        </h3>
                        <Bell size={18} className="text-slate-500" />
                    </div>

                    <div className="space-y-6">
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

                    <button className="w-full mt-8 py-3 rounded-xl border border-slate-800 text-xs font-bold text-slate-400 hover:bg-slate-800 hover:text-white transition-all">
                        VIEW ALL ANNOUNCEMENTS
                    </button>
                </div>
            </div>
        </div>
    );
}

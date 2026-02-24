import { useMemo, useState, useEffect } from "react";
import { ShieldCheck, Activity, FileSearch, ShieldAlert, CheckCircle2, Cpu, Newspaper, ExternalLink } from "lucide-react";
import KpiCards from "../../components/KpiCards";
import { getMockAirQualitySeries } from "../../mock/airquality";

function getFormattedDate(offsetDays = 0) {
    const d = new Date();
    d.setDate(d.getDate() - offsetDays);
    return d.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).replace(/\. /g, '.').replace(/\.$/, '');
}

export default function OverviewTab() {
    const series = useMemo(() => getMockAirQualitySeries(), []);
    const latest = series[series.length - 1];

    const [news, setNews] = useState([
        {
            id: 1,
            tag: "Forecast",
            title: "서울 PM2.5, 이번 주 '나쁨' 지속 전망",
            desc: "기상청은 중국발 미세먼지와 대기 정체로 수도권 PM2.5가 75µg/m³ 이상 유지될 것으로 예보했습니다.",
            date: getFormattedDate(0),
            highlight: true
        },
        {
            id: 2,
            tag: "Policy",
            title: "WHO, 실내 공기질 가이드라인 2026 업데이트 발표",
            desc: "세계보건기구가 실내 CO2 농도 기준을 1,000ppm에서 800ppm으로 강화하는 권고안을 발표했습니다.",
            date: getFormattedDate(0),
            highlight: false
        },
        {
            id: 3,
            tag: "Network",
            title: "에어벤트, 슈퍼팀코리아 스타트업빌리지 참가 및 빌딩",
            desc: "AirVent 팀이 슈퍼팀코리아 스타트업빌리지(Superteam Korea Startup Village)에 참여하여 솔라나 생태계의 혁신적인 DePIN 솔루션을 집중적으로 개발하고 있습니다.",
            date: getFormattedDate(0),
            highlight: false
        }
    ]);

    // Daily News Update Simulation (Refreshes dates every 24 hours)
    useEffect(() => {
        const interval = setInterval(() => {
            setNews(prev => prev.map(item => {
                if (item.tag === "Forecast" || item.tag === "Policy") {
                    return { ...item, date: getFormattedDate(0) };
                }
                return item;
            }));
        }, 1000 * 60 * 60 * 24); // 24 Hours
        return () => clearInterval(interval);
    }, []);

    const [logs, setLogs] = useState([
        { id: 1, time: "14:20:01", node: "Node-0X82", status: "Verified", score: 0.99, type: "Data Integrity" },
        { id: 2, time: "14:19:45", node: "Node-0X12", status: "Verified", score: 0.98, type: "Zero Knowledge" },
        { id: 3, time: "14:19:32", node: "Node-0XFF", status: "Processing", score: 0, type: "Data Integrity" },
        { id: 4, time: "14:18:10", node: "Node-0XAB", status: "Verified", score: 0.99, type: "Cross Check" },
    ]);

    // Simulate live audit logs
    useEffect(() => {
        const interval = setInterval(() => {
            const time = new Date().toLocaleTimeString();
            const node = `Node-0X${Math.floor(Math.random() * 256).toString(16).toUpperCase().padStart(2, '0')}`;
            const newLog = {
                id: Date.now(),
                time,
                node,
                status: Math.random() > 0.1 ? "Verified" : "Processing",
                score: 0.95 + Math.random() * 0.05,
                type: ["Data Integrity", "Zero Knowledge", "Cross Check"][Math.floor(Math.random() * 3)]
            };
            setLogs(prev => [newLog, ...prev.slice(0, 5)]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-widest">Global Network Status</h3>
                <KpiCards latest={latest} />
            </div>

            <div className="border-t border-slate-800 pt-6">
                {/* AI Audit Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gradient-to-br from-emerald-900/20 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <ShieldCheck size={120} className="text-emerald-400" />
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-emerald-400 mb-2">
                                <Cpu size={18} />
                                <span className="text-xs font-bold uppercase tracking-wider">DePIN AI Audit Engine</span>
                            </div>
                            <h1 className="text-3xl font-bold mb-2">Real-time Data Integrity</h1>
                            <p className="text-slate-400 max-w-lg mb-6">
                                All sensor data is automatically audited through our decentralized AI layer using Zero-Knowledge proofs to ensure 100% authenticity without compromising privacy.
                            </p>
                            <div className="flex gap-4">
                                <div className="bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3">
                                    <div className="text-xs text-slate-500 uppercase">Network Score</div>
                                    <div className="text-2xl font-bold text-emerald-400">99.8%</div>
                                </div>
                                <div className="bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3">
                                    <div className="text-xs text-slate-500 uppercase">Total Audits</div>
                                    <div className="text-2xl font-bold text-cyan-400">1.2M+</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-emerald-400" />
                            Live Audit Feed
                        </h2>
                        <div className="space-y-3">
                            {logs.map((log) => (
                                <div key={log.id} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-md ${log.status === "Verified" ? "bg-emerald-500/10 text-emerald-500" : "bg-cyan-500/10 text-cyan-500 animate-pulse"}`}>
                                            {log.status === "Verified" ? <CheckCircle2 size={14} /> : <FileSearch size={14} />}
                                        </div>
                                        <div>
                                            <div className="font-medium text-slate-200">{log.node}</div>
                                            <div className="text-[10px] text-slate-500">{log.type} • {log.time}</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-mono text-xs ${log.status === "Verified" ? "text-emerald-400" : "text-slate-500"}`}>
                                            {log.status === "Verified" ? `${(log.score * 100).toFixed(1)}%` : "..."}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Network News Section at the Bottom */}
            <div className="border-t border-slate-800 pt-8">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Newspaper size={16} />
                        Network News & Announcements
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {news.map((item) => (
                        <div key={item.id} className={`bg-slate-900/40 border border-slate-800 rounded-2xl p-6 hover:bg-slate-800/40 transition-all group ${item.highlight ? 'border-emerald-500/30' : ''}`}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-tighter bg-slate-800 px-2 py-0.5 rounded text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-500 transition-colors">
                                    {item.tag}
                                </span>
                                <span className="text-[10px] text-slate-600">{item.date}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-200 mb-2 group-hover:text-emerald-400 transition-colors line-clamp-1">
                                {item.title}
                            </h4>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                                {item.desc}
                            </p>
                            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                READ MORE <ExternalLink size={10} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

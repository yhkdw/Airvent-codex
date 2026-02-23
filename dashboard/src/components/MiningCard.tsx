import { useEffect, useState, useRef } from "react";
import Badge from "./Badge";

export default function MiningCard() {
    const [points, setPoints] = useState(1250);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState<"MINING" | "VALIDATING" | "SOLANA_CONFIRMED">("MINING");
    const [blockHash, setBlockHash] = useState("Waiting...");
    const [solanaTx, setSolanaTx] = useState("");

    // Mining loop
    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    // Cycle complete
                    return 0;
                }
                // Random speed
                return prev + Math.random() * 5;
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    // Status state machine based on progress
    useEffect(() => {
        if (progress < 80) {
            setStatus("MINING");
        } else if (progress < 100) {
            setStatus("VALIDATING");
        } else {
            // Just hit 100 (or reset)
            if (status !== "SOLANA_CONFIRMED") {
                setStatus("SOLANA_CONFIRMED");
                // Mint points!
                const reward = Math.floor(Math.random() * 5) + 5;
                setPoints(p => p + reward);
                setBlockHash("0x" + Math.random().toString(16).substr(2, 8));
                // Simulate Solana TxID
                const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
                let tx = "";
                for (let i = 0; i < 8; i++) tx += chars.charAt(Math.floor(Math.random() * chars.length));
                setSolanaTx(tx + "...");
            }
        }
    }, [progress, status]);


    const getStatusColor = () => {
        if (status === "MINING") return "bg-sky-500";
        if (status === "VALIDATING") return "bg-amber-500";
        return "bg-purple-500"; // Solana Purple
    };

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-24 h-24 text-emerald-500">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
                </svg>
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="text-xs text-slate-400 font-bold tracking-wider">SOLANA REWARD MINING</div>
                        <div className="text-lg font-semibold text-slate-100">AirVent Point (AVP)</div>
                    </div>
                    <Badge tone={status === "MINING" ? "info" : status === "VALIDATING" ? "warn" : "solana"}>
                        {status === "SOLANA_CONFIRMED" ? "SOLANA VERIFIED" : status}
                    </Badge>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl font-bold text-emerald-400">{points.toLocaleString()}</span>
                    <span className="text-sm text-slate-400">Pts</span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-slate-400">
                        <span>Current Block Process</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div
                            className={`h-full transition-all duration-300 ${getStatusColor()}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Log */}
                <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
                    <div className="flex justify-between">
                        <span>Last Block Hash:</span>
                        <span className="text-emerald-500">{blockHash}</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <span>Solana TxID:</span>
                        <span className="text-purple-400 font-mono tracking-tight">{solanaTx || "Pending..."}</span>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <span>Validator:</span>
                        <span>GPT-5.2 Agent</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

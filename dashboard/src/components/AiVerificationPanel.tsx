import { useEffect, useMemo, useState } from "react";
import Badge from "./Badge";

type AiEvent = {
  ts: string;
  message: string;
  badge: "INFO" | "WARN" | "PASS" | "SOLANA";
};

type Step = {
  badge: AiEvent["badge"];
  message: string;
};

function nowTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export default function AiVerificationPanel({
  onReward,
}: {
  onReward: (amount: number) => void;
}) {
  const steps: Step[] = useMemo(
    () => [
      { badge: "INFO", message: "데이터 정상 수집 중..." },
      { badge: "INFO", message: "GPT-5.2 에이전트가 패턴을 요약 중입니다..." },
      { badge: "WARN", message: "어뷰징/조작 가능성 스캔 중..." },
      { badge: "INFO", message: "데이터 Hashing 및 Solana 블록체인 전송 중..." },
      { badge: "SOLANA", message: "Solana 저장 완료: 위변조 불가 (Tamper-proof)" },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const [confidence, setConfidence] = useState(92);
  const [anomaly, setAnomaly] = useState(7);
  const [events, setEvents] = useState<AiEvent[]>([
    { ts: nowTime(), badge: "INFO", message: "AI 검증 파이프라인 준비 완료" },
  ]);

  useEffect(() => {
    const t = setInterval(() => {
      const next = (idx + 1) % steps.length;
      setIdx(next);

      // 숫자도 계속 흔들어 “라이브” 느낌
      const c = 88 + Math.floor(Math.random() * 12); // 88~99
      const a = Math.floor(Math.random() * 15); // 0~14
      setConfidence(c);
      setAnomaly(a);

      const step = steps[next];

      // SOLANA 저장 완료 시 리워드 지급
      if (step.badge === "SOLANA") {
        const amt = Math.round((0.03 + Math.random() * 0.05) * 100) / 100; // 0.03~0.08
        onReward(amt);
        // Generate random Solana Tx
        const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
        let tx = "";
        for (let i = 0; i < 8; i++) tx += chars.charAt(Math.floor(Math.random() * chars.length));
        step.message = `Solana 저장 완료 (TxID: ${tx}...)`;
      }

      setEvents((prev) => [
        { ts: nowTime(), badge: step.badge, message: step.message },
        ...prev,
      ].slice(0, 6));
    }, 2500);

    return () => clearInterval(t);
  }, [idx, steps, onReward]);

  const cur = steps[idx];

  const badgeTone =
    cur.badge === "SOLANA" ? "solana" : cur.badge === "PASS" ? "ok" : cur.badge === "WARN" ? "warn" : "info";

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-slate-400">AI DATA VERIFICATION</div>
          <div className="text-lg font-semibold">GPT-5.2 검증 패널</div>
        </div>
        <Badge tone={badgeTone}>{cur.badge}</Badge>
      </div>

      <div className="mt-3 text-sm text-slate-200">{cur.message}</div>

      {/* 로딩바 애니메이션 느낌 */}
      <div className="mt-3 h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div className="h-full w-1/2 bg-slate-200/40 animate-pulse" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3">
          <div className="text-xs text-slate-400">신뢰도(Confidence)</div>
          <div className="text-xl font-semibold">{confidence}%</div>
        </div>
        <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-3">
          <div className="text-xs text-slate-400">어뷰징 스코어(Anomaly)</div>
          <div className="text-xl font-semibold">{anomaly}/100</div>
        </div>
      </div>

      {/* ChatGPT Simulation */}
      <div className="mt-4 rounded-xl bg-slate-950/60 border border-slate-800 p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-xs text-slate-400 font-semibold">GPT-5.2 Analysis (Simulated)</div>
        </div>
        <div className="text-sm text-slate-300 leading-relaxed min-h-[60px]">
          {idx === 0 ? (
            <span className="text-slate-500 italic">데이터 분석 대기 중...</span>
          ) : idx === 1 ? (
            <span className="animate-pulse">패턴 분석 중...</span>
          ) : (
            "현재 공기질 데이터 패턴이 정상 범위입니다. 특이 사항이 발견되지 않았으며, 센서 신뢰도가 90% 이상으로 유지되고 있습니다."
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-xs text-slate-400 mb-2">최근 이벤트</div>
        <div className="space-y-2">
          {events.map((e, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 rounded-xl bg-slate-950/40 border border-slate-800 px-3 py-2"
            >
              <div className="text-sm text-slate-200">
                <span className="text-slate-400 mr-2">{e.ts}</span>
                {e.message}
              </div>
              <div className="text-xs text-slate-400">{e.badge}</div>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
}

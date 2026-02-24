import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginWithEmail, loginWithSocial } from "../auth";

export default function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: 'google' | 'twitter' | 'naver' | 'kakao') => {
    const { error } = await loginWithSocial(provider);
    if (error) setError(error.message);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900/60 border border-slate-800 p-6 shadow-xl">
        <div className="text-xs text-emerald-400 font-semibold tracking-wider mb-2">ACCESS CONTROL</div>
        <h1 className="text-2xl font-bold mt-2 text-slate-100">AirVent Dashboard</h1>
        <p className="text-sm text-slate-400 mt-2">
          사용자 계정으로 로그인하세요.
        </p>

        {/* Social Logins */}
        <div className="mt-8">
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin('google')}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/5 border border-slate-800 py-3.5 text-sm font-bold hover:bg-white/10 transition"
            >
              Google
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('twitter')}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-white/5 border border-slate-800 py-3.5 text-sm font-bold hover:bg-white/10 transition"
            >
              X (Twitter)
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('naver')}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#03C75A]/10 border border-[#03C75A]/30 py-3.5 text-sm font-bold hover:bg-[#03C75A]/20 transition text-[#03C75A]"
            >
              Naver
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('kakao')}
              className="w-full flex items-center justify-center gap-3 rounded-xl bg-[#FEE500]/10 border border-[#FEE500]/30 py-3.5 text-sm font-bold hover:bg-[#FEE500]/20 transition text-[#FEE500]"
            >
              Kakao
            </button>
          </div>

          <div className="relative flex items-center py-8">
            <div className="flex-grow border-t border-slate-800"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">Email Login</span>
            <div className="flex-grow border-t border-slate-800"></div>
          </div>
        </div>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            setLoading(true);
            const { error: loginErr } = await loginWithEmail(email, password);
            setLoading(false);
            if (loginErr) {
              setError(loginErr.message || "계정 정보가 일치하지 않거나 서버 설정이 올바르지 않습니다.");
            } else {
              nav("/dashboard");
            }
          }}
        >
          <label className="block">
            <div className="text-sm text-slate-300 mb-1.5 font-medium">Email</div>
            <input
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              autoComplete="email"
              disabled={loading}
            />
          </label>

          <label className="block">
            <div className="text-sm text-slate-300 mb-1.5 font-medium">Password</div>
            <input
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-4 py-3 outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all font-mono text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              disabled={loading}
            />
          </label>

          {error && (
            <div className="text-sm text-rose-400 bg-rose-950/30 border border-rose-900/50 rounded-xl px-4 py-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-emerald-500 text-slate-950 font-extrabold py-3.5 mt-2 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <div className="flex items-center justify-center mt-8">
            <Link to="/" className="text-xs font-bold text-slate-500 hover:text-slate-300 transition uppercase tracking-widest underline underline-offset-4">
              ← Back to Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

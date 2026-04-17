import { useState } from "react";

import RegisterPage from "./RegisterPage";
import { authService } from "../services/api";

export default function LoginPage({ onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await authService.login({ email, password });
      onAuthenticated(response);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (mode === "register") {
    return <RegisterPage onAuthenticated={onAuthenticated} onBack={() => setMode("login")} />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#031019] px-4">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.18), transparent 24%), radial-gradient(circle at 80% 0%, rgba(16,185,129,0.14), transparent 20%), linear-gradient(135deg, #031019, #071a2d 50%, #02070d)",
        }}
      />

      <div className="relative w-full max-w-4xl overflow-hidden rounded-[28px] border border-cyan-500/10 bg-slate-950/75 shadow-2xl backdrop-blur-xl">
        <div className="grid md:grid-cols-[1.1fr_0.9fr]">
          <div className="p-8 md:p-10">
            <p className="text-xs font-mono uppercase tracking-[0.28em] text-cyan-300">ShieldPay</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white md:text-5xl">Live claims for gig workers.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
              Unified dashboard, automatic claim triggers, fraud scoring, and payment simulation on one live stack.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Claims</p>
                <p className="mt-2 text-2xl font-semibold text-white">&lt; 2 min</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Signals</p>
                <p className="mt-2 text-2xl font-semibold text-white">4 live feeds</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">ML checks</p>
                <p className="mt-2 text-2xl font-semibold text-white">Fraud + income</p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-slate-950/60 p-8 md:border-l md:border-t-0 md:p-10">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-500">Sign in</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">Access your live dashboard</h2>

            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-mono uppercase tracking-[0.18em] text-slate-500">Email</label>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-mono uppercase tracking-[0.18em] text-slate-500">Password</label>
                <input
                  type="password"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition focus:border-cyan-400/50"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleLogin();
                    }
                  }}
                />
              </div>
            </div>

            {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

            <button
              type="button"
              onClick={handleLogin}
              disabled={loading}
              className="mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition"
              style={{ background: "linear-gradient(135deg, #22d3ee, #34d399)", opacity: loading ? 0.75 : 1 }}
            >
              {loading ? "Signing in..." : "Login"}
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className="mt-3 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

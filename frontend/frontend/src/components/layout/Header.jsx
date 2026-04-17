import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const pageInfo = {
  "/": { title: "Worker Dashboard", subtitle: "Live income, policy, and claim intelligence" },
  "/claim": { title: "Automatic Claims", subtitle: "Run the end-to-end parametric claim pipeline" },
  "/admin": { title: "Admin Console", subtitle: "Operational monitoring and fraud analytics" },
};

export default function Header({ wsStatus }) {
  const location = useLocation();
  const page = pageInfo[location.pathname] || pageInfo["/"];
  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState({ name: "User", role: "user" });

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("user") || "{}");
      setUser({
        name: parsed?.name || "User",
        role: parsed?.role || "user",
      });
    } catch {
      setUser({ name: "User", role: "user" });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  const statusColor = wsStatus === "connected" ? "#10b981" : wsStatus === "connecting" ? "#f59e0b" : "#ef4444";
  const statusText = wsStatus === "connected" ? "LIVE" : wsStatus === "connecting" ? "SYNCING" : "OFFLINE";

  return (
    <header
      className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-cyan-500/10 bg-[#040d1a]/85 px-4 backdrop-blur-xl md:left-[220px] md:px-6"
    >
      <motion.div key={location.pathname} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-base font-bold text-white">{page.title}</h1>
        <p className="hidden text-xs font-mono text-slate-500 md:block">{page.subtitle}</p>
      </motion.div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right md:block">
          <p className="text-xs font-mono text-cyan-300">{time.toLocaleTimeString("en-IN", { hour12: false })}</p>
          <p className="text-[10px] font-mono text-slate-600">
            {time.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border px-3 py-1.5" style={{ borderColor: `${statusColor}33` }}>
          <div className="h-2 w-2 rounded-full" style={{ background: statusColor, boxShadow: `0 0 8px ${statusColor}` }} />
          <span className="text-[11px] font-mono" style={{ color: statusColor }}>
            {statusText}
          </span>
        </div>

        <div className="hidden rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-mono text-slate-300 md:block">
          {user.role.toUpperCase()}
        </div>

        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold"
          style={{ background: "linear-gradient(135deg, #22d3ee, #0f766e)", color: "#031019" }}
        >
          {user.name.slice(0, 2).toUpperCase()}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl border border-white/10 px-3 py-2 text-xs font-mono text-white transition hover:border-cyan-400/40"
        >
          Logout
        </button>
      </div>
    </header>
  );
}

import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { id: "dashboard", label: "Dashboard", path: "/" },
  { id: "claim", label: "Claims", path: "/claim" },
  { id: "admin", label: "Admin", path: "/admin" },
];

export default function Sidebar() {
  let userRole = "user";
  try {
    userRole = JSON.parse(localStorage.getItem("user") || "{}")?.role || "user";
  } catch {}

  const visibleItems = navItems.filter((item) => item.id !== "admin" || userRole === "admin");
  const location = useLocation();

  return (
    <>
      <aside className="fixed left-0 top-0 z-50 hidden h-full w-[220px] border-r border-cyan-500/10 bg-[#031019]/95 px-4 py-5 backdrop-blur-xl md:flex md:flex-col">
        <div className="mb-8">
          <p className="font-display text-xl font-bold text-white">ShieldPay</p>
          <p className="mt-1 text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-300">AI Protection</p>
        </div>

        <nav className="space-y-2">
          {visibleItems.map((item) => {
            const active = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className="block rounded-2xl px-4 py-3 text-sm font-medium transition"
                style={{
                  background: active ? "rgba(34,211,238,0.12)" : "transparent",
                  border: active ? "1px solid rgba(34,211,238,0.24)" : "1px solid transparent",
                  color: active ? "#c4f1ff" : "#94a3b8",
                }}
              >
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-emerald-500/15 bg-emerald-500/5 p-4">
          <div className="flex items-center gap-2">
            <div className="status-dot live" />
            <p className="text-xs font-mono text-emerald-400">Realtime engine active</p>
          </div>
          <p className="mt-2 text-xs text-slate-500">Live dashboard, auto-claims, and ML scoring are connected to the backend.</p>
        </div>
      </aside>

      <nav className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl border border-cyan-500/10 bg-[#031019]/90 p-2 backdrop-blur-xl md:hidden">
        {visibleItems.map((item) => {
          const active = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          return (
            <NavLink
              key={item.id}
              to={item.path}
              className="flex-1 rounded-xl px-3 py-2 text-center text-xs font-mono uppercase tracking-[0.12em]"
              style={{
                color: active ? "#c4f1ff" : "#94a3b8",
                background: active ? "rgba(34,211,238,0.12)" : "transparent",
              }}
            >
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
}

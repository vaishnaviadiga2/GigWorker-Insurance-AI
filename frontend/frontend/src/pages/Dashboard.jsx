import { useEffect, useMemo, useState } from "react";

import GlassCard from "../components/ui/GlassCard";
import LiveConditions from "../components/ui/LiveConditions";
import RiskBadge from "../components/ui/RiskBadge";
import TrustGauge from "../components/ui/TrustGauge";
import IncomeChart from "../components/charts/IncomeChart";
import { workerService } from "../services/api";

function formatAmount(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}

function timeAgo(value) {
  const date = new Date(value);
  const diffMinutes = Math.max(1, Math.round((Date.now() - date.getTime()) / 60000));
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.round(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.round(diffHours / 24)}d ago`;
}

export default function Dashboard({ wsMessage }) {
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState("");

  const loadDashboard = async () => {
    try {
      const data = await workerService.getDashboard();
      setDashboard(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load dashboard");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  useEffect(() => {
    if (!wsMessage?.step) return;
    if (["decision", "payment_success", "environment_update"].includes(wsMessage.step)) {
      loadDashboard();
    }
  }, [wsMessage]);

  const user = dashboard?.user;
  const policy = dashboard?.policy;
  const environment = dashboard?.environment;
  const recentClaims = dashboard?.recent_claims || [];
  const behavior = dashboard?.behavioral;

  const headline = useMemo(() => {
    if (!behavior) return "Behavior engine syncing";
    const score = behavior.behavior_score || 0;
    if (score >= 80) return "Trusted profile with strong claim behavior";
    if (score >= 60) return "Stable profile with moderate monitoring";
    return "Higher-risk profile under active review";
  }, [behavior]);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="status-dot live" />
        <span className="text-xs font-mono text-emerald-400">Dashboard live</span>
      </div>

      {error && (
        <GlassCard className="p-4">
          <p className="text-sm text-red-300">{error}</p>
        </GlassCard>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <GlassCard className="p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold"
                style={{ background: "linear-gradient(135deg, #22d3ee, #0f766e)", color: "#03131b" }}
              >
                {(user?.name || "U").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">Worker profile</p>
                <h2 className="font-display text-2xl font-bold text-white">{user?.name || "Loading"}</h2>
                <p className="mt-1 text-sm text-slate-400">
                  {user?.city || "City pending"} • {user?.vehicle_type || "Vehicle pending"}
                </p>
                <p className="mt-2 text-sm text-slate-300">{headline}</p>
              </div>
            </div>

            <div className="lg:ml-auto">
              <TrustGauge score={user?.trust_score || 0} size={220} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Policy status</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{policy?.status || "inactive"}</h3>
            </div>
            <RiskBadge tier={user?.risk_tier || "standard"} />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Coverage</p>
              <p className="mt-2 text-2xl font-bold text-white">{formatAmount(policy?.coverage_amount)}</p>
            </div>
            <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Wallet balance</p>
              <p className="mt-2 text-2xl font-bold text-white">{formatAmount(policy?.wallet_balance)}</p>
            </div>
            <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Weekly premium</p>
              <p className="mt-2 text-2xl font-bold text-white">{formatAmount(policy?.weekly_premium)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Claims used</p>
              <p className="mt-2 text-2xl font-bold text-white">
                {policy?.claims_this_week || 0}/{policy?.max_claims_week || 0}
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Income trend</h3>
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">
                Declared vs recent actual weekly income
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Declared income</p>
              <p className="text-lg font-semibold text-cyan-300">{formatAmount(user?.declared_weekly_income)}</p>
            </div>
          </div>
          <IncomeChart data={dashboard?.income_chart || []} />
        </GlassCard>

        <GlassCard className="p-6">
          <LiveConditions conditions={environment} city={user?.city} />
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white">Behavioral engine</h3>
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Five-dimensional trust scoring</p>
          </div>
          <div className="space-y-3">
            {Object.entries(behavior?.dimensions || {}).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm capitalize text-slate-300">{key.replaceAll("_", " ")}</p>
                  <p className="text-xs font-mono text-cyan-300">{value.score}/100</p>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
                    style={{ width: `${Math.max(6, Number(value.score || 0))}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Recent claims</h3>
              <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Latest automated and manual decisions</p>
            </div>
          </div>

          <div className="space-y-3">
            {recentClaims.length === 0 && <p className="text-sm text-slate-400">No claims yet.</p>}
            {recentClaims.map((claim) => (
              <div key={claim.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">{claim.trigger_type}</p>
                    <p className="text-xs font-mono text-slate-500">{timeAgo(claim.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-white">{formatAmount(claim.amount)}</p>
                    <p
                      className={`text-xs font-mono ${
                        claim.status === "APPROVED" ? "text-emerald-400" : "text-amber-400"
                      }`}
                    >
                      {claim.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

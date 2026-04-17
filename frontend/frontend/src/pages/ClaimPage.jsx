import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import GlassCard from "../components/ui/GlassCard";
import { claimService } from "../services/api";

const TRIGGERS = [
  { id: "rain", label: "Rain disruption", description: "Auto-claim for heavy rain and storm impact" },
  { id: "demand_drop", label: "Demand drop", description: "Low platform demand reducing ride or delivery volume" },
  { id: "pollution", label: "Pollution spike", description: "AQI-driven reduction in working hours and trips" },
  { id: "traffic", label: "Traffic gridlock", description: "Severe congestion causing prolonged downtime" },
];

const STAGE_MAP = {
  trigger_detected: "Trigger detected",
  environment_fetch: "Environment verified",
  ml_analysis: "ML analysis complete",
  decision: "Claim decision ready",
  payment_processing: "Payment processing",
  payment_success: "Payment confirmed",
};

function formatAmount(value) {
  return `Rs ${Number(value || 0).toLocaleString("en-IN")}`;
}

export default function ClaimPage({ wsMessage }) {
  const [selectedTrigger, setSelectedTrigger] = useState("rain");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [claimResult, setClaimResult] = useState(null);
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    if (!wsMessage?.step) return;

    const label = STAGE_MAP[wsMessage.step];
    if (!label) return;

    const entry = {
      id: `${wsMessage.step}-${wsMessage.timestamp || Date.now()}`,
      step: wsMessage.step,
      label,
      timestamp: new Date().toLocaleTimeString("en-IN"),
      details:
        wsMessage.step === "decision"
          ? wsMessage.data?.reason || wsMessage.data?.status || "Decision computed"
          : wsMessage.step === "payment_success"
            ? wsMessage.payment?.transaction?.status || "Payment completed"
            : wsMessage.step === "ml_analysis"
              ? `Fraud ${wsMessage.data?.fraud_analysis?.score || 0} • Trust ${wsMessage.data?.trust_update?.trust_after || "-"}`
              : null,
    };

    setTimeline((current) => {
      const filtered = current.filter((item) => item.step !== wsMessage.step);
      return [entry, ...filtered].slice(0, 6);
    });

    if (wsMessage.step === "decision" && wsMessage.data) {
      setClaimResult(wsMessage.data);
      setSubmitting(false);
      setError("");
    }

    if (wsMessage.step === "payment_success" && wsMessage.data) {
      setClaimResult(wsMessage.data);
      setSubmitting(false);
    }
  }, [wsMessage]);

  const handleTrigger = async () => {
    try {
      setSubmitting(true);
      setError("");
      setTimeline([]);
      setClaimResult(null);
      const result = await claimService.initiateClaim(selectedTrigger);
      setClaimResult(result);
    } catch (err) {
      setError(err.message || "Claim could not be processed");
      setSubmitting(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <GlassCard className="p-6">
        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">Automatic claims</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Trigger a parametric claim</h2>
          <p className="mt-2 text-sm text-slate-400">
            This flow uses the live backend claim engine, fraud scoring, trust update, and payment simulation.
          </p>
        </div>

        <div className="space-y-3">
          {TRIGGERS.map((trigger) => {
            const active = trigger.id === selectedTrigger;
            return (
              <button
                key={trigger.id}
                type="button"
                onClick={() => setSelectedTrigger(trigger.id)}
                className="w-full rounded-2xl border p-4 text-left transition"
                style={{
                  borderColor: active ? "rgba(34,211,238,0.45)" : "rgba(255,255,255,0.08)",
                  background: active ? "rgba(34,211,238,0.08)" : "rgba(255,255,255,0.03)",
                }}
              >
                <p className="text-sm font-semibold text-white">{trigger.label}</p>
                <p className="mt-1 text-sm text-slate-400">{trigger.description}</p>
              </button>
            );
          })}
        </div>

        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

        <button
          type="button"
          onClick={handleTrigger}
          disabled={submitting}
          className="mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950 transition"
          style={{
            background: "linear-gradient(135deg, #22d3ee, #34d399)",
            opacity: submitting ? 0.7 : 1,
          }}
        >
          {submitting ? "Running claim engine..." : "Run automatic claim"}
        </button>
      </GlassCard>

      <div className="space-y-6">
        <GlassCard className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Live pipeline</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Backend event stream</h3>
            </div>
            <div className="status-dot live" />
          </div>

          <div className="space-y-3">
            {timeline.length === 0 && <p className="text-sm text-slate-400">Waiting for claim events.</p>}
            {timeline.map((entry) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-cyan-500/10 bg-cyan-500/5 p-4"
              >
                <p className="text-sm font-semibold text-white">{entry.label}</p>
                <p className="mt-1 text-xs font-mono text-cyan-300">{entry.timestamp}</p>
                {entry.details && <p className="mt-2 text-sm text-slate-300">{entry.details}</p>}
              </motion.div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="mb-4">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Decision snapshot</p>
            <h3 className="mt-2 text-lg font-semibold text-white">Claim output</h3>
          </div>

          {!claimResult && <p className="text-sm text-slate-400">No result yet. Start a claim to inspect the live response.</p>}

          {claimResult && (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Status</p>
                  <p className="mt-2 text-xl font-semibold text-white">{claimResult.status}</p>
                  {claimResult.reason && <p className="mt-1 text-sm text-slate-400">{claimResult.reason}</p>}
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Final payout</p>
                  <p className="mt-2 text-xl font-semibold text-white">{formatAmount(claimResult.payout?.final)}</p>
                  <p className="mt-1 text-sm text-slate-400">Base {formatAmount(claimResult.payout?.base)}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">ML summary</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  <div>
                    <p className="text-xs text-slate-500">Fraud score</p>
                    <p className="text-lg font-semibold text-white">{claimResult.fraud_analysis?.score || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Income drop</p>
                    <p className="text-lg font-semibold text-white">{claimResult.income_drop_pct || 0}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Trust after</p>
                    <p className="text-lg font-semibold text-white">{claimResult.trust_update?.trust_after || 0}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Payment</p>
                <p className="mt-2 text-sm text-slate-300">
                  {claimResult.payment?.transaction?.status || "No payment payload"}
                </p>
                {claimResult.payment?.transaction?.reference_id && (
                  <p className="mt-1 text-xs font-mono text-cyan-300">{claimResult.payment.transaction.reference_id}</p>
                )}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

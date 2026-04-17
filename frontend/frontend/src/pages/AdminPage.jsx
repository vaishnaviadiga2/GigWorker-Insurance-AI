import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import { ClaimsTimelineChart, RiskPieChart, PayoutLineChart } from '../components/charts/AdminCharts';
import { adminStats, recentClaims } from '../data/mockData';

const STAT_CONFIG = [
  { key: 'totalClaims', label: 'Total Claims', icon: '📋', color: '#38bdf8', prefix: '' },
  { key: 'approvedClaims', label: 'Approved', icon: '✅', color: '#10b981', prefix: '' },
  { key: 'fraudDetected', label: 'Fraud Blocked', icon: '🚨', color: '#ef4444', prefix: '' },
  { key: 'totalDisbursed', label: 'Total Disbursed', icon: '💰', color: '#f59e0b', prefix: '₹' },
];

function AnimatedNumber({ value, prefix = '', delay = 0 }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      style={{ fontFamily: 'Syne, sans-serif' }}
    >
      {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}
    </motion.span>
  );
}

function ClaimRow({ claim, index }) {
  const statusColor = {
    APPROVED: '#10b981',
    FRAUD: '#ef4444',
    PENDING: '#f59e0b',
  }[claim.status] || '#94a3b8';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/[0.02] transition-colors"
      style={{ borderBottom: '1px solid rgba(56,189,248,0.04)' }}
    >
      <div className="w-20">
        <p className="text-xs font-mono text-cyan-400">{claim.id}</p>
      </div>
      <div className="flex-1">
        <p className="text-sm text-slate-200">{claim.worker}</p>
        <p className="text-[11px] font-mono text-slate-600">{claim.trigger}</p>
      </div>
      <div className="text-right w-24">
        <p className="text-sm font-mono text-white">₹{claim.amount.toLocaleString('en-IN')}</p>
      </div>
      <div className="w-20">
        {/* Trust score bar */}
        <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(56,189,248,0.08)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${claim.score}%`,
              background: claim.score >= 70 ? '#10b981' : claim.score >= 40 ? '#f59e0b' : '#ef4444',
            }}
          />
        </div>
        <p className="text-[10px] font-mono text-slate-600 mt-0.5">{claim.score}/100</p>
      </div>
      <div className="w-20 text-right">
        <span
          className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md"
          style={{ color: statusColor, background: `${statusColor}15`, border: `1px solid ${statusColor}25` }}
        >
          {claim.status}
        </span>
      </div>
      <div className="w-16 text-right">
        <p className="text-[11px] font-mono text-slate-600">{claim.time}</p>
      </div>
    </motion.div>
  );
}

export default function AdminPage() {
    // 🔥 ROLE GUARD (CRITICAL SECURITY FIX)
  const storedUser = localStorage.getItem("user");
  let userRole = "user";

  if (storedUser) {
    try {
      userRole = JSON.parse(storedUser)?.role || "user";
    } catch (err) {
      console.error("User parse error", err);
    }
  }

  // 🔥 BLOCK NON-ADMIN ACCESS
  if (userRole !== "admin") {
    return (
      <div style={{ color: "white", padding: 40 }}>
        ❌ Access Denied (Admin only)
      </div>
    );
  }
  const [filter, setFilter] = useState('ALL');

  const filteredClaims = filter === 'ALL'
    ? recentClaims
    : recentClaims.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      {/* System status bar */}
      <GlassCard className="p-4" animate={false}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="status-dot live" />
            <span className="text-xs font-mono text-emerald-400">All Systems Operational</span>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-xs font-mono text-slate-500">
              {adminStats.activeWorkers.toLocaleString()} active workers
            </span>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-xs font-mono text-slate-500">
              Fraud rate: <span className="text-amber-400">{adminStats.fraudRate}%</span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-600">
            {new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          </span>
        </div>
      </GlassCard>

      {/* KPI stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CONFIG.map((cfg, i) => {
          const val = adminStats[cfg.key];
          return (
            <GlassCard key={cfg.key} delay={i * 0.06} className="p-5 overflow-hidden">
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${cfg.color}, transparent)` }} />
              <div className="flex items-center gap-2 mb-2">
                <span className="text-base">{cfg.icon}</span>
                <p className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">{cfg.label}</p>
              </div>
              <p className="text-2xl font-bold" style={{ color: cfg.color }}>
                <AnimatedNumber value={val} prefix={cfg.prefix} delay={i * 0.06 + 0.2} />
              </p>
            </GlassCard>
          );
        })}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Claims timeline */}
        <GlassCard className="p-5 lg:col-span-2" delay={0.25}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                Claims Volume
              </h3>
              <p className="text-[11px] font-mono text-slate-500">Last 7 days · Approved vs Fraud</p>
            </div>
            <div className="flex items-center gap-3">
              {[{ color: '#10b981', label: 'Approved' }, { color: '#ef4444', label: 'Fraud' }].map(l => (
                <div key={l.label} className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-sm" style={{ background: l.color }} />
                  <span className="text-[11px] font-mono text-slate-500">{l.label}</span>
                </div>
              ))}
            </div>
          </div>
          <ClaimsTimelineChart />
        </GlassCard>

        {/* Risk distribution */}
        <GlassCard className="p-5" delay={0.3}>
          <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Risk Distribution
          </h3>
          <RiskPieChart />
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(56,189,248,0.08)' }}>
            <p className="text-[11px] font-mono text-slate-500 mb-2">Avg Trust Score</p>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(56,189,248,0.08)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '74%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #38bdf8, #10b981)' }}
              />
            </div>
            <p className="text-xs font-mono text-cyan-400 mt-1">74 / 100</p>
          </div>
        </GlassCard>
      </div>

      {/* Payout trend */}
      <GlassCard className="p-5" delay={0.35}>
        <h3 className="text-sm font-bold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
          Daily Payout Trend
        </h3>
        <PayoutLineChart />
      </GlassCard>

      {/* Recent claims table */}
      <GlassCard className="p-5" delay={0.4}>
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h3 className="text-sm font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
            Live Claims Feed
          </h3>
          <div className="flex items-center gap-2">
            {['ALL', 'APPROVED', 'FRAUD', 'PENDING'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="text-[11px] font-mono px-3 py-1 rounded-lg transition-all"
                style={{
                  background: filter === f ? 'rgba(56,189,248,0.12)' : 'transparent',
                  border: `1px solid ${filter === f ? 'rgba(56,189,248,0.3)' : 'rgba(56,189,248,0.08)'}`,
                  color: filter === f ? '#38bdf8' : '#64748b',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table header */}
        <div className="flex items-center gap-4 py-2 px-4 mb-1">
          {['Claim ID', 'Worker', '', 'Amount', 'Trust', 'Status', 'Time'].map(h => (
            <div key={h} className={`text-[10px] font-mono text-slate-600 uppercase tracking-wider ${
              h === '' ? 'flex-1' : h === 'Amount' ? 'w-24 text-right' : h === 'Trust' ? 'w-20' : h === 'Status' ? 'w-20 text-right' : h === 'Time' ? 'w-16 text-right' : 'w-20'
            }`}>
              {h}
            </div>
          ))}
        </div>

        <AnimatePresence>
          {filteredClaims.map((claim, i) => (
            <ClaimRow key={claim.id} claim={claim} index={i} />
          ))}
        </AnimatePresence>
      </GlassCard>
    </div>
  );
}

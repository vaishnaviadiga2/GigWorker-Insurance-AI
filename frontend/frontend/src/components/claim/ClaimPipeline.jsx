import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useClaimFlow } from '../../hooks/useClaimFlow';
import { FraudBarChart } from '../charts/AdminCharts';
import { useRef } from 'react';

const ICONS = {
  Zap: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Brain: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.66" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.66" />
    </svg>
  ),
  Shield: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
  CreditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  Loader: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  ),
};

function ScanlineEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.4), transparent)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function StageNode({ stage, index, isActive, isComplete, isFuture }) {
  const Icon = ICONS[stage.icon] || ICONS.Zap;

  return (
    <div className="flex flex-col items-center" style={{ flex: 1 }}>
      {/* Connector line */}
      {index > 0 && (
        <div className="absolute" style={{ left: `${(index / 5) * 100 - 10}%`, top: 28, width: '20%', height: 2, zIndex: 0 }}>
          <motion.div
            className="h-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isComplete ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ transformOrigin: 'left', background: isComplete ? '#38bdf8' : 'rgba(56,189,248,0.1)' }}
          />
        </div>
      )}

      {/* Circle icon */}
      <motion.div
        className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center"
        animate={{
          scale: isActive ? [1, 1.08, 1] : 1,
          boxShadow: isActive
            ? [`0 0 0px ${stage.color}00`, `0 0 30px ${stage.color}60`, `0 0 0px ${stage.color}00`]
            : isComplete
            ? `0 0 16px ${stage.color}40`
            : 'none',
        }}
        transition={{ duration: 1.2, repeat: isActive ? Infinity : 0, ease: 'easeInOut' }}
        style={{
          background: isComplete
            ? `${stage.color}20`
            : isActive
            ? `${stage.color}15`
            : 'rgba(10,22,40,0.8)',
          border: `1px solid ${isComplete || isActive ? stage.color + '50' : 'rgba(56,189,248,0.1)'}`,
          color: isComplete || isActive ? stage.color : '#334155',
        }}
      >
        {isActive ? <ICONS.Loader /> : <Icon />}
        {isComplete && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: '#10b981', border: '2px solid #040d1a' }}
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
              <polyline points="2 6 5 9 10 3" stroke="#040d1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </motion.div>

      {/* Label */}
      <p
        className="mt-2 text-[11px] font-mono text-center leading-tight"
        style={{ color: isComplete || isActive ? stage.color : '#334155', maxWidth: 80 }}
      >
        {stage.label}
      </p>
    </div>
  );
}

function PayoutBreakdown({ breakdown }) {
  const rows = [
    { label: 'Base Amount', value: `₹${breakdown.baseAmount.toLocaleString('en-IN')}`, color: '#94a3b8' },
    { label: '× Trust Factor', value: `${breakdown.trustFactor}x`, color: '#38bdf8' },
    { label: '× Env. Factor', value: `${breakdown.environmentFactor}x`, color: '#a78bfa' },
    { label: '− Fraud Penalty', value: `₹${breakdown.fraudPenalty}`, color: '#ef4444' },
  ];

  return (
    <div className="space-y-2">
      {rows.map((row, i) => (
        <motion.div
          key={row.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center justify-between py-1.5 px-3 rounded-lg"
          style={{ background: 'rgba(56,189,248,0.04)', border: '1px solid rgba(56,189,248,0.06)' }}
        >
          <span className="text-xs font-mono text-slate-500">{row.label}</span>
          <span className="text-xs font-mono font-medium" style={{ color: row.color }}>{row.value}</span>
        </motion.div>
      ))}
      <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent my-1" />
      <div className="flex items-center justify-between px-3">
        <span className="text-sm font-mono text-white font-medium">Final Payout</span>
        <motion.span
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-lg font-bold"
          style={{ fontFamily: 'Syne, sans-serif', color: '#10b981' }}
        >
          ₹{breakdown.finalAmount.toLocaleString('en-IN')}
        </motion.span>
      </div>
    </div>
  );
}

function FraudPanel({ fraudStage }) {
  return (
    <div className="space-y-4">
      {/* Fraud score meter */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">Fraud Score</span>
          <span className="text-xs font-mono text-emerald-400 font-medium">
            {(fraudStage.fraudScore * 100).toFixed(1)}% risk
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(56,189,248,0.08)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fraudStage.fraudScore * 100}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, #10b981, #34d399)' }}
          />
        </div>
      </div>

      {/* Feature bars */}
      <div>
        <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">Feature Contributions</p>
        <FraudBarChart features={fraudStage.features} />
      </div>
    </div>
  );
}

function UPIPayment({ stage, amount, upiRef }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-4 gap-4"
    >
      {/* Success ring */}
      <div className="relative">
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981' }}
          animate={{ boxShadow: ['0 0 0px rgba(16,185,129,0)', '0 0 40px rgba(16,185,129,0.4)', '0 0 0px rgba(16,185,129,0)'] }}
          transition={{ duration: 1.5, repeat: 3 }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </motion.div>
        {[1, 2, 3].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border-2 border-emerald-500"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1 + ring * 0.4, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, delay: ring * 0.3, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Amount */}
      <div className="text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-white"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          ₹{amount?.toLocaleString('en-IN')}
        </motion.p>
        <p className="text-sm text-emerald-400 font-mono mt-1">Payment Successful</p>
      </div>

      {/* Transaction details */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full rounded-xl p-3 space-y-2"
        style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)' }}
      >
        {[
          { label: 'UPI Ref', value: upiRef },
          { label: 'To', value: 'arjun.sharma@upi' },
          { label: 'Via', value: 'ShieldPay Instant' },
          { label: 'Time', value: '1.2s' },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-xs font-mono text-slate-500">{label}</span>
            <span className="text-xs font-mono text-slate-200">{value}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default function ClaimPipeline({ wsMessage }) {


  const {
    isRunning,
    currentStage,
    completedStages,
    effectiveResult: hookEffectiveResult,
    elapsedTime,
    stages,
    start,
    reset
  } = useClaimFlow(wsMessage)
  const demoStartedRef = useRef(false);
  const getStageData = (id) => stages.find(s => s.id === id)
  const effectiveStage = currentStage
  const effectiveCompleted = completedStages

  // 🔥 result merge (correct)
const effectiveResult = hookEffectiveResult;

const fraudStage = getStageData('fraud');
const decisionStage = getStageData('decision');
const paymentStage = getStageData('payment');

const isStageComplete = (id) => effectiveCompleted.includes(id);
const isStageActive = (id) => stages[effectiveStage]?.id === id;

return (
  <div className="space-y-6">

    {/* Start button */}
    {!isRunning && !effectiveResult && (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-10 gap-4"
      >
        <div className="text-center space-y-2 mb-4">
          <p className="text-slate-400 text-sm font-mono">
            Trigger detected: Heavy Rain — Bengaluru
          </p>
          <p className="text-xs text-slate-600 font-mono">
            Click to initiate AI-powered claim processing
          </p>
        </div>

        <motion.button
          onClick={async () => {
            try {
              // 🔐 Get token safely
              const token = localStorage.getItem("access_token");

              // 🚨 Prevent request if token not ready
              if (!token) {
                alert("Please wait... authenticating");
                return;
              }

              // 🚀 Trigger claim API
              const response = await fetch(
                `${import.meta.env.VITE_API_URL}/claims/trigger`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // ✅ FIXED
                  },
                  body: JSON.stringify({
                    trigger_type: "rain",
                  }),
                }
              );

              // ❗ Handle backend errors properly
              if (!response.ok) {
                const errText = await response.text();
                console.error("Backend error:", errText);
                alert("Claim failed: " + errText);
                return;
              }
              // 🔥 DEMO SAFETY NET
              if (!wsMessage || !wsMessage.step) {
                demoStartedRef.current = false;

              // simulate pipeline if backend not responding
                setTimeout(() => start(), 300);
              } else {
                start();
              }

            } catch (err) {
              console.error("Claim start failed", err);
              alert("Claim request failed. Check login or backend.");
              return;
            }

          
           
          }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-8 py-3.5 rounded-xl font-bold text-sm overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #0891b2)',
              color: '#040d1a',
              fontFamily: 'Syne, sans-serif',
              boxShadow: '0 0 30px rgba(56,189,248,0.4)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" />
              </svg>
              Initiate AI Claim
            </span>
          </motion.button>
        </motion.div>
      )}

      {/* Pipeline */}
      <AnimatePresence>
        {(isRunning || effectiveResult) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Stage nodes */}
            <div
              className="relative flex justify-between items-start px-4 py-5 rounded-2xl"
              style={{ background: 'rgba(10,22,40,0.6)', border: '1px solid rgba(56,189,248,0.08)' }}
            >
              {isRunning && <ScanlineEffect />}

              {/* Connector track */}
              <div
                className="absolute top-[52px] left-8 right-8 h-0.5"
                style={{ background: 'rgba(56,189,248,0.06)' }}
              />
              <motion.div
                className="absolute top-[52px] left-8 h-0.5"
                style={{ background: 'linear-gradient(90deg, #38bdf8, #0891b2)', transformOrigin: 'left' }}
                animate={{ scaleX: effectiveCompleted.length / stages.length }}
                transition={{ duration: 0.4 }}
              />

              {stages.map((stage, i) => (
                <StageNode
                  key={stage.id}
                  stage={stage}
                  index={i}
                  isActive={isStageActive(stage.id)}
                  isComplete={isStageComplete(stage.id)}
                  isFuture={!isStageActive(stage.id) && !isStageComplete(stage.id)}
                />
              ))}
            </div>

            {/* Active stage detail */}
            <AnimatePresence mode="wait">
              {effectiveStage >= 0 && (
                <motion.div
                  key={stages[effectiveStage]?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl p-4"
                  style={{
                    background: `${stages[effectiveStage].color}08`,
                    border: `1px solid ${stages[effectiveStage].color}25`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: stages[effectiveStage].color }} />
                    <span className="text-xs font-mono uppercase tracking-wider" style={{ color: stages[effectiveStage].color }}>
                      Processing · {stages[effectiveStage].label}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 font-mono">{stages[effectiveStage].detail}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Completed stage details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fraud panel — shown when fraud stage is done */}
              <AnimatePresence>
                {isStageComplete('fraud') && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(245,158,11,0.15)' }}
                  >
                    <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-3">
                      🔍 Fraud Analysis
                    </p>
                    {fraudStage && <FraudPanel fraudStage={fraudStage} />}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Payout breakdown — shown when decision is done */}
              <AnimatePresence>
                {isStageComplete('decision') && decisionStage?.payoutBreakdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl p-4"
                    style={{ background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(16,185,129,0.15)' }}
                  >
                    <p className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-3">
                      💰 Payout Breakdown
                    </p>
                    <PayoutBreakdown breakdown={decisionStage.payoutBreakdown} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Payment success */}
            <AnimatePresence>
              {effectiveResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl p-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(10,22,40,0.9))',
                    border: '1px solid rgba(16,185,129,0.2)',
                    boxShadow: '0 0 40px rgba(16,185,129,0.08)',
                  }}
                >
                  <UPIPayment
                    stage={paymentStage}
                   amount={effectiveResult?.amount}
                   upiRef={effectiveResult?.upiRef || effectiveResult?.transaction_id}
                  />

                  {/* Elapsed time + reset */}
                  <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid rgba(16,185,129,0.1)' }}>
                    <div>
                      <p className="text-xs font-mono text-slate-500">Total Processing Time</p>
                      <p className="text-sm font-mono text-white">{elapsedTime}s</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={reset}
                      className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white transition-colors"
                      style={{ border: '1px solid rgba(56,189,248,0.15)', background: 'rgba(56,189,248,0.05)' }}
                    >
                      ↺ Run Again
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Elapsed timer while processing */}
            {isRunning && (
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                AI processing · {elapsedTime}s elapsed
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

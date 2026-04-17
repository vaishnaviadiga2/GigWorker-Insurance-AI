import { motion } from 'framer-motion';

const TIER_CONFIG = {
  LOW: {
    label: 'LOW RISK',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.25)',
    glow: 'rgba(16,185,129,0.3)',
    icon: '🛡️',
    description: 'Excellent standing',
  },
  MEDIUM: {
    label: 'MEDIUM RISK',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.25)',
    glow: 'rgba(245,158,11,0.3)',
    icon: '⚠️',
    description: 'Moderate exposure',
  },
  HIGH: {
    label: 'HIGH RISK',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.25)',
    glow: 'rgba(239,68,68,0.3)',
    icon: '🚨',
    description: 'Review required',
  },
};

export default function RiskBadge({ tier = 'LOW', size = 'md' }) {
  const normalizedTier = String(tier).toUpperCase();
  const mappedTier =
    normalizedTier === 'PREMIUM' ? 'LOW' :
    normalizedTier === 'STANDARD' ? 'MEDIUM' :
    normalizedTier === 'WATCHLIST' || normalizedTier === 'HIGH_RISK' ? 'HIGH' :
    normalizedTier;

  const config = TIER_CONFIG[mappedTier] || TIER_CONFIG.LOW;
  const isLarge = size === 'lg';

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
      className="inline-flex flex-col items-center gap-1"
    >
      <motion.div
        className={`flex items-center gap-2 ${isLarge ? 'px-4 py-2.5' : 'px-3 py-1.5'} rounded-xl relative`}
        style={{
          background: config.bg,
          border: `1px solid ${config.border}`,
          boxShadow: `0 0 16px ${config.glow}`,
        }}
        animate={{ boxShadow: [`0 0 12px ${config.glow}`, `0 0 24px ${config.glow}`, `0 0 12px ${config.glow}`] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className={isLarge ? 'text-xl' : 'text-base'}>{config.icon}</span>
        <span
          className={`font-mono font-bold ${isLarge ? 'text-sm' : 'text-xs'} tracking-wider`}
          style={{ color: config.color }}
        >
          {config.label}
        </span>
      </motion.div>
      {isLarge && (
        <p className="text-[11px] font-mono text-slate-500">{config.description}</p>
      )}
    </motion.div>
  );
}

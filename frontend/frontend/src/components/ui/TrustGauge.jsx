import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const RADIUS = 70;
const STROKE = 10;
const CENTER = 90;
const CIRCUMFERENCE = Math.PI * RADIUS; // half circle

function getColor(score) {
  if (score >= 80) return { primary: '#10b981', secondary: '#059669', label: 'EXCELLENT' };
  if (score >= 60) return { primary: '#38bdf8', secondary: '#0891b2', label: 'GOOD' };
  if (score >= 40) return { primary: '#f59e0b', secondary: '#d97706', label: 'MODERATE' };
  return { primary: '#ef4444', secondary: '#dc2626', label: 'POOR' };
}

export default function TrustGauge({ score = 0, size = 180 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const colors = getColor(score);

  // Animate count-up
  useEffect(() => {
    let start = 0;
    const step = score / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  const progress = score / 100;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const tickAngles = Array.from({ length: 21 }, (_, i) => -180 + i * 9);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size * 0.7 }}>
      <svg
        width={size}
        height={size * 0.7}
        viewBox={`0 0 ${CENTER * 2} ${CENTER + 20}`}  // 🔥 slight height increase
        style={{ overflow: 'visible' }}
      >
        {/* Gradient defs */}
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.primary} />
          </linearGradient>
          <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tick marks */}
        {tickAngles.map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const isMajor = i % 5 === 0;
          const inner = RADIUS - (isMajor ? 10 : 6);
          const outer = RADIUS - 2;
          const x1 = CENTER + inner * Math.cos(rad);
          const y1 = CENTER + inner * Math.sin(rad);
          const x2 = CENTER + outer * Math.cos(rad);
          const y2 = CENTER + outer * Math.sin(rad);
          const filled = i / 20 <= progress;
          return (
            <line
              key={i}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={filled ? colors.primary : 'rgba(56,189,248,0.12)'}
              strokeWidth={isMajor ? 2 : 1}
              strokeLinecap="round"
            />
          );
        })}

        {/* Track arc */}
        <path
          d={`M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER + RADIUS} ${CENTER}`}
          fill="none"
          stroke="rgba(56,189,248,0.06)"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <motion.path
          d={`M ${CENTER - RADIUS} ${CENTER} A ${RADIUS} ${RADIUS} 0 0 1 ${CENTER + RADIUS} ${CENTER}`}
          fill="none"
          stroke="url(#gaugeGrad)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          filter="url(#glowFilter)"
        />

        {/* Needle */}
        {(() => {
          const angle = -180 + progress * 180;
          const rad = (angle * Math.PI) / 180;
          const needleLen = RADIUS - 14;
          const nx = CENTER + needleLen * Math.cos(rad);
          const ny = CENTER + needleLen * Math.sin(rad);
          return (
            <motion.g
              initial={{ rotate: -180 }}
              animate={{ rotate: angle }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
              style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}
            >
              <line
                x1={CENTER} y1={CENTER}
                x2={CENTER + needleLen * Math.cos(0)}
                y2={CENTER + needleLen * Math.sin(0)}
                stroke={colors.primary}
                strokeWidth="2"
                strokeLinecap="round"
                style={{ filter: `drop-shadow(0 0 4px ${colors.primary})` }}
              />
              <circle cx={CENTER} cy={CENTER} r={6} fill={colors.primary} style={{ filter: `drop-shadow(0 0 6px ${colors.primary})` }} />
              <circle cx={CENTER} cy={CENTER} r={3} fill="#040d1a" />
            </motion.g>
          );
        })()}

        {/* 🔥 FIXED: Better vertical spacing */}
        <text
          x={CENTER}
          y={CENTER + 28}   // 🔥 moved down
          textAnchor="middle"
          style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: '30px',
            fontWeight: 900,
            fill: 'white',
            letterSpacing: '0.02em'
          }}
        >
          {displayScore}
        </text>

        <text
          x={CENTER}
          y={CENTER + 10}   // 🔥 moved up (no overlap)
          textAnchor="middle"
          style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '9px',
            fill: colors.primary,
            letterSpacing: '0.18em'
          }}
        >
          TRUST SCORE
        </text>
      </svg>

      {/* Bottom labels */}
      <div className="flex w-full justify-between px-2 -mt-1">
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: 'rgba(56,189,248,0.4)' }}>0</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: colors.primary, letterSpacing: '0.1em' }}
        >
          {colors.label}
        </motion.span>
        <span style={{ fontFamily: 'IBM Plex Mono', fontSize: '10px', color: 'rgba(56,189,248,0.4)' }}>100</span>
      </div>
    </div>
  );
}
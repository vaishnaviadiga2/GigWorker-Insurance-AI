import { motion } from 'framer-motion';
import clsx from 'clsx';

export default function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  glowColor = 'cyan',
  onClick,
  delay = 0,
  animate = true,
  style = {},
}) {
  const glowStyles = {
    cyan: '0 0 30px rgba(56,189,248,0.15), 0 0 80px rgba(56,189,248,0.05)',
    emerald: '0 0 30px rgba(16,185,129,0.15), 0 0 80px rgba(16,185,129,0.05)',
    amber: '0 0 30px rgba(245,158,11,0.15)',
    crimson: '0 0 30px rgba(239,68,68,0.15)',
  };

  const baseStyle = {
    background: 'rgba(10, 22, 40, 0.75)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(56, 189, 248, 0.1)',
    borderRadius: '16px',
    boxShadow: glow
      ? `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05), ${glowStyles[glowColor]}`
      : '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
    ...style,
  };

  const Component = animate ? motion.div : 'div';
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay, ease: [0.4, 0, 0.2, 1] },
        whileHover: hover ? { y: -2, boxShadow: `0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 20px rgba(56,189,248,0.1)` } : {},
      }
    : {};

  return (
    <Component
      className={clsx('relative overflow-hidden', onClick && 'cursor-pointer', className)}
      style={baseStyle}
      onClick={onClick}
      {...animProps}
    >
      {children}
    </Component>
  );
}

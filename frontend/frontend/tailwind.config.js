/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#040d1a',
        abyss: '#060f1f',
        surface: '#0a1628',
        glass: 'rgba(10, 22, 40, 0.75)',
        border: 'rgba(56, 189, 248, 0.12)',
        cyan: {
          DEFAULT: '#38bdf8',
          dim: 'rgba(56,189,248,0.15)',
          glow: 'rgba(56,189,248,0.35)',
        },
        emerald: {
          DEFAULT: '#10b981',
          dim: 'rgba(16,185,129,0.15)',
          glow: 'rgba(16,185,129,0.35)',
        },
        amber: {
          DEFAULT: '#f59e0b',
          dim: 'rgba(245,158,11,0.15)',
          glow: 'rgba(245,158,11,0.35)',
        },
        crimson: {
          DEFAULT: '#ef4444',
          dim: 'rgba(239,68,68,0.15)',
          glow: 'rgba(239,68,68,0.35)',
        },
        slate: {
          50: '#f0f9ff',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': `linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)`,
        'glow-radial': 'radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 60%)',
        'hero-gradient': 'linear-gradient(135deg, #040d1a 0%, #060f1f 50%, #04121e 100%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scan': 'scan 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scan: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(56,189,248,0.25), 0 0 60px rgba(56,189,248,0.1)',
        'emerald-glow': '0 0 20px rgba(16,185,129,0.25), 0 0 60px rgba(16,185,129,0.1)',
        'amber-glow': '0 0 20px rgba(245,158,11,0.25)',
        'crimson-glow': '0 0 20px rgba(239,68,68,0.25)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
        'glass-lg': '0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

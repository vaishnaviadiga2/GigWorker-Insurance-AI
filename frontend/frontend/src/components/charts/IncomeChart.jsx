import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend
} from 'recharts';
import { incomeHistory } from '../../data/mockData';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'rgba(4, 13, 26, 0.95)',
      border: '1px solid rgba(56,189,248,0.2)',
      borderRadius: 12,
      padding: '10px 14px',
      backdropFilter: 'blur(20px)',
    }}>
      <p style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: '#64748b', marginBottom: 6 }}>{label}</p>
      {payload.map((entry) => (
        <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
          <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: '#94a3b8' }}>
            {entry.dataKey === 'actual' ? 'Actual' : 'Predicted'}
          </span>
          <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 12, color: 'white', fontWeight: 600 }}>
            {entry.value ? `₹${entry.value.toLocaleString('en-IN')}` : '—'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function IncomeChart({ data = incomeHistory }) {
  return (
    <div className="w-full h-48">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.05)" />
          <XAxis
            dataKey="month"
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: '#475569' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#475569' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#a78bfa"
            strokeWidth={1.5}
            strokeDasharray="5 3"
            fill="url(#predictedGrad)"
            dot={false}
            connectNulls
          />
          <Area
            type="monotone"
            dataKey="actual"
            stroke="#38bdf8"
            strokeWidth={2}
            fill="url(#actualGrad)"
            dot={{ r: 3, fill: '#38bdf8', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#38bdf8', stroke: 'rgba(56,189,248,0.3)', strokeWidth: 4 }}
            connectNulls={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

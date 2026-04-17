import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, LineChart, Line, Legend
} from 'recharts';
import { claimsTimeline, riskDistribution } from '../../data/mockData';

const TooltipStyle = {
  background: 'rgba(4, 13, 26, 0.95)',
  border: '1px solid rgba(56,189,248,0.2)',
  borderRadius: 12,
  padding: '10px 14px',
  fontFamily: 'IBM Plex Mono',
  fontSize: 12,
};

export function ClaimsTimelineChart({ data = claimsTimeline }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.05)" vertical={false} />
        <XAxis dataKey="date" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={TooltipStyle} labelStyle={{ color: '#64748b', marginBottom: 4 }} itemStyle={{ color: '#94a3b8' }} />
        <Bar dataKey="approved" stackId="a" fill="#10b981" fillOpacity={0.8} radius={[0, 0, 0, 0]} />
        <Bar dataKey="fraud" stackId="a" fill="#ef4444" fillOpacity={0.8} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, pct, tier }) => {
  const r = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + r * Math.cos(-midAngle * RADIAN);
  const y = cy + r * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central"
      style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fontWeight: 600 }}>
      {`${pct}%`}
    </text>
  );
};

export function RiskPieChart({ data = riskDistribution }) {
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={65}
            dataKey="count"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} fillOpacity={0.85} stroke={entry.color} strokeWidth={1} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-2 flex-1">
        {data.map((entry) => (
          <div key={entry.tier} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
              <span className="text-[11px] font-mono text-slate-400">{entry.tier} RISK</span>
            </div>
            <span className="text-xs font-mono text-white font-medium">{entry.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PayoutLineChart({ data = claimsTimeline }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <LineChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.05)" />
        <XAxis dataKey="date" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
        <Tooltip contentStyle={TooltipStyle} labelStyle={{ color: '#64748b' }} formatter={(v) => [`₹${v.toLocaleString('en-IN')}`, 'Payout']} />
        <Line type="monotone" dataKey="payout" stroke="#38bdf8" strokeWidth={2} dot={false} activeDot={{ r: 4, fill: '#38bdf8' }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function FraudBarChart({ features }) {
  if (!features) return null;
  const data = features.map(f => ({
    name: f.name.replace(' ', '\n'),
    value: Math.round(f.value * 100),
    safe: f.safe,
  }));
  return (
    <ResponsiveContainer width="100%" height={160}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 80, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(56,189,248,0.05)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#475569' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
        <YAxis type="category" dataKey="name" tick={{ fontFamily: 'IBM Plex Mono', fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} width={80} />
        <Tooltip contentStyle={TooltipStyle} formatter={(v) => [`${v}%`, 'Risk Score']} />
        <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={12}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.safe ? '#38bdf8' : '#ef4444'} fillOpacity={0.75} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

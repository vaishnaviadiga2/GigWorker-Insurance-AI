import { motion } from "framer-motion";

function getSeverityTone(value) {
  if (["severe", "gridlock", "very_low", "poor", "very_poor"].includes(value)) {
    return { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.28)", text: "#fda4af" };
  }
  if (["heavy", "low", "moderate"].includes(value)) {
    return { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.28)", text: "#fcd34d" };
  }
  return { bg: "rgba(16,185,129,0.1)", border: "rgba(16,185,129,0.25)", text: "#6ee7b7" };
}

function ConditionPill({ icon, label, value, severity, index }) {
  const tone = getSeverityTone(severity);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-2xl border p-4"
      style={{ background: tone.bg, borderColor: tone.border }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-slate-500">{label}</p>
      </div>
      <p className="text-lg font-semibold" style={{ color: tone.text }}>
        {value}
      </p>
    </motion.div>
  );
}

export default function LiveConditions({ conditions, city }) {
  const items = [
    {
      icon: "Rain",
      label: "Weather",
      value: `${conditions?.weather?.severity || "clear"} • ${Math.round(conditions?.weather?.rain_mm || 0)} mm`,
      severity: conditions?.weather?.severity || "clear",
    },
    {
      icon: "AQI",
      label: "Air quality",
      value: `${Math.round(conditions?.aqi?.aqi || 0)} • ${conditions?.aqi?.category || "good"}`,
      severity: conditions?.aqi?.category || "good",
    },
    {
      icon: "Demand",
      label: "Platform demand",
      value: `${Math.round(conditions?.demand?.index || 0)} index`,
      severity: conditions?.demand?.category || "normal",
    },
    {
      icon: "Traffic",
      label: "Traffic",
      value: conditions?.traffic?.category || "free_flow",
      severity: conditions?.traffic?.category || "free_flow",
    },
  ];

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-slate-500">Environmental feed</p>
          <h3 className="mt-2 text-lg font-semibold text-white">{city || conditions?.city || "Tracked city"}</h3>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono uppercase tracking-[0.15em] text-slate-500">Composite score</p>
          <p className="mt-1 text-lg font-semibold text-cyan-300">{Math.round(conditions?.composite_env_score || 0)}</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <ConditionPill key={item.label} {...item} index={index} />
        ))}
      </div>
    </div>
  );
}

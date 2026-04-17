import { useState } from "react";

import { authService } from "../services/api";

export default function RegisterPage({ onAuthenticated, onBack }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    city: "Bangalore",
    vehicle_type: "bike",
    declared_weekly_income: 3000,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await authService.register({
        ...form,
        declared_weekly_income: Number(form.declared_weekly_income),
      });
      onAuthenticated(response);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#031019] px-4">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 80% 10%, rgba(34,211,238,0.16), transparent 20%), radial-gradient(circle at 10% 80%, rgba(16,185,129,0.12), transparent 24%), linear-gradient(135deg, #031019, #071a2d 50%, #02070d)",
        }}
      />

      <div className="relative w-full max-w-xl rounded-[28px] border border-cyan-500/10 bg-slate-950/75 p-8 shadow-2xl backdrop-blur-xl md:p-10">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300">Create account</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Join the live ShieldPay workspace</h1>
        <p className="mt-3 text-sm text-slate-400">Registration provisions your policy immediately so the dashboard can go live.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            placeholder="Full name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
          <input
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            placeholder="Email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
          <input
            type="password"
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            placeholder="Password"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
          />
          <input
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            placeholder="City"
            value={form.city}
            onChange={(event) => updateField("city", event.target.value)}
          />
          <select
            className="rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none"
            value={form.vehicle_type}
            onChange={(event) => updateField("vehicle_type", event.target.value)}
          >
            <option value="bike">Bike</option>
            <option value="scooter">Scooter</option>
            <option value="cycle">Cycle</option>
            <option value="car">Car</option>
          </select>
          <input
            type="number"
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            placeholder="Weekly income"
            value={form.declared_weekly_income}
            onChange={(event) => updateField("declared_weekly_income", event.target.value)}
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-300">{error}</p>}

        <button
          type="button"
          onClick={handleRegister}
          disabled={loading}
          className="mt-6 w-full rounded-2xl px-4 py-3 text-sm font-semibold text-slate-950"
          style={{ background: "linear-gradient(135deg, #22d3ee, #34d399)", opacity: loading ? 0.75 : 1 }}
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="mt-3 w-full rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white"
        >
          Back to login
        </button>
      </div>
    </div>
  );
}

# 🛡️ ShieldPay — AI-Powered Income Protection for Gig Workers

> Production-grade React frontend for an AI-powered claim system. Stripe-level fintech UI.

---

## ✨ Features

| Feature | Description |
|---|---|
| **Worker Dashboard** | Trust gauge, income trend, live environment conditions, WS feed |
| **AI Claim Pipeline** | 5-stage animated flow: Trigger → Analysis → Fraud → Decision → UPI |
| **Fraud Explainability** | Feature-level XGBoost reasoning with bar charts |
| **UPI Payment UI** | GPay-style success animation with transaction breakdown |
| **Admin Console** | System KPIs, claims timeline, risk distribution, live feed |
| **WebSocket** | Real-time updates with graceful mock fallback |

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## 🔧 Connect to Your Backend

Create a `.env` file:

```env
VITE_API_URL=http://localhost:8000
VITE_WS_URL=ws://localhost:8000/ws/worker/W-2847
```

Then update `src/hooks/useWebSocket.js` to use `import.meta.env.VITE_WS_URL`.

### Expected WebSocket message formats:
```json
{ "type": "TRUST_UPDATE", "data": { "score": 83, "delta": 1 } }
{ "type": "INCOME_UPDATE", "data": { "predicted": 18650, "confidence": 0.87 } }
{ "type": "CONDITION_UPDATE", "data": { "weather": "Heavy Rain", "aqi": 142, "demand": 0.38 } }
{ "type": "CLAIM_UPDATE", "data": { "id": "CLM-4401", "status": "APPROVED", "amount": 9200 } }
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx          # Animated collapsible sidebar
│   │   └── Header.jsx           # Live status + time header
│   ├── ui/
│   │   ├── GlassCard.jsx        # Glassmorphism card base
│   │   ├── TrustGauge.jsx       # Animated SVG gauge
│   │   ├── RiskBadge.jsx        # Animated tier badge
│   │   └── LiveConditions.jsx   # Weather/AQI/Demand pills
│   ├── claim/
│   │   └── ClaimPipeline.jsx    # Full AI pipeline with fraud panel + UPI
│   └── charts/
│       ├── IncomeChart.jsx      # Area chart (actual vs predicted)
│       └── AdminCharts.jsx      # Bar, Pie, Line, Fraud bar charts
├── pages/
│   ├── Dashboard.jsx            # Worker view
│   ├── ClaimPage.jsx            # Claim filing + pipeline
│   └── AdminPage.jsx            # Admin console
├── hooks/
│   ├── useWebSocket.js          # WS with mock fallback
│   └── useClaimFlow.js          # Stage sequencing state machine
├── services/
│   └── api.js                   # Axios service with mock fallback
└── data/
    └── mockData.js              # Realistic demo data
```

---

## 🎨 Design System

- **Theme**: Dark void (`#040d1a`) with cyan (`#38bdf8`) accent
- **Fonts**: Syne (display) + Plus Jakarta Sans (body) + IBM Plex Mono (data)
- **Cards**: Glassmorphism — `backdrop-filter: blur(20px)` + subtle borders
- **Motion**: Framer Motion throughout — page transitions, stage reveals, counters
- **Charts**: Recharts with dark-themed custom tooltips

---

## 🔌 API Endpoints Expected

```
GET  /workers/{id}                 Worker profile
GET  /workers/{id}/trust           Trust score
GET  /workers/{id}/income/history  Income history
POST /claims/initiate              File a claim
GET  /claims/{id}/status           Claim status
GET  /admin/stats                  System overview
GET  /admin/claims                 Claims list
GET  /conditions/live              Environment conditions
WS   /ws/worker/{id}               Real-time stream
```

All endpoints gracefully fall back to mock data if unavailable.

---

## 🏗️ Tech Stack

- **React 18** + Vite
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — all animations
- **Recharts** — data visualization
- **Axios** — API calls with interceptors
- **React Router v6** — page navigation

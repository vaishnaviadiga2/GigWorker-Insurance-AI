# ShieldPay
**Final Pitch Deck:**
https://ap.wps.com/l/cbCaeonPhk7xyCVy

ShieldPay is an AI-assisted income protection platform for gig workers. It combines a FastAPI backend, a React/Vite frontend, simulated or live environmental signals, fraud scoring, income prediction, behavioral trust scoring, automatic claims, and a live dashboard.

This README describes the repo as it exists now.

**Stack**
- Backend: FastAPI, SQLAlchemy, Python
- Frontend: React, Vite, Axios, Recharts, Framer Motion
- Database: SQLite by default
- ML: scikit-learn model loading with rule-based fallback
- Live updates: WebSockets

**Repo Layout**
- `backend/`
  Backend API, auth, claims engine, ML integration, weather/AQI data sources, database models
- `frontend/frontend/`
  Active frontend app
- `frontend_backup/`
  Old frontend copy, not the active app
- `requirements.txt`
  Python dependencies

## System Architecture

```text
                                    ShieldPay System

   ┌──────────────────────────────── Frontend ────────────────────────────────┐
   │                                                                          │
   │  React + Vite                                                            │
   │  Path: frontend/frontend                                                 │
   │                                                                          │
   │  Pages                                                                   │
   │  - Login / Register                                                      │
   │  - Dashboard                                                             │
   │  - Claims                                                                │
   │                                                                          │
   │  Services                                                                │
   │  - Axios API client                                                      │
   │  - Access token + refresh token handling                                 │
   │  - WebSocket client for live events                                      │
   │                                                                          │
   └───────────────┬───────────────────────────────┬──────────────────────────┘
                   │ REST / JSON                   │ WebSocket
                   │                               │
                   ▼                               ▼
   ┌──────────────────────────────── Backend ─────────────────────────────────┐
   │                                                                          │
   │  FastAPI                                                                 │
   │  Path: backend                                                           │
   │                                                                          │
   │  Main modules                                                            │
   │  - main.py          : routes, websocket endpoints, background loop       │
   │  - auth.py          : register, login, refresh, JWT auth                 │
   │  - claims.py        : claim validation, payout logic, payment sim        │
   │  - behavioral.py    : trust score and behavioral scoring                 │
   │  - ml_engine.py     : fraud + income inference                           │
   │  - data_sources.py  : weather, AQI, demand, traffic aggregation          │
   │  - models.py        : SQLAlchemy models + DB setup                       │
   │                                                                          │
   └───────┬──────────────────────┬──────────────────────┬────────────────────┘
           │                      │                      │
           │                      │                      │
           ▼                      ▼                      ▼
   ┌───────────────┐      ┌───────────────┐      ┌────────────────────────┐
   │ SQLite DB     │      │ ML Models     │      │ External / Simulated   │
   │ shieldpay.db  │      │ fraud_model   │      │ Environment Sources    │
   │               │      │ income_model  │      │                        │
   │ Tables        │      │ scalers       │      │ - OpenWeather weather  │
   │ - users       │      │               │      │ - OpenWeather AQI      │
   │ - policies    │      │ Fallback      │      │ - simulated demand     │
   │ - claims      │      │ - heuristic   │      │ - simulated traffic    │
   │ - audit_logs  │      │   fraud       │      │                        │
   │               │      │ - heuristic   │      │ If external API fails, │
   │               │      │   income      │      │ backend falls back to  │
   │               │      │               │      │ simulation             │
   └───────────────┘      └───────────────┘      └────────────────────────┘
```

## Frontend To Backend Linkage

### REST flow

```text
Frontend page/action
    ↓
services/api.js
    ↓
FastAPI endpoint
    ↓
business logic modules
    ↓
database / ML / environment data
    ↓
JSON response back to frontend
```

Examples:
- Login page → `POST /auth/login`
- Register page → `POST /auth/register`
- Dashboard page → `GET /dashboard/data`
- Claim page → `POST /claims/trigger`

### Live websocket flow

```text
Frontend App
    ↓
ws://localhost:8000/ws/{user_id}
    ↓
backend/main.py websocket handler
    ↓
environment updates + claim progress events
    ↓
Claim page / dashboard updates in real time
```

### Auth linkage

```text
Login/Register
    ↓
Backend returns:
    - access_token
    - refresh_token
    - user metadata
    ↓
Frontend stores tokens in localStorage
    ↓
Axios sends access token on each request
    ↓
If access token expires:
    frontend calls /auth/refresh
    ↓
new access token is stored and request is retried
```

## Claim Processing Diagram

```text
User triggers claim from frontend
          ↓
POST /claims/trigger
          ↓
Policy validation
          ↓
Cooldown / weekly / monthly limit checks
          ↓
Environment fetch
          ↓
Income prediction
          ↓
Fraud scoring
          ↓
Behavioral trust update
          ↓
Payout calculation
          ↓
Payment simulation if approved
          ↓
Claim + audit log persisted in DB
          ↓
WebSocket events pushed to frontend
```

## What The App Does

ShieldPay is built around parametric insurance logic:
- A worker registers with city, vehicle type, and declared weekly income.
- The platform computes a policy automatically.
- Environmental signals are fetched from OpenWeather when configured, otherwise simulated.
- The backend estimates income disruption, scores fraud risk, computes behavioral trust, and decides whether to approve or block claims.
- Approved claims produce a simulated payment payload and update wallet / payout history.
- The frontend shows live dashboard data and a websocket-driven claim pipeline.

## Main Features

- User registration and login
- JWT access + refresh token flow
- Auto policy provisioning at registration
- Live dashboard data from `/dashboard/data`
- Real-time worker websocket feed at `/ws/{user_id}`
- Claim triggering from the frontend
- Fraud scoring
- Income prediction
- Behavioral trust scoring
- Audit logging
- OpenWeather integration with fallback to simulation

## Current Active Flows

### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

Frontend stores:
- `access_token`
- `refresh_token`
- `user`

When the access token expires, the frontend automatically refreshes it and retries the failed request.

### Dashboard
The dashboard uses:
- `GET /dashboard/data`
- worker websocket updates from `ws://localhost:8000/ws/{user_id}`

Dashboard data includes:
- user profile
- policy summary
- environment summary
- behavioral analysis
- income chart
- recent claims

### Claims
The claim page uses:
- `POST /claims/trigger`

Claims can be:
- `APPROVED`
- `PAYMENT_REVIEW`
- `BLOCKED`

Business-rule rejections such as cooldowns or policy limits return `422` with a readable reason.

Examples:
- cooldown active
- weekly claim limit reached
- monthly claim limit reached
- policy inactive

### Environment
The backend fetches:
- current weather
- AQI
- simulated demand
- simulated traffic

If OpenWeather is unavailable or the API key is invalid, the app falls back to simulated data automatically.

## Backend Modules

### `backend/main.py`
Main FastAPI app:
- route registration
- CORS
- websocket endpoints
- auto-trigger background task
- dashboard serialization

### `backend/auth.py`
Authentication logic:
- password hashing
- JWT creation and decoding
- login / registration helpers
- current-user dependency

### `backend/models.py`
Database models and schemas:
- `User`
- `Policy`
- `Claim`
- `AuditLog`

### `backend/claims.py`
Claim engine:
- cooldown checks
- policy limit checks
- trigger normalization
- environment score
- income-drop calculation
- fraud analysis
- trust update
- payout calculation
- payment simulation

### `backend/ml_engine.py`
ML and heuristic scoring:
- fraud feature extraction
- income feature extraction
- model loading
- rule-based fallback
- auto-trigger scoring

### `backend/behavioral.py`
Behavioral trust engine:
- login frequency analysis
- claim timing analysis
- session consistency
- income consistency
- claim velocity

### `backend/data_sources.py`
Environmental data:
- OpenWeather weather lookup
- OpenWeather AQI lookup
- simulated demand
- simulated traffic
- combined environment payload

## Frontend Structure

Active app lives in:
- `frontend/frontend/src`

Important files:
- `App.jsx`
  App shell, routing, websocket hookup
- `services/api.js`
  Axios client, token injection, refresh handling
- `pages/Dashboard.jsx`
  Live dashboard
- `pages/ClaimPage.jsx`
  Claim trigger UI and websocket event timeline
- `pages/LoginPage.jsx`
  Login
- `pages/RegisterPage.jsx`
  Registration
- `components/layout/*`
  Header and sidebar
- `components/ui/*`
  Shared cards, badges, live conditions, trust gauge

## Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- npm

### Backend Setup
From repo root:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Set auth secrets in the same terminal:

```powershell
$env:JWT_SECRET_KEY="shieldpay-dev-access-secret"
$env:JWT_REFRESH_SECRET_KEY="shieldpay-dev-refresh-secret"
```

Optional OpenWeather key:

```powershell
$env:OPENWEATHER_API_KEY="YOUR_KEY"
```

Start backend:

```powershell
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Backend URLs:
- `http://localhost:8000/health`
- `http://localhost:8000/docs`

### Frontend Setup
In a second terminal:

```powershell
cd frontend\frontend
npm install
npm run dev
```

Frontend URL:
- `http://localhost:5173`

## First Run

1. Start backend
2. Start frontend
3. Open `http://localhost:5173`
4. Register a new user
5. Log in
6. Open dashboard
7. Trigger a claim from the claim page

## API Summary

### Public
- `GET /health`
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`

### Authenticated
- `GET /users/me`
- `GET /policies/me`
- `GET /environment`
- `POST /claims/trigger`
- `GET /claims/history`
- `GET /dashboard/data`
- `POST /ml/reload`
- `GET /audit/logs`

### WebSockets
- `GET /ws/{user_id}`
- `GET /ws/dashboard`

## Claim Logic Summary

High level claim flow:

1. Validate policy and cooldown
2. Fetch environment
3. Normalize trigger type
4. Predict income disruption
5. Score fraud risk
6. Compute behavioral trust update
7. Compute payout
8. Simulate payment if approved
9. Persist claim, audit log, trust history, payout history
10. Stream progress to frontend via websocket

Business rules currently include:
- weekly limit
- monthly limit
- cooldown
- fraud threshold
- minimum effective disruption requirements

## ML Behavior

The backend supports trained models if available:
- `backend/ml/models/fraud_model.pkl`
- `backend/ml/models/income_model.pkl`
- `backend/ml/models/scalers.pkl`

If they are missing or fail to load:
- fraud uses heuristic scoring
- income prediction uses heuristic regression

This means the app still works without training.

## Real Weather vs Simulated Data

If `OPENWEATHER_API_KEY` is valid:
- weather and AQI can come from OpenWeather

If not:
- backend logs warnings
- app falls back to simulated values
- dashboard and claims still function

Important:
- OpenWeather keys may fail until the account email is verified
- newly created keys may take time to activate
- if direct API calls to OpenWeather return `401`, the problem is external to this repo

## Common Problems

### `ModuleNotFoundError` when starting Uvicorn
Use:

```powershell
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Run it from the repo root, not from inside `backend/`.

### WebSocket `404` or `Unsupported upgrade request`
Install websocket support:

```powershell
pip install -r requirements.txt
```

`requirements.txt` includes `websockets`.

### `401 Unauthorized` after some time
The access token expired. The frontend now refreshes it automatically, but older local sessions may still be missing `refresh_token`.

Fix:
- log out
- log in again

### `422 Unprocessable Content` on registration
Check:
- `vehicle_type` is one of `bike`, `scooter`, `cycle`, `car`
- `declared_weekly_income` is between `500` and `100000`
- password has letters and numbers and is at least 8 characters

### `422` on claim trigger
This usually means a valid business rejection, not a server crash.

Examples:
- weekly claim limit reached
- monthly claim limit reached
- claim cooldown active

### Dashboard shows `Loading / City pending / 0 trust score`
Usually caused by:
- expired token from an older session
- failed login state in local storage

Fix:
- logout
- login again

## Development Notes

- Active frontend is `frontend/frontend`, not `frontend_backup`
- SQLite file is `backend/shieldpay.db`
- Backend writes logs to `shieldpay.log`
- The current frontend build passes
- Backend Python modules compile cleanly

## Known Limitations

- Admin page still uses mostly mock analytics
- No production-grade background queue
- No persistent distributed websocket layer
- Weather/AQI integration depends on external key validity
- Claim decisions are still tuned for demo behavior rather than actuarial realism
- Frontend bundle is larger than ideal and Vite warns about chunk size

## Recommended Next Improvements

- Add structured rejected-claim result cards for `422` claim rejections
- Reduce noisy backend logging for expired JWTs and environment polling
- Add admin APIs to replace mock admin data
- Add database migrations
- Add test coverage for auth refresh and claims
- Add chunk splitting on frontend build

## License

No license file is currently defined in this repo.

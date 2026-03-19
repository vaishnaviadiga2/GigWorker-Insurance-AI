# GigWorker-Insurance-AI


## Executive Summary  
India’s gig delivery workforce is growing rapidly but faces severe income instability. Currently ~7.7 million Indians work in gig/platform roles (2020–21), projected to reach ~23.5 million by 2029–30. A large share of these are delivery partners (food, grocery, parcels) in q-commerce (10–30 min delivery) and related sectors. Despite rising demand (q-commerce has surged ~24× from 2022 to 2025), workers have irregular, volatile pay. Full-time delivery riders in metros gross ~₹20–30k/month (net ~₹21k after costs), but most work only part-time (average ~38 days/year) and see large swings in orders. Causes include demand variability, weather (monsoons, heat), strikeouts, and technology glitches. Platforms offer incentives that reward long hours but vanish on slow days. Workers bear 100% of fuel, maintenance and health costs (fuel ~20% of earnings). Traditional insurance covers accidents or health, not income loss, and is often unaffordable or unavailable to this segment.  

This report examines income instability among q-commerce delivery partners, supported by recent industry and government data. We profile two representative worker personas and quantify their earnings patterns and expenses. We identify key pain points (e.g. income dips in rain, platform downtime, expense shocks) with real examples. We then analyze gaps in existing insurance (coverage holes, claim delays, pricing misalignment). Finally, we describe an AI-driven parametric insurance solution for income protection: parametric triggers (weather, demand indices), data inputs (weather API, platform logs), payout mechanics (automatic, real-time disbursement), and fraud controls. A mermaid chart illustrates the trigger-to-payout workflow. We compare traditional vs parametric models in a summary table. This solution, designed with weekly premiums and objective triggers, can cover income losses (not health or vehicles) in a frictionless way – addressing an urgent need for India’s rapidly expanding gig delivery sector.  

---

## Income Instability in Q-Commerce Delivery  

Q-commerce delivery partners work on-demand, so income depends on external factors. Studies note that external “shocks” (weather, strikes, platform issues) can reduce working hours by 20–30%, causing equivalent wage loss. Workers often cope by logging extra hours, but even then daily pay can be low. For example, one Blinkit rider in Delhi rode 16 hours/day to deliver 30–35 orders and earned just ₹1,000–1,200/day (~₹60–70 per order). In monsoon floods, he lost additional money on bike repairs and rain gear (∼₹300–400 fuel per day). Over the past 5 years, per-order rates have roughly halved (from ₹60–65 to ₹30–35), meaning even long days leave partners at or below minimum-wage levels without overtime. Seasonal or event-driven demand swings also cause volatility: peak hours (evening meals, festivals) bring surge payments, but off-hours see sharp income drops. Typical workers have no guaranteed hours or benefits; when a ride/delivery app goes offline or order volume collapses, earnings drop to zero. In short, q-commerce delivery work offers flexible hours but erratic weekly pay, stressing workers’ finances.  

---

## Market Overview: Gig Workers in India  

### Workforce Size & Growth  
Estimates vary, but India’s gig/platform workforce was ~7.7 million in 2020–21. Industry projections see steep growth: by 2026 an additional ~11 million workers (total ~18.7M), and ~23.5M by 2030, representing ~4% of India’s total workforce. The gig economy is growing ~14–17% annually. This momentum is fueled by smartphone adoption and urbanization. Q-commerce (ultra-fast delivery) has been one of the fastest-growing segments: gross order value jumped from ~$300M in 2022 to ~$7.1B by 2025. Reports indicate over 20 million annual online shoppers in q-commerce and ~400,000 total employees in the sector (couriers + support staff).  

### Demographics  
Gig workers skew young and often male, though women (25–30%) participate in some roles. Many come from semi-urban or rural areas, using gig jobs as low-barrier employment. Average education ranges widely: from high school to college graduates. Incomes vary by region: a full-time rider in a metro can gross ₹20–30k/month, whereas part-timers or those in smaller cities often earn well under ₹15k. Platforms report blended earnings of ~₹102/hour for logged-in time (including idle), but most partners work only ~38 days/year. Worker profiles include students supplementing pocket money, sole earners supporting families, and semi-skilled migrants. Notably, 78% earn ≤₹2.5 lakh/year (~₹20k/month) and only ~3% exceed ₹5 lakh.  

### Urban Distribution  
Initially concentrated in major metros (Delhi-NCR, Mumbai, Bangalore, etc.), gig delivery is spreading to Tier-II/III cities. Faster internet and digital payments have enabled service areas to expand. Still, over 80% of high-volume q-commerce operations are in large cities, where consumer demand and dense populations justify the dark-store networks.  

### Market Share  
Quick-commerce market share (Q1 2025): Zomato’s Blinkit ~46%, Zepto ~29%, Swiggy Instamart ~26%.  

### Regulatory Context  
Until recently, gig workers had no formal legal status, classified as independent contractors. The new Code on Social Security, 2020 (effective late 2025) explicitly recognizes gig and platform workers, mandating social security contributions and benefits. Aggregators must contribute 1–2% of turnover into a welfare fund. Government schemes provide basic health/accident cover (₹5L sum insured, low awareness), but uptake is limited. Legal recognition is new, so implementation is ongoing. Workers can register on e-Shram for portable benefits, but many lack awareness. Overall, while the policy environment is improving, a robust income-protection mechanism for gig workers is still nascent.  

---

## User Personas  

 Rahul (Mumbai, age 28)   
Rahul is a full-time q-commerce delivery partner (motorbike courier) affiliated
with a leading app. He logs in ~10–12 hours on most weekdays and 8–10 on weekends, aiming for the peak-
hour incentives. Income: On average he delivers ~25 orders/day, earning gross ~₹2,600/day (≈₹26,000/
month) . After 20% costs (fuel, maintenance), net ~₹21,000. However, in a slow week (monsoon showers
or an app glitch), orders may drop 30%, slashing his pay by ~₹6–8k that week. Expenses: Rent ₹8,000 (shared
home), food ₹4,000, bike fuel ~₹4,500, spare parts ₹1,500, mobile/data ₹500. Family (wife + toddler) needs
~₹10,000. Goals: Save ₹5k/month, remit ₹3k to parents, ideally buy a small apartment. He has a smartphone
and regularly uses WhatsApp and the delivery app. Rahul is concerned about health costs (injury risk),
major bike repairs, and wants more income stability.
---

 Anita (Bengaluru, age 22)  
Anita is a part-time delivery partner and college student. She logs 4–6 hours
on 3–4 weekdays, mostly during lunch/early evening, and works ~8 hours on Saturdays. Income: She
completes ~12 orders/day when busy, earning ~₹600/day. Monthly income ~₹7,000 (fluctuates ±30% by
month). After a rain day (when she can’t ride safely), she might earn only ₹400 or skip work. Tips add a small
amount (₹100–200/week). Expenses: Lives with parents (no rent); spends ₹2,000 on studies and ₹1,000 on
personal. Bike fuel ~₹1,200, phone bill ₹300. Goals: Pay her own tuition fees (₹4k/month) and save for a
laptop. She expects no formal benefits and relies on freelancing/study support for income. Anita is tech-
savvy (regularly checks weather app) and values flexible scheduling, but fears losing a study stipend if she’s
injured.
---

## Key Pain Points  

Gig delivery workers face many financial and operational risks:

**1.Income Drops:** On “slow” days (off-peak or inclement weather), orders plunge. A Blinkit rider reports
only ₹1,000–1,200 earned after a 16h day . Platforms push incentives for high-volume hours, so
stopping short of a target causes earnings to drop sharply . Workers absorb full downtime: if an
app goes down or zones shut (curfew/strikes), they earn literally ₹0 that period. 

**2.Weather & Environment**: Heavy rain or floods make riding dangerous or impossible . Riders
must buy expensive rain gear (which they often can’t afford) . Flooded roads hide potholes,
causing bike damage or injuries . One cyclist said rain increased his expenses and left him unable
to work, costing him an entire day’s pay . Extreme heat is also a hazard (heat stress studies show
outdoor workers must choose between health and income ). 

**3.Demand Fluctuations**: Festivals, exams, and local events cause unpredictable surges or lulls. For
example, New Year’s Eve strikes led platforms to double hourly rates (₹120–150 per order) , but
also left many workers unpaid after they walked out. The relentless 10‑minute delivery model
inherently creates pressure to drive fast; unions cite unsafe speed targets . Seasonal effects
(summer, monsoon) typically reduce grocery/food orders. 

**4.Platform & Tech Risks:** System outages, GPS glitches, or app bugs can abruptly drop a driver’s
available orders. When algorithms punish selective order rejections, workers can get “de-prioritized”
by the app and starve for jobs . 

**5.Rising Costs**: Fuel and vehicle upkeep eat ~20% of a rider’s gross earnings . Fuel prices have rise
steadily, squeezing net income. Dashboards do not reimburse routine costs (tire/tube, oil changes,
smartphone data). Even small device failures (phone screen cracks) can halt work. 

**6.Health & Safety:** Delivery riders face daily accident risk on India’s roads (about one road fatality
every 3 minutes nationally ). There is no paid sick leave; an injury means lost days and medical
bills. Pandemic lockdowns also eliminated income for weeks. Workers report no safety net for “force
majeure” events. 

Quantitatively, in heavy rains or heat, workers lose a day’s wages and pay extra. Combined with already
low per-order rates (as low as ₹30–35 ), such shocks can mean thousands of rupees lost in a week. These
factors compound: for instance, the Quint notes many workers now earn “no overtime” for 12h shifts,
effectively violating minimum wages . In sum, income volatility of 20–50% from week to week is
common.
---

## Gaps in Existing Insurance  
Traditional insurance products largely do not address gig income instability. Key shortcomings include: 

**•Coverage Gaps:** Most policies cover accidents, health, or life—but not income. Workers lack a way to
insure their variable earnings. Government schemes (e.g. PMJJBY/PMSBY accident life plans) have
low limits (e.g. ₹2–5 lakh) and ignore lost wages. Social security code mandates are new and
limited to statutory benefits (PF, ESIC) , not income continuity. No insurer currently offers
indemnity for missed days of work in India’s gig sector. 

**•Claim Friction:** Traditional income-replacement (e.g. disability insurance) would require verifying
loss and navigating claims bureaucracy. Gig workers, often paid per task with no formal payslips,
would struggle to prove lost income or job interruption. Slow claims processing (weeks/months)
defeats the purpose of short-term income protection. Parametric designs eliminate this friction by
triggering payout automatically without loss proof . 

**•Moral Hazard and Pricing**: Insurers shy away from covering effort-based loss due to moral hazard
(workers could game reporting). Traditional underwriting relies on opaque data about behavior,
making premiums high. By contrast, parametric schemes rely on objective indices (weather, demand
data), reducing moral hazard .

**•Timing & Liquidity:** Even if covered, a standard claim payout can take 30+ days. But gig workers
need immediate funds to pay daily expenses. Parametric payouts (if automated) can be disbursed
within hours of a trigger , preventing cascading losses (e.g. not paying rent). 

**•Affordability:** Gig incomes are low/irregular. Large annual premiums or upfront costs are
prohibitive. Existing insurance often targets salaried classes. Experts advocate micro-premiums or
one-time small payments aligned to weekly earnings . Monthly payment models fail when
workers take unpaid breaks ; insurance design must match gig work patterns (e.g. weekly). 

**•Regulatory Hurdles:** Parametric policies (index-based payouts) are still novel in India. Insurers and
regulators must ensure clarity (defining triggers, geographies). While no specific law forbids
parametric products, there is little precedent. Traditional policies also often exclude “force majeure”
income loss. In short, no existing policy is specifically built to stabilize gig incomes.
---
# AI powered parametric insurance platform for gig workers
## → SOLUTION AND FEATURES
  ## Solution Overview – ShieldPay

ShieldPay is an AI-powered parametric income protection system for gig delivery workers in quick-commerce platforms. Workers often face sudden income loss due to factors like weather, traffic, demand fluctuations, or platform outages—risks not covered by traditional insurance.

ShieldPay predicts expected earnings using machine learning and automatically triggers payouts when actual income drops significantly due to such disruptions.

It operates through a B2B2C model (ShieldPay → Platform → Worker), where the system is embedded into gig platforms. For the hackathon, platform integration is simulated using a mock API that generates worker activity data.
  ## B2B2C Integration Model

ShieldPay follows a **B2B2C (Business-to-Business-to-Consumer)** model:

ShieldPay → Platform → Worker

ShieldPay provides the AI-driven insurance system, which is integrated into gig platforms to deliver income protection directly to workers. This embedded approach ensures reliable data access, improves fraud detection, and enables seamless, automated claims without requiring separate insurance purchase.

For the hackathon, this integration is simulated using a mock platform API that generates worker activity data such as login time, deliveries, and active hours.

## System Workflow

ShieldPay processes delivery platform data to detect income disruptions and trigger automated insurance payouts.

Platform Data  
↓  
Income Prediction  
↓  
Disruption Detection  
↓  
Parametric Trigger  
↓  
Claim Generation  
↓  
Payout

### Step-by-Step Flow

**1. Data Collection**  
Worker activity data (login time, deliveries, active hours) is collected from the platform. For the prototype, this is simulated using a mock API.

**2. Income Prediction**  
An ML model predicts the worker’s expected earnings based on activity patterns.

**3. Disruption Detection**  
Actual earnings are compared with predicted earnings to detect significant income drops.

**4. Trigger Activation**  
If the drop exceeds the defined threshold, a parametric trigger is activated.

**5. Claim Generation**  
The system automatically creates an insurance claim.

**6. Payout**  
The payout is calculated and transferred to the worker.

 ## Claim Rule

ShieldPay follows a simple parametric rule to determine when an insurance payout should be triggered.

A claim is activated when a worker’s **actual earnings drop by more than 30% compared to the predicted income** for that period.

Example:
Predicted Income: ₹1200  
Actual Income: ₹800  

Income Drop = 33% → Claim Triggered

This threshold helps ensure that payouts occur only during meaningful disruptions, while preventing small income fluctuations from generating unnecessary claims.

 ## Key Features

**AI-Based Income Prediction**  
Machine learning models estimate a worker’s expected earnings based on platform activity, delivery patterns, and demand trends.

**Dynamic Premium Model**  
Insurance premiums can adjust based on worker activity, platform demand levels, and historical claim behaviour.

**Automated Claim Processing**  
Parametric triggers automatically generate claims when income drops beyond the defined threshold, removing the need for manual claim submission.

**Fraud Prevention Mechanism**  
The system monitors worker activity signals such as login time, orders accepted, and delivery attempts to detect suspicious behaviour and reduce fraudulent claims.

## Innovation

ShieldPay goes beyond traditional and existing gig-worker insurance models by introducing a **data-driven, real-time income protection system**.

Unlike current solutions that rely on manual claims or fixed event-based payouts, ShieldPay uses **personalized income prediction** for each worker and detects disruptions based on actual performance gaps, not just external events.

The system also introduces a **Trust Score mechanism**, which evaluates worker behavior (activity consistency, claim history, and fraud patterns) to control risk and enable faster, more reliable payouts.

Additionally, ShieldPay combines **activity verification (login time, orders, active hours)** with **claim limits and parametric thresholds**, reducing fraud and preventing misuse — a key limitation in existing insurance models.

Finally, the solution demonstrates a **practical embedded insurance model using simulated platform APIs**, showing how real-time integration with gig platforms can enable fully automated, scalable income protection.

---
##  System Architecture

### 1. Data Ingestion & Integration Layer

- **Mock Platform API Gateway:**  
  Simulates B2B2C integration by ingesting worker activity data (login/logout, orders, active hours, delivery attempts)

- **External Telemetry Ingestor:**  
  Polls Weather, Traffic, and Social Disruption APIs to correlate external events with worker performance

- **High-Throughput Processing:**  
  Uses SIMD-accelerated string processing to parse and filter large-scale platform logs efficiently




### 2. Core AI & Logic Layer 

- **ML Income Prediction Engine:**  
  Estimates *Expected Earnings* using historical activity and demand patterns

- **Disruption Detection Module:**  
  Applies the **30% Drop Rule** (Actual vs Predicted Earnings) to automatically flag claims

- **Formal Logic Verifier:**  
  Uses Z3Py to verify pricing and payout logic, ensuring mathematical consistency and financial stability




### 3. Parametric Automation Layer 

- **Zero-Touch Claim Orchestrator:**  
  Automatically triggers claims when parametric conditions are met

- **Payout Calculator:**  
  Applies rule → `Payout = 70% of income loss`

- **Weekly Billing Service:**  
  Dynamically adjusts premiums based on worker behavior and claim history




### 4. Security & Trust Layer 

- **Trust Score System:**  
  Evaluates worker reliability to determine payout speed (instant vs delayed)

- **Intelligent Fraud Detection:**  
  Detects GPS spoofing, validates activity, and prevents duplicate claims

- **Capability-Based Security:**  
  Ensures only valid parametric triggers can authorize payouts




### 5. Data & Financial Ledger 

- **Immutable Transaction Ledger:**  
  Uses TigerBeetle for high-integrity financial records

- **Optimized Storage Engine:**  
  Uses io_uring for high-performance database operations during peak load

- **Edge Dashboard:**  
  Uses WASM + SQLite for fast local rendering of earnings and trust metrics

  ---
  ##  Mock Delivery Platform API 

| Data Field                 | What It Simulates                     | Role in Workflow                      | ML / System Usage                                 | Tech Implementation                           | Outcome                       |
|----------------------------|-------------------------------------|-------------------------------------|--------------------------------------------------|-----------------------------------------------|-------------------------------|
| Login / Logout Time        | Worker shift start & end time       | Data Collection (availability window) | Evaluates work consistency for Trust Score       | REST API + high-throughput logging (io_uring) | Reliable activity baseline    |
| Deliveries Completed       | Number of completed deliveries      | Used in comparison stage            | Represents **Actual Earnings** (e.g., ₹750)      | Logged efficiently for real-time processing   | Ground truth for payout       |
| Active Hours               | Total time worker is active         | Compared with earnings              | Detects efficiency gaps (time vs income)         | Processed via ML pipeline                     | Identifies underperformance   |
| Orders Accepted            | Number of accepted orders           | Helps detect disruptions            | High accepted + low completed → disruption signal| Activity validation + fraud checks            | Detects platform issues       |
| Predicted Income (Derived) | ML-generated expected earnings      | Comparison stage                    | Forecasts expected income (e.g., ₹1200)          | ML model integration                          | Benchmark for claims          |
| Income Gap Analysis        | Difference between actual & predicted| Trigger evaluation                  | If drop > 30% → disruption detected              | Z3Py logic verification                       | Ensures correct trigger logic |
| Disruption Trigger         | Automatic event detection           | Final workflow step                 | Activates parametric insurance                   | Verified + low-latency system                 | Enables zero-touch claim      |
| Fraud Signals              | GPS + activity correlation          | Continuous validation               | Detects spoofing / duplicate claims              | Activity validation engine                    | Secure & trustworthy payouts  |

---

##  ML Model

| Component                   | Function                               | Inputs / Data Used                                      | ML / System Logic                                                                 | Tech Implementation                                   | Outcome / Impact                          |
|-----------------------------|----------------------------------------|---------------------------------------------------------|-----------------------------------------------------------------------------------|------------------------------------------------------|-------------------------------------------|
| Income Prediction Model     | Forecasts expected earnings            | Historical activity, delivery patterns, demand trends, location data | Uses time-series modeling (Transformers / Linear & Affine transformations)        | ML models + data pipelines                            | Establishes baseline income ("should earn")|
| Disruption Detection Model  | Detects income drops & triggers claims | Actual earnings (API) vs predicted income + external data | 30% drop rule → triggers claim; correlates with weather, curfews, disruptions     | Z3Py verification + real-time comparison engine        | Enables zero-touch automated claims        |
| Income Gap Analysis         | Measures earnings difference           | Predicted vs actual earnings                            | Calculates loss and validates trigger conditions                                  | Verified logic system                                 | Accurate payout calculation                |
| Parametric Trigger System   | Executes payout logic                  | Income gap + disruption signals                         | If drop >30% → payout = 70% of loss                                               | Low-latency backend + verified logic                  | Instant claim activation                   |
| Fraud Detection Model       | Identifies malicious activity          | Activity logs (login, orders, deliveries), GPS data     | Anomaly detection for spoofing, fake claims, duplicates                           | SIMD (AVX-512) log processing + validation engine     | Prevents fraud & financial loss            |
       

### 1. Income Prediction Model: The Digital Baseline

This model creates a personalized **Expected Earnings** profile for every worker. Instead of relying on simple averages, it uses advanced forecasting techniques to determine what a worker should have earned.

- **Transformer-Based Forecasting:**  
  We use a minimal transformer architecture to analyze time-series delivery data. This allows the model to learn patterns from a worker’s long-term history and accurately predict earnings for specific shifts.

- **Linear & Affine Adjustments:**  
  Mathematical linear and affine transformations are applied to refine predictions. This enables the system to adjust expectations based on external factors such as high-traffic zones or peak demand hours.

- **Mojo for Scalable Inference:**  
  The system leverages Mojo to optimize model inference performance. This enables efficient execution of large-scale predictions across thousands of workers while maintaining low latency and cost efficiency.
  

### 2. Disruption Detection Model: The Mathematical Trigger

This model acts as the **parametric trigger** that executes ShieldPay’s core rule: if income drops by more than 30% due to external factors, a payout is automatically initiated.

- **Performance-Gap Analysis:**  
  Instead of relying only on external events, the model evaluates the actual performance gap by comparing predicted earnings with real earnings from platform data.

- **Z3Py Formal Verification:**  
  The 30% trigger logic is mathematically verified to ensure correctness. This guarantees that payouts are triggered only under valid conditions and prevents incorrect or unsafe states.

- **Error-Free Design:**  
  The system follows the principle of making invalid states unrepresentable, ensuring that scenarios such as negative payouts or duplicate claims cannot occur.


### 3. Intelligent Fraud Detection: Hardware-Level Security

This model functions as a high-speed security layer to detect and prevent fraudulent activity such as GPS spoofing and fake claims.

- **SIMD (Hardware-Level Scanning):**  
  Advanced parallel processing techniques are used to scan large volumes of activity logs (login times, order attempts) simultaneously, enabling real-time detection of suspicious patterns.

- **AI-Resistant Evaluations:**  
  The fraud detection logic is designed to prevent manipulation by automated bots or spoofing scripts, ensuring system integrity.

- **Activity Validation:**  
  The model cross-references orders accepted with deliveries completed and correlates them with external conditions. This ensures that disruptions are legitimate and not artificially generated.

---
##  Trust Score System

The Trust Score system serves as the intelligent risk-management backbone of the platform, designed to distinguish between genuine income disruptions and potential system misuse. It functions as a dynamic reputation engine that evaluates each delivery partner across three key dimensions.


### 1. Evaluation Dimensions

| Dimension            | Description                                                                 |
|----------------------|-----------------------------------------------------------------------------|
| Work Consistency     | Measures active hours and delivery attempts to ensure genuine participation |
| Claim History        | Tracks frequency and pattern of past claims to identify misuse              |
| Behavioral Anomalies | Detects suspicious patterns such as GPS spoofing or abnormal activity       |


### 2. Technical Foundation of Trust

To ensure high performance and system reliability, the Trust Score mechanism is built on strong technical principles:

- **Formal Logic Verification:**  
  The scoring algorithms are mathematically verified to ensure that transitions between trust tiers remain consistent and valid, preventing incorrect decisions or unfair penalties.

- **Hardware-Accelerated Anomaly Detection:**  
  The system processes large volumes of activity logs in real time using parallel processing techniques (such as SIMD/AVX-512), enabling fast detection of anomalies like GPS spoofing or unrealistic location changes.

- **Secure Capability-Based Profiling:**  
  The Trust Score can only be updated using verified, tamper-proof signals from the platform API, ensuring it cannot be manipulated by external entities.


### 3. Tiered Impact on Payouts

| Trust Level  | Processing Type     | Payout Behavior                                      |
|--------------|--------------------|------------------------------------------------------|
| High Trust   | Instant Processing | Full payout (70% of income loss), zero-touch claims |
| Medium Trust | Standard Processing| Additional automated verification steps              |
| Low Trust    | Restricted         | Delayed, reduced, or rejected payouts               |


### 4. Strategic Role & Sustainability

The Trust Score acts as a critical safeguard to maintain the platform's long-term financial sustainability. To prevent system misuse and ensure fairness, the following claim control mechanisms are enforced:

| Control Mechanism   | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| Parametric Threshold | Claim triggered only if income drop exceeds 30%                           |
| Frequency Cap        | Maximum of 3 claims per worker per month                                  |
| Continuous Validation| Real-time fraud detection validates every automated claim                |

By combining these controls with intelligent risk scoring, ShieldPay protects its capital while ensuring reliable support for genuine gig workers.

---

## Business Model (B2B2C – Embedded Insurance)

ShieldPay operates on a **B2B2C (Business-to-Business-to-Consumer)** model:

ShieldPay → Gig Platform → Delivery Worker

Instead of selling insurance directly to workers, ShieldPay integrates with **quick-commerce platforms** (e.g., Blinkit, Zepto).

### How It Works

- **ShieldPay** provides:
  - AI risk engine  
  - income prediction models  
  - parametric claim system  

- **Platforms**:
  - integrate ShieldPay via API  
  - share worker activity data  
  - embed insurance as a built-in feature  

- **Workers**:
  - receive automatic income protection  
  - no manual enrollment or claim filing required  

---

## Revenue Model

ShieldPay generates revenue through platform partnerships.

### 1. Platform Subscription
Platforms pay a **per-worker monthly fee**.

- Example: ₹50–₹100 per active worker  

### 2. Risk-Based Premium Pool
A portion of platform payouts contributes to a shared **insurance pool**, dynamically managed using AI risk scoring.

### 3. Platform Benefits

- Reduced worker churn  
- Increased retention  
- Improved brand trust  
- Competitive differentiation  

---

## Payout Mechanism (Example Scenario)

**Worker:** Ravi (Delivery Partner)  
**Predicted Income:** ₹1200  
**Actual Income:** ₹750  

Income Drop = 37.5% → Claim Eligible  

### Payout Calculation

Income Loss = ₹450  
Payout = 70% of loss = ₹315  

The payout is **automatically credited** to the worker.

---

## Trust Score System

ShieldPay introduces a **Trust Score** to ensure fairness and prevent misuse.

### Factors

- Work consistency (active hours, delivery attempts)  
- Claim history  
- Behavioral anomalies  

### Impact 
| Trust Score | Effect                                                          |
|--------------------|---------------------------------------------------------------|
| High             | Fast approval, full payout                         |
| Medium          | Normal processing                                    |
| Low              | Delayed/reduced payout or rejection     |

---

## Claim Control Mechanisms

To maintain system sustainability:

- Claim triggered only if **income drop > 30%**  
- Maximum **3 claims per month per worker**  
- Continuous fraud detection using activity data  

---

## Impact

### Economic Impact

- Provides income stability  
- Reduces financial uncertainty  
- Supports daily wage earners  

### Social Impact

- Promotes financial inclusion  
- Protects vulnerable gig workers  
- Improves quality of life  

---

## Scalability

ShieldPay is designed to scale across the gig economy.

- **Phase 1:** Quick-commerce delivery  
- **Phase 2:** Ride-sharing platforms  
- **Phase 3:** Freelancers and independent workers  

---

## Demo Concept

### Worker Dashboard
- Daily earnings  
- Predicted income  
- Income drop alerts  

### Claim Interface
- Claim trigger notification  
- Payout details  
- Trust score display  

### Admin / Platform Dashboard
- Worker analytics  
- Risk scoring  
- Claim monitoring  

---

## Final Statement

ShieldPay is not just insurance — it is a real-time financial safety layer for the gig economy, powered by AI and embedded directly into the platforms workers rely on.

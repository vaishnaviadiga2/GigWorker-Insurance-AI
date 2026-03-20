## Live Demo
https://vaishnaviadiga2.github.io/GigWorker-Insurance-AI/
# AI powered parametric insurance platform for gig workers


## Executive Summary  

India’s gig delivery workforce is rapidly growing, but faces significant income instability due to external disruptions such as weather, demand fluctuations, and platform outages. Despite strong market growth, most delivery workers experience irregular earnings and lack any form of income protection.

ShieldPay addresses this gap through an AI-powered parametric insurance system that predicts expected earnings and automatically triggers payouts when income drops due to such disruptions. By leveraging platform data, external signals, and automated claim processing, the solution ensures fast, reliable, and frictionless income protection.

**Designed with a weekly premium model aligned to gig work patterns, ShieldPay provides a scalable and practical approach to safeguarding the livelihoods of delivery workers in India's evolving gig economy.**

---

## Income Instability in Q-Commerce Delivery  

Q-commerce delivery workers rely on on-demand jobs, making their income highly dependent on external factors such as weather, demand fluctuations, and platform outages. These disruptions can reduce earnings by 20–30% or more, with no guaranteed compensation.

Despite long working hours, declining per-order rates and rising costs (fuel, maintenance) further reduce net income. During low-demand periods or disruptions, workers often earn significantly less—or nothing at all.
**As a result, gig delivery work offers flexibility but suffers from highly unpredictable and unstable earnings, creating financial stress for workers.**

---

## Market Overview: Gig Workers in India  
________________________________________
**Workforce Size & Growth**

India’s gig workforce is rapidly growing from ~7.7 million workers to an expected ~23.5 million by 2030, driven by urbanization and digital platforms. Q-commerce is one of the fastest-growing segments, with rapid expansion in demand and operations.
This growth is further accelerated by increasing consumer preference for instant delivery services.

**Demographics**

Most gig workers are young and rely heavily on daily earnings, typically earning ₹5,000–₹30,000 per month. Many work part-time or irregular hours, leading to unstable income with limited financial security.
A large share of workers depend on gig work as their primary or supplementary source of income.

**Urban Distribution**

Gig delivery is concentrated in major cities but is expanding to Tier-II and Tier-III regions due to increasing internet access and digital adoption.
Improved logistics infrastructure is enabling faster penetration into smaller cities.

**Market Share**

The q-commerce market is dominated by platforms like Blinkit, Zepto, and Swiggy Instamart, with a strong presence in urban delivery ecosystems.
Competition among these platforms is driving faster delivery timelines and higher order volumes.

**Regulatory Context**

Recent regulations recognize gig workers and introduce basic social security benefits. However, income protection for daily earnings remains largely unaddressed.
Policy frameworks are still evolving and have yet to fully address income volatility risks.

---

## User Personas  

**Rahul (Mumbai, age 28)**  

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

 **Anita (Bengaluru, age 22)**
 
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

Gig delivery workers face multiple financial and operational risks:

1. **Income Drops**  
Earnings fluctuate heavily due to low demand, incentives, or platform downtime. Workers may earn significantly less—or even ₹0—during disruptions.

2. **Weather & Environment**  
Rain, floods, and extreme heat directly reduce working hours, increase expenses, and create safety risks.

3. **Demand Fluctuations**  
Unpredictable order volumes during off-peak times or seasons lead to inconsistent income despite long working hours.

4. **Platform & Tech Risks**  
App outages, GPS issues, and algorithm changes can suddenly reduce order allocation, impacting earnings.

5. **Rising Costs**  
Fuel and maintenance costs consume a significant portion of income, reducing net earnings.

6. **Health & Safety Risks**  
Accidents or illness result in immediate income loss, with no paid leave or financial protection.

Overall, gig workers experience high income volatility (20-50% fluctuations) with no reliable safety net.

---

## Gaps in Existing Insurance  

Traditional insurance does not effectively address income instability faced by gig workers. Key gaps include:

• **Coverage Gaps**  
Most policies cover health or accidents, but not income loss. Workers have no protection for missed earnings.
This leaves daily wage earners particularly vulnerable to short-term disruptions.

• **Claim Friction**  
Claims require manual verification and documentation, which is difficult for gig workers with no formal income records. Processing is slow and inefficient.
Many workers lack the time or resources to complete complex claim procedures.

• **Moral Hazard & Pricing**  
Insurers avoid covering income loss due to risk of misuse, leading to high premiums and limited availability.
This results in conservative product design that excludes high-risk worker segments.

• **Timing & Liquidity**  
Traditional payouts take weeks, whereas gig workers need immediate financial support during disruptions.
Delays in payouts can directly impact their ability to meet daily expenses.

• **Affordability**  
Existing insurance models are not suited for irregular incomes. High or fixed premiums are not practical for gig workers.
Flexible, usage-based pricing models are largely unavailable.

• **Regulatory Limitations**  
Parametric insurance is still emerging, with limited adoption and unclear frameworks in India.
This slows innovation and large-scale deployment of new insurance models.

Overall, there is no scalable, real-time insurance solution designed specifically for gig income protection.

---


##  Solution and features
  ## Solution Overview – ShieldPay

ShieldPay is an AI-powered parametric income protection system for gig delivery workers in quick-commerce platforms. Workers often face sudden income loss due to factors like weather, traffic, demand fluctuations, or platform outages—risks not covered by traditional insurance.

ShieldPay predicts expected earnings using machine learning and automatically triggers payouts when actual income drops significantly due to such disruptions.

It operates through a B2B2C model (ShieldPay → Platform → Worker), where the system is embedded into gig platforms. For the hackathon, platform integration is simulated using a mock API that generates worker activity data.
 

## How It Is Built  

ShieldPay is built as a modular system with 4 key components:

### 1. Data Pipeline  
- Collect worker activity data via platform API  
- Store and process using high-performance backend  

### 2. ML Pipeline  
- Train income prediction model using historical data  
- Deploy model for real-time inference  

### 3. Decision Engine  
- Compare predicted vs actual income  
- Apply parametric rule (>30% drop)  
- Trigger claim automatically  

### 4. Payout System  
- Calculate payout (70% of loss)  
- Execute instant transfer via payment system  
Entire system runs in real-time with zero manual intervention


## How the AI Works  

ShieldPay uses a **time-series income prediction model** to estimate expected earnings.

### Inputs  
- Historical delivery data  
- Active hours  
- Orders completed  
- Location and demand trends  
- External factors (weather, traffic)  

### Process  
1. The model learns patterns from past earnings  
2. It predicts expected income for a given time window  
3. Actual income is collected from platform data  
4. A comparison engine calculates the income gap  

### Output  
- If income drop > 30% → trigger claim  
- Else → no action  

 Core Idea: **AI creates a personalized "expected income baseline" for every worker**

## Target Users  

ShieldPay is designed for **gig delivery workers in quick-commerce platforms**, including:

- Full-time riders (primary income earners)  
- Part-time workers (students, freelancers)  
- Workers in urban and semi-urban areas  

### Key Characteristics
- Income: ₹5,000 – ₹30,000/month  
- Highly dependent on daily earnings  
- No income protection or benefits  
- Vulnerable to external disruptions (weather, demand, platform issues)  

Core Problem: **Unpredictable income with no safety net**

  ## B2B2C Integration Model

ShieldPay follows a **B2B2C (Business-to-Business-to-Consumer)** model:

ShieldPay → Platform → Worker

ShieldPay provides the AI-driven insurance system, which is integrated into gig platforms to deliver income protection directly to workers. This embedded approach ensures reliable data access, improves fraud detection, and enables seamless, automated claims without requiring separate insurance purchase.

For the hackathon, this integration is simulated using a mock platform API that generates worker activity data such as login time, deliveries, and active hours.

## Onboarding Flow

Delivery workers can easily enroll through the platform using basic details such as location, working hours, and delivery activity.
The system automatically creates a risk profile and assigns a weekly premium based on predicted income patterns.
This ensures a seamless and frictionless onboarding experience.

## System Workflow

ShieldPay processes delivery platform data to detect income disruptions and trigger automated insurance payouts.

<img width="200" height="500" alt="image" src="https://github.com/user-attachments/assets/9f498f05-b36f-4a6c-a0d2-24d52352653c" />

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
Premiums are calculated weekly based on:
- worker activity level  
- historical income stability  
- claim history  

Higher-risk workers (frequent income fluctuations or past claims) pay slightly higher premiums, while consistent workers receive lower premiums.

Example:
A high-risk worker may pay ₹40/week, while a low-risk worker may pay ₹20/week.

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

## Adversarial Defense & Anti-Spoofing Strategy

ShieldPay prevents GPS spoofing by validating real worker activity, not just location.

The system differentiates genuine users from attackers using behavioral signals such as login activity, orders handled, active hours, and consistency with disruption conditions.

Multiple signals are combined (activity data, historical patterns, and external factors like weather) to detect mismatches that indicate fraud.

Flagged claims are not rejected instantly — they undergo additional validation, and high Trust Score workers are prioritized.

This ensures strong fraud prevention while maintaining fairness for genuine workers.

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
## Defined Tech Stack

### 1. Core Technology Stack

| Category        | Recommended Technology              | Rationale & Strategic Alignment                                                                 |
|----------------|------------------------------------|-------------------------------------------------------------------------------------------------|
| **Backend**    | Rust / Go                          | High-concurrency performance to handle real-time parametric triggers across thousands of workers |
|                | TigerBeetle                        | Immutable financial ledger ensuring 100% integrity for premiums and payouts                    |
|                | io_uring                           | Low-latency I/O handling for massive spikes in activity logs during disruptions                |
| **Machine Learning** | Python (Scikit-learn / PyTorch) | Industry standard for building income prediction and fraud detection models                    |
|                | Mojo                               | Efficient scaling of model inference for large user bases                                       |
|                | Z3Py                               | Formal verification of trigger logic and payout correctness                                     |
| **Frontend**   | React Native / Next.js             | Mobile app for workers and web dashboard for admin analytics                                    |
|                | WASM-based SQLite                  | Edge-side storage for fast local querying and dashboard performance                             |
| **Cloud**      | AWS / Azure                        | Scalable infrastructure to support real-time analytics and ML workloads                         |

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

##  Demo Preview

ShieldPay includes a functional prototype demonstrating the core workflow of AI-based income protection.

The demo simulates:
- Worker earnings dashboard  
- AI-predicted income vs actual income comparison  
- Automatic claim triggering  
- Payout calculation and display  

 This prototype showcases the **end-to-end parametric insurance flow in real-time** using simulated platform data.
 
 ----
 ### How to Use the Demo
Open the live link and simulate a worker scenario to observe income prediction, disruption detection, and automated payout flow.

---

##  Demo Walkthrough

The live demo presents a simplified version of the ShieldPay system with key features:

### Worker Dashboard
- Displays daily earnings and predicted income  
- Highlights income drops in real time  

### Claim Simulation
- Automatically triggers when income drops >30%  
- Shows payout calculation and status  

### System Insight
- Demonstrates how AI prediction drives decisions  
- Visualizes the parametric trigger mechanism  

The demo validates the **core idea: automated, zero-touch income protection powered by AI.**

---
## Final Statement

ShieldPay is not just insurance — it is a real-time financial safety layer for the gig economy, powered by AI and embedded directly into the platforms workers rely on.

---

##  Why This Matters

ShieldPay transforms income protection from a slow, manual process into a **real-time, intelligent safety net** — making gig work more sustainable, reliable, and secure at scale.

---

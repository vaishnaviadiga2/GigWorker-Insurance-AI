# GigWorker-Insurance-AI
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

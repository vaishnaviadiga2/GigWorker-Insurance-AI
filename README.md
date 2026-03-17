# GigWorker-Insurance-AI
# AI powered parametric insurance platform for gig workers
## → SOLUTION AND FEATURES
  ## Solution Overview – ShieldPay

ShieldPay is an AI-powered parametric income protection system for gig delivery workers in quick-commerce platforms. Delivery partners often face sudden income drops due to factors like heavy rain, traffic congestion, demand fluctuations, or temporary platform outages. Traditional insurance does not cover these short-term income disruptions.

ShieldPay addresses this gap by predicting a worker’s expected earnings using machine learning. If actual earnings drop significantly due to operational disruptions, the system automatically triggers an insurance payout based on predefined rules.

The solution follows a B2B2C model where ShieldPay integrates with gig platforms to provide embedded income protection for workers. For the hackathon prototype, platform integration will be simulated using a mock delivery platform API that generates activity signals such as login time, deliveries completed, and active hours.

  ## B2B2C Integration Model

ShieldPay follows a **B2B2C (Business-to-Business-to-Consumer)** model where the insurance system is embedded within gig delivery platforms.
ShieldPay → Platform → Worker
In this model, ShieldPay provides the AI-driven insurance and risk detection system, while gig platforms integrate the solution into their delivery ecosystem. Delivery workers then receive income protection directly through the platform they already use.

This embedded approach ensures reliable access to worker activity data, improves fraud detection, and allows claims to be processed automatically without requiring workers to manually purchase or manage separate insurance policies.

For the hackathon prototype, this integration will be simulated using a mock delivery platform API that generates operational data such as login time, deliveries completed, orders accepted, and active hours.

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

**1. Platform Data Collection**  
The system collects worker activity signals from the delivery platform such as login time, deliveries completed, orders accepted, and active working hours.  
For the hackathon prototype, this data is generated through a mock delivery platform API.

**2. Income Prediction**  
A machine learning model analyzes historical activity patterns and predicts the worker’s expected earnings for that period.

**3. Disruption Detection**  
The system compares predicted earnings with actual earnings to identify unusual income drops caused by operational disruptions.

**4. Parametric Trigger Activation**  
If the drop in earnings crosses the predefined threshold, the system activates a parametric trigger.

**5. Claim Generation**  
Once the trigger condition is satisfied, the system automatically generates an insurance claim without manual submission.

**6. Automated Payout**  
The payout amount is calculated based on policy rules and transferred to the worker.

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

ShieldPay introduces a new approach to protecting gig economy workers from income volatility. Unlike traditional insurance that focuses on health or accident risks, ShieldPay protects workers against **sudden income disruptions** caused by operational factors such as weather conditions, demand fluctuations, or platform outages.

The system combines **AI-based income prediction, parametric insurance triggers, and automated claims processing** to provide faster and more reliable payouts. By embedding the solution directly into gig platforms through a B2B2C model, ShieldPay enables seamless adoption while improving data reliability and fraud detection.

This approach demonstrates how data-driven insurance solutions can create scalable financial protection for the growing gig workforce.

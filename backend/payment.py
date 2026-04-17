import uuid
import random
from datetime import datetime
from typing import Dict, Any

UPI_APPS = ["GPay", "PhonePe", "Paytm", "BHIM"]
BANKS = ["HDFC", "ICICI", "SBI", "Axis"]

def generate_payment(amount: float, user_id: int, fraud_score: float) -> Dict[str, Any]:

    # 🔥 FIX 1: prevent None crash
    fraud_score = fraud_score or 0

    # 🔥 FIX 2: clamp fraud score
    fraud_score = max(0, min(fraud_score, 100))

    # 🔥 FIX 3: validate amount
    if not amount or amount <= 0:
        raise ValueError("Invalid payment amount")

    txn_id = "TXN" + str(uuid.uuid4()).replace("-", "")[:12].upper()
    ref_id = "REF" + str(uuid.uuid4()).replace("-", "")[:10].upper()

    latency_ms = random.randint(120, 1200)

    success = random.random() > (fraud_score / 100)

    status = "SUCCESS" if success else "FAILED"

    upi_id = f"user{user_id}@{random.choice(['okaxis','oksbi','okhdfc','ybl'])}"

    app = random.choice(UPI_APPS)
    bank = random.choice(BANKS)

    timestamp = datetime.utcnow().isoformat()

    return {
        "transaction": {
            "transaction_id": txn_id,
            "reference_id": ref_id,
            "status": status,
            "amount": round(amount, 2),
            "currency": "INR",
            "method": "UPI",
            "upi_id": upi_id,
            "app": app,
            "bank": bank,
            "timestamp": timestamp,
            "processing_time_ms": latency_ms
        },

        "payment_breakdown": {
            "base_amount": round(amount, 2),
            "platform_fee": round(amount * 0.01, 2),
            "gst": round(amount * 0.01 * 0.18, 2),
            "net_paid": round(amount - (amount * 0.01 * 1.18), 2)
        },

        "meta": {
            "gateway": "ShieldPay-Simulated",
            "risk_flag": "LOW",
            "retry_allowed": not success
        }
    }
import logging
from datetime import datetime, timedelta
from typing import Any, Dict, Optional

from sqlalchemy.orm import Session

from .behavioral import compute_trust_update, run_behavioral_analysis
from .data_sources import get_full_environment
from .ml_engine import analyze_fraud_result, predict_fraud, predict_income
from .models import AuditLog, Claim, Policy, User
from .payment import generate_payment

CLAIM_COOLDOWN_SECONDS = 20
logger = logging.getLogger("shieldpay.claims")


class ClaimException(Exception):
    def __init__(self, status: str, reason: str):
        self.status = status
        self.reason = reason
        super().__init__(reason)


def get_risk_tier(trust_score: float) -> str:
    if trust_score >= 80:
        return "premium"
    if trust_score >= 60:
        return "standard"
    if trust_score >= 40:
        return "watchlist"
    return "high_risk"


def _check_cooldown(user: User) -> None:
    timestamps = user.get_claim_timestamps()
    if not timestamps:
        return

    try:
        last_time = datetime.fromisoformat(timestamps[-1])
    except (TypeError, ValueError):
        return

    delta = datetime.utcnow() - last_time
    if delta.total_seconds() < CLAIM_COOLDOWN_SECONDS:
        remaining = int(CLAIM_COOLDOWN_SECONDS - delta.total_seconds())
        raise ClaimException("cooldown", f"Claim cooldown active for {remaining} seconds")


def _reset_policy_windows(policy: Policy) -> None:
    now = datetime.utcnow()
    if now - policy.week_reset_at >= timedelta(days=7):
        policy.claims_this_week = 0
        policy.week_reset_at = now
    if now - policy.month_reset_at >= timedelta(days=30):
        policy.claims_this_month = 0
        policy.month_reset_at = now


def _validate_policy(policy: Optional[Policy]) -> Policy:
    if not policy:
        raise ClaimException("excluded", "No active policy found")

    _reset_policy_windows(policy)

    if policy.status != "active":
        raise ClaimException("excluded", f"Policy is {policy.status}")
    if policy.claims_this_week >= policy.max_claims_week:
        raise ClaimException("excluded", "Weekly claim limit reached")
    if policy.claims_this_month >= policy.max_claims_month:
        raise ClaimException("excluded", "Monthly claim limit reached")

    return policy


def _normalise_trigger(trigger_type: str, environment: Dict[str, Any]) -> str:
    if trigger_type in {"rain", "demand_drop", "pollution", "traffic"}:
        return trigger_type

    weather = environment.get("weather", {})
    demand = environment.get("demand", {})
    aqi = environment.get("aqi", {})
    traffic = environment.get("traffic", {})

    if weather.get("severity") in {"heavy", "severe"}:
        return "rain"
    if demand.get("category") in {"low", "very_low"}:
        return "demand_drop"
    if aqi.get("category") in {"poor", "very_poor", "severe"}:
        return "pollution"
    if traffic.get("category") in {"heavy", "gridlock"}:
        return "traffic"
    return "rain"


def _environment_score(environment: Dict[str, Any]) -> float:
    components = [
        environment.get("weather", {}).get("income_impact_pct", 0),
        environment.get("demand", {}).get("income_impact_pct", 0),
        environment.get("aqi", {}).get("income_impact_pct", 0),
        environment.get("traffic", {}).get("income_impact_pct", 0),
    ]
    return round(max(0.0, min(100.0, sum(components) / max(len(components), 1))), 2)


def _environment_floor_drop(trigger_type: str, environment: Dict[str, Any], env_score: float) -> float:
    trigger_component_map = {
        "rain": environment.get("weather", {}).get("income_impact_pct", 0),
        "demand_drop": environment.get("demand", {}).get("income_impact_pct", 0),
        "pollution": environment.get("aqi", {}).get("income_impact_pct", 0),
        "traffic": environment.get("traffic", {}).get("income_impact_pct", 0),
    }

    trigger_component = trigger_component_map.get(trigger_type, 0)
    env_floor = max(trigger_component * 0.45, env_score * 0.3)
    return round(max(0.0, min(60.0, env_floor)), 2)


def _compute_payout(policy: Policy, trust_score: float, fraud_score: float, income_drop_pct: float, env_score: float) -> Dict[str, Any]:
    base_payout = round(policy.coverage_amount * max(0.0, income_drop_pct) / 100.0, 2)
    trust_factor = max(0.2, min(1.0, trust_score / 100.0))
    fraud_factor = max(0.0, 1.0 - min(fraud_score, 100.0) / 100.0)
    env_factor = max(0.35, min(1.0, env_score / 100.0))
    adjusted_payout = round(base_payout * trust_factor * fraud_factor * env_factor, 2)

    return {
        "base_payout": base_payout,
        "adjusted_payout": adjusted_payout,
        "trust_factor": round(trust_factor, 4),
        "fraud_factor": round(fraud_factor, 4),
        "env_factor": round(env_factor, 4),
        "formula": "base * trust_factor * fraud_factor * env_factor",
    }


def process_claim(
    user: User,
    trigger_type: str,
    db: Session,
    environment_override: Optional[Dict[str, Any]] = None,
) -> Dict[str, Any]:
    if not isinstance(trigger_type, str):
        raise ClaimException("invalid", "Invalid trigger type")

    _check_cooldown(user)
    policy = _validate_policy(user.policy)

    environment = environment_override or get_full_environment(user.city)
    trigger_type = _normalise_trigger(trigger_type, environment)
    env_score = _environment_score(environment)

    income_prediction = predict_income(
        user.get_income_history(),
        user.declared_weekly_income,
        environment,
    )
    predicted_income = income_prediction.get("predicted_income", user.declared_weekly_income)
    declared_income = user.declared_weekly_income or 0
    income_drop_pct = 0.0
    if declared_income > 0:
        model_drop = max(0.0, (declared_income - predicted_income) / declared_income * 100.0)
        income_drop_pct = round(max(model_drop, _environment_floor_drop(trigger_type, environment, env_score)), 2)

    raw_fraud = predict_fraud(
        user.get_login_timestamps(),
        user.get_claim_timestamps(),
        user.get_session_durations(),
        user.get_income_history(),
        declared_income,
    )
    fraud_analysis = analyze_fraud_result(raw_fraud)
    fraud_score = float(fraud_analysis.get("score", 0.0))
    behavioral = run_behavioral_analysis(user)

    approved = fraud_score < 85 and income_drop_pct >= 5 and env_score >= 10
    trust_update = compute_trust_update(
        current_trust=user.trust_score or 50.0,
        behavior_score=behavioral["behavior_score"],
        claim_approved=approved,
        fraud_score=fraud_score,
    )

    payout = _compute_payout(policy, user.trust_score or 50.0, fraud_score, income_drop_pct, env_score)
    payment: Optional[Dict[str, Any]] = None
    status = "APPROVED" if approved and payout["adjusted_payout"] > 0 else "BLOCKED"
    reason = None

    if status == "APPROVED":
        payment = generate_payment(
            amount=payout["adjusted_payout"],
            user_id=user.id,
            fraud_score=fraud_score,
        )
        if payment["transaction"]["status"] != "SUCCESS":
            status = "PAYMENT_REVIEW"
            reason = "Payment gateway marked this transaction for retry"
    else:
        if fraud_score >= 85:
            reason = "High fraud risk detected"
        elif income_drop_pct < 5:
            reason = "Income drop threshold not met"
        else:
            reason = "Environmental impact too low"

    claim = Claim(
        user_id=user.id,
        trigger_type=trigger_type,
        trigger_severity=environment.get("weather", {}).get("severity") or environment.get("traffic", {}).get("category"),
        income_drop_pct=income_drop_pct,
        base_payout=payout["base_payout"],
        adjusted_payout=payout["adjusted_payout"] if status != "BLOCKED" else 0.0,
        fraud_score=fraud_score,
        trust_score_before=user.trust_score,
        trust_score_after=trust_update["trust_after"],
        status=status,
    )
    claim.set_details(
        {
            "reason": reason,
            "environment": environment,
            "payout": payout,
            "fraud_analysis": fraud_analysis,
            "behavioral": behavioral,
            "income_prediction": income_prediction,
            "payment": payment,
            "trust_update": trust_update,
        }
    )
    db.add(claim)

    user.trust_score = trust_update["trust_after"]
    user.append_claim_timestamp(datetime.utcnow().isoformat())
    trust_history = user.get_trust_history()
    trust_history.append(user.trust_score)
    user.set_trust_history(trust_history[-30:])

    payout_history = user.get_payout_history()
    payout_history.append(
        {
            "id": f"CLM-{datetime.utcnow().strftime('%H%M%S')}",
            "amount": claim.adjusted_payout,
            "status": status,
            "trigger_type": trigger_type,
            "created_at": claim.created_at.isoformat() if claim.created_at else datetime.utcnow().isoformat(),
        }
    )
    user.set_payout_history(payout_history[-20:])

    policy.claims_this_week += 1
    policy.claims_this_month += 1
    if status != "BLOCKED":
        policy.total_payout = round((policy.total_payout or 0.0) + claim.adjusted_payout, 2)
        policy.wallet_balance = round((policy.wallet_balance or 0.0) + claim.adjusted_payout, 2)

    db.add(
        AuditLog(
            user_id=user.id,
            action="claim_processed",
            summary=f"{status} claim for {trigger_type}",
        )
    )
    db.commit()
    db.refresh(claim)
    db.refresh(user)
    db.refresh(policy)

    details = claim.get_details()
    return {
        "claim_id": claim.id,
        "status": status,
        "reason": reason,
        "trigger_type": trigger_type,
        "environment": environment,
        "income_drop_pct": income_drop_pct,
        "payout": {
            "base": payout["base_payout"],
            "final": claim.adjusted_payout,
            "breakdown": payout,
        },
        "payment": payment,
        "fraud_analysis": fraud_analysis,
        "behavioral_analysis": behavioral,
        "income_prediction": income_prediction,
        "trust_update": trust_update,
        "risk_tier": get_risk_tier(user.trust_score),
        "details": details,
    }

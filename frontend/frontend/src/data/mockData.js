export const workerData = {
  id: 'W-2847',
  name: 'Arjun Sharma',
  platform: 'Swiggy',
  city: 'Bengaluru',
  avatar: 'AS',
  trustScore: 82,
  riskTier: 'LOW',
  predictedIncome: 18500,
  lastMonthIncome: 17200,
  activeClaims: 1,
  totalClaims: 14,
  approvedClaims: 12,
  joinedDate: '2023-03-15',
  vehicleType: '2-Wheeler',
  avgDeliveries: 24,
  rating: 4.8,
};

export const incomeHistory = [
  { month: 'Oct', actual: 15200, predicted: 15800 },
  { month: 'Nov', actual: 16100, predicted: 15900 },
  { month: 'Dec', actual: 14800, predicted: 16200 },
  { month: 'Jan', actual: 17200, predicted: 16800 },
  { month: 'Feb', actual: 16900, predicted: 17100 },
  { month: 'Mar', actual: 18200, predicted: 17800 },
  { month: 'Apr', actual: null, predicted: 18500 },
];

export const liveConditions = {
  weather: { status: 'Heavy Rain', severity: 'HIGH', icon: '🌧️', value: '87mm/hr' },
  aqi: { value: 142, level: 'POOR', icon: '💨', threshold: 200 },
  demand: { score: 0.38, level: 'LOW', icon: '📉', change: -42 },
  surge: { multiplier: 1.2, icon: '⚡', active: true },
};

export const claimData = {
  triggerId: 'TRG-9921',
  triggerType: 'WEATHER_DISRUPTION',
  timestamp: new Date().toISOString(),
  stages: [
    {
      id: 'trigger',
      label: 'Trigger Detected',
      icon: 'Zap',
      color: '#38bdf8',
      detail: 'Heavy rain 87mm/hr in Bengaluru — income disruption threshold exceeded',
      duration: 800,
      metrics: null,
    },
    {
      id: 'analysis',
      label: 'AI Analysis',
      icon: 'Brain',
      color: '#a78bfa',
      detail: 'Income deviation: −34.2% below 90-day rolling baseline',
      duration: 2100,
      metrics: {
        'Income Deviation': '-34.2%',
        'Baseline Income': '₹18,500',
        'Actual Income': '₹12,190',
        'Model Confidence': '97.2%',
      },
    },
    {
      id: 'fraud',
      label: 'Fraud Detection',
      icon: 'Shield',
      color: '#f59e0b',
      detail: 'XGBoost model: 96.4% legitimate — no anomalies detected',
      duration: 1400,
      fraudScore: 0.036,
      features: [
        { name: 'Login Variance', value: 0.12, max: 1, safe: true },
        { name: 'Claim Velocity', value: 0.08, max: 1, safe: true },
        { name: 'Income Deviation', value: 0.31, max: 1, safe: true },
        { name: 'Location Consistency', value: 0.04, max: 1, safe: true },
        { name: 'Pattern Anomaly', value: 0.09, max: 1, safe: true },
      ],
    },
    {
      id: 'decision',
      label: 'Decision Engine',
      icon: 'CheckCircle',
      color: '#10b981',
      detail: 'APPROVED — Trust: 82/100 | Risk Tier: LOW',
      duration: 600,
      decision: 'APPROVED',
      confidence: 96.4,
      payoutBreakdown: {
        baseAmount: 6300,
        trustFactor: 1.15,
        environmentFactor: 1.22,
        fraudPenalty: 0,
        finalAmount: 8843,
      },
    },
    {
      id: 'payment',
      label: 'UPI Payment',
      icon: 'CreditCard',
      color: '#10b981',
      detail: 'Instant transfer via UPI — processed in 1.2s',
      duration: 1200,
      upiRef: 'UPI-SP-20240413-8843',
      to: 'arjun.sharma@upi',
      amount: 8843,
    },
  ],
};

export const adminStats = {
  totalClaims: 1284,
  approvedClaims: 1047,
  fraudDetected: 89,
  pendingClaims: 148,
  avgPayout: 7420,
  totalDisbursed: 7772340,
  activeWorkers: 3241,
  fraudRate: 6.9,
};

export const claimsTimeline = [
  { date: 'Apr 7', claims: 42, fraud: 3, approved: 39, payout: 289000 },
  { date: 'Apr 8', claims: 58, fraud: 5, approved: 53, payout: 392000 },
  { date: 'Apr 9', claims: 71, fraud: 8, approved: 63, payout: 461000 },
  { date: 'Apr 10', claims: 39, fraud: 2, approved: 37, payout: 274000 },
  { date: 'Apr 11', claims: 94, fraud: 11, approved: 83, payout: 618000 },
  { date: 'Apr 12', claims: 127, fraud: 14, approved: 113, payout: 841000 },
  { date: 'Apr 13', claims: 88, fraud: 7, approved: 81, payout: 601000 },
];

export const riskDistribution = [
  { tier: 'LOW', count: 2187, pct: 67.5, color: '#10b981' },
  { tier: 'MED', count: 891, pct: 27.5, color: '#f59e0b' },
  { tier: 'HIGH', count: 163, pct: 5.0, color: '#ef4444' },
];

export const recentClaims = [
  { id: 'CLM-4401', worker: 'Priya K.', amount: 9200, status: 'APPROVED', trigger: 'Weather', time: '2m ago', score: 92 },
  { id: 'CLM-4402', worker: 'Ravi M.', amount: 7800, status: 'FRAUD', trigger: 'Demand Drop', time: '5m ago', score: 18 },
  { id: 'CLM-4403', worker: 'Deepa R.', amount: 6500, status: 'APPROVED', trigger: 'AQI Alert', time: '9m ago', score: 87 },
  { id: 'CLM-4404', worker: 'Kiran P.', amount: 11200, status: 'PENDING', trigger: 'Weather', time: '12m ago', score: 71 },
  { id: 'CLM-4405', worker: 'Suresh T.', amount: 8843, status: 'APPROVED', trigger: 'Weather', time: '14m ago', score: 82 },
];

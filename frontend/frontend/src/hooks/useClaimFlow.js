import { useState, useEffect, useCallback, useRef } from 'react';
import { claimData } from '../data/mockData';
export function useClaimFlow(wsMessage) {

  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState(-1);
  const [completedStages, setCompletedStages] = useState([]);
  const [finalResult, setFinalResult] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const timerRef = useRef(null);

  const [backendStage, setBackendStage] = useState(null);
  const [backendResult, setBackendResult] = useState(null);

  const [mlStream, setMlStream] = useState([]);

  const queueRef = useRef([]);
  const processingRef = useRef(false);

  const reset = useCallback(() => {
    setIsRunning(false);
    setCurrentStage(-1);
    setCompletedStages([]);
    setFinalResult(null);
    setElapsedTime(0);
    setBackendStage(null);
    setBackendResult(null);
    setMlStream([]);

    clearInterval(timerRef.current);

    queueRef.current = [];
    processingRef.current = false;
  }, []);

  const start = useCallback(() => {
    reset();
    setIsRunning(true);

    const startTime = Date.now();

    timerRef.current = setInterval(() => {
      setElapsedTime(Number(((Date.now() - startTime) / 1000).toFixed(1)));
    }, 100);

  }, [reset]);

  useEffect(() => {
    if (backendResult) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  }, [backendResult]);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);
  useEffect(() => {
  if (wsMessage?.step) return;
  if (fallbackRef.current) return;

  fallbackRef.current = true;

  let i = 0;

  const interval = setInterval(() => {
    setCurrentStage(i);

    setCompletedStages(prev => {
      if (prev.includes(stages[i]?.id)) return prev;
      return [...prev, stages[i]?.id];
    });

    i++;

    if (i >= stages.length) {
      clearInterval(interval);

      setEffectiveResult({
        amount: 9200,
        transaction_id: "DEMO123456",
      });

      setIsRunning(false);
    }

  }, 1200);

  return () => clearInterval(interval);

}, [wsMessage]);

  // 🔥 STEP MAP (CRITICAL FIX)
  const STEP_MAP = {
    trigger_detected: "trigger",
    environment_fetch: "analysis",
    ml_analysis: "fraud",
    decision: "decision",
    payment_processing: "payment",
    payment_success: "payment"
  };

  const processQueue = useCallback(async () => {
    if (processingRef.current) return;

    processingRef.current = true;

    while (queueRef.current.length > 0) {
      const msg = queueRef.current.shift();

      try {
        if (!msg?.step) continue;

        const stageId = STEP_MAP[msg.step];
        if (!stageId) continue;

        setBackendStage(stageId);

        const stageIndex = claimData.stages.findIndex(s => s.id === stageId);

        if (stageIndex !== -1) {
          setCurrentStage(stageIndex);

          setCompletedStages(prev => {
            if (prev.includes(stageId)) return prev;
            return [...prev, stageId];
          });
        }

        // 🔥 ML DATA (REAL)
        const data = msg.data || msg.result || {};

        if (msg.step === "ml_analysis" || msg.step === "decision") {
          setMlStream(prev => [
            ...prev.slice(-20),
            {
              fraud: data?.fraud_analysis?.score || 0,
              trust: data?.trust_score || 0,
              env: data?.env_score || 0,
              payout: data?.payout || 0,
              t: Date.now()
            }
          ]);
        }

        // 🔥 DECISION RESULT
        if (msg.step === "decision") {
          setBackendResult(prev => ({
            ...prev,
            decision: data
          }));
        }

        // 🔥 PAYMENT RESULT
        if (msg.step === "payment_success") {
          setBackendResult(prev => ({
            ...prev,
            payment: data
          }));
        }

        await new Promise(res => setTimeout(res, 500));

      } catch (err) {
        console.error("WS processing error:", err);
      }
    }

    processingRef.current = false;
  }, []);

  useEffect(() => {
    if (!wsMessage) return;

    const step = wsMessage.step || wsMessage.stage || wsMessage.type;
    if (!step) return;

    queueRef.current.push({ ...wsMessage, step });
    processQueue();

  }, [wsMessage, processQueue]);

  const effectiveStage = backendStage
    ? claimData.stages.findIndex(s => s.id === backendStage)
    : currentStage;

  const effectiveResult = backendResult || finalResult;

  return {
    isRunning,
    currentStage: effectiveStage,
    completedStages,
    finalResult: effectiveResult,
    elapsedTime,
    stages: claimData.stages,
    start,
    reset,
    mlStream,
    mlData: effectiveResult?.decision || {},
    paymentData: effectiveResult?.payment || {},
    backendStage
  };
}
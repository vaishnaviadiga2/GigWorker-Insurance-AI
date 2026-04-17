import { useState, useEffect, useRef, useCallback } from 'react';

const MOCK_UPDATES = [
  { type: 'CONDITION_UPDATE', data: { weather: 'Heavy Rain', aqi: 142, demand: 0.38 } },
  { type: 'TRUST_UPDATE', data: { score: 83, delta: +1 } },
  { type: 'CLAIM_UPDATE', data: { id: 'CLM-4401', status: 'APPROVED', amount: 9200 } },
  { type: 'INCOME_UPDATE', data: { predicted: 18650, confidence: 0.87 } },
];

export function useWebSocket(url, options = {}) {
  const [status, setStatus] = useState('connecting');
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  const wsRef = useRef(null);
  const mockIntervalRef = useRef(null);
  const reconnectRef = useRef(null);

  const shouldReconnect = useRef(true);

  const enableMockFallback = options.enableMockFallback ?? false;
  const debug = options.debug ?? true;

  const log = (...args) => {
    if (debug) console.log("[WS]", ...args);
  };

  const startMockMode = useCallback(() => {
    log("⚠️ Starting MOCK mode");

    setStatus('mock');
    let idx = 0;

    clearInterval(mockIntervalRef.current);

    mockIntervalRef.current = setInterval(() => {
      const msg = MOCK_UPDATES[idx % MOCK_UPDATES.length];
      const enriched = { ...msg, timestamp: new Date().toISOString() };

      setLastMessage(enriched);
      setMessages(prev => [...prev.slice(-50), enriched]);

      idx++;
    }, 3500);
  }, [debug]);

  useEffect(() => {
    if (!url) return;

    console.log("🔌 WS connecting to:", url);

    if (wsRef.current) return;

    shouldReconnect.current = true;

    const connect = () => {
      try {
        const ws = new WebSocket(url);
        wsRef.current = ws;

        setStatus("connecting");

        ws.onopen = () => {
          log("✅ Connected");
          setStatus("connected");
          clearInterval(mockIntervalRef.current);
        };

        ws.onmessage = (e) => {
          try {
            const raw = JSON.parse(e.data);

            // 🔥 NEW: NORMALIZE MESSAGE (CRITICAL FIX)
            const normalizedStep =
              raw.step ||
              raw.type ||
              raw.stage ||
              raw.event ||
              null;

            const data = {
              ...raw,
              step: typeof normalizedStep === "string" ? normalizedStep : null,
            };

            // 🔥 DEBUG (IMPORTANT)
            log("📨 Incoming WS:", data);

            if (!data.step) {
              log("⚠️ Ignored message (no step)");
              return;
            }

            setLastMessage(data);
            setMessages(prev => [...prev.slice(-50), data]);

          } catch (err) {
            console.error("WS parse error", err);
          }
        };

        ws.onclose = () => {
          log("⚠️ Disconnected");
          setStatus("disconnected");
          wsRef.current = null;

          if (shouldReconnect.current) {
            reconnectRef.current = setTimeout(() => {
              log("🔄 Reconnecting...");
              connect();
            }, 2000);
          } else if (enableMockFallback) {
            startMockMode();
          }
        };

        ws.onerror = () => {
          log("❌ Error");
          setStatus("error");
        };

      } catch (err) {
        console.error("WS connection error:", err);
        setStatus("error");

        if (enableMockFallback) {
          startMockMode();
        }
      }
    };

    connect();

    return () => {
      shouldReconnect.current = false;

      clearTimeout(reconnectRef.current);
      clearInterval(mockIntervalRef.current);

      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };

  }, [url, enableMockFallback, startMockMode]);

  const send = useCallback((data) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
    } else {
      console.warn("⚠️ WS not ready, message skipped");
    }
  }, []);

  return { status, lastMessage, messages, send };
}
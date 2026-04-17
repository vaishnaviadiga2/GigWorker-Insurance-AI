import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

let refreshPromise = null;

function clearSession() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    clearSession();
    throw new Error("Session expired. Please login again.");
  }

  const response = await axios.post(`${BASE_URL}/auth/refresh`, {
    refresh_token: refreshToken,
  });

  const nextAccessToken = response.data?.access_token;
  if (!nextAccessToken) {
    clearSession();
    throw new Error("Session expired. Please login again.");
  }

  localStorage.setItem("access_token", nextAccessToken);
  return nextAccessToken;
}

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    if (status === 401 && !originalRequest?._retry && !String(originalRequest?.url || "").includes("/auth/refresh")) {
      originalRequest._retry = true;

      try {
        refreshPromise = refreshPromise || refreshAccessToken();
        const nextAccessToken = await refreshPromise;
        refreshPromise = null;

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${nextAccessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        clearSession();
        if (typeof window !== "undefined") {
          window.location.reload();
        }
        return Promise.reject(refreshError);
      }
    }

    const detail = error?.response?.data?.detail;
    const message =
      typeof detail === "string"
        ? detail
        : detail?.reason || detail?.message || error.message;
    return Promise.reject(new Error(message || "Request failed"));
  }
);

export const authService = {
  login(payload) {
    return api.post("/auth/login", payload).then((res) => res.data);
  },
  register(payload) {
    return api.post("/auth/register", payload).then((res) => res.data);
  },
};

export const workerService = {
  getDashboard() {
    return api.get("/dashboard/data").then((res) => res.data);
  },
  getProfile() {
    return api.get("/users/me").then((res) => res.data);
  },
  getPolicy() {
    return api.get("/policies/me").then((res) => res.data);
  },
  getClaimHistory(limit = 20) {
    return api.get("/claims/history", { params: { limit } }).then((res) => res.data.claims || []);
  },
};

export const claimService = {
  initiateClaim(triggerType) {
    return api.post("/claims/trigger", { trigger_type: triggerType }).then((res) => res.data);
  },
};

export const conditionsService = {
  getLiveConditions(city) {
    return api.get("/environment", { params: city ? { city } : undefined }).then((res) => res.data);
  },
};

export default api;

import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8000/api",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error(
      "[API ERROR]",
      err.config?.method?.toUpperCase(),
      err.config?.url,
      err.response?.status,
      err.response?.data ?? err.message
    );
    return Promise.reject(err);
  }
);
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // adjust to your backend URL
  withCredentials: false,
});

// Attach token from localStorage on every request
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data.data ?? response.data,
  (error) => Promise.reject(error)
);

export default api;

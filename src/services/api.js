import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("uf_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);

export const userService = {
  getAll: () => api.get("/users").then((r) => r.data),
  getById: (id) => api.get(`/users/${id}`).then((r) => r.data),
  create: (data) => api.post("/users", data).then((r) => r.data),
  update: (id, data) => api.put(`/users/${id}`, data).then((r) => r.data),
  remove: (id) => api.delete(`/users/${id}`).then((r) => r.data),
};

export default api;

import axios from "axios";

const API = axios.create({
  baseURL: "https://factoryflow-backend-a0vc.onrender.com/api"
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("customerToken");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
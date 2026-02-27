import axios from "axios";

const customerApi = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api/customer",
});

// Attach token automatically
customerApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("customerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default customerApi;
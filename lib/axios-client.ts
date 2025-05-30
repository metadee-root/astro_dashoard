import axios from "axios";
import { getAuthToken } from "./get-client-token";

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAuthToken();
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    } catch (error) {
      console.error("Error in request interceptor:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || "An error occurred";
    throw new Error(message);
  }
);

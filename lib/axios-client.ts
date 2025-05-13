import axios from "axios";
import { getCurrentUser } from "./get-current-user";

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const user = await getCurrentUser();
    if (user?.token) {
      config.headers.Authorization = user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosClient.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     const message = error.response?.data?.message || "An error occurred";
//     throw new Error(message);
//   }
// );

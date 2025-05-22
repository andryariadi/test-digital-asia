// api.ts
import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from "axios";
import { ApiResponse } from "./types";

// Define your base API URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://test-fe.mysellerpintar.com/api";

// Define common headers
const commonHeaders = {
  "Content-Type": "application/json",
};

// Create a reusable axios instance with default config
const createAxiosInstance = (baseURL: string = BASE_URL): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: commonHeaders,
    timeout: 10000, // 10 seconds timeout
  });

  // Add request interceptor
  instance.interceptors.request.use(
    (config) => {
      // You can modify request config here (e.g., add auth token)
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add response interceptor
  // Di dalam response interceptor, ubah menjadi:
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      // Pertahankan response asli dari server
      return response;
    },
    (error: AxiosError) => {
      // Handle errors
      if (error.response) {
        const apiError: ApiResponse = {
          success: false,
          message: error.response.data?.message || error.message,
          error: {
            statusCode: error.response.status,
            message: error.response.statusText,
            errors: error.response.data?.errors,
          },
        };
        return Promise.reject(apiError);
      }

      return Promise.reject({
        success: false,
        message: error.message,
        error: {
          statusCode: 0,
          message: "No connection",
        },
      });
    }
  );

  return instance;
};

// Main API instance
const api = createAxiosInstance();

// Reusable HTTP methods with proper TypeScript typing
const http = {
  get: <T = void>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return api.get(url, config);
  },

  post: <T = void>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return api.post(url, data, config);
  },

  put: <T = void>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return api.put(url, data, config);
  },

  patch: <T = void>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return api.patch(url, data, config);
  },

  delete: <T = void>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    return api.delete(url, config);
  },
};

export { api, http, createAxiosInstance };

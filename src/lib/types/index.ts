// types/api-response.ts
// types/api-response.ts
export interface ApiError {
  statusCode?: number;
  message?: string;
  errors?: Record<string, unknown>;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: ApiError;
}

// Tipe khusus untuk data user
export interface UserData {
  id: string;
  username: string;
  role: string;
  token?: string;
  refreshToken?: string;
  expiresIn?: number;
}

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

export interface UserProps {
  id: string;
  username: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryProps {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleProps {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
  category: CategoryProps;
  user: Pick<UserProps, "id" | "username">; // Using only id and username from UserProps
}

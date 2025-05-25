"use server";

import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = "https://test-fe.mysellerpintar.com/api";

export const getCategories = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${BASE_URL}/categories?page=${page}&limit=${limit}`);

    // console.log({ data: res.data }, "<---getCategories");

    return res.data;
  } catch (error: unknown) {
    console.log(error, "<---Error in getCategoriesAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const createCategory = async (data: { name: string; userId: string }) => {
  console.log({ data }, "<---createCategoryAction");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const payload = {
      name: data.name,
      userId: data.userId,
    };

    const res = await axios.post(`${BASE_URL}/categories`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard-category");

    return res.data;
  } catch (error: unknown) {
    console.error("Error in createArticlesAction:", error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during article creation");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const updateCategory = async (categoryId: string, data: { name: string; userId: string }) => {
  console.log({ data }, "<---createCategoryAction");

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const payload = {
      name: data.name,
      userId: data.userId,
    };

    const res = await axios.put(`${BASE_URL}/categories/${categoryId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard-category");

    return res.data;
  } catch (error: unknown) {
    console.error("Error in createArticlesAction:", error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during article creation");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const deleteCategory = async (categoryId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.delete(`${BASE_URL}/categories/${categoryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard-category");

    return res.data;
  } catch (error: unknown) {
    console.error("Error in createArticlesAction:", error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during article creation");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

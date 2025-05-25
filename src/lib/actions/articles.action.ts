"use server";

import axios, { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BASE_URL = "https://test-fe.mysellerpintar.com/api";

export const getArticles = async (page = 1, limit = 10) => {
  try {
    const res = await axios.get(`${BASE_URL}/articles?page=${page}&limit=${limit}`);

    return res.data;
  } catch (error: unknown) {
    console.log(error, "<---Error in getArticlesAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getArticle = async (id: string | undefined) => {
  try {
    const res = await axios.get(`${BASE_URL}/articles/${id}`);

    return res.data;
  } catch (error: unknown) {
    console.log(error, "<---Error in getArticlesAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const uploadImg = async (file: File) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post(`${BASE_URL}/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error: unknown) {
    console.error("Error in uploadImgAction:", error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during image upload");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const createArticle = async (data: { title: string; categoryId: string; content: string; imageUrl: string; userId: string }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const payload = {
      title: data.title,
      content: data.content,
      imageUrl: data.imageUrl,
      categoryId: data.categoryId,
      userId: data.userId,
    };

    const res = await axios.post(`${BASE_URL}/articles`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard-articles");

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

export const updateArticle = async (articleId: string, articleData: { title: string; categoryId: string; content: string; imageUrl: string; userId: string }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const payload = {
      title: articleData.title,
      content: articleData.content,
      imageUrl: articleData.imageUrl,
      categoryId: articleData.categoryId,
      userId: articleData.userId,
    };

    const res = await axios.put(`${BASE_URL}/articles/${articleId}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard-articles");

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

export const deleteArticle = async (articleId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.delete(`${BASE_URL}/articles/${articleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/dashboard-articles");

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

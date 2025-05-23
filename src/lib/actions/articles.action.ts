"use server";

import axios, { AxiosError } from "axios";

const BASE_URL = "https://test-fe.mysellerpintar.com/api";

export const getArticles = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/articles`);

    console.log({ data: res.data }, "<---getArticles");

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

    console.log({ data: res.data }, "<---getArticles");

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

"use server";

import axios, { AxiosError } from "axios";

const BASE_URL = "https://test-fe.mysellerpintar.com/api";

export const getCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);

    console.log({ data: res.data }, "<---getCategories");

    return res.data;
  } catch (error: unknown) {
    console.log(error, "<---Error in getUserAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

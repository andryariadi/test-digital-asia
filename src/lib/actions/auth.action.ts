"use server";

import axios, { AxiosError } from "axios";
import { z } from "zod";
import { LoginFormValidation, RegisterFormValidation } from "../validations";
import { cookies } from "next/headers";

const BASE_URL = "https://test-fe.mysellerpintar.com/api";

export const singup = async (data: z.infer<typeof RegisterFormValidation>) => {
  console.log({ data }, "<---singupAction1");

  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, data);

    return {
      user: res.data,
      message: "Registration successful",
      success: true,
    };
  } catch (error: unknown) {
    console.log(error, "<---Error in singupAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const login = async (data: z.infer<typeof LoginFormValidation>) => {
  console.log({ data }, "<---loginAction1");

  try {
    const cookieStore = await cookies();

    const res = await axios.post(`${BASE_URL}/auth/login`, data);

    if (res.data.token) {
      cookieStore.set({
        name: "accessToken",
        value: res.data.token,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 60 * 1000,
        path: "/",
      });
    }

    if (res.data.role) {
      cookieStore.set({
        name: "role",
        value: res.data.role,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60 * 60 * 60 * 1000,
        path: "/",
      });
    }

    return {
      user: res.data,
      message: "Login successful",
      success: true,
    };
  } catch (error: unknown) {
    console.log(error, "<---Error in loginAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const logout = async () => {
  try {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("role");

    return {
      message: "Logout successful",
      success: true,
    };
  } catch (error: unknown) {
    console.log(error, "<---Error in logoutAction");
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error || "An error occurred during login");
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const getUser = async () => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      throw new Error("No token found");
    }

    const res = await axios.get(`${BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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

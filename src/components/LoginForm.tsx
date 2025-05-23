"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValidation } from "@/lib/validations";
import { motion } from "framer-motion";
import { Loader, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { login } from "@/lib/actions/auth.action";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [openPass, setOpenPass] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
  });

  const handleSubmitLogin: SubmitHandler<z.infer<typeof LoginFormValidation>> = async (data) => {
    console.log({ data }, "<---loginForm");

    try {
      const res = await login(data);

      if (res.user) {
        toast.success(res.message, {
          style: toastStyle,
        });

        router.push(res.user.role === "Admin" ? "/dashboard-articles" : "/");
      }

      console.log(res, "<---loginForm2");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        toast.error(error.message, {
          style: toastStyle,
        });
      } else {
        console.log("An unknown error occurred:", error);
        toast.error("An unknown error occurred", {
          style: toastStyle,
        });
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(handleSubmitLogin)} className="b-sky-500 w-full min-h-[35rem] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white shadow-lg h-full w-full max-w-md rounded-lg p-5 space-y-5">
        {/* Logo */}
        <div className="b-amber-500 w-full pt-5 pb-2 flex items-center justify-center rounded-lg">
          <Image src="/logo.png" alt="Logo" width={160} height={160} />
        </div>

        {/* Form Input */}
        <div className="b-emerald-500 grid grid-cols-1 gap-6">
          <div className="relative">
            <InputField type="text" label="Username" placeholder="Username" name="username" propData={{ ...register("username") }} />

            {errors.username && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.username.message as string}</p>}
          </div>

          <div className="relative">
            <InputField
              passIcon={openPass ? <Eye size={22} className="text-gray-500" /> : <EyeOff size={20} className="text-gray-500" />}
              openPass={openPass}
              setOpenPass={setOpenPass}
              type={openPass ? "text" : "password"}
              label="Password"
              placeholder="Password"
              propData={{ ...register("password") }}
            />

            {errors.password && <p className="absolute -bottom-5 text-red-500 text-sm">{errors.password.message as string}</p>}
          </div>

          <motion.button
            className="py-3 px-4 mt-3 w-full bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader scale={22} className="animate-spin mx-auto" /> : "Login"}
          </motion.button>
        </div>

        {/* Link to register */}
        <div className="b-gray-800 bg-opacity-50 px-8 py-4 text-sm">
          <p className="text-center text-gray-600 font-[500]">
            Dont have an account?
            <Link href="/register" className="text-sky-500 ml-2 inline-block hover:scale-110 hover:underline transition-all duration-300">
              Singup
            </Link>
          </p>
        </div>
      </motion.div>
    </form>
  );
};

export default LoginForm;

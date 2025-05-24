"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ButtonBack = () => {
  const router = useRouter();

  return (
    <button onClick={() => router.back()} className="py-3 px-4 mt-3 w-full bg-gradient-to-r from-blue-500 to-sky-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-sky-700 transition-all duration-300">
      Back to home
    </button>
  );
};

export default ButtonBack;

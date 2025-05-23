"use client";

import Link from "next/link";
import { CircleX } from "lucide-react";
const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/">
        <CircleX size={24} className="text-slate-400" />
      </Link>
    </button>
  );
};

export default SearchFormReset;

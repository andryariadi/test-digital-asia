"use client";

import Link from "next/link";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
const SearchFormReset = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const reset = () => {
    const form = document.querySelector(".search") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href="/">
        <CircleX className={cn("text-slate-400 size-[24px]", { "size-[18px]": isAdmin })} />
      </Link>
    </button>
  );
};

export default SearchFormReset;

"use client";

import Link from "next/link";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
const SearchFormReset = ({ isAdmin = false, href = "/" }: { isAdmin?: boolean; href?: string }) => {
  const reset = () => {
    const form = document.querySelector(".search") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button type="reset" onClick={reset}>
      <Link href={href} className="flex items-center justify-center w-full h-full">
        <CircleX className={cn("text-slate-400 size-[24px]", { "size-[18px]": isAdmin })} />
      </Link>
    </button>
  );
};

export default SearchFormReset;

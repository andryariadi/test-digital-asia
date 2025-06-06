"use client";

import { UserProps } from "@/lib/types";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";

const ButtonModalProfile = ({ user, isAdmin = false }: { user: UserProps; isAdmin?: boolean }) => {
  const firstLetter = user.username?.charAt(0).toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-200 w-[32px] h-[32px] md:w-10 md:h-10 rounded-full flex items-center justify-center">
            <span className="text-blue-900">{firstLetter}</span>
          </div>
          <span className={`hidden md:inline-block capitalize ${isAdmin ? "text-slate-900" : "text-white"} hover:underline transition-all duration-300`}>{user.username}</span>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[224px] sm:max-w-[224px] b-sky-200 -right-[6rem] md:-right-16 xl:-right-8">
        <div>
          <div className="px-3 border-b-2 border-slate-300 py-3">
            <Link href={`/user/profile`} className="text-slate-600 font-semibold">
              My Account
            </Link>
          </div>

          {/* Button Logout */}
          <div>
            <ButtonLogout />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonModalProfile;

"use client";

import { UserProps } from "@/lib/types";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Link from "next/link";
import ButtonLogout from "./ButtonLogout";

const ButtonModalProfile = ({ user }: { user: UserProps }) => {
  const firstLetter = user.username?.charAt(0).toUpperCase();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-rose-700 flex items-center gap-2 cursor-pointer">
          <div className="bg-blue-200 w-[32px] h-[32px] md:w-10 md:h-10 rounded-full flex items-center justify-center">
            <span className="text-blue-900">{firstLetter}</span>
          </div>
          <span className="hidden md:inline-block capitalize text-slate-900 hover:underline transition-all duration-300">{user.username}</span>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[224px] bg-slate-200">
        <div className="b-sky-700">
          <div className="b-cyan-600 px-3 border-b-2 border-slate-300 py-3">
            <Link href={`/user/profile`} className="text-slate-600 font-semibold">
              My Account
            </Link>
          </div>

          {/* Button Logout */}
          <div className="b-green-500 py-1">
            <ButtonLogout />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ButtonModalProfile;

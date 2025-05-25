"use client";

import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth.action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toastStyle } from "@/lib/utils";

const ButtonLogout = ({ isSidebar = false }: { isSidebar?: boolean }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();

    if (res.success) {
      router.push("/login");
      router.refresh();

      toast.success(res.message, {
        style: toastStyle,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className={`text-red-500 font-semibold ${isSidebar && "text-white font-extralight hover:bg-blue-500 transition duration-200"} flex items-center gap-2 cursor-pointer p-2 rounded-md`}>
          <LogOut className="size-5" />
          <span className={`text-md ${isSidebar && "font-medium text-sm"}`}>Logout</span>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[400px] gap-10">
        <AlertDialogHeader>
          <AlertDialogTitle>Logout</AlertDialogTitle>

          <AlertDialogDescription>Are you sure you want to logout?</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-blue-500">
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ButtonLogout;

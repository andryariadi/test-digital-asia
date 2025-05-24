"use client";

import React, { useEffect, useState } from "react";
import ButtonModalProfile from "./ButtonModalProfile";
import { UserProps } from "@/lib/types";
import { usePathname } from "next/navigation";

const NavbarAdmin = ({ user }: { user: UserProps }) => {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getRouteName = () => {
    const match = pathname.match(/dashboard-(\w+)/);
    if (match && match[1]) {
      return match[1].charAt(0).toUpperCase() + match[1].slice(1);
    }
    return "Dashboard";
  };

  const routeName = getRouteName();
  return (
    <header className={`bg-gray-50 fixed top-0 right-0 z-50 w-[calc(100%-267px)] h-[5rem] ${isScrolled && "backdrop-blur-md backdrop-opacity-10 shadow-md"} flex items-center border-b-2 border-slate-200`}>
      <nav className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-semibold text-slate-900">{routeName}</h1>

        {/* Button Modal Profile */}
        <ButtonModalProfile user={user} />
      </nav>
    </header>
  );
};

export default NavbarAdmin;

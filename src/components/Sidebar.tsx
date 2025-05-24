"use client";

import { sidebarLinks } from "@/lib/constant";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="bg-blue-600 w-full max-w-[10rem] lg:max-w-[12rem] xl:max-w-[267px] py-6 px-5 space-y-6 left_sidebar">
      {/* Logo */}
      <Link href="/">
        <Image src="/logofooter.png" width={150} height={150} alt="Logo" />
      </Link>

      {/* Menu Links */}
      <aside className="b-rose-500 space-y-3">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`);

          return (
            <Link
              key={link.route}
              href={link.route}
              className={cn("flex items-center gap-4 rounded-md p-2 text-white font-medium hover:bg-blue-500 transition duration-200", {
                "bg-blue-500": isActive,
              })}
            >
              <link.icon className="size-5" />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </aside>
    </section>
  );
};

export default Sidebar;

import { getUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import React from "react";
import ButtonModalProfile from "./ButtonModalProfile";

const NavbarUser = async () => {
  const user = await getUser();

  console.log({ user }, "<---NavbarUser");

  return (
    <header className="bg-pink-600 fixed top-0 left-0 z-50 w-full h-[5rem] flex items-center bg-opacity-90 backdrop-blur-md shadow-lg">
      <nav className="bg-green-600 container mx-auto px-20 flex justify-between items-center">
        {/* Logo */}
        <Image src="/logo.png" width={160} height={160} alt="Logo" />

        {/* Button Modal Profile */}
        <ButtonModalProfile user={user} />
      </nav>
    </header>
  );
};

export default NavbarUser;

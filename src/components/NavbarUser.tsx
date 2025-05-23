import { getUser } from "@/lib/actions/auth.action";
import Image from "next/image";
import React from "react";
import ButtonModalProfile from "./ButtonModalProfile";
import Link from "next/link";

const NavbarUser = async () => {
  const user = await getUser();

  console.log({ user }, "<---NavbarUser");

  return (
    <header className="b-pink-600 fixed top-0 left-0 z-50 w-full h-[5rem] flex items-center hover:backdrop-blur-md hover:shadow-md trasalllion-all duration-300">
      <nav className="b-green-600 container mx-auto px-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image src="/logo.png" width={160} height={160} alt="Logo" />
        </Link>

        {/* Button Modal Profile */}
        <ButtonModalProfile user={user} />
      </nav>
    </header>
  );
};

export default NavbarUser;

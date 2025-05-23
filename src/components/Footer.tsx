import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-sky-500 fixed bottom-0 left-0 z-50 w-full h-[4.5rem] flex items-center justify-center gap-5 bg-opacity-90 backdrop-blur-md shadow-lg">
      {/* Logo */}
      <Image src="/logofooter.png" width={140} height={140} alt="Logo" />

      {/* Description */}
      <p className="text-white text-center">&copy; 2023 Blog Genzet. All rights reserved.</p>
    </footer>
  );
};

export default Footer;

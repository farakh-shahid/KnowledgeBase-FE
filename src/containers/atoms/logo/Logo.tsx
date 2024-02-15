import Image from "next/image";
import React from "react";
import logo from "@/assets/icons/kb-logo.png";
const Logo = () => {
  return (
    <div>
      <Image src={logo} alt={"LOGO"}></Image>
    </div>
  );
};

export default Logo;



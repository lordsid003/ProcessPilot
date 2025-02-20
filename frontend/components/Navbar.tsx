import Link from "next/link";
import { useState } from "react";
import { close, logo, menu } from "@/public/assets";
import { navLinks } from "@/constants";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <Image src={logo} alt="HooBank" width={124} height={32} />
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li key={nav.id} className="font-poppins font-normal cursor-pointer text-[16px] text-white mr-10">
            <Link href={nav.id === "services" ? "/services" : `#${nav.id}`}>
              {nav.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

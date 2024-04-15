import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

import { Link } from "react-router-dom";

function NavBarLink({ to, title }: { to: string; title: string }) {
  return (
    <Link
      to={`${to}`}
      // className={({ isActive, isPending }) =>
      //   isPending
      //     ? "pending"
      //     : isActive
      //     ? "text-brandGreen"
      //     : "text-light hover:text-brandGreen transition-colors duration-300 ease-in"
      // }
      className="text-light hover:text-green-400 transition-colors duration-300 ease-in"
    >
      {title}
    </Link>
  );
}

const links = [
  {
    to: "/",
    title: "Services",
  },
  {
    to: "/",
    title: "Technology",
  },
  {
    to: "/",
    title: "Who we serve",
  },
  {
    to: "/",
    title: "Pricing",
  },
];

function Header() {
  return (
    <div className="max-w-7xl px-2 py-1 md:px-6 flex items-center justify-between md:py-4">
      <div className="">
        <p className="text-[20px]  font-black   text-white">
          Diet <span className="text-green-400 ">Dining</span>
        </p>
        <p className="text-[18px] leading-tight -mt-2   text-white">
          For <span className="">Merchants</span>
        </p>
      </div>

      <div className="hidden md:flex gap-x-6 items-center">
        {links.map((link, index) => (
          <NavBarLink key={index} title={link.title} to={link.to} />
        ))}
      </div>

      <div className="flex gap-x-4 items-center lg:hidden">
        <UserCircle className="text-white" />
        <svg
          className="text-white"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M2 6h20v3H2V6Z" fill="currentColor"></path>,
          <path d="M2 15h20v3H2v-3Z" fill="currentColor"></path>
        </svg>
      </div>
      <div className="hidden lg:flex gap-x-4 items-center ">
        <span className="text-light cursor-pointer hover:text-green-400 transition-colors duration-300">
          Get Support
        </span>
        <Link to={"/login"}>
          <Button className=" rounded-3xl">
            <span>Login</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;

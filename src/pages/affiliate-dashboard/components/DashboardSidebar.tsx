import {
  Home,
  Settings,
  StoreIcon,
  ShoppingBag,
  Signal,
  Currency,
  LineChart,
  FileIcon,
} from "lucide-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";

type SideBarLinkProps = {
  title: string;
  children?: React.ReactNode;
  to: string;
};

const SidebarLink = ({ title, children, to }: SideBarLinkProps) => {
  return (
    <NavLink
      to={`${to}`}
      end
      className={({ isActive }) =>
        `${
          !isActive
            ? "flex gap-x-2 items-center justify-center xl:justify-start  hover:bg-lightBlack w-full h-10 px-2  rounded-lg"
            : "flex gap-x-2 items-center bg-lightBlack justify-center xl:justify-start hover:bg-lightBlack px-2 w-full h-10  rounded-lg"
        }`
      }
    >
      <div className="flex text-light  items-center justify-center rounded-lg transition-colors  ">
        {children}
        <span className="sr-only">{title}</span>
      </div>
      <span className="text-light hidden text-[14px] font-medium mt-1 xl:block">
        {title}
      </span>
    </NavLink>
  );
};

export function DashBoardSidebar() {
  const store_image = React.useMemo(
    () => localStorage.getItem("store_image"),
    []
  );
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden sm:flex  w-20 xl:w-48 flex-col  border-r border-lightBlack bg-transparent ">
      {/* BRANDING */}
      <div className="hidden xl:block  pl-4  bg-lightBlack border-b border-lightBlack pt-1 h-14">
        <p className="text-[18px]  font-black   text-white">
          Diet <span className="text-green-400 ">Dining</span>
        </p>
        <p className="text-[16px] leading-tight -mt-2   text-white">
          For <span className="">Merchants</span>
        </p>
      </div>
      {/* STORE IMAGE */}
      <div className="hidden pb-[7px] border-b border-lightBlack justify-center  md:flex  xl:hidden ">
        <img
          className="border w-10 h-10 rounded-full object-cover mt-2"
          src={store_image as string}
          alt=""
        />
      </div>
      <nav className="flex pt-2 flex-col items-center  gap-4 px-2  sm:pb-5 xl:items-start xl:gap-4 xl:pt-4 ">
        <SidebarLink to="/affiliate" title="Dashboard">
          <Home className="h-5 w-5 text-white" />
        </SidebarLink>
        <SidebarLink to="/affiliate/store" title="Store">
          <StoreIcon />
        </SidebarLink>
        <SidebarLink to="/affiliate/menu" title="Menu">
          <FileIcon />
        </SidebarLink>
        <SidebarLink to="/affiliate/orders" title="Orders">
          <ShoppingBag />
        </SidebarLink>
        <SidebarLink to="/affiliate/marketing" title="Marketing">
          <Signal />
        </SidebarLink>
        <SidebarLink to="/affiliate/reports" title="Reports">
          <LineChart />
        </SidebarLink>
        <SidebarLink to="/affiliate/payments" title="Payments">
          <Currency />
        </SidebarLink>
      </nav>
      {/* SETTINGS BUTTON */}
      <nav className="mt-auto flex flex-col items-center xl:items-start  gap-4 px-2 sm:py-5">
        <Link
          to="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Link>
      </nav>
    </aside>
  );
}

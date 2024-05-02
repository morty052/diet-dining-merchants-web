import {
  Home,
  Settings,
  StoreIcon,
  MenuIcon,
  ShoppingBag,
  Signal,
  Currency,
  LineChart,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

type SideBarLinkProps = {
  title: string;
  icon?: React.ReactNode;
  to: string;
};

const SidebarLink = ({ title, icon, to }: SideBarLinkProps) => {
  return (
    <NavLink
      to={`${to}`}
      end
      className={({ isActive }) =>
        `${
          !isActive
            ? "xl:flex gap-x-2 items-center  hover:bg-lightBlack w-full py-2 rounded-lg"
            : "xl:flex gap-x-2 items-center bg-lightBlack hover:bg-lightBlack w-full py-2 rounded-lg"
        }`
      }
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
        <span className="h-5 w-5 text-white">{icon}</span>
        <span className="sr-only">{title}</span>
      </div>
      <span className="text-light hidden text-[14px] font-medium mt-1 xl:block">
        {title}
      </span>
    </NavLink>
  );
};

export function DashBoardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden  w-20 xl:w-48 flex-col  border-r border-lightBlack bg-transparent sm:flex">
      <div className="hidden xl:block pl-4 pt-2">
        <p className="text-[20px]  font-black   text-white">
          Diet <span className="text-green-400 ">Dining</span>
        </p>
        <p className="text-[18px] leading-tight -mt-2   text-white">
          For <span className="">Merchants</span>
        </p>
      </div>
      <nav className="flex flex-col items-center  gap-4 px-2  sm:pb-5 xl:items-start xl:gap-4 md:pt-2 xl:pt-5  ">
        <SidebarLink to="/affiliate" icon={<Home />} title="Dashboard" />
        <SidebarLink to="/affiliate/store" icon={<StoreIcon />} title="Store" />
        <SidebarLink to="/affiliate/menu" icon={<MenuIcon />} title="Menu" />
        <SidebarLink
          to="/affiliate/orders"
          icon={<ShoppingBag />}
          title="Orders"
        />
        <SidebarLink
          to="/affiliate/marketing"
          icon={<Signal />}
          title="Marketing"
        />
        <SidebarLink
          to="/affiliate/reports"
          icon={<LineChart />}
          title="Reports"
        />
        <SidebarLink
          to="/affiliate/payments"
          icon={<Currency />}
          title="Payments"
        />
      </nav>
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

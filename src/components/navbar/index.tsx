import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Bell, Settings } from "lucide-react";
import SideBar from "../sidebar";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Preview Products",
    href: "/affiliate/products",
    description: "View all products currently registered under your store",
  },
  {
    title: "Edit Products",
    href: "/affiliate/products/edit",
    description:
      "View and edit product information, including images, and pricing",
  },
  {
    title: "Create Product",
    href: "/affiliate/products/add",
    description:
      "Add a new product to your store. You can add multiple products at once.",
  },
  {
    title: "Manage Categories",
    href: "/docs/primitives/scroll-area",
    description: "View edit and create product categories.",
  },
  // {
  //   title: "Tabs",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
];

const orderLinks: { title: string; href: string; description: string }[] = [
  {
    title: "All Orders",
    href: "/affiliate/orders",
    description: "View all orders associated with your store",
  },
  {
    title: "Pending Orders",
    href: "/affiliate/orders/pending",
    description: "View all orders waiting for pickup confirmation.",
  },
  {
    title: "Completed Orders",
    href: "/affiliate/orders/completed",
    description:
      "View all orders marked as completed, associated with your store.",
  },
  {
    title: "Cancelled Orders",
    href: "/affiliate/orders/cancelled",
    description:
      "View all orders marked as cancelled, associated with your store.",
  },
  // {
  //   title: "Tabs",
  //   href: "/docs/primitives/tabs",
  //   description:
  //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  // },
  // {
  //   title: "Tooltip",
  //   href: "/docs/primitives/tooltip",
  //   description:
  //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  // },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const store_name = React.useMemo(
    () => localStorage.getItem("store_name"),
    []
  );
  const store_image = React.useMemo(
    () => localStorage.getItem("store_image"),
    []
  );

  const path = useLocation().pathname;

  return (
    <>
      <div className=" h-14 sticky top-0 z-50 max-w-7xl  bg-darkGrey border-b border-lightBlack  ">
        <div className="mx-auto flex justify-between p-2">
          <div className=" flex items-center gap-x-2">
            <div className="flex">
              <div className="grid h-8 w-8 place-content-center rounded-full border border-white">
                <p className="text-lg font-black uppercase text-green-400">
                  {store_name?.charAt(0)}
                </p>
              </div>
              <div className="flex flex-col pl-2">
                <span className="text-xs text-white">Logged in as</span>
                <span className=" text-xs text-white">{store_name}</span>
              </div>
            </div>
          </div>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* Dashboard */}
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <NavLink
                    className={`${path == "/affiliate" && "text-green-400"}`}
                    to="/affiliate"
                  >
                    Dashboard
                  </NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {/* STORE LINKS */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <NavLink
                    className={`${path.includes("/store") && "text-green-400"}`}
                    to="/affiliate"
                  >
                    Store
                  </NavLink>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid bg-darkGrey gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col  rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md"
                          to="/affiliate/store"
                        >
                          <img
                            className="w-full rounded-md"
                            src={store_image as string}
                            alt=""
                          />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            <span className="text-[14px]">{store_name}</span>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/affiliate/store" title="Preview">
                      Preview store information and current menu.
                    </ListItem>
                    <ListItem href="/affiliate/store/edit" title="Edit">
                      Edit store information and appearance
                    </ListItem>
                    <ListItem href="/affiliate/store/hours" title="Hours">
                      Manage store opening and closing hours
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* PRODUCTS LINKS */}
              {/* <NavigationMenuItem>
                <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-darkGrey ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem> */}
              {/* MENU */}
              <NavigationMenuItem>
                <Link to="/affiliate/menu">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span
                      className={`${
                        path.includes("/menu") && "text-green-400"
                      }`}
                    >
                      Menu
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              {/* ORDERS LINKS */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>Orders</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-darkGrey ">
                    {orderLinks.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              {/* Promotions */}
              <NavigationMenuItem>
                <Link to="/affiliate/promotions">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <span
                      className={`${
                        path.includes("/promotions") && "text-green-400"
                      }`}
                    >
                      Marketing
                    </span>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* NAVBAR RIGHT SIDE */}
          <div className=" flex items-center gap-x-4">
            {/* SETTINGS ICON */}
            <div className="hidden lg:grid  h-8 w-8 group cursor-pointer bg-gray-500 hover:bg-green-400 transition-colors duration-300 ease-in-out  place-content-center rounded-lg">
              <Settings className="h-4 w-4 text-white" />
            </div>
            <div className="h-8 w-8 bg-gray-500 cursor-pointer  hover:bg-green-400 transition-colors duration-300 ease-in-out grid place-content-center rounded-lg">
              <Bell className="h-4 w-4 text-white" />
            </div>
            {/* SIDEBAR BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="h-8 w-8 grid bg-gray-500 cursor-pointer  hover:bg-green-400 transition-colors duration-300 ease-in-out  place-content-center rounded-lg lg:hidden"
            >
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
            </button>
          </div>
        </div>
      </div>
      <SideBar open={open} setOpen={setOpen} />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavLink to={`${props.href}`}>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none group space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm group-hover:text-dark font-medium leading-none text-white">
            {title}
          </div>
          <p className="line-clamp-2 group-hover:text-dark text-sm leading-snug text-white">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </NavLink>
  );
});
ListItem.displayName = "ListItem";

// const ListItem = ({
//   to,
//   children,
//   title,
// }: {
//   to: string;
//   children: React.ReactNode;
//   title: string;
// }) => {
//   return (
//     <li>
//       <NavLink
//         to={`${to}`}
//         className={cn(
//           "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
//         )}
//       >
//         <div className="text-sm font-medium leading-none">{title}</div>
//         <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
//           {children}
//         </p>
//       </NavLink>
//     </li>
//   );
// };

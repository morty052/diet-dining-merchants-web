import { motion } from "framer-motion";
import { ChevronDownCircle, Home, X } from "lucide-react";
import { ReactNode, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type LinkProps = {
  title: string;
  icon: ReactNode;
  to: string;
  setOpen: (open: boolean) => void;
  isMultiLink: boolean;
  sublinks?: { title: string; to: string }[];
};

const links = [
  {
    title: "Overview",
    to: "/affiliate",
    icon: <Home />,
  },
  {
    title: "Store",
    to: "/affiliate/store",
    icon: <Home />,
    isMultiLink: true,
    sublinks: [
      {
        title: "Preview Products",
        to: "/affiliate/products",
        description: "View all products currently registered under your store",
      },
      {
        title: "Edit Products",
        to: "/affiliate/products/edit",
        description:
          "View and edit product information, including images, and pricing",
      },
      {
        title: "Create Product",
        to: "/affiliate/products/add",
        description:
          "Add a new product to your store. You can add multiple products at once.",
      },
      {
        title: "Manage Categories",
        to: "/docs/primitives/scroll-area",
        description: "View edit and create product categories.",
      },
    ],
  },
  {
    title: "Products",
    to: "/affiliate",
    icon: <Home />,
    isMultiLink: true,
    sublinks: [
      {
        title: "Preview Products",
        to: "/affiliate/products",
        description: "View all products currently registered under your store",
      },
      {
        title: "Edit Products",
        to: "/affiliate/products/edit",
        description:
          "View and edit product information, including images, and pricing",
      },
      {
        title: "Create Product",
        to: "/affiliate/products/add",
        description:
          "Add a new product to your store. You can add multiple products at once.",
      },
      {
        title: "Manage Categories",
        to: "/docs/primitives/scroll-area",
        description: "View edit and create product categories.",
      },
    ],
  },
  {
    title: "Orders",
    to: "/affiliate",
    icon: <Home />,
    isMultiLink: true,
  },
];

function SideBarLink({
  title,
  to,
  icon,
  setOpen,
  isMultiLink,
  sublinks,
}: LinkProps) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
    setOpen(false);
  };

  if (isMultiLink) {
    return (
      <div className="bg-lightBlack px-2 py-4 rounded-lg">
        <button className="  flex w-full  items-center  justify-between">
          <div className="space-x-2 flex flex-1">
            <span className="text-light">{icon}</span>
            <span className="text-light text-lg font-black tracking-wide">
              {title}
            </span>
          </div>
          <ChevronDownCircle
            onClick={() => setExpanded(!expanded)}
            className="text-light"
          />
        </button>
        <div className="flex flex-col gap-y-2 pt-2">
          {expanded &&
            sublinks?.map((link, index) => (
              <a
                className="w-full"
                onClick={() => {
                  console.log("clicked");
                  navigate(link.to);
                  setOpen(false);
                  setExpanded(false);
                }}
                key={index}
              >
                <span className="text-light">{link.title}</span>
              </a>
            ))}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => handleClick()}
      className="  flex w-full  items-center  justify-between bg-lightBlack px-2 py-4 rounded-lg"
    >
      <div className="space-x-2 flex flex-1">
        <span className="text-light">{icon}</span>
        <span className="text-light text-lg font-black tracking-wide">
          {title}
        </span>
      </div>
    </button>
  );
}

function SideBar({ open, setOpen }: Props) {
  const store_name = useMemo(() => localStorage.getItem("store_name"), []);
  const store_image = useMemo(() => localStorage.getItem("store_image"), []);
  return (
    <motion.div
      className="fixed lg:hidden inset-x-0 top-0  bg-darkGrey z-50 overflow-y-scroll"
      animate={!open ? { y: -1000 } : { y: 0 }}
      transition={{ ease: "easeInOut" }}
    >
      <div className="p-2 space-y-8">
        <div className="flex justify-between items-center">
          <div className="">
            <p className="text-[20px]  font-black   text-white">
              Diet <span className="text-green-400 ">Dining</span>
            </p>
            <p className="text-[18px] leading-tight -mt-2   text-white">
              For <span className="">Merchants</span>
            </p>
          </div>
          <X className="text-light" onClick={() => setOpen(!open)} />
        </div>
        <div className="space-y-6 pt-4">
          {links.map(({ title, to, icon, isMultiLink, sublinks }) => (
            <SideBarLink
              sublinks={sublinks}
              isMultiLink={isMultiLink as boolean}
              setOpen={setOpen}
              title={title}
              key={title}
              icon={icon}
              to={to}
            />
          ))}
        </div>
        <li className="row-span-3">
          <NavLink
            className="flex h-full w-full select-none flex-col  rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md"
            to="/affiliate/store"
          >
            <img
              className="w-full md:h-72 md:object-cover rounded-md"
              src={store_image as string}
              alt=""
            />
            <div className="mb-2 mt-4 text-lg font-medium">
              <span className="text-[14px]">{store_name}</span>
            </div>
          </NavLink>
        </li>
      </div>
    </motion.div>
  );
}

export default SideBar;

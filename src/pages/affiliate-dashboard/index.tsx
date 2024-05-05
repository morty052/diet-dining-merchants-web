import { Button } from "../../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import AffiliateOrders from "./routes/AffiliateOrders";
import { StoreManager } from "../store-manager";
import AffiliateProductManager from "./routes/AffiliateProductManager";
import { BarChart, Navbar } from "../../components";
import { baseUrl } from "../../constants/baseUrl";
import { Promotions } from "..";
import MenuManager from "../menu-manager";

import { DashBoardSidebar } from "./components/DashboardSidebar";
import { ArrowUp, ChevronRight } from "lucide-react";

function DashboardInfoCard({
  title,
  figure,
}: {
  title: string;
  figure: string | number;
}) {
  return (
    <div className="w-full rounded-sm  border px-4 py-2 lg:w-1/4">
      {/* Header */}
      <div className="flex justify-between">
        <p className="text-white">{title}</p>
        <p className="text-lg text-white">$</p>
      </div>
      {/* Info */}
      <div className="space-y-2">
        <p className="text-3xl font-semibold text-white">{figure}</p>
        <p className=" text-gray-300">+0.00 from last month</p>
      </div>
    </div>
  );
}

function RecentSalesCard() {
  const sales = [
    {
      customer_name: "Olivier Martin",
      customer_email: "Olivier@gmail.com",
      price: 330,
    },
    {
      customer_name: "Andrew Killcoff",
      customer_email: "Andrew@gmail.com",
      price: 1430,
    },
    {
      customer_name: "Keegan Matthew",
      customer_email: "keegan@gmail.com",
      price: 240,
    },
    {
      customer_name: "Welma Flintstone",
      customer_email: "Welma@gmail.com",
      price: 320,
    },
    {
      customer_name: "Patrick Star",
      customer_email: "patrick@gmail.com",
      price: 200,
    },
  ];

  const SaleItem = ({
    customer_name,
    customer_email,
    price,
  }: {
    customer_name: string;
    customer_email: string;
    price: number;
  }) => {
    return (
      <div className="flex items-center justify-between">
        <div className="grid h-8 w-8 place-content-center rounded-full border border-white">
          <p className="font-black text-green-400">
            {customer_name?.charAt(0)}
          </p>
        </div>
        <div className="ml-2 flex-1">
          <p className="text-gray-50">{customer_name}</p>
          <p className="text-sm text-gray-50/80 ">{customer_email}</p>
        </div>
        <p className="text-lg font-semibold text-white">${price}</p>
      </div>
    );
  };

  return (
    <div className="space-y-4 rounded-lg border border-white/50 p-4 lg:w-2/5">
      <div className="">
        <p className="text-lg font-semibold text-white">Recent Sales</p>
        <p className="text-sm font-semibold text-gray-300">
          You made 256 sales this month.
        </p>
      </div>
      {sales.map((sale, index) => (
        <SaleItem
          key={index}
          customer_email={sale.customer_email}
          customer_name={sale.customer_name}
          price={sale.price}
        />
      ))}
    </div>
  );
}

function DownLoadReportButton() {
  return (
    <div className="">
      <div className="flex gap-x-2">
        <label htmlFor=""></label>
        <input
          className="w-40 rounded-md px-2 placeholder:text-center"
          title="date"
          placeholder=""
          type="date"
        />
        <Button className="bg-white text-black">Download</Button>
      </div>
    </div>
  );
}

// TODO:ADD IPAD PRO LAYOUT
function OverView() {
  return (
    <div className="flex w-full flex-col gap-y-8 lg:flex-row-reverse lg:gap-x-2 ">
      <RecentSalesCard />
      <BarChart title={"Earnings"} />
    </div>
  );
}

function StoreHighlights({
  sales,
  total_revenue,
}: {
  sales: number;
  total_revenue: number;
}) {
  return (
    <>
      {/* DEFAULT LAYOUT INFO CARDS */}
      <div className="flex flex-col gap-y-4 pt-4 md:hidden">
        <DashboardInfoCard figure={total_revenue} title="Total Revenue" />
        <DashboardInfoCard figure={sales} title="Sales" />
        <DashboardInfoCard figure="14" title="Pending Orders" />
        <DashboardInfoCard figure="3" title="Active Promos" />
      </div>
      <div className="flex flex-col gap-2  pt-4 lg:hidden  ">
        {/* MEDIUM LAYOUT INFO CARDS */}
        <div className="hidden gap-x-6 md:flex">
          <DashboardInfoCard figure={total_revenue} title="Total Revenue" />
          <DashboardInfoCard figure={sales} title="Sales" />
        </div>
        <div className="hidden gap-x-6 md:flex">
          <DashboardInfoCard figure="14" title="Pending Orders" />
          <DashboardInfoCard figure="3" title="Active Promos" />
        </div>
      </div>
      {/* LARGER LAYOUT INFO CARDS */}
      <div className="hidden gap-2  pt-4 lg:flex  ">
        <DashboardInfoCard figure={total_revenue} title="Total Revenue" />
        <DashboardInfoCard figure={sales} title="Sales" />

        <DashboardInfoCard figure="14" title="Pending Orders" />
        <DashboardInfoCard figure="3" title="Active Promos" />
      </div>
    </>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function TipsAndNews() {
  return (
    <div className=" *:text-light space-y-2 w-full">
      <p>Tips & news</p>
      <div className="p-4 border  flex items-center gap-x-2 xl:gap-x-4 xl:p-6 rounded-lg">
        <div className="h-40 w-60 border "></div>
        <p className="text-light xl:text-2xl">
          Enhance the discovery of your store on diet dining with ads
        </p>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QuickActions() {
  return (
    <div className="text-light w-full space-y-2 hidden xl:block  max-w-xs xl:pr-4 ">
      <p>Quick Actions</p>
      <div className=" space-y-8 ">
        <div className="flex items-center justify-between">
          <ArrowUp />
          <p>Boost Store</p>
          <ChevronRight />
        </div>
        <div className="flex items-center justify-between">
          <ArrowUp />
          <p>Boost Store</p>
          <ChevronRight />
        </div>
        <div className="flex items-center justify-between">
          <ArrowUp />
          <p>Boost Store</p>
          <ChevronRight />
        </div>
        <div className="flex items-center justify-between">
          <ArrowUp />
          <p>Boost Store</p>
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  async function fetchAffiliate() {
    const _id = localStorage.getItem("_id");
    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate?afilliate_id=${_id}`
    );
    const data = await res.json();
    console.log(data);
    return data;
  }
  const { isLoading, data: affiliate } = useQuery({
    queryKey: ["active_affiliate"],
    queryFn: fetchAffiliate,
  });

  if (isLoading) {
    return null;
  }

  const { sales, total_revenue } = affiliate ?? {};

  return (
    <div className="relative  pt-6">
      <div className="pb-4">
        <p className="text-light">Hello</p>
        <p className="text-light">Today's summary</p>
      </div>
      <div className="flex justify-end md:justify-between">
        <p className="hidden text-2xl font-semibold text-white md:block">
          Overview
        </p>
        <DownLoadReportButton />
      </div>
      <div className="grid  gap-4 pb-4 md:pb-0  ">
        <StoreHighlights total_revenue={total_revenue} sales={sales} />
        {/* <div className="lg:flex justify-between xl:gap-x-20">
          <TipsAndNews />
          <QuickActions />
        </div> */}
        <OverView />
      </div>
    </div>
  );
}

// FIXME CHART LAYOUT HEIGHT
export function AffiliateDashboard() {
  return (
    <div className=" mx-auto min-h-screen max-w-7xl  bg-darkGrey">
      {/* Container */}
      <div className="relative h-screen overflow-y-scroll">
        <DashBoardSidebar />
        <div className="md:px-2 md:ml-20 xl:ml-48">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders/*" element={<AffiliateOrders />} />
            <Route path="/store/*" element={<StoreManager />} />
            <Route path="/products/*" element={<AffiliateProductManager />} />
            <Route path="/menu/*" element={<MenuManager />} />
            <Route path="/promotions/*" element={<Promotions />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

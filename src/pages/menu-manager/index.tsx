/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AffiliateProductsTable from "../affiliate-dashboard/components/AffiliateProductsTable";
import { baseUrl } from "@/constants/baseUrl";
import { Link, Routes, Route } from "react-router-dom";
import NewProductForm from "../affiliate-dashboard/components/NewProductForm";
import { Tproduct } from "@/types/product";

export type menu = {
  title: string;
  products: Tproduct[];
};

async function fetchMenu(): Promise<menu[]> {
  const store_id = localStorage.getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-menu?store_id=${store_id}`
  );
  const data = await res.json();
  const { menus } = data;

  return menus;
}

function Menu() {
  const { data: menus, isLoading } = useQuery({
    queryKey: ["affiliate_menus"],
    queryFn: fetchMenu,
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="">
      <div className="space-y-2 border-b pb-4 pt-4">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-light text-2xl font-semibold lg:text-3xl">
              Menu
            </h3>
            <p className="text-light text-xs">Example: Dinner Menu</p>
          </div>
          <Button className=" text-dark">+ New Menu</Button>
        </div>
        <div className="bg-lightBlack w-72 py-2 rounded-lg flex gap-x-2 px-2">
          <Search className="text-light" />
          <input
            placeholder="Search menus"
            className="bg-transparent w-full focus:outline-none text-light"
            type="text"
          />
        </div>
      </div>
      <div className="p-2">
        {menus?.map((menu, index) => (
          <p className="text-light" key={index}>
            {menu.title}
          </p>
        ))}
        {!isLoading && menus?.length === 0 && (
          <p className="text-light">No menus yet</p>
        )}
      </div>
    </div>
  );
}

function ItemsHome({ store }: { store: any }) {
  return (
    <div className="space-y-2 border-b pb-4 pt-4">
      <div className="space-y-1 border-b border-lightBlack pb-4">
        <div className="flex justify-between">
          <h3 className="text-light text-2xl font-semibold lg:text-3xl">
            Items
          </h3>
          <Link to={"/affiliate/menu/new"}>
            <Button className=" text-dark">+ New Item</Button>
          </Link>
        </div>
        <div className="bg-lightBlack w-72 py-2 rounded-lg flex gap-x-2 px-2">
          <Search className="text-light" />
          <input
            placeholder="Search items"
            className="bg-transparent w-full focus:outline-none text-light"
            type="text"
          />
        </div>
      </div>
      <AffiliateProductsTable title="" products={store?.store_products} />
    </div>
  );
}

function Items() {
  async function fetchStore() {
    const _id = localStorage.getItem("_id");
    console.log(_id);
    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate-stores?afilliate_id=${_id}`
    );
    const data = await res.json();
    console.log(data);
    return data[0];
  }
  const { isLoading, data: store } = useQuery({
    queryKey: ["affiliate_products"],
    queryFn: fetchStore,
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<ItemsHome store={store} />} />
        <Route path="/new" element={<NewProductForm />} />
      </Routes>
    </div>
  );
}

function MenuManager() {
  return (
    <div className="lg:px-2 pt-4">
      <div className="">
        <Tabs defaultValue="overview">
          <TabsList className="space-x-4 bg-transparent">
            <TabsTrigger
              className="w-14 text-xs lg:text-sm bg-darkGrey data-[state=active]:border-b data-[state=active]:border-green-400 data-[state=active]:bg-transparent text-muted data-[state=active]:text-light rounded-none"
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="w-14 text-xs lg:text-sm bg-darkGrey data-[state=active]:border-b data-[state=active]:border-green-400 data-[state=active]:bg-transparent text-muted data-[state=active]:text-light rounded-none"
              value="menu"
            >
              Menu
            </TabsTrigger>
            <TabsTrigger
              className="w-14 text-xs lg:text-sm bg-darkGrey data-[state=active]:border-b data-[state=active]:border-green-400 data-[state=active]:bg-transparent text-muted data-[state=active]:text-light rounded-none"
              value="categories"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger
              className="w-14 text-xs lg:text-sm bg-darkGrey data-[state=active]:border-b data-[state=active]:border-green-400 data-[state=active]:bg-transparent text-muted data-[state=active]:text-light rounded-none"
              value="items"
            >
              Items
            </TabsTrigger>
            <TabsTrigger
              className="w-20 text-xs lg:text-sm bg-darkGrey data-[state=active]:border-b data-[state=active]:border-green-400 data-[state=active]:bg-transparent text-muted data-[state=active]:text-light rounded-none"
              value="customization"
            >
              Customization
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-white">Overview</p>
          </TabsContent>
          <TabsContent value="menu">
            <Menu />
          </TabsContent>
          <TabsContent value="items">
            <Items />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MenuManager;

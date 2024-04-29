import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AffiliateProductsTable from "../affiliate-dashboard/components/AffiliateProductsTable";
import { baseUrl } from "@/constants/baseUrl";

function Menu() {
  return (
    <div className="">
      <div className="space-y-2 border-b pb-4 pt-4">
        <div className="flex justify-between">
          <h3 className="text-light text-2xl font-semibold lg:text-3xl">
            Menu
          </h3>
          <Button className=" text-dark">+ New Menu</Button>
        </div>
        <div className="bg-lightBlack w-72 py-2 rounded-lg flex gap-x-2 px-2">
          <Search className="text-light" />
          <input
            className="bg-transparent w-full focus:outline-none text-light"
            type="text"
          />
        </div>
      </div>
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
      <div className="space-y-2 border-b pb-4 pt-4">
        <div className="flex justify-between">
          <h3 className="text-light text-2xl font-semibold lg:text-3xl">
            Items
          </h3>
          <Button className=" text-dark">+ New Item</Button>
        </div>
        <div className="bg-lightBlack w-72 py-2 rounded-lg flex gap-x-2 px-2">
          <Search className="text-light" />
          <input
            className="bg-transparent w-full focus:outline-none text-light"
            type="text"
          />
        </div>
        <AffiliateProductsTable title="" products={store?.store_products} />
      </div>
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

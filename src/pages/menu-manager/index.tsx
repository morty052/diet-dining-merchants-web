/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import AffiliateProductsTable from "../affiliate-dashboard/components/AffiliateProductsTable";
import { baseUrl } from "@/constants/baseUrl";
// import { Link, Routes, Route } from "react-router-dom";
import NewProductForm from "../affiliate-dashboard/components/NewProductForm";
import { Tproduct } from "@/types/product";
import CategoryTable from "./partials/CategoryTable";

export type menu = {
  title: string;
  products: Tproduct[];
};

export type categoryProps = {
  title: string;
  products: Tproduct[];
  menus: string[];
};

async function fetchMenu(): Promise<menu[] | []> {
  const store_id = localStorage.getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-menu?store_id=${store_id}`
  );
  const data = await res.json();
  const { menus } = data;

  return menus;
}

async function fetchCategories(): Promise<categoryProps[] | []> {
  const store_id = localStorage.getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-categories?store_id=${store_id}`
  );
  const data = await res.json();
  const { categories } = data;

  return categories;
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
          <div key={index} className="">
            <p className="text-light">{menu.title}</p>
          </div>
        ))}
        {!isLoading && menus?.length === 0 && (
          <p className="text-light">No menus yet</p>
        )}
      </div>
    </div>
  );
}
function CategoriesHome({
  setCreating,
}: {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["affiliate_categories"],
    queryFn: fetchCategories,
  });
  // if (isLoading) {
  //   return null;
  // }

  return (
    <div className="">
      <div className="space-y-2 border-b pb-4 pt-4">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-light text-2xl font-semibold lg:text-3xl">
              Categories
            </h3>
          </div>
          <Button onClick={() => setCreating(true)} className=" text-dark">
            + New Category
          </Button>
        </div>
        <div className="bg-lightBlack w-72 py-2 rounded-lg flex gap-x-2 px-2">
          <Search className="text-light" />
          <input
            placeholder="Search categories"
            className="bg-transparent w-full focus:outline-none text-light"
            type="text"
          />
        </div>
      </div>
      <div className="p-2">
        <CategoryTable categories={categories as categoryProps[]} />
        {!isLoading && categories?.length === 0 && (
          <p className="text-light">No menus yet</p>
        )}
      </div>
    </div>
  );
}

// TODO ADD FAQ TO RIGHT SIDE ON BIG SCREEN
function CreateCategoryView({
  setCreating,
}: {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="">
      <div className="flex justify-between max-w-3xl">
        <ArrowLeft onClick={() => setCreating(false)} className="text-light" />
      </div>
      <div className="border-b py-2 border-lightBlack">
        <h3 className="text-light text-2xl font-semibold ">Create Category</h3>
      </div>
      <form className="space-y-2 py-3 flex flex-col">
        <label className="text-light" htmlFor="">
          Name
        </label>
        <input
          autoComplete="none"
          className="w-full text-light bg-lightBlack rounded-lg px-2 h-10 max-w-md "
          type="text"
        />
        <fieldset className="text-light">
          <div className="flex gap-x-1">
            <label htmlFor="">Menu 1</label>
            <input
              value={"mm"}
              onChange={(e) => console.log(e.target.value)}
              className=""
              type="checkbox"
              name=""
              id=""
            />
          </div>
        </fieldset>
        <Button className="w-20 rounded-2xl">Create</Button>
      </form>
    </div>
  );
}

function Categories() {
  const [creating, setCreating] = React.useState(false);

  return (
    <div className="">
      {!creating ? (
        <CategoriesHome setCreating={setCreating} />
      ) : (
        <CreateCategoryView setCreating={setCreating} />
      )}
    </div>
  );
}

function OverView() {
  const { data: menus, isLoading } = useQuery({
    queryKey: ["affiliate_menus"],
    queryFn: fetchMenu,
  });

  if (isLoading) {
    return null;
  }

  return (
    <div className="">
      <div className="space-y-2 border-b border-lightBlack pb-4 pt-4">
        <div className="flex justify-between">
          <div className="">
            <h3 className="text-light text-2xl font-semibold lg:text-3xl">
              Overview
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
      <div className="p-2 max-w-3xl">
        {menus?.map((menu, index) => (
          <div key={index} className="border-b py-2 border-lightBlack">
            <p className="text-light">{menu.title}</p>
            <p className="text-light text-sm">
              {menu.products?.length} Product
              {menu.products.length > 1 ? "s" : ""}
            </p>
            <div className="">
              {menu.products?.map((product, index) => (
                <div
                  key={index}
                  className="py-2 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={product.image}
                      alt=""
                      className="h-20 w-20 object-cover"
                    />
                    <div className="pl-2">
                      <p className="text-light">{product.name}</p>
                      <p className="text-light">${product.price}</p>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder={`$${product.price}`}
                    className="w-20 rounded-md p-2 placeholder:text-center placeholder:text-light bg-lightBlack text-center"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        {!isLoading && menus?.length === 0 && (
          <p className="text-light">No menus yet</p>
        )}
      </div>
    </div>
  );
}

function ItemsHome({
  store,
  setCreating,
}: {
  store: any;
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="space-y-2 border-b pb-4 pt-4">
      <div className="space-y-1 border-b border-lightBlack pb-4">
        <div className="flex justify-between">
          <h3 className="text-light text-2xl font-semibold lg:text-3xl">
            Items
          </h3>
          {/* <Link to={"/affiliate/menu/new"}>
          </Link> */}
          <Button onClick={() => setCreating(true)} className=" text-dark">
            + New Item
          </Button>
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
  const [creating, setCreating] = React.useState(false);
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
  const { data: store } = useQuery({
    queryKey: ["affiliate_products"],
    queryFn: fetchStore,
  });

  // if (isLoading) {
  //   return null;
  // }

  return (
    <div className="">
      {!creating ? (
        <ItemsHome store={store} setCreating={setCreating} />
      ) : (
        <NewProductForm setCreating={setCreating} />
      )}
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
              Menus
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
            <OverView />
          </TabsContent>
          <TabsContent value="menu">
            <Menu />
          </TabsContent>
          <TabsContent value="categories">
            <Categories />
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

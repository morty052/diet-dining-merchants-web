import { useQuery } from "@tanstack/react-query";
import AffiliateProductsTable from "../components/AffiliateProductsTable";
import NewProductForm from "../components/NewProductForm";
import { Route, Routes } from "react-router-dom";
import EditProductTable from "../components/EditProductTable";
import EditProductForm from "../components/EditProductForm";
import { baseUrl } from "../../../constants/baseUrl";

function AffiliateProductManager() {
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

  // if (isLoading) {
  //   return null
  // }
  return (
    <div className="w-full p-2 md:p-4">
      <Routes>
        <Route
          path="/"
          element={
            <AffiliateProductsTable title="" products={store?.store_products} />
          }
        />
        <Route path="/add" element={<NewProductForm />} />
        <Route
          path="/edit"
          element={
            <EditProductTable title="" products={store?.store_products} />
          }
        />
        <Route path="/edit/:id" element={<EditProductForm />} />
        <Route path="/product/:id" element={<EditProductForm />} />
      </Routes>
    </div>
  );
}

export default AffiliateProductManager;

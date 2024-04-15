import React, { useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { ChevronRight } from "lucide-react";
import { Tproduct } from "../../../types/product";
import DescriptionModal from "../../../components/modals/DescriptionModal";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  products: Tproduct[];
};

// const orders = [
//   {
//     store: 'Papa johns',
//     status: 'PENDING',
//     _id: '',
//     cart: [
//       {
//         name: 'Food',
//         price: '20',
//         quantity: '1',
//         item_id: '848grgrgrv777',
//         extras: [],
//       },
//     ],
//     customer: 'anthonyChopra@mail.com',
//     total: '400',
//   },
// ]

function DownLoadReportButton() {
  return (
    <div className="">
      <div className="hidden lg:flex gap-x-2">
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

const ProductDisplayCard = ({ product }: { product: Tproduct }) => {
  const { name, image, price, _id } = product ?? {};
  return (
    <Link
      to={`/products/${_id}`}
      className="bg-white flex items-center justify-between p-2 rounded-lg "
    >
      <div className=" flex flex-1 gap-x-2 items-center ">
        <img
          src={image}
          alt="product image"
          className="h-20 w-20 object-contain"
        />
        <div className="flex flex-col">
          <span>{name}</span>
          <span>${price}</span>
        </div>
      </div>
      <ChevronRight />
    </Link>
  );
};

function AffiliateProductsTable({ products }: Props) {
  const [description, setDescription] = useState("");

  const trigger = useRef<HTMLButtonElement>(null);
  function handleClick(description: string) {
    setDescription(description);
    trigger.current?.click();
  }

  return (
    <div className="py-6">
      <div className="flex items-center justify-between  pb-6">
        <div className="">
          <div className="flex">
            <input
              placeholder="Search products"
              type="text"
              className="w-72 rounded-lg border bg-transparent p-2 text-white focus:outline-green-400"
            />
          </div>
        </div>
        <DownLoadReportButton />
      </div>
      <div className="hidden lg:block">
        <Table>
          <TableCaption>
            {!products || !products.length
              ? "No products found"
              : "All Products"}
            .
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-white">Image</TableHead>
              <TableHead className=" text-center text-white">Name</TableHead>
              <TableHead className=" text-center text-white">
                Description
              </TableHead>
              <TableHead className=" text-center text-white">Price</TableHead>
              <TableHead className=" text-center text-white">
                Category
              </TableHead>
              <TableHead className=" text-center text-white">
                Information
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="">
            {products?.map((product) => {
              const { name, image, price, _id, description } = product;

              return (
                <TableRow key={_id}>
                  {/* IMAGE */}
                  <TableCell className=" w-1/6 max-w-sm  cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                    <img
                      src={image}
                      alt=""
                      className="mx-auto h-20 w-20 object-cover"
                    />
                  </TableCell>
                  {/* NAME */}
                  <TableCell className=" w-1/6 max-w-sm  cursor-pointer border-x text-white hover:bg-blue-200 hover:text-blue-600 ">
                    <p className="text-center font-medium text-gray-50 ">
                      {name}
                    </p>
                  </TableCell>
                  {/* DESCRIPTION */}
                  <TableCell
                    onClick={() => handleClick(description)}
                    className="group relative w-1/5 max-w-sm  cursor-pointer border-x text-white transition-all duration-300 ease-in hover:bg-white hover:text-white "
                  >
                    <p className="text-center group-hover:text-green-300">
                      View Description
                    </p>
                  </TableCell>
                  {/* PRICE */}
                  <TableCell className="w-1/6 border-x text-center text-white ">
                    ${price}
                  </TableCell>
                  <TableCell className="w-1/6 border-x text-center font-medium text-white">
                    {"date"}
                  </TableCell>
                  <TableCell className="w-1/6 border-x text-center font-medium text-white">
                    {"date"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-4 lg:hidden">
        {products?.map((product, index) => {
          return <ProductDisplayCard key={index} product={product} />;
        })}
      </div>
      <DescriptionModal trigger={trigger} description={description} />
    </div>
  );
}

export default AffiliateProductsTable;
